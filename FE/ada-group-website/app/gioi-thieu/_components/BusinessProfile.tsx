import Image from "next/image";

const CONTENT = {
  title: "Thông tin doanh nghiệp",
};

const IMAGE = {
  src: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/thong-tin-doanh-nghiep.jpg",
  alt: "Văn phòng ADA Group",
};

const FIELDS = [
  {
    label: "Tên doanh nghiệp",
    value: "CÔNG TY CỔ PHẦN TẬP ĐOÀN CÔNG NGHỆ ADA GROUP",
  },
  {
    label: "Tên giao dịch",
    value: "ADA Group",
  },
  {
    label: "Mã số thuế",
    value: "0111531038",
  },
  {
    label: "Địa chỉ trụ sở",
    value:
      "Tầng 7, tòa An Phú Building, LK19A-19B, Khu tái định cư Dương Nội, Hà Đông, Hà Nội.",
  },
];

export default function BusinessProfile() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="lg:rounded-xl lg:border lg:border-[#C4C6D2] lg:bg-[#EFF6FF] lg:px-6 lg:py-7.5 lg:shadow-sm">
          <h2 className="border-b border-zinc-300/50 pb-2 text-[28px] font-semibold leading-[1.2] text-[#003384] lg:border-none lg:pb-0 lg:text-[44px] lg:leading-[1.1] lg:text-center">
            {CONTENT.title}
          </h2>

          <div className="mt-4 lg:mt-6 lg:flex lg:items-center lg:gap-10">
            <div className="relative hidden aspect-624/379 w-full max-w-156 shrink-0 overflow-hidden rounded-lg lg:block">
              <Image
                src={IMAGE.src}
                alt={IMAGE.alt}
                fill
                sizes="624px"
                className="object-cover"
              />
            </div>

            <dl className="flex flex-col gap-4 lg:flex-1 lg:items-end lg:gap-3">
              {FIELDS.map((field) => (
                <div key={field.label} className="w-full lg:max-w-141.5">
                  <dt className="text-base font-semibold tracking-wide text-gray-500 uppercase lg:font-medium lg:tracking-normal lg:normal-case">
                    {field.label}
                  </dt>
                  <dd className="mt-1 text-base leading-5 font-semibold text-zinc-900 lg:leading-6">
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
