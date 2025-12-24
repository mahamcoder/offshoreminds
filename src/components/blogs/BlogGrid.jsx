import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogsData } from '../../data/blogs';

const BlogGrid = ({ selectedCategory = "All", searchQuery = "" }) => {
    const [visibleCount, setVisibleCount] = useState(3);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Check if we have firebase keys (basic check)
                if (!import.meta.env.VITE_FIREBASE_API_KEY) {
                    // console.warn("Firebase not configured, using static data");
                    setBlogs(blogsData);
                    setLoading(false);
                    return;
                }

                const { collection, getDocs } = await import('firebase/firestore');
                const { db } = await import('../../firebase');
                
                try {
                    const querySnapshot = await getDocs(collection(db, "blogs"));
                    const blogsList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    
                    if (blogsList.length > 0) {
                        // Sort by date if possible, otherwise rely on order
                        // blogsList.sort(...) 
                        setBlogs(blogsList);
                    } else {
                         // Fallback to static if DB is empty
                         setBlogs(blogsData);
                    }
                } catch (err) {
                    console.error("Error fetching from Firebase", err);
                    setBlogs(blogsData);
                }
            } catch (err) {
                 console.error("Error initializing Firebase fetch", err);
                 setBlogs(blogsData);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredPosts = blogs.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.keywords && post.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())));

        return matchesCategory && matchesSearch;
    });

    const visiblePosts = filteredPosts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPosts.length;

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    if (loading) {
        return (
             <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePosts.length > 0 ? (
                    visiblePosts.map((post) => (
                        <div key={post.id} className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-bloom-primary/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                            <div className="h-56 overflow-hidden relative shrink-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-bloom-dark/20 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                                <div className="absolute top-4 left-4 bg-bloom-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-bloom-primary border border-white/10">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-bloom-text-muted mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} /> {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User size={14} /> {post.author}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-bloom-blue transition-colors cursor-pointer leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-bloom-text-muted mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <Link to={`/blogs/${post.id}`} className="text-bloom-secondary font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:text-white transition-colors">
                                        Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-bloom-text-muted text-lg">No blog posts found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Show More Button */}
            {hasMore && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleShowMore}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-bloom-primary/20 to-bloom-blue/20 border border-bloom-primary/40 rounded-full text-white font-bold hover:from-bloom-primary hover:to-bloom-primary hover:text-bloom-dark transition-all duration-300 shadow-lg hover:shadow-bloom-primary/30"
                    >
                        Show More Articles
                        <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            )}
        </>
    );
};

export default BlogGrid;
