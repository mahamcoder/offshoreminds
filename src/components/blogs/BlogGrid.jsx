import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User, ChevronDown, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogsData } from '../../data/blogs';
import { toast } from 'react-hot-toast';
import { generateSlug } from '../../utils/slug';

const BlogGrid = ({ selectedCategory = "All", searchQuery = "" }) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                if (!import.meta.env.VITE_FIREBASE_API_KEY) {
                    setBlogs(blogsData);
                    setLoading(false);
                    return;
                }

                const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
                const { db } = await import('../../firebase');

                let firestoreBlogs = [];
                try {
                    // Strategy 1: Ordered by creation time
                    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
                    const querySnapshot = await getDocs(q);
                    firestoreBlogs = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        isDynamic: true
                    }));
                } catch (orderErr) {
                    if (orderErr.code === 'permission-denied') {
                        toast.error("Public blog access is blocked by database rules. Please update Firestore rules.");
                        console.error("FIREBASE PERMISSION ERROR: Please ensure your Firestore rules allow public reads for the 'blogs' collection.");
                    }
                    console.warn("Ordered fetch failed, falling back to simple fetch:", orderErr.message);
                    try {
                        // Strategy 2: Simple fetch (resilient to missing indexes/fields)
                        const querySnapshot = await getDocs(collection(db, "blogs"));
                        firestoreBlogs = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                            isDynamic: true
                        }));
                    } catch (fetchErr) {
                        if (fetchErr.code === 'permission-denied') {
                            toast.error("Could not load blogs. Permission denied.");
                        }
                        console.error("Critical fetch error:", fetchErr);
                    }
                }

                // switch-over Logic: If user has their own blogs, show ONLY those. 
                // If the DB is empty, show the original examples.
                let finalBlogs = [];
                if (firestoreBlogs.length > 0) {
                    finalBlogs = firestoreBlogs;
                } else {
                    finalBlogs = blogsData.map(b => ({ ...b, isDynamic: false }));
                }

                // Strategy 3: In-memory sorting (ensures newest content is always first)
                finalBlogs.sort((a, b) => {
                    const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.date).getTime();
                    const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.date).getTime();
                    return timeB - timeA;
                });

                setBlogs(finalBlogs);
            } catch (err) {
                console.error("Error initializing Firebase fetch", err);
                setBlogs(blogsData.map(b => ({ ...b, isDynamic: false })));
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
        setVisibleCount(filteredPosts.length); // Show ALL remaining on click
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
                    visiblePosts.map((post) => {
                        const detailLink = `/blogs/${post.slug || generateSlug(post.title) || post.id}`;
                        const isLinkedIn = !!post.linkedInUrl;

                        return (
                            <div key={post.id} className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-bloom-primary/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                                {/* Improved Clickable Image Hook */}
                                <div className="h-56 overflow-hidden relative shrink-0">
                                    {isLinkedIn ? (
                                        <a href={post.linkedInUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </a>
                                    ) : (
                                        <Link to={detailLink} className="block w-full h-full">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </Link>
                                    )}
                                    <div className="absolute inset-0 bg-bloom-dark/20 mix-blend-multiply transition-opacity group-hover:opacity-0 pointer-events-none"></div>
                                    <div className="absolute top-4 left-4 bg-bloom-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-bloom-primary border border-white/10">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 text-xs text-bloom-text-muted mb-4 flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} /> {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User size={14} /> {post.author}
                                        </div>
                                        {(post.likesCount > 0 || post.commentsCount > 0) && (
                                            <div className="flex items-center gap-2 ml-auto">
                                                {post.likesCount > 0 && (
                                                    <span className="flex items-center gap-1 text-red-400/70">
                                                        <Heart size={12} className="fill-red-400/70" />
                                                        {post.likesCount}
                                                    </span>
                                                )}
                                                {post.commentsCount > 0 && (
                                                    <span className="flex items-center gap-1 text-bloom-blue/70">
                                                        <MessageCircle size={12} />
                                                        {post.commentsCount}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Improved Clickable Title Hook */}
                                    {isLinkedIn ? (
                                        <a
                                            href={post.linkedInUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-bloom-blue transition-colors cursor-pointer leading-tight block"
                                        >
                                            {post.title}
                                        </a>
                                    ) : (
                                        <Link
                                            to={detailLink}
                                            className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-bloom-blue transition-colors cursor-pointer leading-tight block"
                                        >
                                            {post.title}
                                        </Link>
                                    )}

                                    <p className="text-bloom-text-muted mb-6 line-clamp-3 text-sm leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto">
                                        {isLinkedIn ? (
                                            <a href={post.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-bloom-secondary font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:text-white transition-colors">
                                                Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        ) : (
                                            <Link to={detailLink} className="text-bloom-secondary font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:text-white transition-colors">
                                                Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
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
                        Read More Articles
                        <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            )}
        </>
    );
};

export default BlogGrid;
