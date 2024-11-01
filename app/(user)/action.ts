
'use server'


import { Veicolo, DB } from "@/database/DB"
import { FilterParams, VeicoliSuggeriti } from "@/lib/types";


let veicoliCache: Veicolo[] | null = null;


export async function getVeicoli(): Promise<Veicolo[]> {
    // Simula un ritardo, come se fosse una chiamata a un database 
    await new Promise((resolve) => setTimeout(resolve, 500));

    return DB.veicoli;
}


export async function getCachedVeicoli(): Promise<Veicolo[]> {  //NB --> quando si modifica il db, invalidare la cache mettendo veicoliCache=null, altrimenti la lista veicoli non sarà aggiornata!!!
  if (!veicoliCache) {
    veicoliCache = await getVeicoli(); 
  }
  return veicoliCache;
}


export const filtraVeicoli = async (params: FilterParams): Promise<Veicolo[] | VeicoliSuggeriti> => {
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
    return veicoliFiltrati;
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












