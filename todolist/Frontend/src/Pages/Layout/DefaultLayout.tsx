import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarApp from "@/components/ui/SidebarApp";
import TopNav from "@/components/ui/TopNav";
import { Outlet } from "react-router-dom";
function DefaultLayout() {
  return (
    <>
      <SidebarProvider>
        <SidebarApp />
        <main className=" w-full  m-5 flex flex-col gap-5   ">
          <TopNav sidebar={<SidebarTrigger></SidebarTrigger>} />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}

export default DefaultLayout;
