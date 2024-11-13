import { Veicolo } from "@/database/DB";


export type Range = {
    valueA: number,
    valueB: number
}

export type FilterParams = {
    tipo: string; 
    brand: string; 
    model?: string; 
    alim?: string; 
    anno?: number | string; 
    km?: Range; 
    prezzo?: Range;
}

export type VeicoloWithImg = Veicolo & {
    urlImg: string;
}

export type VeicoliSuggeriti = {
    veicoli: VeicoloWithImg[];
    suggerito: boolean;
}




