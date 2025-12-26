import { useState } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Reveal from '../../components/common/Reveal';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Added pt-32 to account for fixed navbar, removing flex-center to avoid fighting with padding
    <div className="min-h-screen bg-bloom-dark pt-32 pb-12 px-4 flex flex-col items-center justify-start font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bloom-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bloom-blue/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-lg relative z-10 mt-10">
        <Reveal>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white href-gray-400 bg-clip-text text-transparent mb-3">Admin Portal</h1>
            <p className="text-bloom-text-muted text-lg">Secure access for authorized personnel only.</p>
          </div>
        </Reveal>

        <Reveal delay={100} width="100%">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            {/* Subtle glow on card */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bloom-primary to-bloom-blue opacity-50"></div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-bloom-primary transition-colors" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-bloom-dark/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-bloom-primary focus:ring-1 focus:ring-bloom-primary/50 transition-all placeholder-gray-600 shadow-inner"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-bloom-primary transition-colors" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-bloom-dark/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-bloom-primary focus:ring-1 focus:ring-bloom-primary/50 transition-all placeholder-gray-600 shadow-inner"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 cursor-pointer group/check">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-white/20 rounded bg-bloom-dark/50 peer-checked:bg-bloom-primary peer-checked:border-bloom-primary transition-all"></div>
                    <svg className="absolute w-3 h-3 text-white top-1 left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm text-bloom-text-muted group-hover/check:text-white transition-colors select-none">Remember for 30 days</span>
                </label>
                <a href="#" className="text-sm text-bloom-blue hover:text-bloom-primary transition-colors font-semibold">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-bloom-primary to-bloom-blue text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-bloom-primary/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Login;
