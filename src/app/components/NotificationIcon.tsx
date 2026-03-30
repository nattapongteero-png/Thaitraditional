import IconlyCurvedTwoToneNotification from "../../imports/IconlyCurvedTwoToneNotification-16-440";

export function NotificationIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneNotification className="absolute inset-0" />
    </div>
  );
}
