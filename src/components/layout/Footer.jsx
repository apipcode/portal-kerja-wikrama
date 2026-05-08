import React from 'react';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <span className="font-bold text-2xl text-white">Portal Kerja <span className="text-secondary">Wikrama</span></span>
            </div>
            <p className="text-primary-light/80 mb-6 max-w-sm">
              Menghubungkan talenta terbaik SMK Wikrama dengan perusahaan-perusahaan terkemuka di Indonesia.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="font-bold">in</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="font-bold">ig</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white border-b border-white/20 pb-2 inline-block">Tautan Cepat</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-primary-light/80 hover:text-white transition-colors">Cari Lowongan</a></li>
              <li><a href="#" className="text-primary-light/80 hover:text-white transition-colors">Daftar Perusahaan</a></li>
              <li><a href="#" className="text-primary-light/80 hover:text-white transition-colors">Testimoni Alumni</a></li>
              <li><a href="#" className="text-primary-light/80 hover:text-white transition-colors">Panduan Karir</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white border-b border-white/20 pb-2 inline-block">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-light/80">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-secondary" />
                <span>Jl. Raya Wangun Kelurahan Sindangsari, Bogor</span>
              </li>
              <li className="flex items-center gap-3 text-primary-light/80">
                <Phone className="w-5 h-5 flex-shrink-0 text-secondary" />
                <span>0251-8242411</span>
              </li>
              <li className="flex items-center gap-3 text-primary-light/80">
                <Mail className="w-5 h-5 flex-shrink-0 text-secondary" />
                <span>prohumasi@smkwikrama.sch.id</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-light/60">
          <p>&copy; {new Date().getFullYear()} SMK Wikrama Bogor. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
