import { MenuAppBar, Sidebar } from "@/components/ui";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">

      <MenuAppBar />
      <Sidebar />

      <div className="flex justify-center mt-5">
            <div className="px-10 sm:w-[600px]">
               {children}
            </div>
      </div>

      {/* <Footer /> */}
    </main>
  );
}