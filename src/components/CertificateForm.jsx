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
import { useContext, useRef, useState } from "react";
import { FormContext } from "@/context/Context";
import { ArrowDownToLine, Loader, Wand2 } from "lucide-react";
import { toast } from "sonner";
import excelTOJson from "@/lib/excelToJson";
import { Label } from "./ui/label";
import FileSaver from "file-saver";
import { generateSIHCertificate } from "@/lib/certificates";

const CertificateForm = ({ ...props }) => {

    const { formState, setFormState } = useContext(FormContext);
    const [file, setFile] = useState(null);

    const fileInputRef = useRef(null)

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

    }

    const formSchema = z.object({
        name: z
            .string()
            .min(4, "Name must contain atleast 4 character")
            .optional()
            .or(z.literal('')),
        team: z
            .string()
            .min(4, "Team Name must contain atleast 4 character")
            .optional()
            .or(z.literal('')),
    });


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            team: "",
        },
    });

    const onSubmit = async (formData) => {

        const { name, team } = formData;

        if ((!name || !team) && !file)
            return toast.error('Either fill the form or upload excel file to generate certificate', { message: 'validation' })

        if (name) {
            setFormState(prev => ({ ...prev, certificateData: [{ ...formData }] }));
        }
        else if (file) {
            try {
                const FILETYPES = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

                excelTOJson(file, FILETYPES, (data) => {
                    const filteredData = data.map(d => {
                        return {
                            name: d.name,
                            team: d.team,
                        }
                    })
                    setFormState(prev => ({ ...prev, certificateData: filteredData }));
                });

            } catch (error) {
                toast.error(error.message, { message: 'excelToJson' });
            }
        }

        fileInputRef.current.value = "";
        setFile(null);
        // form.reset();

    }

    return (
        <>
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
                        <FormField
                            control={form.control}
                            name="team"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="capitalize" autoComplete="team" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <span className="w-full flex items-center justify-center text-lg relative before:absolute before:top-1/2 before:left-3 before:w-2/5 before:h-[2px] before:shadow-md before:-translate-y-1/2 before:bg-accent after:absolute after:top-1/2 after:right-3 after:w-2/5 after:h-[2px] after:shadow-md after:-translate-y-1/2 after:bg-accent">or</span>
                        <div className="space-y-2 w-full">
                            <Label htmlFor='excelFile' >Upload Excel File</Label>
                            <Input ref={fileInputRef} accept=".xlsx" id="excelFile" type="file" onChange={handleFileChange} />
                        </div>

                        <Button type="submit" className='mt-2 flex items-center gap-2'>
                            {
                                formState.loading ?
                                    <>
                                        <Loader size={20} className="animate-spin" />
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
                            formState.downloadUrl ?
                                <Button type="button" className='mt-2 flex items-center gap-2' variant="outline" onClick={() => { FileSaver.saveAs(formState.downloadUrl, 'MCE_SIH_Ceritficate') }}>
                                    <>
                                        <ArrowDownToLine size={20} />
                                        Download
                                    </>
                                </Button >
                                :
                                ''

                        }
                    </form>
                </Form>

            </section>
        </>

    )
}
export default CertificateForm