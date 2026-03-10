import { simvarSet } from "@/API/simvarApi"
import { playSound } from "@/services/playSounds"

export async function setHeadingDial(degrees: number) {
  if (degrees < 0 || degrees > 360) return
  try {
    await simvarSet(`${degrees} (>L:INI_HEADING_DIAL)`)
    playSound("check.ogg")
  } catch (error) {
    console.error("Error setting heading dial:", error)
  }
}
