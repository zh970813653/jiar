import React from "react";
import { AutnenticatedApp } from "autnenticated-app";
import { useAuth } from "context/auth-context";
import { UnautnenticatedApp } from "unautnenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import "./App.css";
import { FullPageErrorFallback } from "components/lib";
// import {ProjectListScreen} from './screen/project-list'

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AutnenticatedApp /> : <UnautnenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
