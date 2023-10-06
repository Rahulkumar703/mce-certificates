"use client"
import { useTheme } from "next-themes"
import { Toaster } from "sonner"
const ToastContainer = () => {

    const { resolvedTheme } = useTheme();

    return (
        <Toaster
            theme={resolvedTheme}
            richColors
        />
    )
}
export default ToastContainer