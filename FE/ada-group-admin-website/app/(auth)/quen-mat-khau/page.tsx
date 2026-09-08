import AuthBanner from "@/app/(auth)/_components/AuthBanner";
import ForgotPasswordForm from "@/app/(auth)/quen-mat-khau/_components/ForgotPasswordForm";

const BANNER_TITLE = "Khôi phục mật khẩu";
const BANNER_TEXT =
  "Đừng lo, chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào hệ thống quản trị ADA Group.";

export default function QuenMatKhauPage() {
  return (
    <div className="flex min-h-svh w-full flex-col bg-[#FCF9F8] lg:flex-row">
      <AuthBanner title={BANNER_TITLE} description={BANNER_TEXT} />

      <div className="relative flex w-full flex-col items-center justify-center bg-[#FCF9F8] p-8 sm:p-12 lg:w-1/2">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
