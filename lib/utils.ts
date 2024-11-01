import { Veicolo } from "@/database/DB";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { VeicoliSuggeriti } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




//type guard per VeicoliSuggeriti
export function isVeicoliSuggeriti(data: Veicolo[] | VeicoliSuggeriti): data is VeicoliSuggeriti {
  return (data as VeicoliSuggeriti).suggerito !== undefined;
}
