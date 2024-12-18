 
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
import { SalesCar, SoldCar, Statistiche } from "./icone_mie"
import SidebarLogoutButton from "./logoutButton"


  const items = [
    {
      title: "Veicoli in Vendita",
      url: "/admin/dashboard/in_vendita",
      icon: SoldCar,
    },
    {
      title: "Veicoli Venduti",
      url: "/admin/dashboard/venduti",
      icon: SalesCar,
    },
    {
      title: "Statistiche",
      url: "/admin/dashboard/statistiche",
      icon: Statistiche,
    },
    
  ]

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
                  <SidebarLogoutButton />                                
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  }
  

  