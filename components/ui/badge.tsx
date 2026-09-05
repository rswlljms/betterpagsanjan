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
  // BP tag: paper fill / silver edge, graphite text, pill, 4px × 12px.
  neutral: "border-line bg-bp-paper text-bp-graphite",
  primary: "border-line bg-bp-info-banner-bg text-bp-graphite",
  accent: "border-accent-100 bg-accent-50 text-accent-800",
  success: "border-green-200 bg-green-50 text-green-800",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-50 text-red-800",
  outline: "border-line bg-white text-muted",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
