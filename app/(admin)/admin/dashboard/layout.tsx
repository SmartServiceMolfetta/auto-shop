import { Utente } from "@/database/DB";
import { cookies } from "next/headers";
import Link from "next/link";
import logoImage from '@/public/logo.png'
import Image from "next/image";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarComponent } from "@/components/sidebarComponent";


export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    //recupero cookie admin con dati
    const adminSession = cookies().get('adminSession')?.value;
    const admin:Omit<Utente, 'password'> | null = adminSession ? JSON.parse(adminSession) : null;  //<-- tipo Omit che crea alias di Utente ma senza campo password!!!


    return (
      <SidebarProvider>
        <SidebarComponent />
          <main className="w-full">  
            
            <nav className="flex items-center bg-white shadow shadow-gray-300">    
              <SidebarTrigger />
              <div className="flex flex-col justify-between items-center sm:flex-row container mx-auto py-2">
                <div className="flex items-center gap-2">   
                                 
                  <Link href={'/admin'}>
                      <Image src={logoImage} alt="logo" className="w-20" priority/>
                  </Link>                     
                  <h1 className="text-2xl font-bold">
                      Dashboard Auto-Shop.it
                  </h1>
                </div>
                <h2 className="text-2xl font-medium">
                  Benvenuto, <span className="font-bold">{admin?.username}</span>
                </h2>
              </div>
            </nav>
            {children}
          </main>
      </SidebarProvider>
    );
  
  
  
  }{/* <main className="min-h-screen flex flex-col bg-[#f5f7f8]">     
        <nav className="bg-white shadow shadow-gray-300">    
          <div className="flex flex-col justify-between items-center sm:flex-row container mx-auto py-2">
            <div className="flex items-center gap-2">
               
                  <Link href={'/admin'}>
                      <Image src={logoImage} alt="logo" className="w-20" priority/>
                  </Link> 
                 
              <h1 className="text-2xl font-bold">
                  Dashboard Auto-Shop.it
              </h1>
            </div>
            <h2 className="text-2xl font-medium">
              Benvenuto, <span className="font-bold">{admin?.username}</span>
            </h2>
          </div>
        </nav>

        <div className="flex-1">{children}</div>
      </main> */}