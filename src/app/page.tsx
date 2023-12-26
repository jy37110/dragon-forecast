import { RedirectType, redirect } from 'next/navigation';

export default async function Home() {
  redirect('/dashboard', RedirectType.replace);
}
