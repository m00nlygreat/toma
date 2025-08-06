import * as React from "react"

const ContributionHeatmap = () => {
  const data = Array.from({ length: 365 }, (_, i) => ({
    date: new Date(2024, 0, i + 1),
    count: Math.floor(Math.random() * 5),
  }))

  return (
    <div className="flex flex-wrap gap-1">
      {data.map((day, i) => (
        <div
          key={i}
          className={`h-4 w-4 rounded-sm ${day.count > 0 ? `bg-basil-green/${day.count * 20}` : "bg-gray-200"}`}
          title={`${day.date.toDateString()} - ${day.count} harvested`}
        ></div>
      ))}
    </div>
  )
}

export { ContributionHeatmap }
