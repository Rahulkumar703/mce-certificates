import JSZip from "jszip";
import { PDFDocument, StandardFonts, fontkit, rgb } from "pdf-lib";

export const genId = () => {
    return (new Date()).getTime();
}

const generateSinglePDF = async (data) => {
    const res = await fetch('/SIHTemplate.pdf');
    const pdfBuffer = await res.arrayBuffer();

    let pdfDoc = await PDFDocument.load(pdfBuffer)
    pdfDoc.registerFontkit(fontkit)
    const boldFont = pdfDoc.embedStandardFont(StandardFonts.TimesRomanBold);
    const pages = pdfDoc.getPages();

    let { name, team, id } = data;


    pages[0].drawText(String(name).toUpperCase(), {
        x: 48,
        y: 378,
        size: 25,
        font: boldFont,
        color: rgb(0, 0, 0)
    })

    pages[0].drawText(String(team).toUpperCase(), {
        x: 143,
        y: 322,
        size: 18,
        font: boldFont,
        color: rgb(0, 0, 0),
    })

    pages[0].drawText(String(`${id}`), {
        x: 145,
        y: 59,
        size: 13,
        font: boldFont,
        color: rgb(0, 0, 0),
        opacity: 1
    })

    const certificate = await pdfDoc.save();
    const bytes = new Uint8Array(certificate);

    const blob = new Blob([bytes], { type: "application/pdf" });

    const blobURL = URL.createObjectURL(blob);

    return blobURL;
}

export const generateSIHCertificate = async (data) => {
    const length = data.length;
    if (!length) return null;

    if (length === 1) {
        return generateSinglePDF(data[0]);
    } else {
        const zip = new JSZip();

        for (const d of data) {
            const blobURL = await generateSinglePDF(d);

            const response = await fetch(blobURL);
            const pdfBlob = await response.blob();

            zip.file(`MCE_SIH_${d.name}.pdf`, pdfBlob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });

        const zipBlobURL = URL.createObjectURL(zipBlob);

        return zipBlobURL;
    }
}
