import AuthBanner from "@/app/(auth)/_components/AuthBanner";
import ResetPasswordForm from "@/app/(auth)/dat-lai-mat-khau/_components/ResetPasswordForm";

const WELCOME_TITLE = "Chào mừng trở lại!";
const WELCOME_TEXT =
  "Đăng nhập để truy cập và quản lý hệ thống tuyển dụng của ADA Group.";

type DatLaiMatKhauPageProps = {
  searchParams: Promise<{ email?: string; otp?: string }>;
};

export default async function DatLaiMatKhauPage({
  searchParams,
}: DatLaiMatKhauPageProps) {
  const { email, otp } = await searchParams;

  return (
    <div className="flex min-h-svh w-full flex-col bg-white lg:flex-row">
      <AuthBanner title={WELCOME_TITLE} description={WELCOME_TEXT} />

      <div className="flex w-full flex-col items-center justify-center p-8 sm:p-16 lg:w-1/2">
        <ResetPasswordForm email={email ?? ""} otp={otp ?? ""} />
      </div>
    </div>
  );
}
