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
import { useState } from "react";
import { Loader, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        firstName: z.string().min(3, {
            message: "First Name must be at least 3 characters.",
        }),
        lastName: z.string().min(3, {
            message: "Last Name must be at least 3 characters.",
        }),
        email: z.string().min(5, {
            message: "Email must be at least 3 characters.",
        }).email('Please enter a valid email.'),
        phone: z.preprocess(
            (a) => parseInt(z.string().parse(a), 10), z.number().min(10, {
                message: 'Pease enter a valid phone number.'
            })
        ),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"],
        });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
    });

    const onSubmit = async (formData) => {

        console.log(formData);

        try {

            setLoading(true);

            const { firstName, lastName, email, phone, password } = formData;

            const res = await fetch('/api/signup', {
                method: "POST",
                body: JSON.stringify({ firstName, lastName, email, phone, password })
            })

            const data = await res.json();
            if (data.success) {
                router.push('/login');
            }

            toast[data.type](data.message, { id: 'signedUp' })
            // form.reset();

        } catch (error) {
            toast.error(error.message, { id: 'signUpError' })
        }
        finally {

            setLoading(false);
        }

    }

    return (
        <Form {...form} >
            <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg shadow-lg w-3/4 max-w-lg flex flex-col items-center gap-2 bg-accent px-5 py-10">
                <h1>Signups Not Allowed</h1>
                {/* <FormLabel>
                    <h1 className="text-2xl mb-4 font-bold">Create an Account</h1>
                </FormLabel>
                <div className="flex gap-2 flex-1">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input type="text" autoComplete="firstName" {...field} disabled={loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input type="text" autoComplete="lastName" {...field} disabled={loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" autoComplete="email" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="number" autoComplete="phone" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2 flex-1">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" autoComplete="password" {...field} disabled={loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Re-enter Password</FormLabel>
                                <FormControl>
                                    <Input type="password" autoComplete="password" {...field} disabled={loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {
                    loading ?
                        <Button disabled type="submit" className='mt-2 flex items-center gap-2' >
                            <Loader className="animate-spin" size={20} />
                            Please wait...
                        </Button>
                        :
                        <Button type="submit" className='mt-2 flex items-center gap-2' >
                            <LogIn size={20} />
                            Create Account
                        </Button>
                }
                <div className="pt-2 ml-auto flex items-center gap-2">
                    <label>already registered ?</label>
                    <Link href={'/login'} className="text-blue-500 hover:underline">Login</Link>
                </div> */}
            </form>
        </Form>
    )
}
export default SignupPage