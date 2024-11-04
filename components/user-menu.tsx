'use client'

import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItem } from "./ui/dropdown-menu";
import { Utente } from "@/database/DB";
import { logoutUserAction } from "@/app/(user)/action";
import { useRouter } from "next/navigation";

type UserMenuProps = {
    user: Partial<Utente>;
}


const UserMenu = ({user}: UserMenuProps) => {

    const router = useRouter();

    const logout = async () => {
      const result = await logoutUserAction();
      if (result.success) {
        router.refresh();
      }
    };
    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image alt='avatar' src='/avatar.jpg' width={48} height={48} className="rounded-full"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuItem >Profilo</DropdownMenuItem>
                <DropdownMenuSeparator />                
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}


export default UserMenu;
