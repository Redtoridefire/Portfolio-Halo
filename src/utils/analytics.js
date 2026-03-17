export const trackEvent = (eventName, metadata = {}) => {
  const payload = {
    eventName,
    metadata,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, metadata);
  }

  const existingEvents = JSON.parse(localStorage.getItem("portfolio_events") || "[]");
  existingEvents.push(payload);
  localStorage.setItem("portfolio_events", JSON.stringify(existingEvents.slice(-200)));

  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", payload);
  }
};
