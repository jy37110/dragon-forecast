import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import BottomNav from './components/BottomNav';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dragon Forecast',
  description: 'Internal used app for panda family',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="minimum-scale=1" />
      <body className={inter.className}>
        <UserProvider>
          <Providers>
            <main className="container mx-auto bg-black w-full flex flex-col justify-between h-full text-gray-700 pb-[84px]">
              {children}
              <BottomNav />
            </main>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
