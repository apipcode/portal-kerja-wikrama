import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { UploadCloud, FileText, CheckCircle, X, ExternalLink, Loader2 } from 'lucide-react';
import Button from './Button';

const CVUpload = () => {
  const { user, profile, setProfile } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);

  const MAX_SIZE_MB = 2;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const validateFile = (selectedFile) => {
    setMessage(null);
    if (!selectedFile) return false;
    
    if (selectedFile.type !== 'application/pdf') {
      setMessage({ type: 'error', text: 'Format file tidak didukung. Harap unggah file PDF.' });
      return false;
    }
    
    if (selectedFile.size > MAX_SIZE_BYTES) {
      setMessage({ type: 'error', text: `Ukuran file terlalu besar. Maksimal ${MAX_SIZE_MB}MB.` });
      return false;
    }
    
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    setUploading(true);
    setProgress(10); // Start progress
    setMessage(null);
    
    try {
      // 1. Prepare filename: cv_[user_id]_[timestamp].pdf
      const fileExt = file.name.split('.').pop();
      const fileName = `cv_${user.id}_${new Date().getTime()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Simulate progress for UI
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 15));
      }, 300);

      // 2. Upload to Supabase Storage 'cv-alumni'
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('cv-alumni')
        .upload(filePath, file, { upsert: true });

      clearInterval(progressInterval);
      setProgress(100);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from('cv-alumni')
        .getPublicUrl(filePath);

      const cvUrl = publicUrlData.publicUrl;

      // 4. Update profiles table
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({ cv_url: cvUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // 5. Update local context
      if (updateData) {
        setProfile(updateData);
      } else {
        setProfile({ ...profile, cv_url: cvUrl }); // Mock fallback
      }
      
      setMessage({ type: 'success', text: 'CV berhasil diunggah!' });
      setFile(null);
      setTimeout(() => {
        setMessage(null);
        setProgress(0);
      }, 3000);

    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Gagal mengunggah CV. Pastikan Bucket "cv-alumni" sudah dibuat.' });
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mt-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">Resume / CV</h3>
        <p className="text-sm text-slate-500">Unggah CV terbaru Anda (Format PDF, Maks 2MB) untuk menarik perhatian rekruter.</p>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
          {message.type === 'error' ? <X className="w-5 h-5 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 flex-shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Existing CV View */}
      {profile?.cv_url && !file && !uploading && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <div className="w-10 h-10 bg-red-100 text-red-600 flex items-center justify-center rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm">CV Anda Saat Ini</p>
              <a href={profile.cv_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center mt-0.5">
                Lihat Dokumen <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setFile(null)} className="relative overflow-hidden">
            <input
              type="file"
              accept="application/pdf"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleChange}
            />
            Ganti CV
          </Button>
        </div>
      )}

      {/* Upload Area */}
      {(!profile?.cv_url || file) && (
        <div className="relative">
          <div 
            className={`w-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-colors ${
              dragActive ? 'border-primary bg-primary/5' : 'border-slate-300 hover:border-primary/50 hover:bg-slate-50'
            } ${file ? 'bg-slate-50 border-solid border-slate-200' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploading ? (
              <div className="w-full max-w-xs flex flex-col items-center py-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm font-medium text-slate-600">Mengunggah... {progress}%</p>
              </div>
            ) : file ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-3">
                  <FileText size={32} />
                </div>
                <p className="font-medium text-slate-800 mb-1 max-w-xs truncate text-center" title={file.name}>{file.name}</p>
                <p className="text-xs text-slate-500 mb-4">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setFile(null)}>Batal</Button>
                  <Button variant="primary" onClick={handleUpload}>Mulai Unggah</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4">
                  <UploadCloud size={32} />
                </div>
                <p className="font-medium text-slate-800 mb-2">Tarik dan lepas file di sini</p>
                <p className="text-sm text-slate-500 mb-4">Atau</p>
                <Button variant="outline" onClick={onButtonClick}>Pilih File PDF</Button>
              </div>
            )}
            
            <input 
              ref={inputRef}
              type="file" 
              accept="application/pdf"
              className="hidden" 
              onChange={handleChange} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CVUpload;
