import FingerprintJS, { type Agent } from "@fingerprintjs/fingerprintjs";

let agentPromise: Promise<Agent> | null = null;

function getAgent(): Promise<Agent> {
  if (!agentPromise) {
    agentPromise = FingerprintJS.load();
  }
  return agentPromise;
}

export async function getDeviceFingerprint(): Promise<string> {
  if (typeof window === "undefined") return "";

  const agent = await getAgent();
  const result = await agent.get();
  return result.visitorId;
}
