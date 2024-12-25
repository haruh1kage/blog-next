import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from '@/components/nav-bar';

const LobsterRegular = localFont({
  src:'./fonts/LobsterRegular.ttf',
  variable: '--lobster-regular'
})

export const metadata: Metadata = {
  title: '空の箱...',
  description: `hako's personal page.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${LobsterRegular.variable} antialiased`}>
        <NavBar />
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
