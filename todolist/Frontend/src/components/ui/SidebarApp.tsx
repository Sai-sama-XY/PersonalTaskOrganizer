import { Calendar, Cog, DatabaseIcon, Edit2Icon, Home,LogOut } from "lucide-react";
import {
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "/Users/sanch/OneDrive/Desktop/Laravel React Projects/todolist/Frontend/src/components/ui/sidebar";
import { Link, Navigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

function SidebarApp() {
    const items = [
        {
            title: "Home",
            url: "/homepage",
            icon: <Home />,
        },
        {
            title: "Task Management",
            url: "/taskmanagement",
            icon: <Edit2Icon/>,
        },
        {
            title: "Task Scheduler",
            url: "/taskscheduler",
            icon: <Calendar />,
        },
        {
            title: "Task Statistics",
            url: "/taskstatistics",
            icon: <DatabaseIcon/>,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: <Cog />,
        },
        {
            title: "Logout",
            url: "/logout",
            icon: <LogOut/>,
        },
    ];

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                      <div className="flex justify-between">
                      <SidebarGroupLabel>TODO LIST</SidebarGroupLabel>
                      <ModeToggle/>
                      </div>
                        <SidebarGroupContent>
                            <SidebarMenu className="flex gap-5 mt-5">
                                {items.map((item) => (
                                    <SidebarMenuItem
                                        key={item.title}
                                        className="h-full"
                                    >
                                        <SidebarMenuButton
                                            asChild
                                            className="h-10"
                                            onClick={() => {
                                                if (item.title === "Logout") {
                                                  localStorage.removeItem("token");
                                                  localStorage.removeItem("user");
                                                  <Navigate to="/"/>; 
                                                }}}
                                        >
                                            <Link
                                                to={item.url}
                                                className="flex items-center "
                                            >
                                                <div>{item.icon}</div>
                                                <span className="text-lg">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            </SidebarHeader>
        </Sidebar>
    );
}

export default SidebarApp;
