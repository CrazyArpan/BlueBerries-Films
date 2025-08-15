export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#181f2a] min-h-screen">
      {children}
    </div>
  );
}

export const metadata = {
  title: "Admin - BlueBerries Films",
}; 