import svgPaths from "./svg-dteejjs4fi";

export default function CocoDuotoneCamera({ className }: { className?: string }) {
  return (
    <div className={className || "relative"} data-name="COCO/Duotone/Camera">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-4.17%]">
          <svg className="block size-full" overflow="visible" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
            <path d={svgPaths.p2e5b2880} fill="var(--fill-0, #363853)" fillOpacity="0.15" id="Vector" stroke="var(--stroke-0, #363853)" strokeLinejoin="round" strokeWidth="1.75" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[43.75%_39.58%_35.42%_39.58%]" data-name="Vector">
        <div className="absolute inset-[-15%]">
          <svg className="block size-full" overflow="visible" fill="none" preserveAspectRatio="none" viewBox="0 0 6.5 6.5">
            <path d={svgPaths.p33c27380} id="Vector" stroke="var(--stroke-0, #363853)" strokeWidth="1.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}