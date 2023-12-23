import Link from 'next/link';
import { RedirectType, redirect } from 'next/navigation';

export default async function Home() {
  redirect('/dashboard', RedirectType.replace);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Home</h2>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/login">Login</Link>
    </main>
  );
}
