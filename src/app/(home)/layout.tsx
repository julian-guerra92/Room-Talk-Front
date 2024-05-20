import { MenuAppBar, Sidebar } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Room Talk",
    default: "Home | Room Talk",
  },
  description: "Salas de chat para aprender y compartir conocimientos.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <MenuAppBar />
      <Sidebar />
      <div style={{padding: '2px'}}>
        {children}
      </div>
      {/* <Footer /> */}
    </main>
  );
}