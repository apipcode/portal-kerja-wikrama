import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import CVUpload from '../components/common/CVUpload';
import { User, Book, FileText, Camera, Link as LinkIcon, BadgeCheck } from 'lucide-react';

const Profile = () => {
  const { user, profile, setProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    jurusan: '',
    avatar_url: '',
    portfolio_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        jurusan: profile.jurusan || '',
        avatar_url: profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name?.replace(' ', '+')}&background=1e3a8a&color=fff`,
        portfolio_url: profile.portfolio_url || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const updates = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      if (data) {
        setProfile(data);
      } else {
         setProfile({ ...profile, ...updates });
      }
      
      setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal memperbarui profil: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-slate-900 transition-colors">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-light h-32 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <img 
                src={formData.avatar_url || `https://ui-avatars.com/api/?name=${formData.full_name}&background=1e3a8a&color=fff`} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 object-cover bg-white"
              />
              <button className="absolute bottom-0 right-0 p-1.5 bg-secondary text-primary-dark rounded-full shadow-sm hover:scale-105 transition-transform">
                <Camera size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{profile?.full_name || 'User'}</h1>
                {profile?.verified_status && (
                  <div className="text-blue-500" title="Akun Terverifikasi BKK">
                    <BadgeCheck size={24} />
                  </div>
                )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 capitalize">{profile?.role || 'Member'} • SMK Wikrama Bogor</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>Kembali ke Beranda</Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {message.text && (
              <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nama Lengkap"
                name="full_name"
                icon={User}
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              <Input
                label="Jurusan"
                name="jurusan"
                icon={Book}
                placeholder="Contoh: PPLG"
                value={formData.jurusan}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio Singkat</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  name="bio"
                  rows="4"
                  className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white dark:bg-slate-700 dark:text-white border py-2.5 pl-10 pr-4 placeholder:text-slate-400 outline-none"
                  placeholder="Ceritakan sedikit tentang keahlian dan pengalamanmu..."
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Input
              label="URL Portfolio (GitHub/Behance)"
              name="portfolio_url"
              icon={LinkIcon}
              placeholder="https://github.com/username"
              value={formData.portfolio_url}
              onChange={handleChange}
            />

            <Input
              label="URL Foto Profil"
              name="avatar_url"
              icon={Camera}
              placeholder="https://example.com/photo.jpg"
              value={formData.avatar_url}
              onChange={handleChange}
            />

            <div className="pt-4 flex gap-4">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </div>
          </form>

          {/* CV Upload Section for Murid/Alumni */}
          {profile?.role === 'murid' && (
            <div className="max-w-2xl border-t border-slate-100 mt-8 pt-2">
              <CVUpload />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
