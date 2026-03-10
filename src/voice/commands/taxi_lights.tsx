import { simvarSet } from "@/API/simvarApi"

export async function setTaxiLights(position: number) {
  try {
    const expression = `${position} (>L:INI_LIGHTS_NOSE)`
    await simvarSet(expression)
  } catch (error) {
    console.error("Error setting taxi lights:", error)
  }
}
