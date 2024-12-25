import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from '@/components/nav-bar';

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
      <body className={`antialiased`}>
        <NavBar />
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
