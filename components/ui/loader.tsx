import { cn } from "@/lib/utils";

type LoaderOneProps = {
  className?: string;
};

/**
 * LoaderOne — three bouncing dots in the BetterPagsanjan logo blue (#0032a0).
 *
 * Visual equivalent of the Aceternity "Simple Loader" pattern, re-implemented
 * with pure CSS (`bp-loader-one-dot` in `app/globals.css`) so no animation
 * library is required. Dots are decorative; the parent loading surface must
 * expose the accessible announcement (e.g. `role="status"` + offscreen text).
 */
export function LoaderOne({ className }: LoaderOneProps) {
  return (
    <div aria-hidden className={cn("flex items-center gap-2", className)}>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="bp-loader-one-dot h-4 w-4 rounded-full border border-[#00257a] bg-gradient-to-b from-[#0032a0] to-[#5b7cc2]"
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </div>
  );
}
