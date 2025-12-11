import React, { useEffect, Suspense } from "react";
import SiteNavbar from "../components/SiteNavbar";
import ErrorBoundary from "../components/ErrorBoundary";
import { useI18n } from "../i18n.jsx";

const Board = React.lazy(() => import("../components/Board"));

export default function Demo() {
  const { t } = useI18n();
  useEffect(() => {
    document.title = "Boardify Demo";
  }, []);
  
  return (
    <div>
      <SiteNavbar />
      <header className="hero hero-demo">
        <div className="page-shell hero-inner">
          <div className="callout mb-2">{t.demo.callout}</div>
          <h1 className="display-5 mb-2">{t.demo.heading}</h1>
          <div className="helper-panel text-start">
            <h2 className="h5 mb-2">{t.quickGuide}</h2>
            <ul className="helper-steps">
              <li>{t.step1}</li>
              <li>{t.step2}</li>
              <li>{t.step3}</li>
              <li>{t.step4}</li>
              <li>{t.step5}</li>
            </ul>
          </div>
        </div>
      </header>
      <main className="page-shell section board-main">
        <ErrorBoundary>
          <Suspense fallback={<div className="card-ghost p-4 text-center">Loading demo...</div>}>
            <Board showGuide={false} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
