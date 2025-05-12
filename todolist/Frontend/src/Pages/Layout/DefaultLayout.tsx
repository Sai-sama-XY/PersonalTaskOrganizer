import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarApp from "@/components/ui/SidebarApp";
import { Outlet } from "react-router-dom";
function DefaultLayout() {
    return (
        <>
            <SidebarProvider>
                <SidebarApp />
                <SidebarTrigger />
                <main className=" w-full  m-5">
                    <Outlet />
                </main>
            </SidebarProvider>
        </>
    );
}

export default DefaultLayout;
