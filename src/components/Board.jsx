import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import html2canvas from "html2canvas";
import ImageGrid from "./ImageGrid";
import "./Board.css";

function generatePlaceholderImages(count = 9) {
  return Array.from({ length: count }, (_, i) => {
    const seed = Math.random().toString(36).slice(2, 8);
    return {
      id: `placeholder-${seed}`,
      url: `https://picsum.photos/seed/${seed}/300/200`,
      alt: `Placeholder ${seed}`,
    };
  });
}

async function fetchPexels(query, count = 9) {
  const pexelsProxyUrl = import.meta.env.VITE_PEXELS_PROXY_URL;

  try {
    const response = await fetch(pexelsProxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, count }),
    });

    if (!response.ok) {
      throw new Error("Pexels proxy request failed");
    }

    const data = await response.json();
    return data.photos || [];
  } catch (err) {
    console.error("Pexels proxy error:", err);
    throw err;
  }
}

async function getKeywords(prompt) {
  const aiKeywordsUrl = import.meta.env.VITE_AI_KEYWORDS_URL;

  try {
    const response = await fetch(aiKeywordsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("AI keywords proxy request failed");
    }

    const data = await response.json();
    return data.keywords || [];
  } catch (err) {
    console.error("AI keywords proxy error:", err);
    throw err;
  }
}

export default function Board() {
  const [theme, setTheme] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [input, setInput] = useState("");
  const boardRef = useRef(null);

  const fetchForTheme = useCallback(async (t) => {
    setLoading(true);
    try {
      const pex = await fetchPexels(t, 9);
      setImages(pex.length > 0 ? pex : generatePlaceholderImages());
    } catch (err) {
      console.error("Using random placeholders");
      setImages(generatePlaceholderImages());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const qp = new URLSearchParams(window.location.hash.split("?")[1]);
    const t = qp.get("theme");

    if (t) {
      setTheme(t);
      setInput(t);
      fetchForTheme(t);
      setHasSearched(true);
    }
  }, [fetchForTheme]);

  const handleSearch = async (searchInput) => {
    if (!searchInput) return;

    setLoading(true);

    if (!hasSearched) {
      // First search: treat as theme
      setTheme(searchInput);
      await fetchForTheme(searchInput); // await here
      setHasSearched(true);
    } else {
      // Subsequent searches: AI prompt
      try {
        const keywords = await getKeywords(searchInput);

        if (!keywords.length) {
          console.debug(
            "No keywords extracted from prompt, using placeholders"
          );
          setImages(generatePlaceholderImages());
        } else {
          const searchQuery = keywords.join(" ");
          const newImages = await fetchPexels(searchQuery, 10);
          setImages(newImages.length ? newImages : generatePlaceholderImages());
        }
      } catch (err) {
        console.error("AI fetch failed, using placeholders", err);
        setImages(generatePlaceholderImages());
      }
    }

    setInput("");
    setLoading(false);
  };

  const exportSnapshot = async () => {
    if (!boardRef.current) return;
    const canvas = await html2canvas(boardRef.current, {
      useCORS: true,
      scale: 2,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${theme.replace(/\s+/g, "_")}_board.png`;
    a.click();
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col md={8}>
          <InputGroup className="fixed-input-group">
            <Form.Control
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(input)}
              placeholder={
                hasSearched
                  ? "Try: 'make it warmer' or 'add more colors'"
                  : "Enter a theme (e.g. cozy coffee shop)"
              }
            />
            <Button onClick={() => handleSearch(input)}>
              {hasSearched ? "Apply" : "Search"}
            </Button>
          </InputGroup>
        </Col>
        <Col md={4} className="d-flex gap-2">
          <Button onClick={exportSnapshot} variant="primary">
            Export Snapshot
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <ImageGrid
            images={images}
            setImages={setImages}
            loading={loading}
            boardRef={boardRef}
          />
        </Col>
      </Row>
    </Container>
  );
}
