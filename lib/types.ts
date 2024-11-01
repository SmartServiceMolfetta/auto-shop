import { Veicolo } from "@/database/DB";


export type Range = {
    valueA: number,
    valueB: number
}

export type FilterParams = {
    tipo: string; 
    brand: string; 
    model: string; 
    alim: string; 
    anno: number; 
    km: Range; 
    prezzo: Range;
}

export type VeicoliSuggeriti = {
    veicoli: Veicolo[];
    suggerito: boolean;
}