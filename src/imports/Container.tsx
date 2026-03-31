import clsx from "clsx";
import svgPaths from "./svg-scdlhjs9vd";
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("size-[14px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        {children}
      </svg>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("flex-[1_0_0] min-h-px min-w-px relative", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type SpanTextProps = {
  text: string;
};

function SpanText({ text }: SpanTextProps) {
  return (
    <Wrapper additionalClassNames="h-[20px]">
      <p className="absolute font-['Google_Sans_Text:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-0 whitespace-nowrap">{text}</p>
    </Wrapper>
  );
}

export default function Container() {
  return (
    <div className="bg-white overflow-clip relative rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-full" data-name="Container">
      <div className="absolute bg-gradient-to-r from-[#d7e9db] h-[146px] left-[6.5px] rounded-[20px] to-[#97d999] top-[6px] w-[658px]" data-name="Container">
        <div className="absolute bg-[rgba(0,0,0,0.05)] h-[24px] left-[16px] rounded-[16777200px] top-[17.5px] w-[73.297px]" data-name="span">
          <p className="absolute font-['Google_Sans_Text:Medium',sans-serif] leading-[16px] left-[12px] not-italic text-[12px] text-black top-[4.5px] whitespace-nowrap">ยืนยันแล้ว</p>
        </div>
        <div className="absolute content-stretch flex h-[22.5px] items-start left-[16px] top-[53.5px] w-[656px]" data-name="p">
          <p className="flex-[1_0_0] font-['Google_Sans_Text:Bold',sans-serif] leading-[22.5px] min-h-px min-w-px not-italic relative text-[#101828] text-[18px]">นพ. สมชาย แพทย์ไทย</p>
        </div>
        <div className="absolute h-[20px] left-[16px] top-[80px] w-[656px]" data-name="p">
          <p className="absolute font-['Google_Sans_Text:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-0 whitespace-nowrap">แพทย์แผนไทยประยุกต์</p>
        </div>
        <div className="absolute h-[20px] left-[16px] top-[112px] w-[656px]" data-name="Container">
          <div className="absolute content-stretch flex gap-[6px] h-[20px] items-center left-0 top-0 w-[111.281px]" data-name="Container">
            <Wrapper1 additionalClassNames="relative shrink-0">
              <g id="CalendarDays">
                <path d="M4.66667 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M9.33333 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p24a2b500} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M1.75 5.83333H12.25" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M4.66667 8.16667H4.6725" id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M7 8.16667H7.00583" id="Vector_6" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M9.33333 8.16667H9.33917" id="Vector_7" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M4.66667 10.5H4.6725" id="Vector_8" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M7 10.5H7.00583" id="Vector_9" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M9.33333 10.5H9.33917" id="Vector_10" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
            </Wrapper1>
            <SpanText text="15 มีนาคม 2569" />
          </div>
          <div className="absolute h-[20px] left-[123.28px] top-0 w-[5.703px]" data-name="span">
            <p className="absolute font-['Google_Sans_Text:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-0 whitespace-nowrap">•</p>
          </div>
          <div className="absolute content-stretch flex gap-[6px] h-[20px] items-center left-[140.98px] top-0 w-[73.438px]" data-name="Container">
            <Wrapper1 additionalClassNames="relative shrink-0">
              <g clipPath="url(#clip0_11_453)" id="Clock">
                <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M7 3.5V7L9.33333 8.16667" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
              <defs>
                <clipPath id="clip0_11_453">
                  <rect fill="white" height="14" width="14" />
                </clipPath>
              </defs>
            </Wrapper1>
            <SpanText text="10:00 น." />
          </div>
          <div className="absolute content-stretch flex gap-[6px] h-[20px] items-center left-[226.42px] top-0 w-[139.883px]" data-name="Container">
            <Wrapper1 additionalClassNames="relative shrink-0">
              <g id="Video">
                <path d={svgPaths.p16485200} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p2e981000} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
            </Wrapper1>
            <SpanText text="Video Consultation" />
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex h-[64px] items-center justify-between left-[0.5px] px-[16px] top-[152px] w-[672px]" data-name="Container">
        <div className="h-[20px] relative shrink-0 w-[114.406px]" data-name="p">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <p className="absolute font-['Google_Sans:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#6a7282] text-[0px] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: "'GRAD' 0" }}>
              <span className="font-['Google_Sans_Text:Regular',sans-serif] leading-[20px]">{`นัดหมาย: `}</span>
              <span className="font-['Google_Sans_Text:Semi_Bold',sans-serif] leading-[20px] text-[#1e2939]">15 มีนาคม</span>
            </p>
          </div>
        </div>
        <div className="h-[36px] relative shrink-0 w-[98.93px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
            <Wrapper additionalClassNames="bg-[#096] h-[36px] rounded-[14px]">
              <Wrapper1 additionalClassNames="absolute left-[16px] top-[11px]">
                <g id="RefreshCw">
                  <path d={svgPaths.p3fb08a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M12.25 1.75V4.66667H9.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p32253d00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M4.66667 9.33333H1.75V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </g>
              </Wrapper1>
              <p className="-translate-x-1/2 absolute font-['Google_Sans_Text:Medium',sans-serif] leading-[20px] left-[59.5px] not-italic text-[14px] text-center text-white top-[8px] whitespace-nowrap">เลื่อนนัด</p>
            </Wrapper>
          </div>
        </div>
      </div>
      <div className="absolute h-[144px] left-[544px] top-0 w-[128px]" data-name="Container" />
    </div>
  );
}