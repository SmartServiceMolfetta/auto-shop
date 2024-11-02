import { Veicolo } from "@/database/DB";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { VeicoliSuggeriti } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//formatta numeri con punti decimali
export const formatNumber = (number: number) => {

  return new Intl.NumberFormat('it-IT').format(number);    
}

//formatta numeri euro
export const formatEuro = (number: number) => {

  return new Intl.NumberFormat('it-IT', {    
    minimumFractionDigits: 2,  
    maximumFractionDigits: 2   
}).format(number);    
}


//type guard per VeicoliSuggeriti
export function isVeicoliSuggeriti(data: Veicolo[] | VeicoliSuggeriti): data is VeicoliSuggeriti {
  return (data as VeicoliSuggeriti).suggerito !== undefined;
}
