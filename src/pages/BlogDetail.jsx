import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { generateSlug } from '../utils/slug';
import Reveal from '../components/common/Reveal';
import BlogRenderer from '../components/blog/BlogRenderer';
import { blogsData } from '../data/blogs';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            console.log("Fetching blog with identifier:", id);
            try {
                // 1. Try fetching by ID first (legacy support)
                try {
                    const docRef = doc(db, "blogs", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log("Found blog by ID");
                        setBlog({ id: docSnap.id, ...docSnap.data() });
                        setLoading(false);
                        return;
                    }
                } catch (e) {
                    console.log("Not a valid ID or fetch failed, trying slug...");
                }

                // 2. Try fetching by Slug field
                const q = query(collection(db, "blogs"), where("slug", "==", id));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    console.log("Found blog by slug field");
                    const blogDoc = querySnapshot.docs[0];
                    setBlog({ id: blogDoc.id, ...blogDoc.data() });
                    setLoading(false);
                    return;
                }

                // 3. Fallback: Fetch all and match by title slug (for older blogs missing slug field)
                console.log("Trying title-slug match fallback...");
                const allDocs = await getDocs(collection(db, "blogs"));
                const matchingDoc = allDocs.docs.find(doc => {
                    const data = doc.data();
                    const titleSlug = data.title ? generateSlug(data.title) : '';
                    return titleSlug === id;
                });

                if (matchingDoc) {
                    console.log("Found blog by matching title-slug across all docs");
                    setBlog({ id: matchingDoc.id, ...matchingDoc.data() });
                    setLoading(false);
                    return;
                }

                // 4. Fallback to static data
                const staticBlog = blogsData.find(b =>
                    b.id.toString() === id || (b.title && generateSlug(b.title) === id)
                );

                if (staticBlog) {
                    console.log("Found blog in static data");
                    setBlog(staticBlog);
                } else {
                    console.warn("Blog not found after all attempts.");
                    setError('Blog not found');
                }
            } catch (err) {
                console.error("Critical error fetching blog:", err);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    // SEO Redirect: If we loaded by ID or a mismatching slug, but we have a canonical slug, redirect.
    useEffect(() => {
        if (!blog || loading) return;

        const canonicalSlug = blog.slug || generateSlug(blog.title);
        // If current URL param 'id' is NOT the canonical slug, but it IS the firebase ID, redirect to slug.
        if (id && id !== canonicalSlug && id === blog.id) {
            navigate(`/blogs/${canonicalSlug}`, { replace: true });
        }
    }, [blog, id, loading, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-bloom-dark flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-bloom-dark flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Oops!</h2>
                <p className="text-bloom-text-muted mb-8">{error || "Blog not found"}</p>
                <Link to="/blogs" className="text-bloom-primary hover:underline flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-bloom-dark min-h-screen text-white pt-24 pb-20">
            {/* Hero Image */}
            <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-bloom-dark to-transparent z-10"></div>
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container mx-auto px-4 relative z-20 -mt-32">
                <Reveal width="100%">
                    <div className="max-w-4xl mx-auto bg-bloom-dark/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-bloom-primary/10 text-bloom-primary px-4 py-1.5 rounded-full text-sm font-bold border border-bloom-primary/20 uppercase tracking-wider">
                                {blog.category}
                            </span>
                            <div className="flex items-center gap-2 text-bloom-text-muted text-sm">
                                <Calendar size={16} /> {blog.date}
                            </div>
                            <div className="flex items-center gap-2 text-bloom-text-muted text-sm">
                                <User size={16} /> {blog.author}
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white leading-tight">
                            {blog.title}
                        </h1>

                        <BlogRenderer content={blog.content} />

                        {/* Tags */}
                        {blog.keywords && blog.keywords.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h3 className="text-sm font-bold text-bloom-blue uppercase tracking-wider mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.keywords.map((keyword, idx) => (
                                        <span key={idx} className="text-xs bg-white/5 text-bloom-text-muted px-3 py-1 rounded-full border border-white/10">
                                            #{keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                            <Link to="/blogs" className="inline-flex items-center gap-2 text-bloom-primary font-bold hover:translate-x-[-4px] transition-transform">
                                <ArrowLeft size={20} /> Back to Insights
                            </Link>


                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default BlogDetail;
