"use client"

import { useContext, useState } from "react"
import { Button } from "./ui/button"
import { UserContext } from "@/context/Context"
import { LogIn, LogOut, } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

const LoginBtn = () => {


    const { setUserState, userState } = useContext(UserContext);
    const pathname = usePathname();
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const logout = async () => {
        try {
            setLoading(true);

            const res = await fetch('/api/logout');

            const data = await res.json();

            if (data.success) {
                setUserState({ firstName: '', lastName: '', loggedIn: false, id: '' })
                router.refresh();
            }
            toast[data.type](data.message, { id: 'loggedOut' })

        } catch (error) {
            toast.error(error.message, { id: 'logOutError' })
        }
        finally {

            setLoading(false);
        }

    }

    return (
        userState.loggedIn ?
            <DropdownMenu className='right-2'>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src={`https://api.multiavatar.com/${userState.firstName}.svg`} />
                        <AvatarFallback className="uppercase">{`${userState.firstName?.at(0)}${userState.lastName?.at(0)}`}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href={'/profile'} className={`flex gap-2 items-center`} >
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <Link href={'/dashboard'}>
                            <DropdownMenuItem className={`flex gap-2 items-center`}>
                                Dashboard
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <Button onClick={!loading && logout} asChild>
                        <DropdownMenuItem className="bg-destructive text-destructive-foreground flex gap-2 items-center">
                            <LogOut size={15} />
                            Log out
                        </DropdownMenuItem>
                    </Button>
                </DropdownMenuContent>
            </DropdownMenu>
            :
            pathname === '/login'
                ?
                null
                :
                <Link href={'/login'}>
                    <Button className="flex gap-2">
                        <LogIn size={20} />
                        Login
                    </Button>
                </Link>
    )
}
export default LoginBtn