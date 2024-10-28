'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import ShineBorder from "@/components/ui/shine-border";
import MyCustomRange, { PointerValueArgs } from "@/components/MyCustomRange";
import { Alimentazione, Anno, AutoveicoloBrand, Euro, Km, Modello, Tipo } from "@/components/icone_mie";



const CruscottoSearch = () => {

    const onRangeChange = (value: PointerValueArgs) => {
        console.log('Valori Ricevuti:', value.firstValue, value.secondValue)
    }


    return (
        <div className="border-2 border-red-500  h-[270px] w-full sm:w-fit z-[1000]">
            <ShineBorder className='sm:hidden flex flex-col gap-2 w-full p-2' color={'#44403c'}>   
                <Select>
                    <SelectTrigger className="w-full bg-transparent h-7 select-none" >
                    <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipo</SelectLabel>
                        <SelectItem value="Benzina">Benzina</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Elettrico">Elettrico</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                    <SelectValue placeholder="Sel. Marca" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Marca</SelectLabel>
                        <SelectItem value="Bmw">Bmw</SelectItem>
                        <SelectItem value="Ferrari">Ferrari</SelectItem>
                        <SelectItem value="Ford">Ford</SelectItem>
                        <SelectItem value="Toyota">Toyota</SelectItem>
                        <SelectItem value="Renault">Renault</SelectItem>
                        <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                    <SelectValue placeholder="Modello" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Modello</SelectLabel>
                        <SelectItem value="Bmw">Bmw</SelectItem>
                        <SelectItem value="Ferrari">Ferrari</SelectItem>
                        <SelectItem value="Ford">Ford</SelectItem>
                        <SelectItem value="Toyota">Toyota</SelectItem>
                        <SelectItem value="Renault">Renault</SelectItem>
                        <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
                <div className='flex gap-2 w-full'>
                    <Select>
                    <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                        <SelectValue placeholder="Alimentazione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Alimentazione</SelectLabel>
                        <SelectItem value="Benzina">Benzina</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Elettrico">Elettrico</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                    <Select>
                    <SelectTrigger className="w-full bg-transparent h-7  select-none" >
                        <SelectValue placeholder="Anno" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Anno</SelectLabel>
                        <SelectItem value="Benzina">Benzina</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Elettrico">Elettrico</SelectItem>
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
                <div className="my-2 flex justify-center w-full">
                    <span className="py-1 px-5 w-1/3 font-semibold text-white text-center
                    bg-gradient-to-b from-[#1a1a1a] via-[#2b2b2b] to-[#1a1a1a] rounded-full 
                    ring-4 ring-[#0044ff]/60 shadow-lg active:shadow-[0_0_15px_5px_rgba(0,68,255,0.5)]  
                    active:text-green-500 transition duration-300 ease-in-out cursor-pointer">
                    Cerca
                    </span>
                </div>
            </ShineBorder>

            <ShineBorder className='relative h-[270px] p-2  shadow-inset-depth-dark hidden sm:flex '  borderWidth={3} borderRadius={40} color={'#44403c'}>
                <MyCustomRange 
                    className='scale-[0.85] -mt-11 sm:mt-4 -mx-9 '
                    onValueChange={onRangeChange} 
                    valueA={0} 
                    valueB={10}     
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
                    onValueChange={onRangeChange} 
                    valueA={0} 
                    valueB={100} 
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

                <span className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center font-semibold text-white
                            bg-gradient-to-b from-[#1a1a1a] via-[#2b2b2b] to-[#1a1a1a] rounded-full 
                            ring-4 ring-[#0044ff]/60 shadow-lg hover:text-[#0044ff] 
                            hover:shadow-[0_0_15px_5px_rgba(0,68,255,0.5)] 
                            active:bg-[#0d0d0d] active:shadow-[0_0_8px_2px_rgba(0,68,255,0.5)] active:text-green-500
                            transition duration-300 ease-in-out cursor-pointer">
                    Cerca
                </span>
                <div className='absolute bottom-0 left-0 w-[90%] mx-[5%] my-2 flex justify-center gap-2 sm:gap-0 p-1 bg-[#53a96f]  text-white font-shareTechMono  rounded-xl border-black/40 border-2  shadow-inset-depth select-none'>
                    <div className='flex flex-col items-end w-1/2 '>
                    <Select>
                        <SelectTrigger className="justify-end gap-2  bg-transparent h-7 border-none focus:ring-0 shadow-none select-none" Icon={( ) => <AutoveicoloBrand className='w-6 h-6'  fill='#FFC700' /> }>
                        <SelectValue placeholder="Sel. Marca" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Marca</SelectLabel>
                            <SelectItem value="Bmw">Bmw</SelectItem>
                            <SelectItem value="Ferrari">Ferrari</SelectItem>
                            <SelectItem value="Ford">Ford</SelectItem>
                            <SelectItem value="Toyota">Toyota</SelectItem>
                            <SelectItem value="Renault">Renault</SelectItem>
                            <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="justify-end gap-2 bg-transparent h-7 border-none focus:ring-0 shadow-none select-none px-0 sm:px-3" Icon={( ) => <Modello className='w-6 h-6'   fill='#FFC700' /> }>
                        <SelectValue placeholder="Modello"/>
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Modello</SelectLabel>
                            <SelectItem value="Benzina">Benzina</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Elettrico">Elettrico</SelectItem>
                            <SelectItem value="1290 Super Duke R">1290 Super Duke R</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="justify-end gap-2  bg-transparent h-7 border-none focus:ring-0 shadow-none select-none" Icon={( ) => <Anno className='w-6 h-6'  fill='#FFC700' /> }>
                        <SelectValue placeholder="Anno" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Anno</SelectLabel>
                            <SelectItem value="Benzina">Benzina</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Elettrico">Elettrico</SelectItem>
                            <SelectItem value="1290 Super Duke R">1290 Super Duke R</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>      
                    </div>
                    <div className='flex flex-col w-1/2'>
                    <Select>
                        <SelectTrigger className="flex-row-reverse justify-end gap-2 bg-transparent h-7 border-none focus:ring-0 shadow-none select-none" Icon={( ) => <Alimentazione className='w-6 h-6'  fill='#FFC700' /> }>
                        <SelectValue placeholder="Alimentazione" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Alimentazione</SelectLabel>
                            <SelectItem value="Benzina">Benzina</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Elettrico">Elettrico</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="flex-row-reverse justify-end gap-2  bg-transparent h-7 border-none focus:ring-0 shadow-none select-none" Icon={( ) => <Tipo className='w-6 h-6'  fill='#FFC700' /> }>
                        <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tipo</SelectLabel>
                            <SelectItem value="Benzina">Benzina</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Elettrico">Elettrico</SelectItem>
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