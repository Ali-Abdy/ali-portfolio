"use client";

import { useEffect, useRef } from "react";

/*
 * Adapted from the global mouse-position background approach in
 * uzair0x7/Portfolio-React, frontend/src/App.js and App.css.
 * Copyright (c) 2026 Uzair Ali, MIT License. The full notice is in
 * licenses/uzair-portfolio-react/MIT.txt and the generated third-party notice.
 *
 * The reference uses the pointer position for fixed radial overlays. This
 * component extends that approach with local, distance-based box responses.
 */

const INTERACTION_RADIUS = 270;
const POINTER_LERP = 0.16;
const RESPONSE_LERP = 0.14;

export default function InteractiveBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || !supportsFinePointer.matches || reducedMotion.matches) return;

    const boxes = Array.from(
      root.querySelectorAll<HTMLSpanElement>(".background-box"),
    ).map((element) => ({ element, x: 0, y: 0, proximity: 0 }));
    const pointer = {
      currentX: -INTERACTION_RADIUS,
      currentY: -INTERACTION_RADIUS,
      targetX: -INTERACTION_RADIUS,
      targetY: -INTERACTION_RADIUS,
      visible: false,
    };
    let frame = 0;

    const measureBoxes = () => {
      for (const box of boxes) {
        const rect = box.element.getBoundingClientRect();
        box.x = rect.left + rect.width / 2;
        box.y = rect.top + rect.height / 2;
      }
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const render = () => {
      frame = 0;
      pointer.currentX += (pointer.targetX - pointer.currentX) * POINTER_LERP;
      pointer.currentY += (pointer.targetY - pointer.currentY) * POINTER_LERP;
      root.style.setProperty("--pointer-x", `${pointer.currentX}px`);
      root.style.setProperty("--pointer-y", `${pointer.currentY}px`);
      root.style.setProperty("--pointer-visible", pointer.visible ? "1" : "0");

      let needsAnotherFrame =
        Math.abs(pointer.targetX - pointer.currentX) > 0.5 ||
        Math.abs(pointer.targetY - pointer.currentY) > 0.5;

      for (const box of boxes) {
        const distance = Math.hypot(
          pointer.currentX - box.x,
          pointer.currentY - box.y,
        );
        const normalized = Math.max(0, 1 - distance / INTERACTION_RADIUS);
        const target = normalized * normalized * (3 - 2 * normalized);
        box.proximity += (target - box.proximity) * RESPONSE_LERP;
        box.element.style.setProperty(
          "--background-proximity",
          box.proximity.toFixed(3),
        );
        needsAnotherFrame ||= Math.abs(target - box.proximity) > 0.005;
      }

      if (needsAnotherFrame && !document.hidden)
        frame = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.visible = true;
      schedule();
    };

    const leave = () => {
      pointer.targetX = -INTERACTION_RADIUS;
      pointer.targetY = -INTERACTION_RADIUS;
      pointer.visible = false;
      schedule();
    };

    const visibilityChange = () => {
      if (document.hidden) stop();
      else schedule();
    };

    measureBoxes();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });
    window.addEventListener("resize", measureBoxes, { passive: true });
    document.addEventListener("visibilitychange", visibilityChange);

    return () => {
      stop();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", measureBoxes);
      document.removeEventListener("visibilitychange", visibilityChange);
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
      root.style.removeProperty("--pointer-visible");
      for (const box of boxes)
        box.element.style.removeProperty("--background-proximity");
    };
  }, []);

  return (
    <div ref={rootRef} className="site-background" aria-hidden="true">
      <span className="background-spotlight" />
      <span className="background-box background-box-one" />
      <span className="background-box background-box-two" />
      <span className="background-box background-box-three" />
      <span className="background-box background-box-four" />
      <span className="background-box background-box-five" />
    </div>
  );
}
