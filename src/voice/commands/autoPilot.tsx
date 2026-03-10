import { simvarSet } from "@/API/simvarApi"

export async function setAutoPilot(position: number) {
  try {
    const expression = `${position} (>L:INI_AP1_BUTTON)`
    await simvarSet(expression)
  } catch (error) {
    console.error("Error setting autopilot (LVAR):", error)
  }
}
