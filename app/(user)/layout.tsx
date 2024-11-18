//import Navbar from "@/components/navbar";
import FooterUser from "@/components/footer-user";
import NavBarResponsive from "@/components/navbar-resp";
import { cookies } from "next/headers";

export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    //recupero cookie (se esiste) e l'user (se esiste)
    const userSession = cookies().get('userSession')?.value;
    const user = userSession ? JSON.parse(userSession) : null;


    return (
      <main className="min-h-screen flex flex-col bg-[#f5f7f8]">         
        {/* <Navbar user={user}/> */}
        <NavBarResponsive user={user}/>
        <div className="flex-1">{children}</div>
        <FooterUser />
      </main>
    );
  }