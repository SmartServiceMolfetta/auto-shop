


import Image from "next/image";
import logoImage from '@/public/logo.png'
import { TiShoppingCart } from "react-icons/ti";
import { FaRegBell, FaRegUser } from "react-icons/fa";

const Navbar = () => {
 

    return (
        <nav className="text-lg  shadow shadow-gray-300 w-100 px-6 md:px-auto">
            <div className="h-auto mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                <div className="  order-1 md:order-1">
                    <Image src={logoImage} alt="logo" className="w-20" priority/>  
                </div>           
                
                <div className="  order-2 md:order-3">
                    <ul className="flex items-center gap-4">
                        <li className="md:px-4 md:py-2 text-blueShop font-semibold uppercase"><a href="#about">Chi siamo</a></li>
                        <li className="md:px-4 md:py-2 text-blueShop font-semibold uppercase"><a href="#vetrina">vetrina</a></li>
                        <li className="md:px-4 md:py-2 text-blueShop font-semibold uppercase"><a href="#">Contatti</a></li>
                        <li><TiShoppingCart className="w-8 h-8 text-blueShop" /></li>
                        <li><FaRegBell className="w-8 h-8 text-blueShop" /></li>
                        <li><FaRegUser className="w-8 h-8 text-blueShop" /></li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}


export default Navbar;