'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { username, password, redirect: false });
    if (res?.error) {
      setError('Identifiants incorrects');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">CAP&apos;AUT<span>O</span></div>
        <p className="login-sub">Espace Administration</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="login-field"><label>Identifiant</label><input required value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" /></div>
          <div className="login-field"><label>Mot de passe</label><input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></div>
          <button type="submit" className="btn btn-red login-btn" disabled={loading}>{loading ? 'Connexion...' : 'Se connecter'}</button>
        </form>
      </div>
    </div>
  );
}
