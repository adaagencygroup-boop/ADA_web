import Image from "next/image";
import Marquee from "@/app/_components/Marquee";

const CONTENT = {
  eyebrow: "HỆ SINH THÁI CÔNG NGHỆ",
  description:
    "Nền tảng công nghệ và công cụ phát triển phía sau hệ sinh thái AI của ADA Group.",
  mobileTitle: "Hệ sinh thái công nghệ của ADA Group",
};

const TOOLS = [
  { name: "Figma", logoSrc: "/images/tech-stack/figma.webp" },
  { name: "Storybook", logoSrc: "/images/tech-stack/storybook.png" },
  { name: "Adobe Stock", logoSrc: "/images/tech-stack/adobestock.png" },
  { name: "ChatGPT", logoSrc: "/images/tech-stack/chatgpt.png" },
  { name: "Cursor", logoSrc: "/images/tech-stack/cursor.png" },
  { name: "VS Code", logoSrc: "/images/tech-stack/vscode.png" },
  { name: "Jira", logoSrc: "/images/tech-stack/jira.png" },
  { name: "Next.js", logoSrc: "/images/tech-stack/nextjs.png" },
  { name: "React", logoSrc: "/images/tech-stack/react.png" },
  { name: "TypeScript", logoSrc: "/images/tech-stack/typescript.png" },
  { name: "Tailwind CSS", logoSrc: "/images/tech-stack/tailwindcss.png" },
  { name: "Docker", logoSrc: "/images/tech-stack/docker.png" },
  { name: "AWS", logoSrc: "/images/tech-stack/aws.png" },
  { name: "AWS CDK", logoSrc: "/images/tech-stack/awscdk.png" },
  { name: "GitLab", logoSrc: "/images/tech-stack/gitlab.png" },
  { name: "Confluence", logoSrc: "/images/tech-stack/confluence.png" },
  { name: "Mattermost", logoSrc: "/images/tech-stack/mattermost.png" },
  { name: "Playwright", logoSrc: "/images/tech-stack/playwright.png" },
  { name: "Vitest", logoSrc: "/images/tech-stack/vitest.png" },
  { name: "New Relic", logoSrc: "/images/tech-stack/newrelic.png" },
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
                  <span className="hidden sm:inline">{tool.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
