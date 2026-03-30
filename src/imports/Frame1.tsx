import clsx from "clsx";
import svgPaths from "./svg-ao4lr8ugr2";
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("absolute left-[12px] rounded-[12px]", additionalClassNames)}>
      <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
        <p className="font-['Google_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#666] text-[12px]" style={{ fontVariationSettings: "'GRAD' 0" }}>
          {text}
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d4d4d4] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white overflow-clip relative rounded-[24px] size-full">
      <p className="absolute font-['Google_Sans:Bold',sans-serif] font-bold leading-[normal] left-[16px] text-[14px] text-black top-[16px]" style={{ fontVariationSettings: "'GRAD' 0" }}>
        การนัดหมาย
      </p>
      <div className="absolute bg-[#fafafa] h-[94px] left-[4px] overflow-clip rounded-[20px] top-[42px] w-[256px]">
        <div className="absolute bg-[#d4d4d4] content-stretch flex gap-[10px] items-center left-[179px] overflow-clip p-[8px] rounded-[12px] top-[51px] w-[65px]">
          <p className="font-['Google_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#666] text-[12px]" style={{ fontVariationSettings: "'GRAD' 0" }}>
            ต่อไป
          </p>
          <div className="flex h-[12.839px] items-center justify-center relative shrink-0 w-[8.038px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[8.038px] relative w-[12.839px]" data-name="arrow-down-sign-to-navigate">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8388 8.03819">
                  <g clipPath="url(#clip0_5_46)" id="arrow-down-sign-to-navigate">
                    <path d={svgPaths.peb33480} fill="var(--fill-0, #666666)" id="Path 1" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_46">
                      <rect fill="white" height="8.03819" width="12.8388" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Text text="เลือกวันที่" additionalClassNames="top-[12px]" />
        <div className="absolute left-[82px] rounded-[12px] top-[12px]">
          <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
            <p className="font-['Google_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#226a3b] text-[12px]" style={{ fontVariationSettings: "'GRAD' 0" }}>
              10:00 น.
            </p>
          </div>
          <div aria-hidden="true" className="absolute border border-[#226a3b] border-solid inset-0 pointer-events-none rounded-[12px]" />
        </div>
        <Text text="เลือกแพทย์" additionalClassNames="top-[51px]" />
      </div>
    </div>
  );
}