import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY tidak ditemukan di environment variables! Aplikasi akan berjalan dalam Mock Mode.");
}

// Default Mock Data for Jobs
const MOCK_JOBS = [
  { id: 1, title: 'Frontend Developer', company_name: 'PT Teknologi Digital', location: 'Jakarta Selatan', description: 'Membutuhkan Frontend Developer dengan React', created_at: new Date().toISOString() },
  { id: 2, title: 'Network Administrator', company_name: 'Nusantara Global Net', location: 'Bogor', description: 'Ahli MikroTik dan Cisco', created_at: new Date().toISOString() },
];

class MockSupabase {
  constructor() {
    this.auth = {
      signUp: async ({ email, password, options }) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        if (users.find(u => u.email === email)) {
          return { data: null, error: { message: 'User already exists' } };
        }
        
        const newUser = {
          id: crypto.randomUUID(),
          email,
          password, // Never do this in real app
          role: options?.data?.role || 'murid',
          full_name: options?.data?.full_name || '',
        };
        
        users.push(newUser);
        localStorage.setItem('mock_users', JSON.stringify(users));
        
        // Also save profile
        const profiles = JSON.parse(localStorage.getItem('mock_profiles') || '[]');
        profiles.push({
          id: newUser.id,
          full_name: newUser.full_name,
          role: newUser.role,
          bio: '',
          avatar_url: `https://ui-avatars.com/api/?name=${newUser.full_name.replace(' ', '+')}&background=1e3a8a&color=fff`,
        });
        localStorage.setItem('mock_profiles', JSON.stringify(profiles));

        return { data: { user: newUser }, error: null };
      },
      signInWithPassword: async ({ email, password }) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) return { data: null, error: { message: 'Invalid credentials' } };
        
        localStorage.setItem('mock_session', JSON.stringify({ user }));
        return { data: { user, session: { user } }, error: null };
      },
      signOut: async () => {
        localStorage.removeItem('mock_session');
        return { error: null };
      },
      getSession: async () => {
        const session = JSON.parse(localStorage.getItem('mock_session'));
        return { data: { session }, error: null };
      },
      onAuthStateChange: (callback) => {
        // Simple mock, doesn't actually trigger across tabs
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    };
  }

  from(table) {
    return {
      select: (query) => {
        return {
          eq: async (column, value) => {
            if (table === 'profiles') {
              const profiles = JSON.parse(localStorage.getItem('mock_profiles') || '[]');
              const data = profiles.find(p => p[column] === value);
              return { data: data ? [data] : null, error: null };
            }
            return { data: null, error: null };
          },
          ilike: function(column, value) {
            // just return this so we can chain .single() or await it
            return this; 
          },
          or: function(query) {
            return this;
          },
          single: async () => {
             // Mock single response logic for profile
             const profiles = JSON.parse(localStorage.getItem('mock_profiles') || '[]');
             return { data: null, error: null }; // Mock always returns null for uniqueness check to pass
          },
          then: (resolve) => {
            // Support simple .select()
            if (table === 'jobs') {
              const jobs = JSON.parse(localStorage.getItem('mock_jobs') || JSON.stringify(MOCK_JOBS));
              resolve({ data: jobs, error: null });
            }
          }
        };
      },
      update: (data) => {
        return {
          eq: async (column, value) => {
            if (table === 'profiles') {
              let profiles = JSON.parse(localStorage.getItem('mock_profiles') || '[]');
              const index = profiles.findIndex(p => p[column] === value);
              if (index !== -1) {
                profiles[index] = { ...profiles[index], ...data };
                localStorage.setItem('mock_profiles', JSON.stringify(profiles));
                return { data: profiles[index], error: null };
              }
            }
            return { data: null, error: null };
          }
        };
      }
    };
  }

  get storage() {
    return {
      from: (bucket) => ({
        upload: async (path, file) => {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Generate an object URL and store in LocalStorage 
          // (Note: ObjectURLs expire when browser closes, but it works for demo)
          const mockUrl = URL.createObjectURL(file);
          const storageMock = JSON.parse(localStorage.getItem(`mock_storage_${bucket}`) || '{}');
          storageMock[path] = mockUrl;
          localStorage.setItem(`mock_storage_${bucket}`, JSON.stringify(storageMock));
          
          return { data: { path }, error: null };
        },
        getPublicUrl: (path) => {
          const storageMock = JSON.parse(localStorage.getItem(`mock_storage_${bucket}`) || '{}');
          const url = storageMock[path] || `https://mock-storage.com/${bucket}/${path}`;
          return { data: { publicUrl: url } };
        }
      })
    };
  }
}

// Gunakan Supabase asli jika ENV variables ada, jika tidak, gunakan Mock
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new MockSupabase();

export const isMock = !(supabaseUrl && supabaseAnonKey);
