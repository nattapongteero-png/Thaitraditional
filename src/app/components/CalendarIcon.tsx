import IconlyCurvedTwoToneCalendar from "../../imports/IconlyCurvedTwoToneCalendar";

/**
 * Drop-in replacement for lucide's <CalendarDays> / <CalendarClock> icon.
 * Accepts className with size + Tailwind text-color classes,
 * and uses currentColor so the stroke follows the inherited text color.
 *
 * Example: <CalendarIcon className="w-5 h-5 text-blue-600" />
 */
export function CalendarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneCalendar className="absolute inset-0" />
    </div>
  );
}
