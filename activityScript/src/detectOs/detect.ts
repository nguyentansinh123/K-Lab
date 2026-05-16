import { platform } from "node:process";

export const detectCurrentPlatform = () => {
  return { platform }
}

export const isWayland = () => {
  if (process.env.XDG_SESSION_TYPE === 'wayland') {
    return true
  }

  return false
}

export const isHyprland = () => {
  if (process.env.XDG_CURRENT_DESKTOP === "Hyprland"){
    return true
  }
  return false

}
