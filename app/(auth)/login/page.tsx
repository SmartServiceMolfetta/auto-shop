//import { LoginButton } from "@/components/login-button";
import Image from "next/image";
import logoImage from '@/public/logo.png'
import Link from "next/link";
import { LoginForm } from "@/components/form-login";
//import { loginUserAction } from "@/app/(user)/action";

export default async function LoginPage() {
    

    return (
        <div className="flex justify-center mt-10">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md md:min-w-96"> 
                <Link href="/" className="flex justify-center">
                    <Image src={logoImage} alt="logo" className="w-20" priority/>
                </Link> 
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200 py-4">
                    Accedi ad Auto-Shop.it
                </h1>
                <LoginForm />
            </div>
        </div>
      );
    
}