import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  primary: "border-primary-200 bg-primary-50 text-primary-800",
  accent: "border-accent-100 bg-accent-50 text-accent-800",
  success: "border-green-200 bg-green-50 text-green-800",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-50 text-red-800",
  outline: "border-line bg-white text-slate-600",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
