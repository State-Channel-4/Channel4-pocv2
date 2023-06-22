import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
    inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    group disabled:pointer-events-none disabled:bg-c4-gradient-blue disabled:border-none

    ring-offset-background
  `,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground bg-transparent text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <>
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <div className="group-disabled:hidden">{props.children}</div>
          <svg
            className="invisible group-disabled:visible"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 200 200"
            fill="none"
            color="white"
          >
            <defs>
              <linearGradient id="spinner-secondHalf">
                <stop offset="0%" stopOpacity="0" stop-color="currentColor" />
                <stop
                  offset="100%"
                  stopOpacity="0.5"
                  stop-color="currentColor"
                />
              </linearGradient>
              <linearGradient id="spinner-firstHalf">
                <stop offset="0%" stopOpacity="1" stop-color="currentColor" />
                <stop
                  offset="100%"
                  stopOpacity="0.5"
                  stop-color="currentColor"
                />
              </linearGradient>
            </defs>
            <g stroke-width="14">
              <path
                stroke="url(#spinner-secondHalf)"
                d="M 4 100 A 96 96 0 0 1 196 100"
              />
              <path
                stroke="url(#spinner-firstHalf)"
                d="M 196 100 A 96 96 0 0 1 4 100"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                d="M 4 100 A 96 96 0 0 1 4 98"
              />
            </g>
            <animateTransform
              from="0 0 0"
              to="360 0 0"
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1300ms"
            />
          </svg>
        </button>
      </>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

