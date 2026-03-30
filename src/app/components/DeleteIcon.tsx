import IconlyCurvedTwoToneDelete from "../../imports/IconlyCurvedTwoToneDelete";

export function DeleteIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneDelete className="absolute inset-0 w-full h-full" />
    </div>
  );
}
