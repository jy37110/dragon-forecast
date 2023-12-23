import Link from 'next/link';
import React from 'react';

export default function LoginPage() {
  return (
    <div>
      <h2>Login</h2>
      <a href="api/auth/login">Login</a>
      <Link href="/">Home</Link>
    </div>
  );
}
