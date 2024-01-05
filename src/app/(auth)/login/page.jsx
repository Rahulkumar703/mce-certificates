"use client"
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import * as  z from "zod";
import { useContext, useState } from "react";
import { UserContext } from "@/context/Context";
import { Loader, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {

    const router = useRouter();

    const { userState, setUserState } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        email: z.string().min(3, {
            message: "First Name must be at least 3 characters.",
        }).email('Please enter a valid email.'),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: "",
        },
    });

    const onSubmit = async (formData) => {


        try {

            setLoading(true);

            const { email, password } = formData;

            const res = await fetch('/api/login', {
                method: "POST",
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();

            if (data.success) {
                setUserState(prev => ({ ...prev, loggedIn: true, ...data.user }));
                router.push('/dashboard');
            }

            toast[data.type](data.message, { id: 'loggedIn' })
            // form.reset();

        } catch (error) {
            toast.error(error.message, { id: 'loggInError' })
        }
        finally {

            setLoading(false);
        }

    }

    return (
        <Form {...form} >
            <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg shadow-lg w-3/4 max-w-lg flex flex-col gap-2 bg-accent px-5 py-10">
                <FormLabel>
                    <h1 className="text-2xl mb-4 font-bold">Welcome Back</h1>
                </FormLabel>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl>
                                <Input type="text" autoComplete="email" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input type="password" autoComplete="password" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    loading ?
                        <Button disabled type="submit" className='mt-2 flex items-center gap-2' >
                            <Loader className="animate-spin" size={20} />
                            Please wait...
                        </Button>
                        :
                        <Button type="submit" className='mt-2 flex items-center gap-2' >
                            <LogIn size={20} />
                            Login
                        </Button>
                }
                {/* <div className="pt-2 ml-auto flex items-center gap-2">
                    <label>not registered ?</label>
                    <Link href={'/signup'} className="text-blue-500 hover:underline">Create an Account</Link>
                </div> */}
            </form>
        </Form>
    )
}
export default LoginPage