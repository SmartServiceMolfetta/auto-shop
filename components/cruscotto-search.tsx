'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import ShineBorder from "@/components/ui/shine-border";
import MyCustomRange, { PointerValueArgs } from "@/components/MyCustomRange";
import { Alimentazione, Anno, AutoveicoloBrand, Euro, Km, Modello, Tipo } from "@/components/icone_mie";
import { Veicolo, Alimentazione as Alim, TipoVeicolo } from "@/database/DB";
import { useEffect, useMemo, useState } from "react";

type CruscottoProps = {
    veicoli: Veicolo[];
}

type Range = {
    valueA: number,
    valueB: number
}


const CruscottoSearch = ({veicoli}: CruscottoProps) => {

    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [models, setModels] = useState<string[]>([]);
    const [selectedAlimentazione, setSelectedAlimentazione] = useState<string>("");
    const [selectedTipo, setSelectedTipo] = useState<string>("");
    const [anni, setAnni] = useState<number[]>([]);
    const [selectedAnno, setSelectedAnno] = useState<number | null>(null);
    const [prezzo, setPrezzo] = useState<Range>({valueA: 5, valueB: 20});
    const [km, setKm] = useState<Range>({valueA: 40, valueB: 100});
    const [searchResult, setSearchResult] = useState<Veicolo>([]);



    /* const brands = useMemo(() => {  //selezione brand univoci ordinati crescenti
        return Array.from(new Set(veicoli.map((v) => v.brand))).sort((a, b) => a.localeCompare(b)); 
    }, [veicoli]); */

    const brands = useMemo(() => {
        // Filtro i veicoli in base al tipo selezionato
        const veicoliFiltrati = selectedTipo
          ? veicoli.filter((v) => v.tipo === selectedTipo)
          : veicoli;
    
        // Estraggo i brand univoci e ordinati crescenti
        const result = Array.from(new Set(veicoliFiltrati.map((v) => v.brand))).sort((a, b) => a.localeCompare(b));         

        return result;
    }, [veicoli, selectedTipo]);

    useEffect(() => {
        //carico modelli in base al brand selezionato, modelli ord. cresc.
        if (selectedBrand) {
          const filteredModels = Array.from(
            new Set(veicoli.filter((v) => v.brand === selectedBrand).map((v) => v.modello))
            ).sort((a, b) => a.localeCompare(b));  
            setModels(filteredModels);
            setSelectedModel("");  
            setAnni([]);
            setSelectedAnno(null);
        } else {
            setModels([]);
            setSelectedModel("");
            setAnni([]);
            setSelectedAnno(null);
        }
    }, [selectedBrand, veicoli]);

    useEffect(() => {  //effetto per caricare anno in base al modello
        if (selectedModel) {
            const filteredAnni = Array.from(
              new Set(
                veicoli
                  .filter((v) => v.brand === selectedBrand && v.modello === selectedModel)
                  .map((v) => v.anno)
              )
            ).sort(); // Ordinamento degli anni
            setAnni(filteredAnni);
            setSelectedAnno(null); // Resetta l'anno selezionato
          } else {
            setAnni([]);
            setSelectedAnno(null);
          }
    }, [selectedModel, selectedBrand, veicoli]);


//bozza per stato attivazione ricerca. ring pulsante cerca: verde->posso fare ricerca, rosso->no ricerca filtro/i mancante/i
    useEffect(() => { //usare tutti gli stati dei filtri, 
        const filtriImpostati = tipo && brand && modello;
        setTuttiImpostati(filtriImpostati);  //--> fara render condizionale per il ring del cerca.
    }, [tipo, brand, modello]);

    const onSelectedTipo = (value: string) => {
         
        setSelectedTipo(value);
        setSelectedBrand("");
    }
  /*   const onSelectedTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tipo = e.target.value;
        setSelectedTipo(tipo);
        setSelectedBrand("");
    } */


    const onRangePrezzoChange = (value: PointerValueArgs) => {
        setPrezzo({valueA: Number(value.firstValue), valueB: Number(value.secondValue)})
        console.log('Valori Ricevuti:', value.firstValue, value.secondValue)
    }
    const onRangeKmChange = (value: PointerValueArgs) => {
        setKm({valueA: Number(value.firstValue), valueB: Number(value.secondValue)})
        console.log('Valori Ricevuti:', value.firstValue, value.secondValue)
    }

    const filtraVeicoli = (veicoli:Veicolo[], tipo:string, brand:string) => {
        return veicoli.filter((veicolo) => {
            const matchesTipo = tipo ? veicolo.tipo === tipo : true;
            const matchesBrand = brand ? veicolo.brand === brand : true;


            return matchesTipo && matchesBrand
        })
    }

    const veicoliResult = () => {
        
        const result = filtraVeicoli(veicoli, 'MOTO', 'Ducati')
        console.log('risultato ricerca: ', result)
    }


    return (
        <div className="border-2 border-red-500  h-[270px] w-full sm:w-fit ">
            <ShineBorder className='sm:hidden flex flex-col gap-2 w-full p-2' color={'#44403c'}>   
                <Select onValueChange={onSelectedTipo} defaultValue=""  value={selectedTipo}>
                    <SelectTrigger className="w-full bg-transparent h-7 select-none" >
                        <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tipo</SelectLabel>
                            {Object.values(TipoVeicolo).map((tipo) => (
                                <SelectItem key={tipo} value={tipo}>
                                    {tipo}
                                </SelectItem>
                            ))} 
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={setSelectedBrand} value={selectedBrand} defaultValue="" disabled={!selectedTipo}>
                    <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                        <SelectValue placeholder="Sel. Marca" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Marca</SelectLabel>
                            {brands.map((brand)=>(
                                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                            ))} 
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={setSelectedModel} defaultValue="" value={selectedModel} disabled={!selectedBrand}>
                    <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                        <SelectValue placeholder="Modello" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Modello</SelectLabel>
                            {models.map((model)=> (
                                        <SelectItem key={model} value={model}>{model}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className='flex gap-2 w-full'>
                    <Select onValueChange={setSelectedAlimentazione} defaultValue=""  value={selectedAlimentazione}>
                        <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                            <SelectValue placeholder="Alimentazione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Alimentazione</SelectLabel>
                            {Object.values(Alim).map((alimentazione) => (
                                <SelectItem key={alimentazione} value={alimentazione}>
                                    {alimentazione}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(anno) => setSelectedAnno(Number(anno))} defaultValue="" value={selectedAnno ? selectedAnno.toString() : ""} disabled={!selectedModel}>
                        <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                            <SelectValue placeholder="Anno" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Anno</SelectLabel>
                            {anni.map((anno) => (
                                <SelectItem key={anno} value={anno.toString()}>
                                    {anno}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex gap-2 w-full'>
                    <Select>
                        <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                            <SelectValue placeholder="Prezzo Max" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Prezzo Max</SelectLabel>
                            <SelectItem value="Benzina">Benzina</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Elettrico">Elettrico</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                            <SelectValue placeholder="Km Max" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Km Max</SelectLabel>
                            <SelectItem value="Benzina">Benzina</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Elettrico">Elettrico</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>           
                <span onClick={veicoliResult} className="my-2 flex justify-center w-full">
                    <span className="py-1 px-5 w-1/3 font-semibold text-white text-center
                    bg-gradient-to-b from-[#1a1a1a] via-[#2b2b2b] to-[#1a1a1a] rounded-full 
                    ring-4 ring-[#0044ff]/60 shadow-lg active:shadow-[0_0_15px_5px_rgba(0,68,255,0.5)]  
                    active:text-green-500 transition duration-300 ease-in-out cursor-pointer">
                    Cerca
                    </span>
                </span>
            </ShineBorder>

            <ShineBorder className='relative h-[270px] p-2  shadow-inset-depth-dark hidden sm:flex '  borderWidth={3} borderRadius={40} color={'#44403c'}>
                <MyCustomRange 
                    className='scale-[0.85] -mt-11 sm:mt-4 -mx-9 '
                    onValueChange={onRangePrezzoChange} 
                    //valueA={5} 
                    //valueB={20}   
                    valueA={prezzo.valueA}  
                    valueB={prezzo.valueB}  
                    connectionBgColor={'#97cc04'}
                    Xfactor={1000} 
                    Xlabel='X 1000' 
                    valueInDisplay 
                    textSuffix='€'
                    pathStartAngle={ 180 }
                    pathEndAngle={ 0 }
                    pointerRadius={ 30 }
                    pointerSVG={<Euro  width={'30px'} height={'30px'} fill='transparent'/>}
                />

                <MyCustomRange 
                    className='scale-[0.85] -mt-52 sm:mt-4 -mx-9'
                    onValueChange={onRangeKmChange} 
                    /* valueA={40} 
                    valueB={100} */ 
                    valueA={km.valueA}  
                    valueB={km.valueB}  
                    max={400}
                    ticksCount={40}
                    connectionBgColor={'#97cc04'}
                    Xfactor={1000} 
                    Xlabel='X 1000' 
                    pathRadius={150}
                    valueInDisplay 
                    textSuffix='Km'
                    pathStartAngle={ 180 }
                    pathEndAngle={ 0 }
                    pointerRadius={ 25 }
                    pointerSVG={<Km className='rounded-full' width={'25px'} height={'25px'} fill=''/>}
                />

                <span onClick={veicoliResult} className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center font-semibold text-white
                            bg-gradient-to-b from-[#1a1a1a] via-[#2b2b2b] to-[#1a1a1a] rounded-full 
                            ring-4 ring-[#0044ff]/60 shadow-lg hover:text-[#0044ff] 
                            hover:shadow-[0_0_15px_5px_rgba(0,68,255,0.5)] 
                            active:bg-[#0d0d0d] active:shadow-[0_0_8px_2px_rgba(0,68,255,0.5)] active:text-green-500
                            transition duration-300 ease-in-out cursor-pointer">
                    Cerca
                </span>
                <div className='absolute bottom-0 left-0 w-[90%] mx-[5%] my-2 flex justify-center gap-2 sm:gap-0 p-1 bg-[#53a96f]  text-white font-shareTechMono  rounded-xl border-black/40 border-2  shadow-inset-depth select-none'>
                    <div className='flex flex-col items-end w-1/2 '>                        
                        <Select onValueChange={onSelectedTipo} defaultValue=""  value={selectedTipo}>
                            <SelectTrigger className="justify-end gap-2  bg-transparent h-7 border-none focus:ring-0 shadow-none select-none" Icon={( ) => <Tipo className='w-6 h-6'  fill='#FFC700' /> }>
                            <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tipo</SelectLabel>
                                    {Object.values(TipoVeicolo).map((tipo) => (
                                        <SelectItem key={tipo} value={tipo}>
                                            {tipo}
                                        </SelectItem>
                                    ))}                                
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSelectedBrand} value={selectedBrand} defaultValue="" disabled={!selectedTipo}>
                            <SelectTrigger  className="justify-end gap-2  bg-transparent h-7 border-none focus:ring-0 shadow-none select-none" Icon={( ) => <AutoveicoloBrand className='w-6 h-6'  fill='#FFC700' /> }>
                                <SelectValue placeholder="Sel. Marca" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    <SelectLabel>Marca</SelectLabel>
                                    {brands.map((brand)=>(
                                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                    ))}                                
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(anno) => setSelectedAnno(Number(anno))} defaultValue="" value={selectedAnno ? selectedAnno.toString() : ""} disabled={!selectedModel}>
                            <SelectTrigger className="justify-end gap-2  bg-transparent h-7 border-none focus:ring-0 shadow-none select-none" Icon={( ) => <Anno className='w-6 h-6'  fill='#FFC700' /> }>
                            <SelectValue placeholder="Anno" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Anno</SelectLabel>
                                    {anni.map((anno) => (
                                    <SelectItem key={anno} value={anno.toString()}>
                                        {anno}
                                    </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>      
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <Select onValueChange={setSelectedAlimentazione} defaultValue=""  value={selectedAlimentazione}>
                            <SelectTrigger className="flex-row-reverse justify-end gap-2 bg-transparent h-7 border-none focus:ring-0 shadow-none select-none" Icon={( ) => <Alimentazione className='w-6 h-6'  fill='#FFC700' /> }>
                            <SelectValue placeholder="Alimentazione" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Alimentazione</SelectLabel>
                                    {Object.values(Alim).map((alimentazione) => (
                                        <SelectItem key={alimentazione} value={alimentazione}>
                                            {alimentazione}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSelectedModel} defaultValue="" value={selectedModel} disabled={!selectedBrand}>
                            <SelectTrigger className="flex-row-reverse justify-end gap-2 bg-transparent h-7 border-none focus:ring-0 shadow-none select-none px-0 sm:px-3" Icon={( ) => <Modello className='w-6 h-6'   fill='#FFC700' /> }>
                            <SelectValue placeholder="Modello"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Modello</SelectLabel>
                                    {models.map((model)=> (
                                        <SelectItem key={model} value={model}>{model}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>                        
                    </div> 
                </div>              
            </ShineBorder> 
        </div>
    )
}



export default CruscottoSearch;