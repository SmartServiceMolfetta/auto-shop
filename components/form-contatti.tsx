'use client'




 

 

export default function ContattiForm() {
     

    

 

    return (<>     
        <h2 className="font-semibold text-3xl text-center my-5">Richiedi Info</h2>   
        <form  className='flex flex-col  gap-2 w-full p-2 md:py-10 md:px-14'>
            <div className='flex flex-col gap-2 sm:flex-row sm:gap-4  w-full'>
                <input 
                    name="nome"
                    className="px-3 py-[6px] rounded-[4px] outline-none w-full text-[15px] text-[#555555] bg-white shadow-form border border-[#ccc] xl:text-[1.8vw]" 
                    placeholder='Il tuo nome'                    
                />
                <input 
                    className="px-3 py-[6px] rounded-[4px] outline-none w-full text-[15px] text-[#555555] bg-white shadow-form border border-[#ccc] xl:text-[1.8vw]" 
                    placeholder='Email'
                    name="email"
                />
                <input 
                    className="px-3 py-[6px] rounded-[4px] outline-none w-full text-[15px] text-[#555555] bg-white shadow-form border border-[#ccc] xl:text-[1.8vw]" 
                    placeholder='Telefono'
                    name="telefono"
                />
            </div>
            <div className='w-full'>
                <textarea 
                    className="px-3 py-[6px] rounded-[4px] outline-none w-full text-[15px] text-[#555555] bg-white shadow-form border border-[#ccc] xl:text-[1.8vw]" 
                    placeholder='Il tuo messaggio...'
                    name="messaggio"
                />
            </div>
            <div>
                <button className='bg-[#51b200] text-white  font-normal min-w-[120px] rounded-[4px] py-[6px] px-3 lg:text-[30px]'>
                    Login
                </button>
            </div>                       
        </form>
    </>)
}