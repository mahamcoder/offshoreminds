import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';
import BlockRenderer from '../components/cms/BlockRenderer';
import WhatsAppButton from '../components/WhatsAppButton';
import { ArrowLeft, Home, ChevronRight, Layers, AlertCircle } from 'lucide-react';

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        // First try query by slug
        const q = query(collection(db, 'pages'), where('slug', '==', slug));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const docData = snap.docs[0].data();
          setPage({ id: snap.docs[0].id, ...docData });
        } else {
          // Fallback: try by doc ID
          try {
            const dRef = doc(db, 'pages', slug);
            const dSnap = await getDoc(dRef);
            if (dSnap.exists()) {
              setPage({ id: dSnap.id, ...dSnap.data() });
            } else {
              setError('Page not found');
            }
          } catch (_) {
            setError('Page not found');
          }
        }
      } catch (err) {
        console.error('Error loading dynamic page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-bloom-dark flex flex-col items-center justify-center pt-24 pb-12">
        <div className="w-12 h-12 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 dark:text-gray-400 text-sm font-medium">Loading page...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-white dark:bg-bloom-dark text-slate-900 dark:text-white flex flex-col items-center justify-center p-6 text-center pt-32 pb-20">
        <div className="w-16 h-16 rounded-2xl bg-bloom-primary/10 text-bloom-primary flex items-center justify-center mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-3xl font-extrabold mb-3">Page Not Found</h2>
        <p className="text-slate-600 dark:text-gray-400 max-w-md mb-8 text-sm leading-relaxed">
          The requested page could not be located or may have been unpublished.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/services"
            className="px-6 py-3 rounded-xl font-bold text-white bg-bloom-primary hover:bg-bloom-primary/90 transition-all text-sm shadow-lg shadow-bloom-primary/20"
          >
            Explore Services
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-bloom-dark min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      {/* Dynamic SEO */}
      <SEO
        title={page.seoTitle || page.title}
        description={page.seoDescription || page.title}
        path={`/p/${page.slug}`}
        keywords={page.seoKeywords ? (Array.isArray(page.seoKeywords) ? page.seoKeywords.join(', ') : page.seoKeywords) : ''}
        image={page.ogImage || undefined}
      />

      {/* Breadcrumbs Bar */}
      <div className="pt-24 border-b border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 text-xs">
        <div className="container mx-auto px-4 max-w-7xl py-3 flex items-center gap-2 text-slate-500 dark:text-gray-400">
          <Link to="/" className="hover:text-bloom-primary flex items-center gap-1">
            <Home size={13} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} />
          {page.category && (
            <>
              <Link to="/services" className="hover:text-bloom-primary">
                {page.category}
              </Link>
              <ChevronRight size={13} />
            </>
          )}
          <span className="text-slate-800 dark:text-gray-200 font-bold truncate max-w-xs sm:max-w-md">
            {page.title}
          </span>
        </div>
      </div>

      {/* Render All Page Blocks */}
      <main>
        {(page.blocks || []).map((block, idx) => (
          <BlockRenderer key={block.id || idx} block={block} />
        ))}
      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
};

export default DynamicPage;
