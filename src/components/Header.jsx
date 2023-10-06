import Link from 'next/link'
import Image from 'next/image'
import ThemeToggler from './Theme'
import LoginBtn from './LoginBtn'



const Header = () => {
    return (
        <header className='flex h-20 shadow-md border border-b sticky top-0 left-0 bg-background z-50 py-2'>
            <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between p-2">
                <Link href={'/'} className='flex gap-1 items-center' >
                    <Image src='/logo.png' width={100} height={100} className='w-14 h-auto p-1' alt="logo" />
                    <h1 className='text-xl font-semibold'>Motihari College of Engineering</h1>
                </Link>
                <nav className='flex gap-4'>
                    <ThemeToggler />
                    <LoginBtn />
                </nav>
            </div>
        </header>
    )
}
export default Header