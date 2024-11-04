import Navbar from "@/components/navbar";
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
        <main className="min-h-screen flex flex-col bg-[#f5f7f8]  border-2 border-purple-500">
            {/* <div className="flex justify-center w-full bg-white py-5">
                <div className="w-[80%]  ">
                    
                </div>
            </div> */}
        <Navbar user={user}/>
        <div className="flex-1 border-2 border-yellow-400">{children}</div>
      </main>
    );
  }