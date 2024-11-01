import { FilterParams, VeicoliSuggeriti } from "@/lib/types";
import { filtraVeicoli } from "../action";
import { isVeicoliSuggeriti } from "@/lib/utils";
import { Veicolo } from "@/database/DB";
import ErrorComponent from "@/components/errorComponent";





export default async function RisultatiPage({ searchParams }: { searchParams: { filtro: string } }) {

    const params = new URLSearchParams(searchParams);

    let filtro:FilterParams;
    let result: Veicolo[] | VeicoliSuggeriti;
    let titolo: string = '';

    if (params.has('filtro')) {
        try {            
            filtro = JSON.parse(decodeURIComponent(params.get('filtro')!));
            result = await filtraVeicoli(filtro)
            if (isVeicoliSuggeriti(result)) {
                //console.log('Ricerca fallita, propongo veicoli suggeriti')
                //console.log('risultato ricerca (suggeriti): ', result.veicoli)
                titolo = 'La tua ricerca non ha prodotto risultati, ecco dei suggerimenti per te...'
            } else {
                //console.log('risultato ricerca: ', result)
                titolo = 'Risultato ricerca...'
            }
        } catch (err) {
            //console.error('Errore nel parsing dei filtri:', error);
            return (<ErrorComponent/>);
        }
    } else {
        console.log('Nessun filtro ricevuto');
    }  

   
    



    return(<>
        <div className="container mx-auto  border h-[500px]">
            <h2 className="text-2xl text-center font-semibold mt-10">{titolo}</h2>
            <div>
                card risultati...
            </div>
        </div>
    
    
    </>)
}

 