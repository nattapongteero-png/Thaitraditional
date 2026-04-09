import { basePath } from "../app/lib/basePath";

export default function Container() {
  return (
    <div className="bg-[#d0fae5] overflow-clip relative rounded-[14px] size-full" data-name="Container">
      <div className="absolute h-[56px] left-[-14px] top-0 w-[68px]" data-name="Gemini_Generated_Image_mo4gtjmo4gtjmo4g 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={`${basePath}/images/doctor-female.png`} />
      </div>
    </div>
  );
}
