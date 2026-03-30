import CocoDuotoneCameraSlash from "../../imports/CocoDuotoneCameraSlash";

export function CameraOffIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor", "--fill-0": "currentColor" } as React.CSSProperties}
    >
      <CocoDuotoneCameraSlash className="absolute inset-0" />
    </div>
  );
}