import { FilterParams, VeicoliSuggeriti, VeicoloWithImg } from "@/lib/types";
import { filtraVeicoli } from "../action";
import { isVeicoliSuggeriti } from "@/lib/utils";
import ErrorComponent from "@/components/errorComponent";
import CardComponent from "@/components/cardComponent";





export default async function RisultatiPage({ searchParams }: { searchParams: { filtro: string } }) {

    const params = new URLSearchParams(searchParams);

    let filtro:FilterParams;
    let result: VeicoloWithImg[] | VeicoliSuggeriti = [];
    let titolo: string = '';

    if (params.has('filtro')) {
        try {            
            filtro = JSON.parse(decodeURIComponent(params.get('filtro')!));
            result = await filtraVeicoli(filtro)
            if (isVeicoliSuggeriti(result)) {
                //console.log('Ricerca fallita, propongo veicoli suggeriti')
                //console.log('risultato ricerca (suggeriti): ', result.veicoli)
                result = result.veicoli
                titolo = 'La tua ricerca non ha prodotto risultati, ecco dei suggerimenti per te...'
            } else {
                //console.log('risultato ricerca: ', result)
                titolo = 'Risultato ricerca...'
            }
            console.log('veicoli plus: ', result)
        } catch (err) {
            //console.error('Errore nel parsing dei filtri:', error);
            return (<ErrorComponent/>);
        }
    } else {
        console.log('Nessun filtro ricevuto');
    }  

   
    return (<>
    <div className="border-4 border-red-500 ">
        <div className="container mx-auto  border  ">
             <h2 className="text-2xl text-center font-semibold mt-10">{titolo}</h2>
            <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-4 p-2 sm:p-4">
                {result.map((veicolo, index) => {
                    return <CardComponent
                                key={index} 
                                veicolo={veicolo}
                            />
                })} 
                
            </div> 
            
        </div>
    </div>
    </>)



   
}

 /*
CardComponent 
    veicolo={result[0] }
/>
 */