"use client";

import { useEffect, useState } from "react";

type RotatingTypewriterProps = {
  intro: string;
  label: string;
  phrases: string[];
};

export default function RotatingTypewriter({
  intro,
  label,
  phrases,
}: RotatingTypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState(phrases[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return;

    const phrase = phrases[phraseIndex] ?? "";
    const delay = isDeleting
      ? displayed.length === 0
        ? 240
        : 32
      : displayed.length === phrase.length
        ? 1300
        : 58;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayed.length < phrase.length) {
        setDisplayed(phrase.slice(0, displayed.length + 1));
        return;
      }

      if (!isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (displayed.length > 0) {
        setDisplayed(phrase.slice(0, -1));
        return;
      }

      setPhraseIndex((current) => (current + 1) % phrases.length);
      setIsDeleting(false);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex, phrases, reducedMotion]);

  const phrase = reducedMotion ? (phrases[0] ?? "") : displayed;

  return (
    <p className="hero-typewriter">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {intro}
        <span className="hero-typewriter-phrase">{phrase}</span>
        {!reducedMotion && <span className="typewriter-cursor">|</span>}
      </span>
    </p>
  );
}
