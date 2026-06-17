'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        // In a real app, set HttpOnly cookie. For this demo, we use localStorage/cookies
        document.cookie = `token=${data.access_token}; path=/;`;
        router.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-border-blue w-full max-w-md">
        <h1 className="font-poppins font-bold text-2xl text-primary mb-2 text-center">Creator Studio</h1>
        <p className="text-on-surface-variant text-sm text-center mb-6">Welcome back! Please login.</p>
        
        {error && <div className="mb-4 text-xs text-red-500 bg-red-50 p-2 rounded">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-border-blue rounded-xl focus:outline-none focus:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-border-blue rounded-xl focus:outline-none focus:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 mt-2">
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-on-surface-variant">
          Don't have an account? <Link href="/register" className="text-primary font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
}
