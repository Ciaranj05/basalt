import "server-only";

type LogContext = Record<string, string | number | boolean | null | undefined>;

function sanitise(context: LogContext = {}) {
  return Object.fromEntries(
    Object.entries(context).filter(([key]) => {
      const lowered = key.toLowerCase();
      return !lowered.includes("token") && !lowered.includes("password") && !lowered.includes("secret");
    }),
  );
}

export function logPortalEvent(event: string, context?: LogContext) {
  console.info(JSON.stringify({ area: "portal", event, ...sanitise(context) }));
}

export function logPortalWarning(event: string, context?: LogContext) {
  console.warn(JSON.stringify({ area: "portal", event, ...sanitise(context) }));
}
