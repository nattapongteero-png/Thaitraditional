import IconlyCurvedTwoToneCategory from "../../imports/IconlyCurvedTwoToneCategory";

/**
 * Drop-in replacement for lucide's <LayoutDashboard> icon.
 * Accepts className with size + Tailwind text-color classes,
 * and uses currentColor so the stroke follows the inherited text color.
 *
 * Example: <CategoryIcon className="w-5 h-5 text-emerald-600" />
 */
export function CategoryIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneCategory className="absolute inset-0" />
    </div>
  );
}
