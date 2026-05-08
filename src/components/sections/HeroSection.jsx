import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-primary/5 to-white">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[60%] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary-dark font-semibold text-sm mb-6 border border-secondary/30 shadow-sm">
              🚀 Portal Karir Resmi SMK Wikrama Bogor
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Mulai Langkah Suksesmu <br className="hidden md:block" />
              Bersama <span className="text-primary">Mitra Industri Terbaik</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Temukan peluang karir yang tepat untuk masa depanmu. Ratusan posisi menunggu alumni terbaik SMK Wikrama.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glassmorphism p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-2 max-w-3xl mx-auto relative z-10"
          >
            <div className="flex-1 relative flex items-center bg-white rounded-xl md:rounded-full px-4 py-3 md:py-0 border border-slate-100">
              <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Posisi, skill, atau perusahaan..." 
                className="w-full bg-transparent border-none focus:ring-0 outline-none text-slate-700"
              />
            </div>
            <div className="hidden md:block w-px bg-slate-200 my-2"></div>
            <div className="flex-1 relative flex items-center bg-white rounded-xl md:rounded-full px-4 py-3 md:py-0 border border-slate-100">
              <MapPin className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Lokasi kerja..." 
                className="w-full bg-transparent border-none focus:ring-0 outline-none text-slate-700"
              />
            </div>
            <Button className="py-3 md:py-2 md:px-8 rounded-xl md:rounded-full text-base whitespace-nowrap">
              Cari Kerja
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center p-4">
              <span className="text-3xl font-bold text-primary mb-1">500+</span>
              <span className="text-sm text-slate-500 font-medium text-center">Alumni Terserap</span>
            </div>
            <div className="flex flex-col items-center p-4 border-l border-slate-200/60">
              <span className="text-3xl font-bold text-primary mb-1">100+</span>
              <span className="text-sm text-slate-500 font-medium text-center">Mitra Industri</span>
            </div>
            <div className="flex flex-col items-center p-4 md:border-l border-slate-200/60 hidden md:flex">
              <span className="text-3xl font-bold text-primary mb-1">50+</span>
              <span className="text-sm text-slate-500 font-medium text-center">Lowongan Aktif</span>
            </div>
            <div className="flex flex-col items-center p-4 md:border-l border-slate-200/60 hidden md:flex">
              <span className="text-3xl font-bold text-primary mb-1">7</span>
              <span className="text-sm text-slate-500 font-medium text-center">Program Keahlian</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
