import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bloom-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
