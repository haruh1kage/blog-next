import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from '@/components/nav-bar';

const LobsterRegular = localFont({
  src: './fonts/LobsterRegular.ttf',
  variable: '--lobster-regular',
});

const PixelifySansRegular = localFont({
  src: './fonts/PixelifySans-Regular.ttf',
  variable: '--pixelify-sans-regular',
});

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
      <body
        className={`${LobsterRegular.variable} ${PixelifySansRegular.variable} antialiased`}
      >
        <NavBar />
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
