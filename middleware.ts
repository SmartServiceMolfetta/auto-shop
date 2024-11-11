import { NextRequest, NextResponse } from 'next/server';
import { Ruolo, Utente } from './database/DB';



export function middleware(req: NextRequest) {
    const userSession = req.cookies.get('userSession')?.value;
    const loggedUser = userSession ? JSON.parse(userSession) as Partial<Utente> : null; 

    const adminSession = req.cookies.get('adminSession')?.value;
    const loggedAdmin = adminSession ? JSON.parse(adminSession) as Partial<Utente> : null;     


    if(userSession && loggedUser?.ruolo === Ruolo.USER && req.nextUrl.pathname.startsWith('/private')) { //se sono loggato e sono user consento le route '/private'
      return NextResponse.next();
    }

    if(adminSession && loggedAdmin?.ruolo === Ruolo.ADMIN && req.nextUrl.pathname.startsWith('/admin/dashboard')) { //se sono loggato e sono admin consento le route '/admin/dashboard'
      return NextResponse.next();
    }


    if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    } else {//if (req.nextUrl.pathname.startsWith('/private')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    //return NextResponse.redirect(new URL('/login', req.url));  //redirect al login se non sihanno i permessi
     
  }
  
   
  export const config = {
    matcher: ['/private/:path*', '/admin/dashboard/:path*'],
  }; 