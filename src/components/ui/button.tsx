import * as React from "react"
import { cn } from "../../lib/utils"

const buttonVariants = {
  variant: {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
    link: "text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300",
  },
  size: {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-12 px-6 py-3 text-base",
    icon: "h-10 w-10 p-0",
  },
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
