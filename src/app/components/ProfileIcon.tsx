import IconlyCurvedTwoToneProfile from "../../imports/IconlyCurvedTwoToneProfile";

export function ProfileIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneProfile className="absolute inset-0" />
    </div>
  );
}
