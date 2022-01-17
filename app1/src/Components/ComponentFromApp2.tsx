import React, { useEffect } from "react";
import { store } from "../store";
import ErrorBoundary from "./ErrorBoundary";

const CommonComponent = React.lazy(() => import("app2/CommonComponent"));

export default function ComponentFromApp2() {
  console.log(store.getState());
  return (
    <ErrorBoundary>
      <React.Suspense fallback="Loading Button">
        <CommonComponent store={store} />
      </React.Suspense>
    </ErrorBoundary>
  );
}
