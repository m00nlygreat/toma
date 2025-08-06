import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const taskCardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      status: {
        default: "border-gray-200",
        waiting: "border-tomato-red",
        growing: "border-basil-green",
        harvested: "border-carrot-orange",
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
}

const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(
  ({ className, status, title, dueDate, ...props }, ref) => {
    return (
      <div
        className={cn(taskCardVariants({ status, className }))}
        ref={ref}
        {...props}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold">{title}</h3>
          {dueDate && <p className="text-sm text-earth-gray">{dueDate}</p>}
        </div>
      </div>
    )
  }
)
TaskCard.displayName = "TaskCard"

export { TaskCard, taskCardVariants }
