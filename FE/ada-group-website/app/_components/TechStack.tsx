import Image from "next/image";
import Marquee from "@/app/_components/Marquee";

const CONTENT = {
  eyebrow: "HỆ SINH THÁI CÔNG NGHỆ",
  description:
    "Nền tảng công nghệ và công cụ phát triển phía sau hệ sinh thái AI của ADA Group.",
  mobileTitle: "Hệ sinh thái công nghệ của ADA Group",
};

const TOOLS = [
  { name: "Figma", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_figma.webp" },
  { name: "Storybook", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_storybook.webp" },
  { name: "Adobe Stock", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_adobestock.webp" },
  { name: "ChatGPT", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_chatgpt.webp" },
  { name: "Cursor", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_cursor.webp" },
  { name: "VS Code", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_vscode.webp" },
  { name: "Jira", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_jira.webp" },
  { name: "Next.js", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_next.webp" },
  { name: "React", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_react.webp" },
  { name: "TypeScript", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_typescript.webp" },
  { name: "Tailwind CSS", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_tailwind.webp" },
  { name: "Docker", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_docker.webp" },
  { name: "AWS", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_aws.webp" },
  { name: "AWS CDK", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_awscdk.webp" },
  { name: "GitLab", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_gitlab.webp" },
  { name: "Confluence", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_confluence.webp" },
  { name: "Mattermost", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_mattermost.webp" },
  { name: "Playwright", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_playwright.webp" },
  { name: "Vitest", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_vitest.webp" },
  { name: "New Relic", logoSrc: "https://adagroup.com.vn/cdn/images/innovation/technology/icon_newrelic.webp" },
];

export default function TechStack() {
  return (
    <section className="section-y bg-[#EFF6FF] sm:bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="sm:rounded-2xl sm:border sm:border-zinc-200 sm:bg-white sm:p-10">
          <p className="text-lg font-semibold text-zinc-900 sm:hidden">
            {CONTENT.mobileTitle}
          </p>

          <div className="sm:flex sm:items-center sm:gap-16">
            <div className="hidden sm:block sm:w-64 sm:shrink-0">
              <span className="text-xs font-semibold tracking-wide text-blue-700">
                {CONTENT.eyebrow}
              </span>
              <p className="mt-(--heading-space) text-lg font-semibold text-zinc-900 sm:text-xl">
                {CONTENT.description}
              </p>
            </div>

            <Marquee
              className="mt-(--inner-space) sm:mt-0 sm:min-w-0 sm:flex-1"
              durationSeconds={35}
            >
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="flex shrink-0 flex-col md:px-4 items-center text-sm font-medium text-zinc-600"
                >
                  <Image
                    src={tool.logoSrc}
                    alt={tool.name}
                    width={200}
                    height={100}
                    className="w-26 object-contain"
                  />
                  <span className="">{tool.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
