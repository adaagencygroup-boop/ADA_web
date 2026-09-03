import AuthBanner from "@/app/(auth)/_components/AuthBanner";

const BANNER_TITLE = "Khôi phục mật khẩu";
const BANNER_TEXT =
  "Đừng lo, chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào hệ thống quản trị ADA Group.";

export default function DatLaiMatKhauPage() {
  return (
    <div className="flex min-h-svh w-full flex-col bg-[#FCF9F8] lg:flex-row">
      <AuthBanner title={BANNER_TITLE} description={BANNER_TEXT} />

      <div className="flex w-full flex-col items-center justify-center gap-2 p-8 text-center sm:p-12 lg:w-1/2">
        <h1 className="text-2xl font-semibold text-[#1C1B1B]">
          Đặt lại mật khẩu
        </h1>
        <p className="text-[#434750]">Nội dung đang được xây dựng.</p>
      </div>
    </div>
  );
}
