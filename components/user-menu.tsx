'use client'

//import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItem } from "./ui/dropdown-menu";
import { Utente } from "@/database/DB";
import { logoutUserAction } from "@/app/(user)/action";
import { useRouter } from "next/navigation";
//import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type UserMenuProps = {
    user: Partial<Utente>;
}


const UserMenu = ({user}: UserMenuProps) => {
  /*
  da usare se non si usa il comp. Avatar. si chiama l'api route 'get-avatar' che recupera il blob dell'immagine 
  e lo passa al FileReader che lo rende disponibile come file immagine 
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);

   useEffect(()=> {
    const fetchAvatar = async () => {
      try {
        const response = await fetch('/api/get-avatar');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setAvatarDataUrl(reader.result);
          }
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Errore durante il fetch dell\'avatar:', error);
      }
    };
    fetchAvatar();
  },[]) */
  
    

     

    const router = useRouter();

    

    


    const logout = async () => {
      const result = await logoutUserAction();
      if (result.success) {
        router.refresh();
      }
    };
    
//focus:ring-4 focus:ring-blueShop
    return (<div className="flex">
        <DropdownMenu>
            <DropdownMenuTrigger className=" select-none outline-none rounded-full data-[state=open]:ring-4 data-[state=open]:ring-blueShop">                
                {/* {avatarDataUrl && (
                    <Image 
                    src={avatarDataUrl}
                    alt="Avatar generato"
                    width={50}
                    height={50}
                    priority 
                    />
                )} */}
                <Avatar className="hover:ring-4 hover:ring-blueShop  ">
                  <AvatarImage src="https://thispersondoesnotexist.com" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuItem ><Link href={'/private/profilo'} >Profilo</Link></DropdownMenuItem>
                <DropdownMenuSeparator />                
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        </div>)
}


export default UserMenu;
