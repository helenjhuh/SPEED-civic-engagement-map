import React from "react";
import ReactDOM from "react-dom";
import Application from "./components/Application";

import "bootstrap/dist/css/bootstrap.min.css";

// for polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

ReactDOM.render(<Application />, document.getElementById("root"));
