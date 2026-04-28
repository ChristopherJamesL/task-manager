export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      {children}
    </div>
  );
}
