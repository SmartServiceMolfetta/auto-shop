
'use server'

import { DB, Ruolo } from "@/database/DB";
import { cookies } from "next/headers";

export const loginAdminActionCookie = async (formData: FormData) => {
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
  
    const admin = DB.utenti.find(     //ricerca dei dati nella tab. utente --> simulata 
      (utente) => utente.username === username && utente.password === password && utente.ruolo === Ruolo.ADMIN
    );
  
    if (!admin) {
      return {
        message: 'Username o password non corretti',
        success: false
      } 
    }
  
    cookies().set({
      name: 'adminSession',
      value: JSON.stringify({ username: admin.username, ruolo: admin.ruolo }),
      httpOnly: true,
      path: '/admin',
      maxAge: 60 * 60 * 24, // 1 giorno
    });
    
    return { 
      message: 'Login eseguito con successo',
      success: true
    };
  }
  
  export async function logoutAdminAction() {
    // Rimuove il cookie di sessione
    cookies().set({
      name: 'adminSession',
      value: '',
      path: '/admin',
      maxAge: -1, // imposto scadenza immediata
    });
    
    return { success: true, message: 'Logout eseguito con successo' };
  }