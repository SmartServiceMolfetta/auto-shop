import { getCachedVeicoli } from "@/app/(user)/action";
import AdminSearchBar from "@/components/admin-SearchBar";
import { FiltriProvider } from "@/components/context/filtriContext";

 



export default async function InVendita() {

    const veicoli = await getCachedVeicoli();  //carico dalla cache
   
    return (
      <div className="h-[1500px]">
        <h1 className="text-3xl font-bold uppercase text-center my-4">Veicoli in vendita</h1>
        <FiltriProvider>
            <AdminSearchBar veicoli={veicoli}/>

        </FiltriProvider>
      </div>
    );
}