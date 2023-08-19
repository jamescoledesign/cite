import * as React from "react";
import "../ui.css";

import { Hero } from "../components/hero/Hero";
import { Login } from "../components/login/Login";
import { Modal } from "../components/modal/Modal";

export function APIKeyPage() {
  return ( <>
      <Hero />
      <Login />
      <Modal />
    </>
  );
}