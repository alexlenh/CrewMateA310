import { simvarSet } from "@/API/simvarApi"
import { playSound } from "@/services/playSounds"

export async function setAirspeedDial(knots: number) {
  if (knots < 50 || knots > 400) return
  try {
    await simvarSet(`${knots} (>L:INI_AIRSPEED_DIAL)`)
    playSound("check.ogg")
  } catch (error) {
    console.error("Error setting airspeed dial:", error)
  }
}
