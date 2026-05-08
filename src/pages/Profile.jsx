import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import CVUpload from '../components/common/CVUpload';
import { 
  User, Book, FileText, Camera, Link as LinkIcon, BadgeCheck, 
  Sparkles, Network, Activity, Video, Award, Bookmark, 
  MessageSquare, Printer, BrainCircuit, Target, Coins, Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, profile, setProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profil');
  
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

      if (error) {
        // Handle case where table is missing in Supabase
        if (error.message.includes('schema cache') || error.message.includes('relation "public.profiles" does not exist')) {
          console.warn("Table 'profiles' is missing in Supabase. Falling back to local state update.");
          setProfile({ ...profile, ...updates });
          setMessage({ type: 'success', text: 'Profil disimpan sementara (Mode Mocking: Tabel Database belum dibuat).' });
          return;
        }
        throw error;
      }
      
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

  const tabs = [
    { id: 'profil', label: 'Profil & CV', icon: User },
    { id: 'ai', label: 'AI & Karir', icon: BrainCircuit },
    { id: 'koneksi', label: 'Sertifikat & Skill', icon: Award },
    { id: 'aktivitas', label: 'Aktivitas', icon: Activity }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-slate-900 transition-colors">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Header Cover */}
        <div className="bg-gradient-to-r from-primary to-primary-light h-48 relative rounded-t-3xl">
          <div className="absolute top-4 right-6 hidden md:flex gap-3">
            <Button variant="secondary" className="px-4 py-2 text-sm bg-white text-slate-700 hover:bg-slate-50 border-0 shadow-sm">
              <Printer className="w-4 h-4 mr-2" />
              Cetak CV PDF
            </Button>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="px-8 pb-8 relative border-b border-slate-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 mb-2 relative z-10">
            <div className="relative inline-block">
              <img 
                src={formData.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name?.replace(' ', '+') || 'User'}&background=1e3a8a&color=fff`} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 object-cover bg-white shadow-md"
              />
              <button className="absolute bottom-2 right-0 p-2 bg-secondary text-primary-dark rounded-full shadow-sm hover:scale-105 transition-transform border-2 border-white dark:border-slate-800">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{profile?.full_name || 'User'}</h1>
                    {profile?.verified_status && (
                      <div className="text-blue-500" title="Akun Terverifikasi BKK">
                        <BadgeCheck size={28} />
                      </div>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 capitalize font-medium mt-1">
                    {profile?.role || 'Member'} • SMK Wikrama Bogor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="py-8 px-8 flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="flex flex-col gap-2 sticky top-24">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Panel */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* TAB: PROFIL & CV */}
              {activeTab === 'profil' && (
                <div className="space-y-8">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Informasi Dasar</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {message.text && (
                        <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {message.text}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Nama Lengkap" name="full_name" icon={User} value={formData.full_name} onChange={handleChange} required />
                        <Input label="Jurusan" name="jurusan" icon={Book} placeholder="Contoh: PPLG" value={formData.jurusan} onChange={handleChange} />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio Singkat</label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <FileText className="h-5 w-5 text-slate-400" />
                          </div>
                          <textarea
                            name="bio" rows="4"
                            className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white dark:bg-slate-700 dark:text-white border py-2.5 pl-10 pr-4 placeholder:text-slate-400 outline-none"
                            placeholder="Ceritakan sedikit tentang keahlian dan pengalamanmu..."
                            value={formData.bio} onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="URL Portfolio (GitHub/Behance)" name="portfolio_url" icon={LinkIcon} placeholder="https://github.com/username" value={formData.portfolio_url} onChange={handleChange} />
                        <Input label="URL Foto Profil" name="avatar_url" icon={Camera} placeholder="https://example.com/photo.jpg" value={formData.avatar_url} onChange={handleChange} />
                      </div>

                      <div className="pt-2">
                        <Button type="submit" variant="primary" disabled={loading}>
                          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Portfolio Video & CV Upload */}
                  {profile?.role === 'murid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <h3 className="text-md font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                          <Video className="text-primary w-5 h-5" /> Video Perkenalan (60s)
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">Unggah video 'Elevator Pitch' singkat agar HRD tertarik.</p>
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 cursor-not-allowed">
                          <Video className="w-8 h-8 mb-2 opacity-50" />
                          <span className="text-sm">Fitur segera hadir</span>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <h3 className="text-md font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                          <FileText className="text-primary w-5 h-5" /> Dokumen CV (PDF)
                        </h3>
                        <CVUpload />
                      </div>
                    </div>
                  )}

                  {/* Status PKL */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                    <h3 className="text-md font-semibold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" /> Riwayat PKL (Prakerin)
                    </h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-4">Data ditarik otomatis dari sistem akademik BKK SMK Wikrama.</p>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">PT Bank Central Asia Tbk</h4>
                        <p className="text-sm text-slate-500">Jan 2024 - Jun 2024 • Frontend Developer Intern</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">Selesai (Nilai A)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: AI & KARIR */}
              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                          <Sparkles className="text-primary" /> AI Interview Simulator
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Latih kemampuan wawancara kerjamu dengan asisten AI interaktif (Berbasis Suara & Teks).</p>
                      </div>
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold">PRO</span>
                    </div>
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg shadow-purple-500/30">Mulai Simulasi Wawancara</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <Target className="w-8 h-8 text-blue-500 mb-3" />
                      <h4 className="font-semibold text-slate-800 dark:text-white text-lg">Skill Gap Analysis</h4>
                      <p className="text-sm text-slate-500 mt-2 mb-4">AI akan menganalisis CV-mu dan membandingkannya dengan tren loker saat ini.</p>
                      <Button variant="outline" className="w-full text-sm">Analisis Skill Saya</Button>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <FileText className="w-8 h-8 text-green-500 mb-3" />
                      <h4 className="font-semibold text-slate-800 dark:text-white text-lg">Auto-Generate Cover Letter</h4>
                      <p className="text-sm text-slate-500 mt-2 mb-4">Buat surat lamaran otomatis yang disesuaikan dengan posisi yang dilamar.</p>
                      <Button variant="outline" className="w-full text-sm">Buat Surat Lamaran</Button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-6">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-full text-yellow-600">
                      <Coins className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white text-lg">Gaji Benchmark (Junior Dev)</h4>
                      <p className="text-sm text-slate-500 mb-2">Perkiraan gaji standar untuk lulusan baru jurusan PPLG di daerah Jabodetabek.</p>
                      <div className="text-2xl font-bold text-slate-800 dark:text-white">Rp 5.500.000 - Rp 7.000.000 <span className="text-sm font-normal text-slate-400">/ bulan</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SERTIFIKAT & KONEKSI */}
              {activeTab === 'koneksi' && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <Award className="text-secondary w-6 h-6" /> Digital Certificate Vault
                      </h3>
                      <Button variant="outline" className="text-xs">+ Tambah Sertifikat</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-slate-100 dark:border-slate-700 p-4 rounded-xl flex gap-4">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">📜</div>
                        <div>
                          <h5 className="font-medium text-slate-800 dark:text-white text-sm">Sertifikat Kompetensi BNSP</h5>
                          <p className="text-xs text-slate-500">Pemrograman Web & Mobile</p>
                          <span className="inline-block mt-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Tervalidasi</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Network className="text-blue-500 w-5 h-5" /> Sistem Mentorship
                      </h3>
                      <p className="text-sm text-slate-500 mb-4">Terhubung dengan alumni senior untuk bimbingan karir industri.</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img src="https://ui-avatars.com/api/?name=Kak+Andi&background=3b82f6&color=fff" alt="Mentor" className="w-10 h-10 rounded-full" />
                          <div className="flex-1">
                            <h5 className="text-sm font-medium dark:text-white">Andi M. (Angkatan 2020)</h5>
                            <p className="text-xs text-slate-500">Software Engineer @ GoTo</p>
                          </div>
                          <Button variant="ghost" className="text-xs px-2 py-1">Chat</Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <BadgeCheck className="text-primary w-5 h-5" /> Skill Endorsement
                      </h3>
                      <p className="text-sm text-slate-500 mb-4">Keahlianmu yang divilidasi langsung oleh Guru Pengajar.</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-100 dark:border-blue-800">React.js <span className="font-bold ml-1 text-blue-500">✓ Pak Budi</span></span>
                        <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-100 dark:border-blue-800">Tailwind <span className="font-bold ml-1 text-blue-500">✓ Bu Ani</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: AKTIVITAS */}
              {activeTab === 'aktivitas' && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                      <Bookmark className="text-orange-500 w-5 h-5" /> Job Bookmark (Disimpan)
                    </h3>
                    <div className="text-center py-8 text-slate-500 text-sm">
                      Belum ada lowongan yang disimpan.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <MessageSquare className="text-green-500 w-5 h-5" /> Internal Messaging
                      </h3>
                      <p className="text-sm text-slate-500 mb-4">Pesan langsung dari Perusahaan/HRD.</p>
                      <div className="text-center py-4 text-slate-400 text-sm italic">
                        Kotak masuk kosong.
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Activity className="text-primary w-5 h-5" /> Log Aktivitas Profil
                      </h3>
                      <ul className="space-y-3 relative border-l-2 border-slate-100 dark:border-slate-700 ml-3 pl-4">
                        <li className="relative">
                          <span className="absolute -left-[21px] top-1 w-3 h-3 bg-primary rounded-full ring-4 ring-white dark:ring-slate-800"></span>
                          <p className="text-sm text-slate-800 dark:text-white font-medium">PT Teknologi Digital melihat profilmu</p>
                          <span className="text-xs text-slate-500">2 jam yang lalu</span>
                        </li>
                        <li className="relative">
                          <span className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-full ring-4 ring-white dark:ring-slate-800"></span>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Profil berhasil diperbarui</p>
                          <span className="text-xs text-slate-500">Kemarin</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
