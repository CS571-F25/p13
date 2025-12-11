import React, { createContext, useContext, useMemo, useState } from "react";

const I18nContext = createContext();

const messages = {
  en: {
    brandCallout: "Pinterest-inspired Moodboards",
    heroTitle: "Pin your ideas with Boardify",
    heroSubtitle:
      "Type one theme and get an aesthetic board. Drag to arrange, refine with prompts, and export as PNG instantly.",
    quickGuide: "Quick guide",
    step1: "1) Enter a theme → Search",
    step2: "2) Arrange cards by drag",
    step3: "3) Select cards to change",
    step4: "4) Add tweaks like “warmer” or “pastel”",
    step5: "5) Export PNG or Copy",
    features: {
      smart: {
        title: "Smart search",
        desc: "Pexels + AI keyword extraction to match vibe."
      },
      layout: {
        title: "Pinterest layout",
        desc: "Masonry grid with smooth drag-and-drop."
      },
      export: {
        title: "Export",
        desc: "High-res PNG save or copy to clipboard."
      },
      demo: {
        title: "Lightweight demo",
        desc: "HashRouter-friendly for GitHub Pages."
      }
    },
    nav: { home: "Home", demo: "Demo", contact: "Contact" },
    contact: {
      title: "Contact Us",
      subtitle: "Share your questions or collaboration ideas. We reply within 24h.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      alert: "Thanks for contacting Boardify — this is a demo form."
    },
    demo: {
      callout: "Live demo",
      heading: "Create a Pinterest-style board",
      subheading: "Follow the flow: theme → prompt tweaks → drag → Export/Copy."
    },
    board: {
      empty: "Search a theme to see images here.",
      statusFetch: (theme, count) =>
        count
          ? `Fetched ${count} images for "${theme}".`
          : `No results for "${theme}", showing placeholders.`,
      statusFallback: "Showing placeholders.",
      statusExport: "Saved your board snapshot.",
      statusCopy: "Copied PNG data to clipboard.",
      errorFetch: "Couldn't load images. Showing placeholders.",
      errorAI: "AI keyword request failed. Showing placeholders.",
      errorCopy: "Clipboard copy failed.",
      errorClipboard: "Clipboard not supported in this browser.",
      loading: "Loading images..."
    },
  },
  ko: {
    brandCallout: "Pinterest 스타일 무드보드",
    heroTitle: "아이디어를 핀처럼 꽂아두는 Boardify",
    heroSubtitle:
      "테마 한 줄이면 무드보드가 완성됩니다. 드래그로 배열하고 프롬프트로 보정한 뒤 PNG로 내보내세요.",
    quickGuide: "빠른 사용법",
    step1: "1) 테마 입력 → Search",
    step2: "2) 드래그로 카드 정렬",
    step3: "3) 수정하고 싶은 이미지 선택",
    step4: "4) “더 따뜻하게”, “파스텔 느낌” 보정",
    step5: "5) Export PNG 또는 Copy",
    features: {
      smart: {
        title: "스마트 검색",
        desc: "Pexels + AI 키워드 추출로 감도를 맞춰줍니다."
      },
      layout: {
        title: "핀터레스트식 배열",
        desc: "Masonry 그리드와 부드러운 드래그."
      },
      export: {
        title: "내보내기",
        desc: "고해상도 PNG 저장 또는 클립보드 복사."
      },
      demo: {
        title: "경량 데모",
        desc: "HashRouter 기반으로 Pages에서도 바로 작동."
      }
    },
    nav: { home: "홈", demo: "데모", contact: "문의" },
    contact: {
      title: "Contact Us",
      subtitle: "협업, 피드백, 문의를 남겨주세요. 24시간 내에 답변 드립니다.",
      name: "이름",
      email: "이메일",
      message: "메시지",
      send: "보내기",
      alert: "Boardify에 문의해주셔서 감사합니다 — 데모 폼입니다."
    },
    demo: {
      callout: "실시간 데모",
      heading: "핀터레스트 스타일 보드 만들기",
      subheading: "테마 → 프롬프트 → 드래그 → Export/Copy 순으로 체험하세요."
    },
    board: {
      empty: "테마를 검색하면 여기에서 이미지를 볼 수 있어요.",
      statusFetch: (theme, count) =>
        count
          ? `"${theme}" 검색 결과 ${count}개를 가져왔어요.`
          : `"${theme}" 결과가 없어 플레이스홀더를 보여줍니다.`,
      statusFallback: "플레이스홀더를 보여줍니다.",
      statusExport: "보드 스냅샷을 저장했습니다.",
      statusCopy: "클립보드에 PNG 데이터를 복사했습니다.",
      errorFetch: "이미지를 불러오지 못했습니다. 플레이스홀더로 대체했어요.",
      errorAI: "AI 키워드 요청에 실패했습니다. 플레이스홀더로 대체했어요.",
      errorCopy: "클립보드 복사에 실패했습니다.",
      errorClipboard: "클립보드를 지원하지 않는 브라우저입니다.",
      loading: "이미지를 불러오는 중..."
    },
  },
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");
  const value = useMemo(() => ({ lang, setLang, t: messages[lang] }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
