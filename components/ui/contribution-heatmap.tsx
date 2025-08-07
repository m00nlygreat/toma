import * as React from "react"

const ContributionHeatmap = () => {
  const data = Array.from({ length: 365 }, (_, i) => ({
    date: new Date(2024, 0, i + 1),
    count: Math.floor(Math.random() * 5),
  }))

  const levelClasses = [
    "bg-cream-white-surface",
    "bg-basil-green/20",
    "bg-basil-green/40",
    "bg-basil-green/60",
    "bg-basil-green",
  ]

  return (
    <div className="flex flex-wrap gap-1">
      {data.map((day, i) => (
        <div
          key={i}
          className={`h-4 w-4 rounded-sm ${levelClasses[day.count]}`}
          title={`${day.date.toDateString()} - ${day.count} harvested`}
        ></div>
      ))}
    </div>
  )
}

export { ContributionHeatmap }
