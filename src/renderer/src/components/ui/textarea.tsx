import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-[#d1d5db] bg-[#ffffff] px-3 py-2 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#6b7280] focus:outline-none focus:ring-1 focus:ring-[#6b7280] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f9fafb] disabled:text-[#d1d5db] resize-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
