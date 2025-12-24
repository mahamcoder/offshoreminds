import { useState } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Reveal from '../../components/common/Reveal';

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
    <div className="min-h-screen bg-bloom-dark flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bloom-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bloom-blue/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <Reveal>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-bloom-text-muted">Sign in to manage blogs</p>
          </div>
        </Reveal>

        <Reveal delay={100} width="100%">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-bloom-blue mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bloom-primary transition-colors"
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-bloom-blue mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bloom-primary transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-bloom-dark/50 text-bloom-primary focus:ring-bloom-primary"
                />
                <label htmlFor="rememberMe" className="text-sm text-bloom-text-muted cursor-pointer select-none font-medium">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-bloom-primary text-bloom-dark font-bold py-3.5 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-bloom-primary/30 flex items-center justify-center"
              >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-bloom-dark border-t-transparent rounded-full animate-spin"></div>
                ) : 'Sign In'}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Login;
