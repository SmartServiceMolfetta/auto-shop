
'use server'


import { Veicolo, DB } from "@/database/DB"

export async function getVeicoli(): Promise<Veicolo[]> {
    // Simula un ritardo, come se fosse una chiamata a un database (per attivazione spinner!)
    await new Promise((resolve) => setTimeout(resolve, 500));

    //ricevuti i dati, estrarre: brand univoci, modelli univoci con brand
    






    //ritornare oggetto: 
    /*
    //senza errori:
    {
        data: {veicoli, brand, modelli},
        error: ""
    }
    //con errori:
    {
        data: {},
        error: "errore durante il caricamento dei dati"
    }
    */





    return DB.veicoli;
}

