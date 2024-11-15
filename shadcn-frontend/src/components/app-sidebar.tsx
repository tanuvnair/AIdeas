import * as React from "react";

import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";

export type User = {
    id: string;
    email: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuth();
    const [userData, setUserData] = useState({
        name: "User",
        email: "user@mail.com",
        avatar: "/avatars/shadcn.jpg",
    });

    useEffect(() => {
        setUserData({
            name: user ? user.email.split("@")[0] : "User",
            email: user ? user.email : "user@mail.com",
            avatar: "/avatars/shadcn.jpg",
        });
    }, [user]);

    return (
        <Sidebar {...props}>
            <SidebarHeader className="h-16 border-b border-sidebar-border">
                <NavUser user={userData} />
            </SidebarHeader>
            <SidebarContent>
                <DatePicker />
                <SidebarSeparator className="mx-0" />
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
