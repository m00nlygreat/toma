import * as React from "react"

const PomodoroTimer = () => {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-cream-white-surface">
      <div className="absolute inset-0 rounded-full border-8 border-basil-green"></div>
      <div className="z-10 text-4xl font-bold text-soil-black">25:00</div>
    </div>
  )
}

export { PomodoroTimer }
