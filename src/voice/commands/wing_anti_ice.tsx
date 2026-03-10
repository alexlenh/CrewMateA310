import { simvarSet } from "@/API/simvarApi"

export async function setWingAntiIce(position: number) {
  try {
    const expression = `${position} (>L:INI_WING_ANTI_ICE1_STATE)`
    await simvarSet(expression)
  } catch (error) {
    console.error("Error setting wing anti ice:", error)
  }
}
