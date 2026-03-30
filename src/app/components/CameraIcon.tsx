import CocoDuotoneCamera from "../../imports/CocoDuotoneCamera";

export function CameraIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor", "--fill-0": "currentColor" } as React.CSSProperties}
    >
      <CocoDuotoneCamera className="absolute inset-0" />
    </div>
  );
}
