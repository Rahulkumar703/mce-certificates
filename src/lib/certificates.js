import { PDFDocument, StandardFonts, fontkit, rgb } from "pdf-lib";

export const genId = () => {
    return (new Date()).getTime();
}

export const generateSIHCertificate = async (data, id) => {

    const name = data?.name;
    if (!name) return null;

    const res = await fetch('/SIHTemplate.pdf');

    const pdfBuffer = await res.arrayBuffer();

    let pdfDoc = await PDFDocument.load(pdfBuffer)

    pdfDoc.registerFontkit(fontkit)

    const font = pdfDoc.embedStandardFont(StandardFonts.HelveticaBold);
    const idFont = pdfDoc.embedStandardFont(StandardFonts.TimesRoman);

    const pages = pdfDoc.getPages();


    pages[0].drawText(String(id), {
        x: 220,
        y: 50.5,
        size: 13,
        font: idFont,
        color: rgb(0, 0, 0),
        opacity: 1
    })

    pages[0].drawText(String(name).toUpperCase(), {
        x: 50,
        y: 342,
        size: 30,
        font: font,
        color: rgb(0, 0, 0)
    })

    // const SPOC = 'Pratik Ranjan'
    // const PRICIPAL = 'Abhay Kumar Jha'

    let width = font.widthOfTextAtSize(name.toUpperCase(), 30);

    pages[0].drawLine({
        start: { x: 48, y: 337 },
        end: { x: 55 + width, y: 337 },
        thickness: 2.5,
        color: rgb(0, 0, 0),
        opacity: .8,
    })

    const certificate = await pdfDoc.save();

    const bytes = new Uint8Array(certificate);
    const blob = new Blob([bytes], { type: "application/pdf", });

    let blobURL = URL.createObjectURL(blob);

    return blobURL;
}