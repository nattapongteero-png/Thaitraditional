import IconlyCurvedTwoToneVoice2 from "../../imports/IconlyCurvedTwoToneVoice2";

/**
 * Mic-ON icon (ไมค์เปิด) — ใช้ Figma Voice icon (อันที่อยู่ข้างหลัง)
 * รับ className พร้อม size + Tailwind text-color และส่ง currentColor ผ่าน --stroke-0
 *
 * Example: <MicIcon className="w-5 h-5 text-white" />
 */
export function MicIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <IconlyCurvedTwoToneVoice2 className="absolute inset-0" />
    </div>
  );
}