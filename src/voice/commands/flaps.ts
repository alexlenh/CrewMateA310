import { simvarSet } from "@/API/simvarApi"
import { playSound } from "@/services/playSounds"
import { useTelemetryStore } from "@/store/telemetryStore"

const flapSpeedLimits: Record<number, number> = {
  1: 245,
  2: 210,
  3: 195,
  4: 180
}

const keyEventMap: Record<number, string> = {
  0: "FLAPS_UP",
  1: "FLAPS_1",
  2: "FLAPS_2",
  3: "FLAPS_3",
  4: "FLAPS_DOWN"
}

const soundMap: Record<number, string> = {
  0: "slats_ret.ogg",
  1: "slats_ext.ogg",
  2: "flaps_15.ogg",
  3: "flaps_20.ogg",
  4: "flaps_40.ogg"
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export async function setFlaps(setting: number, skipAnnouncement = false) {
  try {
    const { telemetry } = useTelemetryStore.getState()
    const currentSpeed = telemetry?.ias ?? 0
    const isOnGround = telemetry?.onGround ?? 0

    const speedLimit = flapSpeedLimits[setting]

    if (speedLimit && currentSpeed > speedLimit) {
      playSound("check_speed.ogg")
      return
    }

    const keyEvent = keyEventMap[setting]
    if (!keyEvent) {
      return
    }

    const commandExpression = `(>K:${keyEvent})`

    if (!isOnGround) {
      if (!skipAnnouncement) {
        playSound("speed_checked.ogg")
        await delay(1000)
      }
      await simvarSet(commandExpression)

      await delay(1000)
      const sound = soundMap[setting]
      if (sound) playSound(sound)
    } else {
      await simvarSet(commandExpression)

      await delay(1000)
      const sound = soundMap[setting]
      if (sound) playSound(sound)
    }
  } catch (error) {
    console.error("[Flaps] Error setting flaps:", error)
  }
}
