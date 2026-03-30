import TabletCapsuleHealthMedicalHospitalMedicineCapsuleTablet from "../../imports/TabletCapsuleHealthMedicalHospitalMedicineCapsuleTablet";

export function PillIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ "--stroke-0": "currentColor" } as React.CSSProperties}
    >
      <TabletCapsuleHealthMedicalHospitalMedicineCapsuleTablet />
    </div>
  );
}
