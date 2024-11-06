 

export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="min-h-screen flex flex-col bg-[#f5f7f8]">            
            <div className="flex-1">{children}</div>
        </main>
    );
  }