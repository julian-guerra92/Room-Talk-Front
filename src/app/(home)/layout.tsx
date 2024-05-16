import { MenuAppBar, Sidebar } from "@/components/ui";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <MenuAppBar />
      <Sidebar />
      <div style={{ padding: '20px 30px' }}>
        {children}
      </div>
      {/* <Footer /> */}
    </main>
  );
}