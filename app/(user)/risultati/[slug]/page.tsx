import { FilterParams, VeicoliSuggeriti, VeicoloWithImg } from "@/lib/types";
import { filtraVeicoli } from "@/app/(user)/action";
import { isVeicoliSuggeriti } from "@/lib/utils";
import ErrorComponent from "@/components/errorComponent";
import CardComponent_V2 from "@/components/cardComponent_V2";
import { cookies } from "next/headers";





export default async function RisultatiPage({ params }: { params: { slug: string } }) {

    
    let filtro:FilterParams;
    let result: VeicoloWithImg[] | VeicoliSuggeriti = [];
    let titolo: string = '';

    //NB questa pagina è normalmente pubblica, ma se loggato posso acquistare i veicoli, quindi saranno visibili i pulsanti 

    const userSession = cookies().get('userSession')?.value;
    const user = userSession ? JSON.parse(userSession) : null; 

     
    try {            
        filtro = JSON.parse(decodeURIComponent(params.slug));
        result = await filtraVeicoli(filtro)
        if (isVeicoliSuggeriti(result)) {
            result = result.veicoli
            titolo = 'La tua ricerca non ha prodotto risultati, ecco dei suggerimenti per te...'
        } else {
            titolo = 'Risultato ricerca...'
        }
        console.log('veicoli plus: ', result)
    } catch (err) {
        //console.error('Errore nel parsing dei filtri:', err);
        return (<ErrorComponent/>);
    }
   

   
    return (<>
    <div className="border-4 border-red-500 ">
        <div className="   border  ">
            <h2 className="text-2xl text-center font-semibold mt-10">{titolo}</h2>
            <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-4 p-2 sm:p-4">
                {result.map((veicolo, index) => {
                    return ( 
                        <CardComponent_V2
                            key={index} 
                            veicolo={veicolo}
                            user={user}
                        />
                    )
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