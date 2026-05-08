import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { Building2, MapPin, Clock, DollarSign, BookmarkPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '../common/Badge';
import Button from '../common/Button';

// Mock Data
export const MOCK_JOBS = [
  { id: 1, title: 'Frontend Developer', company: 'PT Teknologi Digital', location: 'Jakarta Selatan', type: 'Full-time', salary: 'Rp 6.000.000 - Rp 9.000.000', logo: 'https://ui-avatars.com/api/?name=TD&background=1e3a8a&color=fff', tags: ['React', 'Tailwind', 'PPLG'], description: 'Kami mencari Frontend Developer yang berbakat...' },
  { id: 2, title: 'Network Administrator', company: 'Nusantara Global Net', location: 'Bogor', type: 'Full-time', salary: 'Rp 5.000.000 - Rp 7.500.000', logo: 'https://ui-avatars.com/api/?name=NG&background=facc15&color=000', tags: ['Cisco', 'MikroTik', 'TJKT'], description: 'Deskripsi pekerjaan Network Administrator...' },
  { id: 3, title: 'UI/UX Designer Intern', company: 'Kreatif Media', location: 'Bandung (Remote)', type: 'Internship', salary: 'Paid', logo: 'https://ui-avatars.com/api/?name=KM&background=3b82f6&color=fff', tags: ['Figma', 'Prototyping', 'DKV'], description: 'Deskripsi pekerjaan UI/UX...' },
  { id: 4, title: 'Digital Marketing Spec', company: 'Berkah Retail', location: 'Jakarta Pusat', type: 'Full-time', salary: 'Rp 5.500.000 - Rp 8.000.000', logo: 'https://ui-avatars.com/api/?name=BR&background=10b981&color=fff', tags: ['SEO', 'Ads', 'PMN'], description: 'Deskripsi pekerjaan Digital Marketing...' },
  { id: 5, title: 'Chef Assistant', company: 'Grand Hotel Bogor', location: 'Bogor', type: 'Full-time', salary: 'Rp 4.500.000 - Rp 6.000.000', logo: 'https://ui-avatars.com/api/?name=GH&background=ef4444&color=fff', tags: ['F&B', 'Cooking', 'KLN'], description: 'Deskripsi pekerjaan Chef...' },
  { id: 6, title: 'Front Office Agent', company: 'Aston Sentul', location: 'Sentul, Bogor', type: 'Full-time', salary: 'Rp 4.500.000 - Rp 5.500.000', logo: 'https://ui-avatars.com/api/?name=AS&background=6366f1&color=fff', tags: ['Hospitality', 'English', 'HTL'], description: 'Deskripsi pekerjaan Front Office...' },
];

const JURUSAN = ['Semua', 'PPLG', 'TJKT', 'DKV', 'PMN', 'KLN', 'HTL', 'MPLB'];

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-soft transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <h3 className="font-semibold text-lg text-slate-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{job.title}</h3>
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-1">
              <Building2 className="w-4 h-4 mr-1" />
              {job.company}
            </div>
          </div>
        </div>
        <button className="text-slate-300 dark:text-slate-600 hover:text-primary transition-colors">
          <BookmarkPlus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <MapPin className="w-4 h-4 mr-2 text-slate-400" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Clock className="w-4 h-4 mr-2 text-slate-400" />
          {job.type}
        </div>
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 col-span-2">
          <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
          <span className="font-medium text-slate-700 dark:text-slate-300">{job.salary}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex flex-wrap gap-2">
          {(job.tags ?? []).slice(0, 2).map((tag, i) => (
            <Badge key={i} variant={i === 2 ? "secondary" : "gray"}>{tag}</Badge>
          ))}
        </div>
        <Button variant="outline" className="px-3 py-1.5 text-xs" onClick={() => navigate(`/jobs/${job.id}`)}>Lihat Detail</Button>
      </div>
    </motion.div>
  );
};

const JobBoard = ({ initialSearchQuery = '' }) => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Here is where we query Supabase.
        // We use isMock (if we had it imported) or just fallback to local filter
        // If we are actually connected to Supabase:
        let query = supabase.from('jobs').select('*');
        
        if (initialSearchQuery) {
          // Logika pencarian OR dan ILIKE sesuai instruksi
          const searchPattern = `%${initialSearchQuery}%`;
          query = query.or(`title.ilike.${searchPattern},company.ilike.${searchPattern},description.ilike.${searchPattern}`);
        }
        
        if (activeFilter !== 'Semua') {
          // Asumsikan struktur data tabel real mendukung filter array atau contains.
          // Untuk amannya di demo kita filter local saja setelah data didapat
        }

        const { data, error } = await query;
        
        if (!error && data && data.length > 0) {
           // We have real data
           let filtered = data;
           if (activeFilter !== 'Semua') {
             filtered = data.filter(job => (job.tags ?? []).includes(activeFilter));
           }
           setJobs(filtered);
        } else {
           // Fallback to MOCK_JOBS if error or no data (for local dev/mock)
           let filtered = MOCK_JOBS;
           if (initialSearchQuery) {
             const q = initialSearchQuery.toLowerCase();
             filtered = filtered.filter(job => 
               job.title.toLowerCase().includes(q) || 
               job.company.toLowerCase().includes(q) || 
               job.description.toLowerCase().includes(q)
             );
           }
           if (activeFilter !== 'Semua') {
             filtered = filtered.filter(job => (job.tags ?? []).includes(activeFilter));
           }
           setJobs(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [initialSearchQuery, activeFilter]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="py-20 bg-slate-50" id="lowongan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Lowongan Terbaru</h2>
            <p className="text-slate-600">Temukan pekerjaan yang sesuai dengan jurusan dan minatmu.</p>
          </div>
          <Button variant="primary">Lihat Semua Lowongan</Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Wikrama Special Filter Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm sticky top-24">
              <h3 className="font-semibold text-slate-800 mb-4">Filter Jurusan</h3>
              <div className="flex flex-col gap-2">
                {JURUSAN.map((jurusan) => (
                  <button
                    key={jurusan}
                    onClick={() => setActiveFilter(jurusan)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === jurusan 
                        ? 'bg-primary text-white shadow-soft' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {jurusan}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
              >
                {jobs.length > 0 ? (
                  jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Maaf, lowongan yang Anda cari belum tersedia.</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobBoard;
