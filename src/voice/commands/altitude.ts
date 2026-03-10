import { simvarSet } from "@/API/simvarApi"
import { playSound } from "@/services/playSounds"

export async function setAltitudeDial(feet: number) {
  if (feet < 100 || feet > 49000) return
  try {
    await simvarSet(`${feet} (>L:INI_ALTITUDE_DIAL)`)
    playSound("check.ogg")
  } catch (error) {
    console.error("Error setting altitude dial:", error)
  }
}
