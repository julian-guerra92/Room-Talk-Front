import MenuAppBar from "@/components/ui/MenuAppBar";


export default function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {
  return (
    <main className="min-h-screen">

      <MenuAppBar />
      {/* <Sidebar /> */}

      <div className="px-0 sm:px-10">
        { children }

      </div>

      {/* <Footer /> */}
    </main>
  );
}