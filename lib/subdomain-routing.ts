export const SUITE_HOST_ROUTES: Record<string, string> = {
  "aviation.northbridgeventuregroup.com": "/suite/aviation",
  "games.northbridgeventuregroup.com": "/suite/games",
  "logistics.northbridgeventuregroup.com": "/suite/logistics",
  "digital.northbridgeventuregroup.com": "/suite/digital",
  "ventures.northbridgeventuregroup.com": "/suite/ventures",
};

export function normalizeHostname(host: string | null): string {
  if (!host) return "";
  return host.split(":")[0].trim().toLowerCase();
}

export function resolveSuiteRoute(host: string | null, pathname: string): string | null {
  if (pathname !== "/") return null;
  const hostname = normalizeHostname(host);
  return SUITE_HOST_ROUTES[hostname] ?? null;
}
