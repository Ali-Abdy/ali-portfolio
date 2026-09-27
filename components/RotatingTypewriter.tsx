"use client";

import { useEffect, useReducer, useState } from "react";

type RotatingTypewriterProps = {
  label: string;
  phrases: string[];
};

type Phase = "typing" | "holding" | "deleting" | "between";
type TypewriterState = { phraseIndex: number; characterCount: number; phase: Phase };

const initialState: TypewriterState = {
  phraseIndex: 0,
  characterCount: 0,
  phase: "typing",
};

function nextState(state: TypewriterState, phrases: string[]): TypewriterState {
  const phrase = phrases[state.phraseIndex] ?? "";

  if (state.phase === "typing") {
    if (state.characterCount < phrase.length)
      return { ...state, characterCount: state.characterCount + 1 };
    return { ...state, phase: "holding" };
  }
  if (state.phase === "holding") return { ...state, phase: "deleting" };
  if (state.phase === "deleting") {
    if (state.characterCount > 0)
      return { ...state, characterCount: state.characterCount - 1 };
    return { ...state, phase: "between" };
  }
  return {
    phraseIndex: (state.phraseIndex + 1) % phrases.length,
    characterCount: 0,
    phase: "typing",
  };
}

export default function RotatingTypewriter({
  label,
  phrases,
}: RotatingTypewriterProps) {
  const [state, dispatch] = useReducer(
    (current: TypewriterState) => nextState(current, phrases),
    initialState,
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setIsDocumentVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0 || !isDocumentVisible) return;

    const delay =
      state.phase === "typing"
        ? 65
        : state.phase === "holding"
          ? 1500
          : state.phase === "deleting"
            ? 40
            : 325;
    const timeout = window.setTimeout(dispatch, delay);

    return () => window.clearTimeout(timeout);
  }, [isDocumentVisible, phrases, reducedMotion, state]);

  const phrase = reducedMotion
    ? (phrases[0] ?? "")
    : (phrases[state.phraseIndex] ?? "").slice(0, state.characterCount);

  return (
    <p className="hero-typewriter">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        <span className="hero-typewriter-phrase">{phrase}</span>
        {!reducedMotion && <span className="typewriter-cursor">|</span>}
      </span>
    </p>
  );
}
