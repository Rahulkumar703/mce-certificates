"use client"
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Input } from "./ui/input";
import * as  z from "zod";
import { useContext } from "react";
import { FormContext } from "@/context/Context";
import { ArrowDownToLine, Loader, Wand2 } from "lucide-react";

const CertificateForm = ({ ...props }) => {

    const { formState, setFormState } = useContext(FormContext);

    const formSchema = z.object({
        name: z.string().min(3, {
            message: "Name must be at least 3 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (formData) => {
        if (formData?.name !== formState?.certificateData?.name)
            setFormState(prev => ({ ...prev, certificateData: formData }));

        form.reset();
    }

    return (
        <section {...props}>
            <Form {...form}>
                <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 sticky top-[5.5rem]">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Participant Name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="capitalize" autoComplete="name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='mt-2 flex items-center gap-2'>
                        {
                            formState.loading ?
                                <>
                                    <Loader size={20} />
                                    Please wait...
                                </>
                                :
                                <>
                                    <Wand2 size={20} />
                                    Generate Certificate
                                </>
                        }
                    </Button>
                    {
                        formState?.url ?
                            <Button asChild variant="outline">
                                <a
                                    href={formState.url}
                                    download={`sih-mce-${formState.certificateData.name}`}
                                    className={'flex gap-2 items-center'}
                                >
                                    <ArrowDownToLine size={20} />
                                    Download
                                </a>
                            </Button >
                            :
                            ''

                    }
                </form>
            </Form>
        </section>


    )
}
export default CertificateForm