import IconlyCurvedTwoTonePaper from "../../imports/IconlyCurvedTwoTonePaper";

/**
 * Drop-in replacement for lucide's <FileText> icon.
 * Accepts className with size + Tailwind text-color classes,
 * and uses currentColor so the stroke follows the inherited text color.
 *
 * Example: <PaperIcon className="w-5 h-5 text-emerald-600" />
 */
export function PaperIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoTonePaper className="absolute inset-0" />
    </div>
  );
}
