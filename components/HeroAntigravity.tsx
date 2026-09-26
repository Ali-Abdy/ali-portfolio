"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Antigravity = dynamic(() => import("./Antigravity"), {
  ssr: false,
  loading: () => null,
});

type Quality = "compact" | "full";

function getQuality(): Quality | undefined {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return undefined;
  }

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const device = navigator as Navigator & { deviceMemory?: number };
  const isConstrained =
    (navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4) ||
    (device.deviceMemory !== undefined && device.deviceMemory <= 4);

  return isTouch || isConstrained ? "compact" : "full";
}

export default function HeroAntigravity() {
  const [quality, setQuality] = useState<Quality>();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = window.requestAnimationFrame(() => setQuality(getQuality()));
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setQuality(getQuality()));
    };

    reducedMotion.addEventListener("change", update);
    return () => {
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  if (!quality) return null;

  const compact = quality === "compact";
  return (
    <div className="hero-antigravity" aria-hidden="true">
      <Antigravity
        count={compact ? 120 : 350}
        magnetRadius={5}
        ringRadius={10}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={1.5}
        lerpSpeed={0.1}
        color="#3B82F6"
        autoAnimate={false}
        particleVariance={compact ? 0.8 : 1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={3}
        particleShape="capsule"
        fieldStrength={10}
      />
    </div>
  );
}
