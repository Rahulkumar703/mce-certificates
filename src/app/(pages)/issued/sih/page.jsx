"use client"

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateSIHCertificate } from "@/lib/certificates";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SihPage = () => {


    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true)
    const [generating, setGenerating] = useState(false);
    const [search, setSearch] = useState('');



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

    const filteredCertificates = certificates.filter(c => {
        return c.studentName.toLowerCase().startsWith(search) || c.teamName.toLowerCase().startsWith(search);
    });



    const genearteCertificate = async (certificate) => {
        try {
            setGenerating(true);

            const { certificateCategory, certificateNo, studentName, teamName } = certificate;
            const url = await generateSIHCertificate([{ id: `${certificateCategory}/${certificateNo < 10 ? '0' + certificateNo : certificateNo}`, name: studentName, team: teamName }]);

            return url;

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setGenerating(false);
        }
    }

    const downloadCertificate = async (certificate) => {
        const blobUrl = await genearteCertificate(certificate);

        // Create a link element
        const link = document.createElement('a');

        link.href = blobUrl;

        link.download = `MCE_SIH_${certificate.studentName}.pdf`;

        document.body.appendChild(link);

        link.click();

        // Remove the link from the document body
        document.body.removeChild(link);
    }
    const viewCertificate = async (certificate) => {
        const blobUrl = await genearteCertificate(certificate);

        // Open a new tab/window with the Blob URL
        window.open(blobUrl, '_blank');
    }

    return (
        <>
            <div className="my-10 sm:ml-auto sm:w-2/5 sm:min-w-[300px]">
                <h2 className="text-sm font-semibold pl-1 mb-1">Search a participant</h2>
                <Input placeholder="Participant or Team name" autoFocus type="search" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
            </div>
            <section className="flex flex-wrap gap-4 py-2 items-center justify-center transition-all">
                {
                    loading ?
                        <h1>Loading....</h1>
                        :
                        certificates.length ?
                            filteredCertificates.length ?
                                filteredCertificates?.map((data, index) => {
                                    return <Card key={index} className="w-96">
                                        <CardHeader>
                                            <CardTitle className='capitalize'>{data.studentName}</CardTitle>
                                            <CardTitle className='uppercase text-base text-foreground/70'>{data.teamName}</CardTitle>
                                            <CardDescription className='capitalize'><b>Certificate No.: </b>{data.certificateNo}</CardDescription>
                                            <CardDescription className="text-primary font-semibold">{data.certificateCategory}</CardDescription>
                                        </CardHeader>
                                        <CardFooter className="justify-between gap-2 ">
                                            <Button disabled={generating} variant="outline" className="whitespace-nowrap" onClick={() => downloadCertificate(data)}>
                                                Download Certificate
                                            </Button>
                                            <Button disabled={generating} className="whitespace-nowrap" onClick={() => viewCertificate(data)}>
                                                View Certificate
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                })
                                :
                                <h1>No Result Found</h1>
                            :
                            <h1>No Certificates are generated yet</h1>
                }
                {

                    // <Document file={formState?.url} onLoadSuccess={onDocumentLoadSuccess} className='w-full flex items-center justify-center py-8'>
                    //     <Page pageNumber={pageNumber} />
                    // </Document>
                }
            </section>
        </>

    )
}
export default SihPage