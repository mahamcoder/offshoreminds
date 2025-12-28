import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import Reveal from '../components/common/Reveal';

const BlogDetail = () => {
    const { serviceId } = useParams(); // Note: Route param is :serviceId in App.jsx?? Wait, I need to check App.jsx route name. Assuming I name it :id or :blogId.
    // Actually, looking at App.jsx, there is no blog detail route yet. I will add it as /blogs/:id.
    // So here I should use useParams().id.
    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const docRef = doc(db, "blogs", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setBlog({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('Blog not found');
                }
            } catch (err) {
                console.error("Error fetching blog:", err);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

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
                <Reveal>
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

                        <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-bloom-blue prose-a:text-bloom-primary prose-img:rounded-xl">
                            {/* Simple text rendering for now, can be upgraded to HTML parser if needed */}
                            {blog.content.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-6 leading-relaxed text-bloom-text-muted/90">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

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
