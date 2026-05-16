import { getHyprlandActiveWindow } from "./archhyprland/hyprWindow.js";
import { assignToCSession, savePreviousSession } from "./db/savedata.js";
import { createTable } from "./db/sqlite.js";
import { detectCurrentPlatform, isHyprland, isWayland } from "./detectOs/detect.js";
import { startPolling } from "./scanning.js";

createTable()

process.on("SIGINT", () => {
  savePreviousSession()
  process.exit()
})

process.on("SIGTERM", () => {
  savePreviousSession()
  process.exit()
})

let name = detectCurrentPlatform()
if (name.platform === 'linux') {
  if (isWayland()) {
    if (isHyprland()) {
      startPolling(() => {
        const data = getHyprlandActiveWindow()
        if (data) console.log(data)
        let appData = data?.app ?? "idle"
        let titleData = data?.title ?? "idle"
        assignToCSession(appData, titleData)
      }, { intervalMs: 2000 })
    }
  }
}



