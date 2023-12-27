import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import BottomNav from './components/BottomNav';
import Providers from './providers';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

dayjs.extend(LocalizedFormat);
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
            <main className="container mx-auto bg-gray-600 w-full flex flex-col justify-between h-full text-white pb-[104px]">
              {children}
              <BottomNav />
            </main>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
