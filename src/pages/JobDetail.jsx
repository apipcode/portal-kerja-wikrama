import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { MOCK_JOBS } from '../components/sections/JobBoard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { ArrowLeft, Building2, MapPin, Clock, DollarSign, BookmarkPlus, Loader2 } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .single();

        if (data) {
          setJob(data);
        } else {
          // Fallback to Mock Data if no data returned (Mock mode)
          const mockJob = MOCK_JOBS.find(j => j.id.toString() === id);
          if (mockJob) {
            setJob(mockJob);
          } else {
            setError('Lowongan tidak ditemukan (Job Not Found).');
          }
        }
      } catch (err) {
        // Fallback to Mock Data if network error
        const mockJob = MOCK_JOBS.find(j => j.id.toString() === id);
        if (mockJob) {
          setJob(mockJob);
        } else {
          setError('Terjadi kesalahan saat memuat lowongan.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center dark:bg-slate-900">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-500 dark:text-slate-400">Memuat detail lowongan...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center dark:bg-slate-900">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p className="mb-6">{error || 'Job Not Found'}</p>
          <Button variant="primary" onClick={() => navigate('/jobs')}>Kembali ke Papan Lowongan</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/jobs')}
          className="flex items-center text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
              <div className="flex items-start gap-6">
                <img src={job.logo || `https://ui-avatars.com/api/?name=${job.company}&background=1e3a8a&color=fff`} alt={job.company} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>
                  <div className="flex items-center text-lg text-slate-600 dark:text-slate-300">
                    <Building2 className="w-5 h-5 mr-2" />
                    {job.company}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400"
                  onClick={() => alert('Lowongan ditambahkan ke Bookmark!')}
                >
                  <BookmarkPlus className="w-5 h-5 mr-2" /> Simpan
                </Button>
                <Button 
                  variant="outline" 
                  className="px-4 py-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
                  onClick={() => alert('Fitur Integrasi LinkedIn akan segera diluncurkan!')}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Apply via LinkedIn
                </Button>
                <Button variant="primary" className="px-8 py-2 shadow-lg shadow-primary/30">Lamar</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-100 dark:border-slate-700 mb-8">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Lokasi</p>
                <p className="font-medium flex items-center text-slate-800 dark:text-slate-200"><MapPin className="w-4 h-4 mr-1 text-slate-400" /> {job.location}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Tipe Pekerjaan</p>
                <p className="font-medium flex items-center text-slate-800 dark:text-slate-200"><Clock className="w-4 h-4 mr-1 text-slate-400" /> {job.type}</p>
              </div>
              <div className="col-span-2 md:col-span-2">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Estimasi Gaji</p>
                <p className="font-medium flex items-center text-slate-800 dark:text-slate-200"><DollarSign className="w-4 h-4 mr-1 text-slate-400" /> {job.salary}</p>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Deskripsi Pekerjaan</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-8">
                {job.description || 'Deskripsi pekerjaan belum tersedia.'}
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Kategori / Skill yang Dibutuhkan</h3>
              <div className="flex flex-wrap gap-2">
                {(job.tags || []).map((tag, i) => (
                  <Badge key={i} variant="primary" className="text-sm px-3 py-1">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
