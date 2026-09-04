import Link from "next/link";
import Image from "next/image";

const SERVICE_LINKS = [
  { label: "Web & Web Application", href: "/dich-vu/web" },
  { label: "Mobile Application", href: "/dich-vu/mobile" },
  { label: "Hệ thống doanh nghiệp", href: "/dich-vu/he-thong-doanh-nghiep" },
  { label: "AI & Automation", href: "/dich-vu/ai-automation" },
];

const ABOUT_LINKS = [
  { label: "Câu chuyện thương hiệu", href: "/gioi-thieu" },
  { label: "Tuyển dụng", href: "/tuyen-dung" },
  { label: "Tin tức & Sự kiện", href: "/tin-tuc" },
];

const SUPPORT_LINKS = [
  { label: "Liên hệ hợp tác", href: "/lien-he" },
  { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
  { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
];

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465a2 2 0 0 1 2.53-.607l4.322 2.161a2 2 0 0 1 1.088 2.129l-.376 2.253a2 2 0 0 1-1.977 1.677A18 18 0 0 1 2.5 5.36a2 2 0 0 1 1.677-1.977l2.253-.376a2 2 0 0 1 2.129 1.088l2.161 4.322a2 2 0 0 1-.607 2.53l-.465.355a1 1 0 0 0-.303 1.213 12.035 12.035 0 0 0 4.487 4.053Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const CONTACT_ROWS = [
  {
    icon: MapPinIcon,
    content: (
      <span>
        Tầng 7 toà An Phú Building,
        <br />
        LK19A-19B, khu tái định cư Dương Nội, đường Lê Trọng Tấn, Phường Dương Nội,
        <br />
        TP Hà Nội, Việt Nam
      </span>
    ),
  },
  {
    icon: PhoneIcon,
    content: <span>(+84) 924 574 444</span>,
  },
  {
    icon: MailIcon,
    content: <span>contact@adagroup.vn</span>,
  },
  {
    icon: GlobeIcon,
    content: <span>www.adagroup.vn</span>,
  },
  {
    icon: ClockIcon,
    content: (
      <span>
        Thứ 2 – Thứ 6: 8:30 – 17:30
        <br />
        <span className="text-zinc-400">(Nghỉ thứ 7, Chủ nhật và ngày lễ)</span>
      </span>
    ),
  },
];

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-blue-700">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-(--section-padding) lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo/logo.png" alt="ADA Group Logo" width={40} height={40} className="h-8 sm:h-10 w-auto object-contain" />
              <span className="text-lg font-bold text-zinc-900">ADA Group</span>
            </Link>

            <div className="mt-(--inner-space) divide-y divide-zinc-200 rounded-xl border border-zinc-200 w-full overflow-hidden">
              {CONTACT_ROWS.map((row, index) => (
                <div key={index} className="flex items-start gap-3 p-3 w-full">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <row.icon />
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-zinc-600 mt-1 wrap-break-word flex-1">
                    {row.content}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-(--inner-space) sm:grid-cols-3 lg:col-span-3">
            <FooterLinkList
              title="Dịch vụ"
              links={SERVICE_LINKS}
            />

            <FooterLinkList
              title="Về ADA Group"
              links={ABOUT_LINKS}
            />

            <FooterLinkList
              title="Hỗ trợ"
              links={SUPPORT_LINKS}
            />
          </div>
        </div>

        <div className="mt-(--section-padding) flex flex-col items-center justify-between gap-(--inner-space) border-t border-zinc-200 pt-(--inner-space) sm:flex-row">
          <p className="text-sm text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} ADA Group. Redesign Vietnam Initiative. All
            rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white transition-colors hover:bg-zinc-700"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white transition-colors hover:bg-zinc-700"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
