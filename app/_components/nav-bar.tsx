import Image from "next/image"
import Link from "next/link"
import SwitchThemeButton from "./switch-theme-button"

const links = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: 'blog' },
    { name: 'About', href: 'about' }
]

export default function NavBar() {
    return (
        <header className="sticky top-0 py-4 mx-4 lg:px-8 lg:mx-0">
            <div className="flex items-center justify-between ">
                <div className="overflow-hidden rounded-xl w-[45px]">
                    <Link href="/">
                        <Image src="/anon.jpg" width={50} height={40} quality={100} alt="chihaya anon" />
                    </Link>
                </div>
                <nav>
                    <ul className="hidden md:flex rounded-full border border-theme">
                        {links.map(({ name, href }) => <li><Link className="mx-2 py-2 px-4 block" href={href} key={href}>{name}</Link></li>)}
                    </ul>
                </nav>
                <div className="hidden md:flex">
                    <SwitchThemeButton />
                </div>
                <div className="md:hidden">=</div>
            </div>

        </header>
    )
}