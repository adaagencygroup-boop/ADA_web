export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[#F8F9FB] p-6">
      {children}
    </div>
  );
}
