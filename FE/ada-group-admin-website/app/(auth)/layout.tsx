import GuestOnly from "@/src/components/auth/GuestOnly";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestOnly>
      <div className="min-h-svh">{children}</div>
    </GuestOnly>
  );
}
