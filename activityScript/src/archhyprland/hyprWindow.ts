import { execSync } from "child_process";
import { ActiveWindow } from "../types.js";

export const getHyprlandActiveWindow = (): ActiveWindow | null => {
  try {
    const output = execSync("hyprctl activewindow -j").toString()
    const data = JSON.parse(output)

    if (!data){
      return null
    }

    return {
      title: data.title,
      app: data.class,
      initialTitle: data.initialTitle
    }

  } catch (error) {
    console.error("Hyprland not detected or command failed.");
    return null
  }
}
