"use client";
import { useEffect, useSyncExternalStore } from "react";
import { speech } from "./speech";

export function useSpeech() {
  useEffect(() => {
    speech.hydrate();
  }, []);
  return useSyncExternalStore(speech.subscribe, speech.getState, speech.getServerState);
}
