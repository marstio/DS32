import React from "react";
import { createRoot } from "react-dom/client";
import SusceptibilityDashboard from "./TDasher";
import "./index.css";

const rootEl = document.getElementById("root");
createRoot(rootEl).render(<SusceptibilityDashboard />);
