import IconlyCurvedTwoTone3User from "../../imports/IconlyCurvedTwoTone3User";

export function ThreeUserIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoTone3User className="absolute inset-0 w-full h-full" />
    </div>
  );
}
