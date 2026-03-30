import IconlyCurvedTwoToneDangerTriangle from "../../imports/IconlyCurvedTwoToneDangerTriangle";

export function DangerTriangleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneDangerTriangle className="absolute inset-0 w-full h-full" />
    </div>
  );
}
