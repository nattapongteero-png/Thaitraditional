import IconlyCurvedTwoToneCallSilent from "../../imports/IconlyCurvedTwoToneCallSilent";

export function CallSilentIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneCallSilent className="absolute inset-0" />
    </div>
  );
}
