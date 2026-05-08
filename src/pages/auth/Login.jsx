import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Mail, Lock, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Safe auth extraction to prevent blank screen
  const auth = useAuth();
  
  // Redirect if already logged in  
  React.useEffect(() => {
    if (auth && auth.user) {
      navigate('/profile');
    }
  }, [auth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Login berhasil!');
      navigate('/');
    } catch (err) {
      if (err.message === 'Email not confirmed') {
        toast.error('Email belum diverifikasi. Silakan cek Inbox/Spam di email Anda untuk link verifikasi.', { duration: 6000 });
      } else if (err.message === 'Invalid login credentials') {
        toast.error('Email atau password salah. Silakan coba lagi.');
      } else {
        toast.error(err.message || 'Gagal login. Cek kembali email dan password Anda.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-soft border border-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-soft mx-auto mb-4">
            <Briefcase size={24} />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Selamat Datang Kembali</h2>
          <p className="mt-2 text-sm text-slate-600">
            Masuk untuk melanjutkan ke Portal Kerja Wikrama
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              required
              icon={Mail}
              placeholder="email@smkwikrama.sch.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              required
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                Ingat saya
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-dark">Lupa password?</a>
            </div>
          </div>

          <Button type="submit" className="w-full py-3" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
