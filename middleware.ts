import { NextRequest, NextResponse } from 'next/server';
import { Ruolo, Utente } from './database/DB';



export function middleware(req: NextRequest) {
    const userSession = req.cookies.get('userSession')?.value;
    const loggedUser = userSession ? JSON.parse(userSession) as Partial<Utente> : null; 

    console.log('cookie letto: ', userSession)
    
    /* // Se non esiste il cookie, reindirizza alla pagina di login
    if (!userSession && req.nextUrl.pathname.startsWith('/private')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // Altrimenti, consenti l’accesso
    return NextResponse.next(); */

    if(userSession && loggedUser?.ruolo === Ruolo.USER && req.nextUrl.pathname.startsWith('/private')) { //se sono loggato e sono user consento le route '\private'
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', req.url));  //redirect al login se non sihanno i permessi
     
  }
  
  // Specifica le pagine protette
   export const config = {
    matcher: ['/private/:path*'],
  }; 