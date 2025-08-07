import * as React from "react"

const FeedItem = () => {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-white p-4">
      <div className="h-12 w-12 rounded-full bg-gray-300"></div>
      <div>
        <p className="font-semibold">@박씨, 토마토 2개 수확 🍅🍅</p>
        <div className="flex gap-4">
          <button className="text-sm text-earth-gray">응원</button>
          <button className="text-sm text-earth-gray">댓글</button>
        </div>
      </div>
    </div>
  )
}

export { FeedItem }
