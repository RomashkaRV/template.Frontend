"use client";

import React from "react";
import { notificationsEventManager } from "widgets/Notifications";

import style from "./page.module.scss";

export default function MainPage() {
  const pushAlert = () => {
    notificationsEventManager.show({
      type: "error",
      text: "Test message"
    });
  };

  return (
    <div className={style.page}>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

      <button onClick={pushAlert}>Alert</button>
    </div>
  );
}
