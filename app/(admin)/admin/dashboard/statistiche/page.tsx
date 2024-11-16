import { getCachedVeicoli } from "@/app/(user)/action";
import { ChartMarchi } from "@/components/chartMarchi";
import { ChartVeicoli } from "@/components/chartVeicoli";
import { PieChartVeicoli } from "@/components/pieChartVeicoli";
import { Stato, TipoVeicolo, Veicolo } from "@/database/DB";


type ConteggioMarchio = {
  marchio: string;
  conteggio: number;
};

export default async function StatistichePage() {

  //auto venduta a prezzo maggiore  ok
  //auto venduta a prezzo minore  ok
  //prezzo medio vendite  ok 
  //marchio più venduto

  const veicoli = await getCachedVeicoli(); 

  const autoVendutePrezzoMax = veicoli
      .filter(veicolo => veicolo.tipo === TipoVeicolo.AUTO)
      .sort((a, b) => b.prezzo - a.prezzo)
      .slice(0, 5);
  const motoVendutePrezzoMax = veicoli
      .filter(veicolo => veicolo.tipo === TipoVeicolo.MOTO)
      .sort((a, b) => b.prezzo - a.prezzo)
      .slice(0, 5);
  const motoVendutePrezzoMin = veicoli
      .filter(veicolo => veicolo.tipo === TipoVeicolo.MOTO)
      .sort((a, b) => a.prezzo - b.prezzo)  
      .slice(0, 5);
  const autoVendutePrezzoMin = veicoli
      .filter(veicolo => veicolo.tipo === TipoVeicolo.AUTO)
      .sort((a, b) => a.prezzo - b.prezzo)  
      .slice(0, 5);

  function calcolaPrezzoMedio(veicoli: Veicolo[], tipo:TipoVeicolo) {  //per veicoli venduti 
    const filtrati = veicoli.filter(veicolo => veicolo.stato===Stato.VENDUTO && veicolo.tipo === tipo);
    if (filtrati.length === 0) return 0; 
    const sommaPrezzi = filtrati.reduce((somma, veicolo) => somma + veicolo.prezzo, 0);
    return Math.round(sommaPrezzi / filtrati.length);
  }

  const prezzoMedioAutoVendute = calcolaPrezzoMedio(veicoli, TipoVeicolo.AUTO);
  const prezzoMedioMotoVendute = calcolaPrezzoMedio(veicoli, TipoVeicolo.MOTO);

  //console.log('prezzi medi: ', prezzoMedioAutoVendute, prezzoMedioMotoVendute)

  const dataPieChart = [
    {veicolo: 'Auto', prezzo:  prezzoMedioAutoVendute, fill: 'red'},
    {veicolo: 'Moto', prezzo:  prezzoMedioMotoVendute, fill: 'green'},
  ]

  function calcolaTopMarchi(veicoli: Veicolo[], tipo:TipoVeicolo): ConteggioMarchio[] {
    const conteggioMarchi = veicoli
    .filter(veicolo => veicolo.tipo === tipo && veicolo.stato===Stato.VENDUTO) 
    .reduce<Record<string, number>>((conteggio, veicolo) => {
        conteggio[veicolo.brand] = (conteggio[veicolo.brand] || 0) + 1;
        return conteggio;
    }, {});

    return Object.entries(conteggioMarchi)
        .sort((a, b) => b[1] - a[1])  
        .slice(0, 5)  
        .map(([marchio, conteggio]) => ({marchio, conteggio}));  
  }

  const topMarchiMoto = calcolaTopMarchi(veicoli, TipoVeicolo.MOTO);
  const topMarchiAuto = calcolaTopMarchi(veicoli, TipoVeicolo.AUTO);

   
  return (

    <div className="container mx-auto w-full">  
      <h1 className="font-bold text-3xl text-center my-10 capitalize">statistiche di vendita <span> ~ auto-shop ~</span></h1>
      <div className="flex flex-col sm:grid sm:grid-cols-2 sm:justify-items-center sm:align-middle gap-4 w-full px-2 ">
        <ChartVeicoli 
          className="w-full lg:w-2/3"
          auto={autoVendutePrezzoMax}
          moto={motoVendutePrezzoMax}
          colorAuto="#bef264"
          colorMoto="#86efac"
          chartTitle="Veicoli più venduti"
          chartDescription="Auto - Moto"          
        />
        <ChartVeicoli 
          className="w-full lg:w-2/3"
          auto={autoVendutePrezzoMin}
          moto={motoVendutePrezzoMin}
          colorAuto="#f87171"
          colorMoto="#fdba74"
          chartTitle="Veicoli meno venduti"
          chartDescription="Auto - Moto"
        />
        <PieChartVeicoli
        className="w-full lg:w-2/3"
          dataChart={dataPieChart}
          chartTitle="Prezzo Vendita Medio"
          chartDescription="Auto - Moto"
        />

        <ChartMarchi
          className="w-full lg:w-2/3"
          marchioAuto={topMarchiAuto}
          marchioMoto={topMarchiMoto}
          colorAuto="red"
          colorMoto="green"
          chartTitle="Marchi più venduti"
          chartDescription="Auto - Moto"
        />


            
        </div>
    </div>
  );
}