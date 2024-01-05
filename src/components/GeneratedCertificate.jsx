"use client"

import { FormContext } from "@/context/Context"
import { generateSIHCertificate } from "@/lib/certificates";
import { useContext, useEffect, useState } from "react"
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { toast } from "sonner";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const GeneratedCertificate = ({ ...props }) => {


    const { formState, setFormState } = useContext(FormContext);

    useEffect(() => {
        async function generateCertificate() {

            try {
                setFormState(prev => ({ ...prev, loading: true }))

                const { certificateData } = formState;


                const res = await fetch('/api/certificates/sih', {
                    method: "POST",
                    body: JSON.stringify(certificateData)
                })

                const data = await res.json();


                if (data.success) {
                    const url = await generateSIHCertificate(data.certificates);

                    setFormState(prev => ({ ...prev, blobUrl: certificateData.length === 1 ? url : null, downloadUrl: url }))
                }
                toast[data.type](data.message, { message: 'generateCertificate' });

            } catch (error) {
                toast.error(error.message, { message: 'generateCertificateError' });
            }
            finally {
                setFormState(prev => ({ ...prev, loading: false }))
            }

        }

        formState.certificateData.length && generateCertificate();

    }, [formState.certificateData])


    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }



    return (
        <section {...props}>
            {
                formState.blobUrl ?
                    <Document file={formState.blobUrl} onLoadSuccess={onDocumentLoadSuccess} className='w-full flex items-center justify-center py-8'>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    :
                    formState.downloadUrl ?
                        <div className="flex flex-col items-start justify-center text-center text-2xl">
                            <h1 className="w-full">Preview is currently Not Available for multiple Certificates</h1>
                            <p className="w-full">Certificates are generated and ready for download</p>
                        </div>
                        :
                        <h1 className="text-2xl">Import Excel file or enter a name to generate Certificate</h1>

            }
        </section>
    )
}
export default GeneratedCertificate