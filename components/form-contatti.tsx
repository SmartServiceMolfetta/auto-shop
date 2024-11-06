'use client'




 

 

export default function ContattiForm() {
     

    

 

    return (<>     
        <h2 className="font-semibold text-3xl text-center my-5">Richiedi Info</h2>   
        <form  className='flex flex-col  gap-2 w-full p-2 md:py-10 md:px-8'>
            <div className='flex flex-col gap-2 sm:flex-row sm:gap-4  w-full'>
                <input 
                    name="nome"
                    className="h-10 px-3 py-[6px] rounded-[4px] outline-none w-full text-[15px] text-[#555555] bg-white shadow-form border border-[#ccc] xl:text-lg" 
                    placeholder='Il tuo nome'                    
                />
                
                <input 
                    className="h-10 px-3 py-[6px] rounded-[4px] outline-none w-full text-[15px] text-[#555555] bg-white shadow-form border border-[#ccc] xl:text-lg" 
                    placeholder='Email'
                    name="email"
                />
                <input 
                    className="h-10 px-3 py-[6px] rounded-[4px] outline-none w-full text-[15px] text-[#555555] bg-white shadow-form border border-[#ccc] xl:text-lg" 
                    placeholder='Telefono'
                    name="telefono"
                />
            </div>
            <div className='w-full'>
                <textarea 
                    className="px-3 py-[6px] rounded-[4px] outline-none w-full text-[15px] text-[#555555] bg-white shadow-form border border-[#ccc] xl:text-lg" 
                    rows={5}
                    placeholder='Il tuo messaggio...'
                    name="messaggio"
                />
            </div>
            <div className="self-center sm:self-end">
                <button className='bg-[#51b200] text-white  font-normal  rounded-[4px] py-[4px] px-5 lg:text-[20px]'>
                    Invia
                </button>
            </div>                       
        </form>
    </>)
}