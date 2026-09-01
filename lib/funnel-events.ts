"use client";

const allowedEvents = new Set([
  "diagnostic_started",
  "diagnostic_apply_clicked",
  "application_viewed",
]);

export function trackFunnelEvent(
  event: string,
  source = "website",
  landingPath = "/",
) {
  if (typeof window === "undefined" || !allowedEvents.has(event)) return;
  const path = landingPath.startsWith("/") ? landingPath.split("?")[0] : "/";
  const safeSource = source.slice(0, 40) || "website";
  const key = `bluefin:funnel:${event}:${safeSource}:${path}`;
  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
  } catch {
    return;
  }
  const payload = JSON.stringify({
    event,
    source: safeSource,
    landingPath: path,
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/funnel-events",
      new Blob([payload], { type: "application/json" }),
    );
    return;
  }
  void fetch("/api/funnel-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  });
}
