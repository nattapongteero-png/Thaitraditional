import IconlyCurvedTwoToneVoice from "../../imports/IconlyCurvedTwoToneVoice";

/**
 * Mic-OFF icon (ไมค์ปิด) — ใช้ Figma Voice2 icon (อันที่อยู่ข้างหน้า)
 * รับ className พร้อม size + Tailwind text-color และส่ง currentColor ผ่าน --stroke-0
 *
 * Example: <MicOffIcon className="w-5 h-5 text-white" />
 */
export function MicOffIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneVoice className="absolute inset-0" />
    </div>
  );
}