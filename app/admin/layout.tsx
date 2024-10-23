
export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="min-h-screen flex flex-col  bg-blueDEP border-2 border-red-500">
        <div className="flex justify-center w-full bg-white py-5">
            <div className="w-[80%]  ">
                
            </div>
        </div>
        <div className="flex-1 border-2 border-yellow-400">{children}</div>
      </main>
    );
  }