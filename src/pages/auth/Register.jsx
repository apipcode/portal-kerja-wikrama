import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Mail, Lock, User, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'murid',
    honeypot: '' // Anti-spam
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  // Safe auth extraction to prevent blank screen
  const auth = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (auth && auth.user) {
      navigate('/profile');
    }
  }, [auth, navigate]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;
    
    // 1. Anti-Spam Honeypot Check
    if (formData.honeypot) {
      setError('Aktivitas mencurigakan terdeteksi.');
      setCooldown(30);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 2. Cek duplikasi Nama Lengkap di tabel profiles (Username Uniqueness)
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .ilike('full_name', formData.fullName)
        .single();
        
      if (existingUser) {
        throw new Error('Nama ini sudah digunakan. Silakan tambahkan angka atau nama belakang unik.');
      }

      // 3. Register user (Email uniqueness handled by Supabase)
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: 'murid' // Force murid role
          },
          emailRedirectTo: import.meta.env.PROD 
            ? 'https://portal-kerja-wikrama.vercel.app/login' 
            : 'http://localhost:5173/login'
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          throw new Error('Email ini sudah terdaftar.');
        }
        throw signUpError;
      }
      
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Gagal mendaftar. Silakan coba lagi.');
      setCooldown(30); // 30s Cooldown on failure to prevent spam
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-700">
        <div className="text-center">
          <div className="w-12 h-12 bg-secondary text-primary-dark rounded-xl flex items-center justify-center shadow-soft mx-auto mb-4">
            <User size={24} />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">Buat Akun Baru</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Bergabunglah dengan ekosistem karir Wikrama
          </p>
        </div>
        
        {success ? (
          <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center border border-green-100">
            <h3 className="font-bold text-lg mb-2">Registrasi Berhasil!</h3>
            <p className="text-sm">Silakan login menggunakan kredensial Anda. Mengalihkan...</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              {/* Honeypot Field (Hidden from normal users) */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="honeypot" tabIndex="-1" autoComplete="off" value={formData.honeypot} onChange={handleChange} />
              </div>

              <Input
                label="Nama Lengkap"
                name="fullName"
                required
                icon={User}
                placeholder="Budi Santoso"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                required
                icon={Mail}
                placeholder="email@smkwikrama.sch.id"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                required
                icon={Lock}
                placeholder="Minimal 6 karakter"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
              />
            </div>

            <Button type="submit" className="w-full py-3" disabled={loading || cooldown > 0}>
              {loading ? 'Memproses...' : cooldown > 0 ? `Tunggu ${cooldown} detik` : 'Daftar Sekarang'}
            </Button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-slate-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
