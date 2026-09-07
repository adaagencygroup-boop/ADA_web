import Image from "next/image";
import { BuildingIcon, HandshakeIcon, FileTextIcon, MapPinIcon } from "./icons";

const CONTENT = {
  title: "Thông tin doanh nghiệp",
  subtitle: "Những thông tin cơ bản về ADA Group",
};

const IMAGE = {
  src: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/gioi-thieu/BusinessProfile.png",
  alt: "Thông tin doanh nghiệp ADA Group",
};

const FIELDS = [
  {
    Icon: BuildingIcon,
    label: "Tên doanh nghiệp",
    value: "CÔNG TY CỔ PHẦN TẬP ĐOÀN CÔNG NGHỆ ADA GROUP",
  },
  {
    Icon: HandshakeIcon,
    label: "Tên giao dịch",
    value: "ADA Group",
  },
  {
    Icon: FileTextIcon,
    label: "Mã số thuế",
    value: "0111531038",
  },
  {
    Icon: MapPinIcon,
    label: "Trụ sở chính",
    value:
      "Tầng 7, tòa An Phú Building, LK19A-19B, Khu tái định cư Dương Nội, Hà Đông, Hà Nội.",
  },
];

export default function BusinessProfile() {
  return (
    <section className="section-y bg-[#F9FAFB] lg:bg-transparent">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="lg:rounded-xl lg:border lg:border-[#C4C6D2] lg:bg-[#EFF6FF] lg:px-6 lg:py-7.5 lg:shadow-sm">
          <div className="mb-6 lg:mb-0 lg:border-none lg:pb-0">
            <h2 className="text-[28px] font-semibold leading-[1.2] text-[#000000] lg:text-[44px] lg:leading-[1.1] lg:text-center">
              {CONTENT.title}
            </h2>
            <div className="mt-2 h-1 w-12 bg-[#003384] lg:hidden"></div>
            <p className="mt-3 text-[14px] text-gray-500 lg:hidden">
              {CONTENT.subtitle}
            </p>
          </div>

          <div className="mt-4 lg:mt-6 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="relative hidden aspect-624/379 w-full max-w-156 shrink-0 overflow-hidden rounded-lg lg:block">
              <Image
                src={IMAGE.src}
                alt={IMAGE.alt}
                fill
                sizes="624px"
                className="object-cover"
              />
            </div>

            {/* Desktop and Mobile Fields */}
            <div className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.06)] lg:flex-1 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none lg:pl-10">
              <dl className="flex flex-col">
                {FIELDS.map((field, idx) => (
                  <div 
                    key={field.label} 
                    className={`flex items-start gap-4 py-4 lg:py-3 ${idx !== FIELDS.length - 1 ? 'border-b border-gray-100 lg:border-none' : ''}`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F4FF] text-[#003384] lg:hidden">
                      <field.Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 lg:w-full lg:max-w-none lg:text-left">
                      <dt className="text-[13px] font-medium text-gray-500 lg:text-base lg:font-semibold lg:tracking-wide lg:uppercase">
                        {field.label}
                      </dt>
                      <dd className="mt-1 text-[14px] leading-snug font-semibold text-zinc-900 lg:text-base lg:leading-6">
                        {field.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
