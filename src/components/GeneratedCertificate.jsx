"use client"

import { FormContext } from "@/context/Context"
import { genId, generateSIHCertificate } from "@/lib/certificates";
import { useContext, useEffect, useState } from "react"
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { toast } from "sonner";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const GeneratedCertificate = ({ ...props }) => {


    const { formState, setFormState } = useContext(FormContext);

    useEffect(() => {

        async function generateCertificate() {

            try {
                setFormState(prev => ({ ...prev, loading: true }))
                const id = genId();
                const res = await fetch('/api/certificates/sih', {
                    method: "POST",
                    body: JSON.stringify({ name: formState.certificateData?.name, certificateId: id })
                })

                const data = await res.json();

                toast[data.type](data.message);

                if (data.success) {

                    const url = await generateSIHCertificate(formState.certificateData, id);

                    if (url)
                        setFormState(prev => ({ ...prev, url }));
                }

            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setFormState(prev => ({ ...prev, loading: false }))
            }

        }
        formState.certificateData?.name && generateCertificate();

    }, [formState.certificateData?.name])


    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }



    return (
        <section {...props}>
            {
                formState?.url ?
                    <Document file={formState?.url} onLoadSuccess={onDocumentLoadSuccess} className='w-full flex items-center justify-center py-8'>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    :
                    <h1>Enter the Participant name to generate Certificate</h1>
            }
        </section>
    )
}
export default GeneratedCertificate