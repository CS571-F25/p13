import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import html2canvas from "html2canvas";
import ImageGrid from "./ImageGrid";
import "./Board.css";
import { useI18n } from "../i18n.jsx";

function generatePlaceholderImages(count = 9) {
  return Array.from({ length: count }, (_, i) => {
    const seed = Math.random().toString(36).slice(2, 8);
    return {
      id: `placeholder-${seed}`,
      url: `https://picsum.photos/seed/${seed}/900/600`,
      alt: `Placeholder ${seed}`,
    };
  });
}

async function fetchImages(query, count = 9) {
  const backendUrl = "https://boardify-backend.vercel.app/api/images";
  const tempUrl = "http://localhost:3000/api/images";

  try {
    const url = new URL(tempUrl);
    url.searchParams.append("query", query);
    url.searchParams.append("images", count);

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error("Backend error: ", response.status);
      throw new Error("Backend request failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Backend error:", err);
    throw err;
  }
}

async function getKeywords(theme, tweakPrompt, previousTweaks, selectedImages) {
  const tempUrl = "http://localhost:3000/api/tweak-images";

  try {
    const response = await fetch(tempUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme,
        tweakPrompt,
        previousTweaks,
        selectedImages,
      }),
    });

    if (!response.ok) {
      console.error("error: ", response);
      throw new Error("AI keywords request failed", response.status);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("AI keywords error:", err);
    throw err;
  }
}

export default function Board({ showGuide = true }) {
  const [theme, setTheme] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [exportQuality, setExportQuality] = useState("standard");
  const [exporting, setExporting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previousTweaks, setPreviousTweaks] = useState([]);

  const boardRef = useRef(null);
  const { t } = useI18n();

  const waitForImages = async () => {
    if (!boardRef.current) return;
    const imgs = Array.from(boardRef.current.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
      )
    );
  };

  const captureBoard = async () => {
    if (!boardRef.current) return null;

    await waitForImages(); // 이미지 다 로딩될 때까지 기다리는 함수는 그대로 사용

    const target = boardRef.current;
    const rect = target.getBoundingClientRect();
    const scaleBase = window.devicePixelRatio || 1;
    const scale = (exportQuality === "high" ? 2 : 1) * scaleBase;

    const canvas = await html2canvas(target, {
      useCORS: true,
      backgroundColor: "#ffffff",
      scale,
      // element의 실제 박스 크기만 넘겨주고,
      // x, y, scrollX, scrollY는 아예 건드리지 않는다.
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
    });

    return canvas;
  };

  const fetchForTheme = useCallback(
    async (themeStr) => {
      setLoading(true);
      setStatus(t.board.statusFetch(themeStr, null));
      setError("");
      try {
        const pex = await fetchImages(themeStr, 9);
        setImages(pex.length > 0 ? pex : generatePlaceholderImages());
        setStatus(t.board.statusFetch(themeStr, pex.length));
      } catch (err) {
        console.error("Using random placeholders");
        setImages(generatePlaceholderImages());
        setError(t.board.errorFetch);
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    const qp = new URLSearchParams(window.location.hash.split("?")[1]);
    const themeFromUrl = qp.get("theme");

    if (themeFromUrl) {
      setTheme(themeFromUrl);
      setInput(themeFromUrl);
      fetchForTheme(themeFromUrl);
    }
  }, [fetchForTheme]);

  const handleSearch = async (searchInput) => {
    if (!searchInput) return;

    setLoading(true);
    setError("");

    if (!theme) {
      setTheme(searchInput);
      await fetchForTheme(searchInput);
    } else {
      if (selectedImages.length === 0) {
        setLoading(false);
        setError("No images to tweak.");
        return;
      }

      try {
        const results = await getKeywords(
          theme,
          searchInput,
          previousTweaks,
          selectedImages
        );
        const keywords = results.searchQuery;
        setStatus(`Regenerated ${selectedImages.length} images for "${keywords}"`);

        const newImages = results.images || [];
        if (!newImages.length) {
          setImages(generatePlaceholderImages());
          setError(t.board.statusFallback);
          return;
        }

        setImages((prevImages) => {
          const imageMap = newImages.reduce((map, img, idx) => {
            map[selectedImages[idx]] = img;
            return map;
          }, {});

          return prevImages.map((img) =>
            imageMap[img.id] ? imageMap[img.id] : img
          );
        });

        setSelectedImages([]);

        setPreviousTweaks((prev) => [...prev, searchInput]);
      } catch (err) {
        console.error("AI fetch failed, using placeholders", err);
        setImages(generatePlaceholderImages());
        setError(t.board.errorAI);
      }
    }

    setInput("");
    setLoading(false);
  };

  const exportSnapshot = async () => {
    setExporting(true);
    try {
      const canvas = await captureBoard();
      if (!canvas) return;
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${theme.replace(/\s+/g, "_")}_board.png`;
      a.click();
      setStatus(t.board.statusExport);
    } finally {
      setExporting(false);
    }
  };

  const copySnapshot = async () => {
    if (!boardRef.current || !navigator.clipboard) {
      setError(t.board.errorClipboard);
      return;
    }
    setExporting(true);
    try {
      const canvas = await captureBoard();
      if (!canvas) return;
      const dataUrl = canvas.toDataURL("image/png");
      await navigator.clipboard.writeText(dataUrl);
      setStatus(t.board.statusCopy);
    } catch (err) {
      setError(t.board.errorCopy);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Container fluid className="board-container">
      {showGuide && (
        <div className="helper-panel">
          <h5>{t.quickGuide}</h5>
          <ul className="helper-steps">
            <li>{t.step1}</li>
            <li>{t.step2}</li>
            <li>{t.step3}</li>
            <li>{t.step4}</li>
          </ul>
        </div>
      )}

      <div className="toolbar mb-3">
        <div className="toolbar-search">
          <InputGroup className="fixed-input-group">
            <Form.Control
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(input)}
              placeholder={
                theme === null
                  ? "Try: 'make it warmer' or 'add more colors'"
                  : "Enter a theme (e.g. cozy coffee shop)"
              }
            />
            <Button onClick={() => handleSearch(input)}>
              {theme === null ? "Apply" : "Search"}
            </Button>
          </InputGroup>
        </div>
        <div className="d-flex gap-2 align-items-center justify-content-end toolbar-actions">
          <Form.Select
            size="sm"
            value={exportQuality}
            onChange={(e) => setExportQuality(e.target.value)}
            aria-label="Export quality"
            className="toolbar-select"
          >
            <option value="standard">Export: Standard</option>
            <option value="high">Export: High-res</option>
          </Form.Select>
          <Button
            onClick={exportSnapshot}
            variant="primary"
            disabled={exporting}
            className="toolbar-btn"
          >
            {exporting ? "Exporting..." : "Export PNG"}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={copySnapshot}
            disabled={exporting}
            className="toolbar-btn"
          >
            Copy
          </Button>
        </div>
      </div>

      {status && (
        <Alert variant="info" className="mt-3 py-2">
          {loading && <Spinner animation="border" size="sm" className="me-2" />}
          {status}
        </Alert>
      )}
      {error && (
        <Alert variant="warning" className="mt-2 py-2">
          {error}
        </Alert>
      )}

      <Row>
        <Col>
          <ImageGrid
            images={images}
            setImages={setImages}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            loading={loading}
            boardRef={boardRef}
            emptyMessage={t.board.empty}
          />
        </Col>
      </Row>
    </Container>
  );
}
