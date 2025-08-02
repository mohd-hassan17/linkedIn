'use client'

import Image from "next/image";
import SearchInput from "./SearchInput";
import NavItems from "./NavItems";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {

    const { data: session } = useSession();

    return(
        <div className='fixed w-full bg-white z-50 shadow-sm overflow-visible'>
            <div className=' flex items-center max-w-6xl justify-between h-14 mx-auto px-3'>
                <div className='flex items-center gap-2'>
                    <Image
                        src={'/linkedin.png'}
                        alt="Logo"
                        width={35}
                        height={35}
                    />
                    <div className='md:block hidden'>
                        <SearchInput />
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='md:block hidden'>
                        <NavItems />
                    </div>
                    <div>
                       {!session?.user ? (
        <div className="flex items-center gap-3">
          <button
             style={{ backgroundColor: "#4c6ed3ff" }}
            className="
        px-5 py-2 text-sm font-medium text-white rounded-lg
        transition-all duration-200 ease-in-out
        hover:opacity-90 hover:shadow-md hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        active:scale-95
      "
            >
            <Link href={'/login'}>
              Sign In
            </Link>
          </button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative group focus:outline-none cursor-pointer">
              <Image
                src={session.user.image || "/placeholder.png"}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full transition-transform duration-200 ease-out group-hover:scale-105 group-hover:shadow-sm"
              />
            </button>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-3">
            <DropdownMenuLabel className="font-semibold">
              {session.user.name}
            </DropdownMenuLabel>
            <DropdownMenuItem className="text-xs text-muted-foreground">
              {session.user.email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="cursor-pointer text-red-600 hover:bg-red-50"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;