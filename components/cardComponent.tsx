
'use client'

 
import { Stato } from "@/database/DB";
import { VeicoloWithImg } from "@/lib/types";
import { formatEuro } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Spinner } from "./spinner";

type CardProps = {
    veicolo: VeicoloWithImg;
}



const CardComponent = ({veicolo}: CardProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handlerInviaMail = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({                    
                    text: `<p>Il sig. Salvatore ha effettuato un nuovo ordine.</p>
                           <p>Veicolo ordinato: Toyota Rav 4</p>
                           <p>immatricolazione: 2008</p>
                           <p>Alimentazione: Benzina</p>`
                }),
            })
            if (response.ok) {
                setSuccess('Ordine ricevuto con successo!');
            } else {
                setError("Errore durante l'elaborazione dell'ordine.");
            }
            
        } catch (error) {
            console.log(error)
            setError('Errore sconisciuto.');
        } finally {
            setLoading(false)
        }
    }  


    return (
        <div className="relative flex flex-col border rounded-lg p-4 w-fit overflow-hidden">
            {veicolo.stato === Stato.VENDUTO && <div className="absolute top-7 right-[-45px] w-[180px] transform rotate-45 bg-red-500 text-white font-bold text-center py-1 shadow-md">
                VENDUTO
            </div>}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="relative w-[250px] h-[170px] overflow-hidden border border-red-500">
                    <Image 
                        src={`/veicoli/${veicolo.urlImg}`}
                        //src={`/veicoli/BMW_X5_2021.jpg`}
                        //src={`/veicoli/Honda_CBR600RR_2023.jpg`}
                        alt={`${veicolo.brand} ${veicolo.modello} ${veicolo.anno}`}
                        fill
                        //style={{ objectFit: 'contain' }}
                    />
                </div>
                <div>
                    <p className="font-semibold text-2xl">{veicolo.brand}</p>
                    <p className="font-semibold text-2xl">{veicolo.modello}</p>
                    <p className="font-semibold text-2xl text-orange-400">{`€ ${formatEuro(veicolo.prezzo)}`}</p>
                    <p className="font-semibold text-2xl mt-5">Usato Garantito</p>
                </div>
            </div>
            <div className="mt-5 divide-y">
                <p className="font-medium text-xl py-2">Immatricolazione <span className="font-semibold">{veicolo.anno}</span></p>
                <p className="font-medium text-xl py-2">Alimentazione <span className="font-semibold">{veicolo.alimentazione}</span></p>
                <p className="font-medium text-xl py-2">Km <span className="font-semibold">{veicolo.kilometri}</span></p>
                <p className="font-medium text-xl py-2">Unico Proprietario</p>
                <div className="flex justify-center flex-col-reverse items-center pt-2 sm:flex-row sm:justify-between">  
                    <div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-green-500 mt-2">{success}</p>}
                    </div>  
                     {loading ? <Spinner /> : '' }  
                    <button 
                            onClick={handlerInviaMail} 
                            disabled={loading || veicolo.stato === Stato.VENDUTO} 
                            className='bg-orange-400 text-white font-normal rounded-[4px] py-[4px] px-5 lg:text-[20px] hover:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60'
                        >
                            {/* {loading ? 'Elaborazione in corso...' : 'Acquista'}  */}
                            Acquista
                        </button>
                  
                </div>               
            </div>
            
        </div>

    )
}


export default CardComponent;