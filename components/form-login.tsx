"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Spinner } from "./spinner";
import { loginUserAction } from "@/app/(user)/action";
import { useRouter } from 'next/navigation';



export const LoginForm = () => {

  const { pending } = useFormStatus();

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();    

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const result = await loginUserAction(formData);

    if (result.data?.success) {
      console.log(result.data);  
      localStorage.setItem('user', JSON.stringify({ username: result.data.username, ruolo: result.data.ruolo })); 
      router.push('/');
    } else {
      console.error(result.error); 
    }

  }


  return (
    <form  onSubmit={handleSubmit}  >
        <div className="mb-4">
        <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
            Email Address
        </label>
        <input
            type="text"
            id="username"
            name="username"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="username"
            required
        />
        </div>
        <div className="mb-4">
        <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
            Password
        </label>
        <input
            type="password"
            name="password"
            id="password"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
        />
        </div>
        <div className="flex items-center justify-between mb-4">
        <div className="flex items-center"></div>
        <a
            href="/register"
            className="text-xs text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
            Create Account
        </a>
        </div>
        <Button type="submit" className="space-x-2 bg-orange-400 hover:bg-orange-400/80  ">
          <span>Login</span>
          {pending && <Spinner />}
        </Button>
        {/* <LoginButton text={'Login'}/>  */} 
    </form>
  )
}
