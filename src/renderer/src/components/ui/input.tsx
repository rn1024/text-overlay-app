import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-[#d1d5db] bg-[#ffffff] px-3 py-1 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#6b7280] focus:outline-none focus:ring-1 focus:ring-[#6b7280] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f9fafb] disabled:text-[#d1d5db]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
