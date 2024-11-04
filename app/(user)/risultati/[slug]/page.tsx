import { FilterParams, VeicoliSuggeriti, VeicoloWithImg } from "@/lib/types";
import { filtraVeicoli } from "@/app/(user)/action";
import { isVeicoliSuggeriti } from "@/lib/utils";
import ErrorComponent from "@/components/errorComponent";
import CardComponent from "@/components/cardComponent";
import CardComponent_V2 from "@/components/cardComponent_V2";





export default async function RisultatiPage({ params }: { params: { slug: string } }) {

    //const filtroParams = new URLSearchParams(params.slug);
    //const filtroParams = decodeURIComponent(params.slug)

    //console.log('slug risultati: ', filtroParams)

    let filtro:FilterParams;
    let result: VeicoloWithImg[] | VeicoliSuggeriti = [];
    let titolo: string = '';

    //if (filtroParams.has('filtro')) {
        try {            
            //filtro = JSON.parse(decodeURIComponent(filtroParams.get('filtro')!));
            filtro = JSON.parse(decodeURIComponent(params.slug));
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
            //console.error('Errore nel parsing dei filtri:', err);
            return (<ErrorComponent/>);
        }
    /* } else {
        console.log('Nessun filtro ricevuto');
    }  */ 

   
    return (<>
    <div className="border-4 border-red-500 ">
        <div className="container mx-auto  border  ">
            <h2 className="text-2xl text-center font-semibold mt-10">{titolo}</h2>
            <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-4 p-2 sm:p-4">
                {result.map((veicolo, index) => {
                    return <CardComponent_V2
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