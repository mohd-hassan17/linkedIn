'use client'

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";


function LoginPage() {
    
    const [providers, setProviders] = useState<any>(null);
    const router = useRouter();

    const { data: session } = useSession();

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (

     <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center text-black">
                    Welcome to LinkedIn
                </h1>
                {/* Social Providers */}
                <div className="mt-6 space-y-3 mb-3">
                    {providers &&
                        Object.values(providers)
                            .filter((provider: any) => provider.id !== "credentials")
                            .map((provider: any) => (
                                <button
                                    key={provider.name}
                                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                                    className="w-full py-2 px-4 flex items-center justify-center gap-2 border border-gray-300 rounded-md text-black font-medium hover:bg-gray-200 transition-all duration-200"
                                >
                                    {provider.id === "google" && <FcGoogle size={20} />}
                                    {provider.id === "github" && <FaGithub size={20} />}
                                    <span className="text-sm">Continue with {provider.name}</span>
                                </button>
                            ))}
                </div>
            </div>
        </div>
                   </>    
    );
}

export default LoginPage;
