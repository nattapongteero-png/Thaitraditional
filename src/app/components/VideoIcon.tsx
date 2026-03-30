import IconlyCurvedTwoToneVideo from "../../imports/IconlyCurvedTwoToneVideo";

/**
 * Drop-in replacement for lucide's <Video> icon.
 * Accepts className with size + Tailwind text-color classes,
 * and uses currentColor so the stroke follows the inherited text color.
 *
 * Example: <VideoIcon className="w-5 h-5 text-emerald-700" />
 */
export function VideoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneVideo className="absolute inset-0" />
    </div>
  );
}
