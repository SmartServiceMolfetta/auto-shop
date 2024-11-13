import { getCachedVeicoliWithFilter } from "@/app/(user)/action";
import AdminSearchBar from "@/components/admin-SearchBar";
import { FiltriProvider } from "@/components/context/filtriContext";
import VeicoliTable from "@/components/veicoliTable";
import { Stato } from "@/database/DB";

 



export default async function InVendita() {

 
  const veicoliVenduti = await getCachedVeicoliWithFilter(Stato.VENDESI);
   
    return (
      <div className="h-[1500px]">
        <h1 className="text-3xl font-bold uppercase text-center my-4">Veicoli in vendita</h1>
        <FiltriProvider>
            <AdminSearchBar veicoli={veicoliVenduti ? veicoliVenduti : []}/>
            <hr className="my-5"/>
            <VeicoliTable 
                className="px-10"
                veicoli={veicoliVenduti}
            />

        </FiltriProvider>
      </div>
    );
}