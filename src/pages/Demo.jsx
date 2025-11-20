import React, { useEffect, Suspense } from "react";
import SiteNavbar from "../components/SiteNavbar";
import ErrorBoundary from "../components/ErrorBoundary";

const Board = React.lazy(() => import("../components/Board"));

export default function Demo() {
  useEffect(() => {
    document.title = "Boardify Demo";
  }, []);
  
  return (
    <div>
      <SiteNavbar />
      <div className="container py-4">
        <h2>Demo</h2>
        <p className="text-muted">
          Create mood boards from natural language prompts.
        </p>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading demo...</div>}>
            <Board />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
