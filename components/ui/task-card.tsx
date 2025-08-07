import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const taskCardVariants = cva(
  "rounded-lg bg-white text-card-foreground",
  {
    variants: {
      status: {
        default: "",
        waiting: "",
        growing: "",
        harvested: "",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
)

export interface TaskCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof taskCardVariants> {
  title: string;
  dueDate?: string;
  harvestedCount?: number;
}

const statusEmojis: Record<string, string> = {
  default: "🌱", // Seed
  waiting: "🍅", // Red tomato
  growing: "🌿", // Plant
  harvested: "🧺", // Basket
};

const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(
  ({ className, status, title, dueDate, harvestedCount, ...props }, ref) => {
    const emoji = status ? statusEmojis[status] : statusEmojis.default;
    const tomatoes = harvestedCount ? (
      <div className="flex gap-1 mb-1">
        {Array.from({ length: harvestedCount }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-tomato-red"></div>
        ))}
      </div>
    ) : null;

    return (
      <div
        className={cn(taskCardVariants({ status, className }), "flex items-center p-4")}
        ref={ref}
        {...props}
      >
        <div className="text-5xl mr-4">
          {emoji}
        </div>
        <div className="flex-grow">
          {tomatoes}
          <h3 className="text-lg font-semibold">{title}</h3>
          {dueDate && <p className="text-sm text-earth-gray">{dueDate}</p>}
        </div>
      </div>
    );
  }
);
TaskCard.displayName = "TaskCard"

export { TaskCard, taskCardVariants }
