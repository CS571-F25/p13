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
      <div className="page-shell section">
        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3 gap-3">
          <div>
            <div className="callout mb-2">{t.demo.callout}</div>
            <h2 className="mb-2">{t.demo.heading}</h2>
          </div>
        </div>
        <ErrorBoundary>
          <Suspense fallback={<div className="card-ghost p-4 text-center">Loading demo...</div>}>
            <Board />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
