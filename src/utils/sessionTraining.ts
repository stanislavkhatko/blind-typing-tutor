import { SESSION_TTL_MS } from "@/config/auth";

export type SessionTrainingPhase = "phase1" | "phase2" | "phase3";

export interface SessionTrainingPhaseMeta {
  phase: SessionTrainingPhase;
  label: string;
  display: string;
}

const PHASE_1_THRESHOLD_MS = 400 * 1000;
const PHASE_2_THRESHOLD_MS = 200 * 1000;

export function getSessionRemainingMs(expiresAt: number) {
  const remainingMs = new Date(expiresAt).getTime() - Date.now();
  return Math.min(Math.max(remainingMs, 0), SESSION_TTL_MS);
}

export function getSessionTrainingPhase(remainingMs: number): SessionTrainingPhase {
  if (remainingMs > PHASE_1_THRESHOLD_MS) {
    return "phase1";
  }
  if (remainingMs > PHASE_2_THRESHOLD_MS) {
    return "phase2";
  }
  return "phase3";
}

export function getSessionTrainingPhaseMeta(remainingMs: number): SessionTrainingPhaseMeta {
  const phase = getSessionTrainingPhase(remainingMs);
  if (phase === "phase1") {
    return { phase, label: "Tastaturtraining", display: "1/3 · Tastaturtraining" };
  }
  if (phase === "phase2") {
    return { phase, label: "Worttraining", display: "2/3 · Worttraining" };
  }
  return { phase, label: "Medizinische Begriffe", display: "3/3 · Medizinische Begriffe" };
}
