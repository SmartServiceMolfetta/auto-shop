

import Image from "next/image";
import heroImage from '@/public/hero.png'

export default function MainUser() {
    return (<>

      <div className="border border-red-500">
        <section className="relative  w-full h-[500px]  border-2 border-yellow-400">  {/* Hero section */}
          <Image 
            src={heroImage} 
            alt="heroImage" 
            className="lg:hidden p-1 sm:p-2 "
          />
          <Image 
            src={heroImage} 
            alt="heroImage" 
            className="hidden lg:block p-5" 
            fill    
            style={{
              objectFit: "cover",
              objectPosition: "50% 15%", 
            }}  
          />
          <div className="absolute top-0 bottom-0 left-0 w-[15%] bg-gradient-to-r from-black/30 via-transparent to-transparent blur-md pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-[15%] bg-gradient-to-l from-black/30 via-transparent to-transparent blur-md pointer-events-none"></div>
  
        </section>
        {"HOME --> USER"}
      </div>
      
      </>);
}

