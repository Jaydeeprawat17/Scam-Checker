// Minimal, sophisticated card component
import * as React from "react"
import { cn } from "@/lib/utils"

interface MinimalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered"
}

const MinimalCard = React.forwardRef<HTMLDivElement, MinimalCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg transition-all duration-200",
          {
            "bg-white dark:bg-neutral-950 shadow-subtle hover:shadow-soft": variant === "default",
            "bg-white dark:bg-neutral-950 shadow-soft hover:shadow-medium": variant === "elevated",
            "bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800": variant === "bordered",
          },
          className,
        )}
        {...props}
      />
    )
  },
)
MinimalCard.displayName = "MinimalCard"

const MinimalCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pb-4", className)} {...props} />,
)
MinimalCardHeader.displayName = "MinimalCardHeader"

const MinimalCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("px-6 pb-6", className)} {...props} />,
)
MinimalCardContent.displayName = "MinimalCardContent"

const MinimalCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-medium text-neutral-900 dark:text-neutral-100", className)} {...props} />
  ),
)
MinimalCardTitle.displayName = "MinimalCardTitle"

export { MinimalCard, MinimalCardHeader, MinimalCardContent, MinimalCardTitle }
