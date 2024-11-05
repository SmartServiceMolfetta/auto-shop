
'use server'


import { Veicolo, DB, Ruolo } from "@/database/DB"
import { FilterParams, VeicoliSuggeriti, VeicoloWithImg } from "@/lib/types";
import { cookies } from 'next/headers';


let veicoliCache: VeicoloWithImg[] | null = null;

 /*
    NB: questa app attualmente lavora con dati fittizi prelevati dal file DB.ts
    l'array di oggetti Veicolo non ha un campo immagine dove memorizzato l'url dell'immagine
    per ovviare a questo problema lo aggiungo by-code con la funzione "veicoliWithImg" ad ogni ricerca 
    assumendo che l'url immagine  sia composto cosi: brand+modello+anno.jpg

    potrei anche non usare la funzione "veicoliWithImg" e comporre l'url immagine nel componente che elabora le img
    
    in una situazione reale, con un db vero si sarebbe aggiunto un campo alla tab. veicoli permettendo
    anche il salvataggio di differenti formati immagine e non solo jpg
  */


const veicoliWithImg = (data: Veicolo[]) => {
  const dataImg = data.map(veicolo => ({
    ...veicolo,
    urlImg: `${veicolo.brand}_${veicolo.modello}_${veicolo.anno}.jpg`
  }));

  return dataImg;
} 


export async function getVeicoli(): Promise<VeicoloWithImg[]> {
    // Simula un ritardo, come se fosse una chiamata a un database 
    await new Promise((resolve) => setTimeout(resolve, 500));

    return veicoliWithImg(DB.veicoli);
}


export async function getCachedVeicoli(): Promise<VeicoloWithImg[]> {  //NB --> quando si modifica il db, invalidare la cache mettendo veicoliCache=null, altrimenti la lista veicoli non sarà aggiornata!!!
  if (!veicoliCache) {
    veicoliCache = await getVeicoli(); 
  }
  return veicoliCache;
}







export const filtraVeicoli = async (params: FilterParams): Promise<VeicoloWithImg[] | VeicoliSuggeriti> => {
  const veicoli = await getCachedVeicoli();

 

  


  const veicoliFiltrati =  veicoli.filter((veicolo) => {
      const matchesTipo = params.tipo ? veicolo.tipo === params.tipo : true;
      const matchesBrand = params.brand ? veicolo.brand === params.brand : true;
      const matchesModel = params.model ? veicolo.modello === params.model : true;
      const matchesAlim = params.alim ? veicolo.alimentazione === params.alim : true;
      const matchesAnno = params.anno ? veicolo.anno === params.anno : true;

      const matchesKm = params.km ? (veicolo.kilometri >= params.km.valueA && veicolo.kilometri <= params.km.valueB) : true;
      const matchesPrezzo = params.prezzo ? (veicolo.prezzo >= params.prezzo.valueA && veicolo.prezzo <= params.prezzo.valueB) : true;

      return matchesTipo && matchesBrand &&  matchesModel &&  matchesAlim &&  matchesAnno && matchesKm && matchesPrezzo;
  });

  if (veicoliFiltrati.length > 0) {  //ricerca con successo

    return veicoliFiltrati

    //return veicoliFiltrati;
  } else {  //effettuo ricerca senza km, prezzo, anno, alimentazione  --> veicoli suggeriti
    const veicoliSuggeriti =  veicoli.filter((veicolo) => {
      const matchesTipo = params.tipo ? veicolo.tipo === params.tipo : true;
      const matchesBrand = params.brand ? veicolo.brand === params.brand : true;
      const matchesModel = params.model ? veicolo.modello === params.model : true;      

      return matchesTipo && matchesBrand &&  matchesModel ;
    });

    const result:VeicoliSuggeriti = {veicoli: veicoliSuggeriti, suggerito: true}


    return result;
  }
}




export const loginUserAction = async (formData: FormData) => {

  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  const user = DB.utenti.find(     //ricerca dei dati nella tab. utente --> simulata 
    (utente) => utente.username === username && utente.password === password && utente.ruolo === Ruolo.USER
  );

  console.log('user: ', user)

  /* if (user) {
    console.log("metto in localstorage i dati dell'user")
  } else {
      console.log('Credenziali errate!');
      return 
  }

  redirect("/"); */

  if (user) {
    return { 
      data: { username: user.username, ruolo: user.ruolo, success: true },
      error: null
    };
  } else {
    return { 
      data: null,
      error: { message: 'Username o password non corretti', success: false }
    };
  }

}


export const loginUserActionCookie = async (formData: FormData) => {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  const user = DB.utenti.find(     //ricerca dei dati nella tab. utente --> simulata 
    (utente) => utente.username === username && utente.password === password && utente.ruolo === Ruolo.USER
  );

  if (!user) {
    return {
      message: 'Username o password non corretti',
      success: false
    } 
  }

  cookies().set({
    name: 'userSession',
    value: JSON.stringify({ username: user.username, ruolo: user.ruolo }),
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 giorno
  });
  
  return { 
    message: 'Login eseguito con successo',
    success: true
  };
}

export async function logoutUserAction() {
  // Rimuove il cookie di sessione
  cookies().set({
    name: 'userSession',
    value: '',
    path: '/',
    maxAge: -1, // imposto scadenza immediata
  });
  
  return { success: true, message: 'Logout eseguito con successo' };
}



 

/* export async function getAvatar() {
  const avatarUrl = 'https://thispersondoesnotexist.com';

  try {
     const response = await fetch(avatarUrl, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', //non preleva da cache ma solo da richiesta
      },
    });  

    

    console.log('response: ', response)
    

    if (!response.ok) {
      throw new Error('Nessuna immagine ricevuta');
    }

     
    const imageBlob = await response.blob(); // Converti la risposta in un blob
console.log('blob: ', imageBlob)

    //const imageObjectURL = URL.createObjectURL(imageBlob); // Crea un URL oggetto dal blob

    return imageBlob;

  } catch (error) {
    console.error('Impossibile recuperare immagine:', error);
    throw new Error('Impossibile recuperare immagine');
  }
} */






/* export const filtraVeicoli = async (params: FilterParams) => {
  const veicoli = await getCachedVeicoli();

  return veicoli.filter((veicolo) => {
      const matchesTipo = params.tipo ? veicolo.tipo === params.tipo : true;
      const matchesBrand = params.brand ? veicolo.brand === params.brand : true;
      const matchesModel = params.model ? veicolo.modello === params.model : true;
      const matchesAlim = params.alim ? veicolo.alimentazione === params.alim : true;
      const matchesAnno = params.anno ? veicolo.anno === params.anno : true;

      const matchesKm = params.km ? (veicolo.kilometri >= params.km.valueA && veicolo.kilometri <= params.km.valueB) : true;
      const matchesPrezzo = params.prezzo ? (veicolo.prezzo >= params.prezzo.valueA && veicolo.prezzo <= params.prezzo.valueB) : true;

      return matchesTipo && matchesBrand &&  matchesModel &&  matchesAlim &&  matchesAnno && matchesKm && matchesPrezzo;
  })
} */

//se la ricerca con i parametri inseriti non produce risultati, eseguire una ricerca senza i seguenti parametri: 
//km, prezzo, anno, alimentazione e restituire i dati come "veicoli suggeriti"












