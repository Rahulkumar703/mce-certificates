"use client"
import FormProvider from "@/context/FormProvider"
import UserProvider from "@/context/UserProvider"
import { ThemeProvider as NextThemesProvider } from "next-themes"

const Provider = ({ children }) => {



    return (
        <UserProvider>
            <FormProvider>
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                // disableTransitionOnChange
                >
                    {children}
                </NextThemesProvider>
            </FormProvider>
        </UserProvider>
    )
}
export default Provider
