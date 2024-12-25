import SwitchThemeButton from '@/app/_components/switch-theme-button';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Projects',
    href: 'projects',
  },
];

export default function NavBar() {
  return (
    <header className="p-4 flex justify-between items-center h-[80px] w-full fixed top-0 right-0 tranparent-nav-bar">
      <div>
        <Link href="/">
          <Image
            className="rounded-lg"
            src="/nina3.jpg"
            alt="nina logo"
            width={48}
            height={48}
          />
        </Link>
      </div>
      <div className="h-full">
        <nav className="flex items-center gap-8 font-bold h-full">
          {links.map(({ title, href }) => (
            <Link
              className="block relative h-full leading-[48px] hover:text-blue-400 transition-colors duration-300 after:transition-opacity after:duration-300 after:opacity-0 after:w-[18px] after:h-[18px] after:block hover:after:opacity-100 after:bg-[url(/sparkles.svg)] after:bg-cover  after:absolute after:top-2  after:left-[-12px]"
              href={href}
              key={href}
            >
              {title}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <SwitchThemeButton />
      </div>
    </header>
  );
}
