import { simvarSet } from "@/API/simvarApi"

export async function setStrobeLights(position: number) {
  try {
    const expression = `${position} (>L:INI_LIGHTS_STROBE)`
    await simvarSet(expression)
  } catch (error) {
    console.error("Error setting strobe lights:", error)
  }
}
