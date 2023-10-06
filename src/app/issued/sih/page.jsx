"use client"

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SihPage = () => {


    const [certificates, setCertificates] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/certificates/sih`);
                const data = await res.json();
                if (data.success) {
                    setCertificates(data.certificates);
                }
                toast[data.type](data.message);
            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])



    return (
        <section className="flex flex-wrap gap-4 py-2 items-center justify-center">
            {
                loading ?
                    <h1>Loading....</h1>
                    :
                    certificates.length ?
                        certificates?.map((data, index) => {
                            return <Card key={index}>
                                <CardHeader>
                                    <CardTitle className='capitalize'>{data.studentName}</CardTitle>
                                    <CardDescription className='capitalize'>{data.certificateNo}</CardDescription>
                                </CardHeader>
                                <CardFooter className="justify-between gap-2 ">
                                    <Link href={''}>
                                        <Button variant="outline" className="whitespace-nowrap">
                                            Download Certificate
                                        </Button>
                                    </Link>
                                    <Link href={''}>
                                        <Button className="whitespace-nowrap">
                                            View Certificate
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        })
                        :
                        <h1>No Certificates are generated yet</h1>
            }
            {

                // <Document file={formState?.url} onLoadSuccess={onDocumentLoadSuccess} className='w-full flex items-center justify-center py-8'>
                //     <Page pageNumber={pageNumber} />
                // </Document>
            }
        </section>
    )
}
export default SihPage