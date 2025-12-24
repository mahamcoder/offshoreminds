import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen page-animate">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
