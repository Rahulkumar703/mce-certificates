import CertificateForm from "@/components/CertificateForm"
import GeneratedCertificate from "@/components/GeneratedCertificate"

const SihPage = () => {
    return (
        <section className="flex flex-col lg:flex-row gap-4 min-h-[calc(100dvh-8.5rem)] relative">
            <GeneratedCertificate className={'order-2 lg:order-1 flex-1 flex items-center justify-center rounded'} />
            <CertificateForm className={'order-1 min-w-[30%] space-y-8 flex flex-col relative'} />
        </section>
    )
}
export default SihPage