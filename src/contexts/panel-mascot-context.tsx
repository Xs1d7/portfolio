"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CapybaraMascot } from "@/components/capybara-mascot";

export type MascotPhase = "hidden" | "pulling" | "walking" | "poof";

interface PanelMascotState {
  phase: MascotPhase;
  notifyPanelOpen: () => void;
  notifyPanelClose: () => void;
}

const PanelMascotContext = createContext<PanelMascotState | null>(null);

export function PanelMascotProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<MascotPhase>("hidden");
  const phaseRef = useRef<MascotPhase>("hidden");

  phaseRef.current = phase;

  const notifyPanelOpen = useCallback(() => {
    if (phaseRef.current !== "hidden") return;
    setPhase("pulling");
  }, []);

  const notifyPanelClose = useCallback(() => {
    if (phaseRef.current === "pulling" || phaseRef.current === "walking") {
      setPhase("poof");
    }
  }, []);

  const handlePullComplete = useCallback(() => {
    if (phaseRef.current === "pulling") {
      setPhase("walking");
    }
  }, []);

  const handleWalkComplete = useCallback(() => {
    if (phaseRef.current === "walking") {
      setPhase("hidden");
    }
  }, []);

  const handlePoofComplete = useCallback(() => {
    if (phaseRef.current === "poof") {
      setPhase("hidden");
    }
  }, []);

  const value = useMemo(
    () => ({ phase, notifyPanelOpen, notifyPanelClose }),
    [phase, notifyPanelOpen, notifyPanelClose],
  );

  return (
    <PanelMascotContext.Provider value={value}>
      <CapybaraMascot
        phase={phase}
        onPullComplete={handlePullComplete}
        onWalkComplete={handleWalkComplete}
        onPoofComplete={handlePoofComplete}
      />
      {children}
    </PanelMascotContext.Provider>
  );
}

export function usePanelMascot() {
  const ctx = useContext(PanelMascotContext);
  if (!ctx) {
    throw new Error("usePanelMascot must be used within PanelMascotProvider");
  }
  return ctx;
}
