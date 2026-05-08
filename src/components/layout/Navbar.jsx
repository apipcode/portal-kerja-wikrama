import React, { useState } from 'react';
import { Menu, X, Briefcase, User, LogOut, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import Button from '../common/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Lowongan', href: '/jobs' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism border-b border-slate-200 dark:border-slate-800 dark:bg-slate-900/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center shadow-soft">
                <Briefcase size={20} />
              </div>
              <span className="font-bold text-xl text-primary-dark dark:text-white hidden sm:block">Portal Kerja <span className="text-secondary-dark">Wikrama</span></span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors font-medium text-sm">
                {link.name}
              </a>
            ))}
            
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex items-center space-x-4 ml-4">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img 
                      src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=1e3a8a&color=fff`} 
                      alt="Avatar" 
                      className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                    />
                    <span className="text-sm font-medium text-slate-700">{profile?.full_name || 'User'}</span>
                  </button>
                  
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft py-1 border border-slate-100"
                      >
                        <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary">
                          <User size={16} className="mr-2" /> Profil Saya
                        </Link>
                        <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <LogOut size={16} className="mr-2" /> Keluar
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login"><Button variant="ghost">Masuk</Button></Link>
                  <Link to="/register"><Button variant="primary">Daftar</Button></Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-primary hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glassmorphism border-b border-slate-200 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="border-t border-slate-200 mt-4 pt-4 px-3">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=1e3a8a&color=fff`} 
                        alt="Avatar" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-slate-800">{profile?.full_name}</div>
                        <div className="text-xs text-slate-500 capitalize">{profile?.role}</div>
                      </div>
                    </div>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start"><User size={16} className="mr-2" /> Profil Saya</Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" /> Keluar
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}><Button variant="outline" className="w-full">Masuk</Button></Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}><Button variant="primary" className="w-full">Daftar</Button></Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
