import React from "react";
import "./App.css";
import { CommonComponent } from "./Components/CommonComponent";
import { Provider } from "react-redux";
import store from "./store";
import Component from "./Components/Component";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        Component
        <Component />
        <CommonComponent />
      </div>
    </Provider>
  );
}
