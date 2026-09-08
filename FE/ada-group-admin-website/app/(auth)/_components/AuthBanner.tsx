import Image from "next/image";

export default function AuthBanner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative hidden overflow-hidden bg-linear-to-br from-[#001A40]/90 via-[#001E4B]/80 to-[#0B1220]/90 p-12 lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
      <Image
        src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/auth-banner.jpg"
        alt=""
        fill
        className="object-cover opacity-40"
      />

      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-3">
          <div className="relative size-8 shrink-0">
            <Image
              src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/logo.webp"
              alt="ADA Group"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold text-white">ADA Group</span>
            <span className="text-sm text-[#BFDBFE]">Management Portal</span>
          </div>
        </div>

        <div className="flex max-w-80 flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-4xl font-semibold text-white">{title}</h1>
            <span className="h-1 w-12 rounded-full bg-[#3B82F6]" />
          </div>
          <p className="text-base leading-relaxed text-[#DBEAFE]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
