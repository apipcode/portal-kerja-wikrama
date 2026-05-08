import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import JobBoard from './components/sections/JobBoard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import JobDetail from './pages/JobDetail';

// Protected Route Component
const ProtectedRoute = ({ children, requireRole }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requireRole && profile?.role !== requireRole) return <Navigate to="/" />;
  
  return children;
};

// Main Landing Page
const Home = () => (
  <>
    <HeroSection />
    
    {/* Company Partnership Section Mini */}
    <section className="py-10 bg-white dark:bg-slate-800 border-y border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Dipercaya oleh Perusahaan Terkemuka</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200"><div className="w-8 h-8 bg-blue-600 rounded-lg"></div> TechCorp</div>
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200"><div className="w-8 h-8 bg-red-600 rounded-lg"></div> MediaNusa</div>
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200"><div className="w-8 h-8 bg-green-600 rounded-lg"></div> AgroJaya</div>
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200"><div className="w-8 h-8 bg-purple-600 rounded-lg"></div> HotelGrand</div>
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200"><div className="w-8 h-8 bg-orange-600 rounded-lg"></div> OtoMaju</div>
        </div>
      </div>
    </section>

    {/* Job Board Section in Landing Page */}
    <JobBoard />

    {/* Alumni Testimonial Slider Mock */}
    <section className="py-20 bg-primary/5 dark:bg-slate-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Kisah Sukses Alumni</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Lihat bagaimana Portal Kerja Wikrama membantu alumni kami meraih karir impian mereka.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative transition-colors">
              <div className="absolute -top-6 left-8">
                <img src={`https://ui-avatars.com/api/?name=Alumni+${item}&background=1e3a8a&color=fff`} alt="Alumni" className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 shadow-sm transition-colors" />
              </div>
              <div className="mt-4">
                <div className="flex text-secondary mb-3">
                  {"★".repeat(5)}
                </div>
                <p className="text-slate-600 dark:text-slate-400 italic mb-4">"Berkat portal ini, saya bisa langsung mendapatkan pekerjaan sesuai dengan passion saya di bidang teknologi sebelum lulus!"</p>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Budi Santoso</h4>
                <p className="text-sm text-slate-500 dark:text-slate-500">Frontend Developer - PT TechCorp (Alumni PPLG)</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors">
          <Navbar />
          
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<JobBoard />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requireRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
