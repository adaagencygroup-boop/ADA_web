import AuthBanner from "@/app/(auth)/_components/AuthBanner";
import OtpForm from "@/src/components/shared/OtpForm";

const WELCOME_TITLE = "Chào mừng trở lại!";
const WELCOME_TEXT =
  "Đăng nhập để truy cập và quản lý hệ thống tuyển dụng của ADA Group.";

type XacThucEmailPageProps = {
  searchParams: Promise<{ email?: string; next?: string; back?: string }>;
};

export default async function XacThucEmailPage({
  searchParams,
}: XacThucEmailPageProps) {
  const { email, next, back } = await searchParams;

  return (
    <div className="flex min-h-svh w-full flex-col bg-white lg:flex-row">
      <AuthBanner title={WELCOME_TITLE} description={WELCOME_TEXT} />

      <div className="flex w-full flex-col items-center justify-center p-8 sm:p-16 lg:w-1/2">
        <OtpForm
          email={email ?? "admin@adagroup.vn"}
          nextHref={next ?? "/"}
          backHref={back ?? "/dang-nhap"}
        />
      </div>
    </div>
  );
}
