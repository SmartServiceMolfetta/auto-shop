import Navbar from "@/components/navbar";

export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="min-h-screen flex flex-col bg-white  border-2 border-purple-500">
            {/* <div className="flex justify-center w-full bg-white py-5">
                <div className="w-[80%]  ">
                    
                </div>
            </div> */}
        <Navbar />
        <div className="flex-1 border-2 border-yellow-400">{children}</div>
      </main>
    );
  }