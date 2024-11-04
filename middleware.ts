import { NextRequest, NextResponse } from 'next/server';



export function middleware(req: NextRequest) {
    const userSession = req.cookies.get('userSession')?.value;

    console.log('cookie letto: ', userSession)
    
    // Se non esiste il cookie, reindirizza alla pagina di login
    if (!userSession && req.nextUrl.pathname.startsWith('/private')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // Altrimenti, consenti l’accesso
    return NextResponse.next();
  }
  
  // Specifica le pagine protette
   export const config = {
    matcher: ['/private/:path*'],
  }; 