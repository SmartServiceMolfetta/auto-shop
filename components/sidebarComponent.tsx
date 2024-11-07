 
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
  } from "@/components/ui/sidebar"
import { FaPowerOff } from "react-icons/fa"
import { SalesCar, SoldCar, Statistiche } from "./icone_mie"


  const items = [
    {
      title: "Veicoli in Vendita",
      url: "#",
      icon: SoldCar,
    },
    {
      title: "Veicoli Venduti",
      url: "#",
      icon: SalesCar,
    },
    {
      title: "Statistiche",
      url: "#",
      icon: Statistiche,
    },
    
  ]


  //[&_svg]:w-48

/*
<a href={item.url}>
                      <item.icon width="8" height="8"  className=""/>
                      <span>{item.title}</span>
                    </a>
*/


  export function SidebarComponent() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild size="lg">
                    <div className="h-full w-full">
                        <a
                            href={item.url}
                            className="flex flex-row items-center justify-center gap-3"
                        >
                            <item.icon width={30} height={30} />
                            <p className="mt-1 text-base font-medium">{item.title}</p>
                        </a>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter >
            <SidebarMenu>
                <SidebarMenuItem> 
                    <div className="flex items-center justify-between px-5">
                    LogOut
                    <FaPowerOff />
                    </div>                    
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  }
  