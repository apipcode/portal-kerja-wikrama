import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { 
  BarChart3, Megaphone, CalendarDays, ShieldCheck, 
  Workflow, Users, FileCheck, CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tracer');

  const adminTabs = [
    { id: 'tracer', label: 'Tracer Study', icon: BarChart3 },
    { id: 'broadcast', label: 'Pengumuman', icon: Megaphone },
    { id: 'jobfair', label: 'Event Job Fair', icon: CalendarDays },
    { id: 'mitra', label: 'Mitra Industri', icon: ShieldCheck },
    { id: 'match', label: 'Auto-Matchmaking', icon: Workflow }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-slate-900 transition-colors">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Admin Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-6 shadow-lg text-white mb-6">
            <h2 className="text-xl font-bold mb-1">Admin BKK</h2>
            <p className="text-slate-400 text-sm">Portal Kerja Wikrama</p>
          </div>
          
          <nav className="flex flex-col gap-2 sticky top-24">
            {adminTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm min-h-[600px]"
          >
            {/* TRACER STUDY */}
            {activeTab === 'tracer' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="text-primary" /> Tracer Study & BKK Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 mb-1">Total Alumni Terdaftar</p>
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white">1,240</h3>
                  </div>
                  <div className="p-4 rounded-xl border border-green-100 bg-green-50 dark:bg-green-900/20 dark:border-green-800/50">
                    <p className="text-sm text-green-600 dark:text-green-400 mb-1">Keterserapan Bekerja</p>
                    <h3 className="text-3xl font-bold text-green-700 dark:text-green-300">85%</h3>
                  </div>
                  <div className="p-4 rounded-xl border border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800/50">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Melanjutkan Studi</p>
                    <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300">10%</h3>
                  </div>
                </div>
                
                <div className="h-80 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Grafik Serapan Alumni per Jurusan (2024)</h3>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'PPLG', bekerja: 80, kuliah: 15, wirausaha: 5 },
                          { name: 'TJKT', bekerja: 70, kuliah: 20, wirausaha: 10 },
                          { name: 'DKV', bekerja: 65, kuliah: 25, wirausaha: 10 },
                          { name: 'PMN', bekerja: 90, kuliah: 5, wirausaha: 5 },
                          { name: 'KLN', bekerja: 85, kuliah: 5, wirausaha: 10 },
                          { name: 'HTL', bekerja: 88, kuliah: 2, wirausaha: 10 },
                          { name: 'MPLB', bekerja: 75, kuliah: 15, wirausaha: 10 },
                        ]}
                        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="bekerja" name="Bekerja" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="kuliah" name="Kuliah" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="wirausaha" name="Wirausaha" fill="#facc15" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* BROADCAST PENGUMUMAN */}
            {activeTab === 'broadcast' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                  <Megaphone className="text-orange-500" /> Broadcast Pengumuman
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Kirimkan notifikasi pop-up penting ke seluruh alumni atau jurusan tertentu.</p>
                
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target Audience</label>
                    <select className="w-full rounded-xl border border-slate-300 dark:border-slate-600 p-3 bg-white dark:bg-slate-700 dark:text-white outline-none">
                      <option>Semua Alumni</option>
                      <option>Hanya PPLG</option>
                      <option>Hanya TJKT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pesan Pengumuman</label>
                    <textarea rows="4" className="w-full rounded-xl border border-slate-300 dark:border-slate-600 p-3 bg-white dark:bg-slate-700 dark:text-white outline-none" placeholder="Ketik pengumuman di sini..."></textarea>
                  </div>
                  <Button variant="primary" className="bg-orange-500 hover:bg-orange-600 border-0">Kirim Broadcast Sekarang</Button>
                </div>
              </div>
            )}

            {/* EVENT JOB FAIR */}
            {activeTab === 'jobfair' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                  <CalendarDays className="text-purple-500" /> Event Job Fair
                </h2>
                <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center bg-slate-50 dark:bg-slate-900">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarDays size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Wikrama Job Fair 2025</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-6">Kelola pendaftaran perusahaan dan tiket kedatangan alumni untuk acara bursa kerja tahunan.</p>
                  <Button className="bg-purple-600 hover:bg-purple-700 border-0 text-white">Buat Event Baru</Button>
                </div>
              </div>
            )}

            {/* MITRA INDUSTRI */}
            {activeTab === 'mitra' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                  <ShieldCheck className="text-blue-500" /> Mitra Industri Terverifikasi
                </h2>
                
                <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300">Verified Company Badge</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">Berikan lencana biru resmi untuk instansi terpercaya.</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">Kelola Badge</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex justify-between items-center bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
                      <div>
                        <h4 className="font-semibold dark:text-white">PT Teknologi Digital</h4>
                        <p className="text-xs text-slate-500">12 Lowongan Aktif</p>
                      </div>
                    </div>
                    <span className="text-blue-500"><ShieldCheck size={20} /></span>
                  </div>
                </div>
              </div>
            )}

            {/* AUTO MATCHMAKING */}
            {activeTab === 'match' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                  <Workflow className="text-green-500" /> Auto-Matchmaking Engine
                </h2>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-100 dark:border-green-800/30 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex -space-x-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xl">👤</div>
                      <div className="w-12 h-12 rounded-full bg-green-200 border-2 border-white flex items-center justify-center"><Workflow size={20} className="text-green-700" /></div>
                      <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xl">💼</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">Algoritma AI Aktif</h3>
                      <p className="text-sm text-slate-500">Mencocokkan 1,240 profil dengan 50 lowongan</p>
                    </div>
                  </div>
                  <Button variant="primary" className="bg-green-600 hover:bg-green-700 border-0">Jalankan Ulang Sinkronisasi</Button>
                </div>
              </div>
            )}

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
