 

export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="min-h-screen flex flex-col bg-[#f5f7f8]  border-2 border-purple-500">            
            <div className="flex-1 border-2 border-yellow-400">{children}</div>
        </main>
    );
  }