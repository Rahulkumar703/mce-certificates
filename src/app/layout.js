
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './Provider'
import Header from '@/components/Header'
import { Toaster } from 'sonner'
import ToastContainer from '@/components/ToastContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MCE | Certificates',
  description: 'Certificate Generation App MCE Motihari.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <Header />
          <main className='w-full max-w-[1200px] mx-auto flex flex-col min-h-[calc(100dvh-7.25rem)] p-2'>
            {children}
          </main>
          <footer className='w-full max-w-[1200px] mx-auto flex items-center justify-center h-9 '>Made with ❤️ by MCEian</footer>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  )
}
