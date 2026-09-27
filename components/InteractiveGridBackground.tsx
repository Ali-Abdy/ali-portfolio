"use client";

import { useEffect, useRef } from "react";
import styles from "./InteractiveGridBackground.module.css";

/**
 * Interactive background technique adapted from:
 * https://github.com/uzair0x7/Portfolio-React
 *
 * Original work:
 * Copyright (c) 2026 Uzair Ali
 * MIT License
 */
export default function InteractiveGridBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    let frameId = 0;
    let reducedMotion = reducedMotionQuery.matches;

    const setReducedMotion = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) root.style.setProperty("--spotlight-opacity", "0");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion || !finePointerQuery.matches || document.hidden) return;

      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        root.style.setProperty("--mouse-x", `${event.clientX}px`);
        root.style.setProperty("--mouse-y", `${event.clientY}px`);
        root.style.setProperty("--spotlight-opacity", "1");
      });
    };

    const handlePointerLeave = () => {
      root.style.setProperty("--spotlight-opacity", "0");
    };

    const handleVisibilityChange = () => {
      if (document.hidden) root.style.setProperty("--spotlight-opacity", "0");
    };

    if (finePointerQuery.matches && !reducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", setReducedMotion);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", setReducedMotion);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} interactive-grid-background`}
      aria-hidden="true"
    >
      <div className={styles.base} />
      <div className={styles.grid} />
      <div className={styles.darkMask} />
      <div className={styles.spotlight} />
      <div className={styles.secondarySpotlight} />
      <div className={`${styles.orb} ${styles.orbOne}`} />
      <div className={`${styles.orb} ${styles.orbTwo}`} />
      <div className={`${styles.orb} ${styles.orbThree}`} />
    </div>
  );
}
