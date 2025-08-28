// Advanced Loading Component - Senior UI Engineer approach
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva("animate-spin rounded-full border-solid border-current border-r-transparent", {
  variants: {
    size: {
      sm: "h-4 w-4 border-2",
      md: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-3",
      xl: "h-12 w-12 border-4",
    },
    variant: {
      default: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
})

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, variant, label = "Loading...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center justify-center", className)}
        role="status"
        aria-label={label}
        {...props}
      >
        <div className={cn(spinnerVariants({ size, variant }))} />
        <span className="sr-only">{label}</span>
      </div>
    )
  },
)
LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner, spinnerVariants }
