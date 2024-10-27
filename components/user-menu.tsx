import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItem } from "./ui/dropdown-menu";
import { Utente } from "@/database/DB";

type UserMenuProps = {
    user: Utente;
}


const UserMenu = ({user}: UserMenuProps) => {
    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image alt='avatar' src='/avatar.jpg' width={48} height={48} className="rounded-full"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel></DropdownMenuLabel>
                <DropdownMenuSeparator />                
                <DropdownMenuItem >Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}


export default UserMenu;
