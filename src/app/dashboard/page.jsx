import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

const DashboardPage = () => {

    const cards = [
        {
            title: 'SIH',
            description: 'Generate participation certificates for Smart India Hackathon',
            issuelink: 'issue/sih',
            issuedlink: 'issued/sih'
        },
    ]


    return (
        <div className="flex flex-wrap gap-4 py-2 items-center justify-center">
            {
                cards.map((card, index) => (
                    <Card key={index} className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="justify-between gap-2 ">
                            <Link href={card.issuedlink}>
                                <Button variant="outline" className="whitespace-nowrap">
                                    View issued Certificates
                                </Button>
                            </Link>
                            <Link href={card.issuelink}>
                                <Button className="whitespace-nowrap">
                                    Issue a New Certificate
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}
export default DashboardPage