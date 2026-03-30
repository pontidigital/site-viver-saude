export const dynamic = "force-dynamic";

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
