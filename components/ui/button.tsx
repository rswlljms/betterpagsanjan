import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  // BP primary CTA: ink fill, white text, pill radius, 12px × 24px padding.
  primary:
    "border border-transparent bg-bp-ink text-white hover:bg-bp-graphite",
  // BP secondary ghost: paper/white fill, graphite text, 1px silver border.
  secondary:
    "border border-line bg-white text-bp-graphite hover:border-bp-stone hover:bg-bp-paper",
  // Safety exception: emergency actions keep red (never monochrome safety).
  danger: "border border-transparent bg-red-700 text-white hover:bg-red-800",
  ghost: "border border-transparent text-bp-graphite hover:bg-bp-paper",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 py-1.5 text-sm",
  md: "min-h-11 px-6 py-3 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & ButtonStyleOptions) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props} />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonStyleOptions) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props} />
  );
}
