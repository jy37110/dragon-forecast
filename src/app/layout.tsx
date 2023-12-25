import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Providers } from './providers';
import BottomNav from './components/BottomNav';

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
      <body className={inter.className}>
        <UserProvider>
          <Providers>
            <main className="container mx-auto bg-sky-200 w-full flex flex-col justify-between h-full text-gray-700">
              {children}
              <BottomNav />
            </main>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
