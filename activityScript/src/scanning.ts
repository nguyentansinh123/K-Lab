import { PollingOptions } from "./types.js";

export function startPolling(callback: () => void, options: PollingOptions): NodeJS.Timeout {
  if (options.immediate !== false) {
    callback();
  }
  return setInterval(callback, options.intervalMs);
}
