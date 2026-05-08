import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Mail, Lock, User, Briefcase } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'murid'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: formData.role
          }
        }
      });

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-soft border border-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 bg-secondary text-primary-dark rounded-xl flex items-center justify-center shadow-soft mx-auto mb-4">
            <User size={24} />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Buat Akun Baru</h2>
          <p className="mt-2 text-sm text-slate-600">
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
              
              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Daftar Sebagai</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer border rounded-xl p-3 text-center transition-colors ${formData.role === 'murid' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                    <input type="radio" name="role" value="murid" checked={formData.role === 'murid'} onChange={handleChange} className="hidden" />
                    <span className="font-medium">Murid / Alumni</span>
                  </label>
                  <label className={`cursor-pointer border rounded-xl p-3 text-center transition-colors ${formData.role === 'guru' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                    <input type="radio" name="role" value="guru" checked={formData.role === 'guru'} onChange={handleChange} className="hidden" />
                    <span className="font-medium">Guru / BKK</span>
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full py-3" disabled={loading}>
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
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
