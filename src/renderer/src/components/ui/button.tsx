import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#111827] text-[#ffffff] hover:bg-[#374151] focus:ring-[#6b7280]",
        destructive: "bg-[#ef4444] text-[#ffffff] hover:bg-[#dc2626] focus:ring-[#ef4444]",
        outline: "border border-[#d1d5db] bg-[#ffffff] text-[#374151] hover:bg-[#f9fafb] hover:border-[#9ca3af] focus:ring-[#6b7280]",
        secondary: "bg-[#f3f4f6] text-[#111827] hover:bg-[#e5e7eb] focus:ring-[#6b7280]",
        ghost: "text-[#111827] hover:bg-[#f3f4f6] focus:ring-[#6b7280]",
        link: "text-[#111827] underline-offset-4 hover:underline focus:ring-[#6b7280]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
