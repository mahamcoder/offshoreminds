import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    doc, getDoc, collection, query, where, getDocs,
    updateDoc, increment, addDoc, serverTimestamp, orderBy,
    limit, deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import {
    ArrowLeft, Calendar, User, Heart, MessageCircle,
    Share2, Send, X, Link2, Check, Linkedin, Twitter,
    Trash2, Edit2
} from 'lucide-react';
import { generateSlug } from '../utils/slug';
import Reveal from '../components/common/Reveal';
import BlogRenderer from '../components/blog/BlogRenderer';
import { blogsData } from '../data/blogs';

// ── helpers ────────────────────────────────────────────────────────────────────

const timeAgo = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp?.seconds
        ? new Date(timestamp.seconds * 1000)
        : new Date(timestamp);
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60)    return `${diff}s ago`;
    if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};

const LIKED_KEY      = (id) => `blog_liked_${id}`;
const LIKE_DOC_KEY   = (id) => `blog_like_doc_${id}`;
const COMMENT_IDS_KEY = (id) => `blog_comment_ids_${id}`;

const getMyCommentIds = (blogId) => {
    try { return JSON.parse(localStorage.getItem(COMMENT_IDS_KEY(blogId)) || '[]'); }
    catch { return []; }
};
const addMyCommentId = (blogId, commentId) => {
    const ids = getMyCommentIds(blogId);
    localStorage.setItem(COMMENT_IDS_KEY(blogId), JSON.stringify([...ids, commentId]));
};
const removeMyCommentId = (blogId, commentId) => {
    const ids = getMyCommentIds(blogId).filter(id => id !== commentId);
    localStorage.setItem(COMMENT_IDS_KEY(blogId), JSON.stringify(ids));
};

const avatarColor = (name = '') => {
    const colors = [
        'from-violet-500 to-purple-600',
        'from-blue-500 to-cyan-500',
        'from-emerald-400 to-teal-500',
        'from-rose-400 to-pink-500',
        'from-amber-400 to-orange-500',
        'from-bloom-primary to-bloom-blue',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return colors[hash % colors.length];
};

// ── component ──────────────────────────────────────────────────────────────────

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const commentSectionRef = useRef(null);
    const likePopoverRef    = useRef(null);

    const [blog, setBlog]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');

    // Likes
    const [likes, setLikes]             = useState(0);
    const [hasLiked, setHasLiked]       = useState(false);
    const [myLikeDocId, setMyLikeDocId] = useState(null); // reactive — triggers re-render for unlike btn
    const [likeAnimate, setLikeAnimate] = useState(false);
    const [likersList, setLikersList]   = useState([]);
    const [showLikePopover, setShowLikePopover] = useState(false);
    const [likeName, setLikeName]       = useState('');
    const [isLiking, setIsLiking]       = useState(false);

    // Comments
    const [comments, setComments]           = useState([]);
    const [commentsCount, setCommentsCount] = useState(0);
    const [commentName, setCommentName]     = useState('');
    const [commentText, setCommentText]     = useState('');
    const [isCommenting, setIsCommenting]   = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState('');
    const [myCommentIds, setMyCommentIds]   = useState([]);

    // Share
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied]               = useState(false);

    // ── fetch blog ─────────────────────────────────────────────────────────────
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                try {
                    const docRef = doc(db, 'blogs', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = { id: docSnap.id, ...docSnap.data() };
                        setBlog(data);
                        setLikes(data.likesCount || 0);
                        setCommentsCount(data.commentsCount || 0);
                        setLoading(false);
                        return;
                    }
                } catch (_) {}

                const q = query(collection(db, 'blogs'), where('slug', '==', id));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const blogDoc = snap.docs[0];
                    const data = { id: blogDoc.id, ...blogDoc.data() };
                    setBlog(data);
                    setLikes(data.likesCount || 0);
                    setCommentsCount(data.commentsCount || 0);
                    setLoading(false);
                    return;
                }

                const allDocs = await getDocs(collection(db, 'blogs'));
                const match = allDocs.docs.find(d => {
                    const data = d.data();
                    return data.title ? generateSlug(data.title) === id : false;
                });
                if (match) {
                    const data = { id: match.id, ...match.data() };
                    setBlog(data);
                    setLikes(data.likesCount || 0);
                    setCommentsCount(data.commentsCount || 0);
                    setLoading(false);
                    return;
                }

                const staticBlog = blogsData.find(b =>
                    b.id.toString() === id || (b.title && generateSlug(b.title) === id)
                );
                if (staticBlog) {
                    setBlog(staticBlog);
                    setLikes(staticBlog.likesCount || 0);
                    setCommentsCount(staticBlog.commentsCount || 0);
                } else { setError('Blog not found'); }
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to load blog post');
            } finally { setLoading(false); }
        };
        if (id) fetchBlog();
    }, [id]);

    // ── SEO redirect ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (!blog || loading) return;
        const canonicalSlug = blog.slug || generateSlug(blog.title);
        if (id && id !== canonicalSlug && id === blog.id)
            navigate(`/blogs/${canonicalSlug}`, { replace: true });
    }, [blog, id, loading, navigate]);

    // ── localStorage hydration ─────────────────────────────────────────────────
    useEffect(() => {
        if (blog?.id) {
            setHasLiked(localStorage.getItem(LIKED_KEY(blog.id)) === 'true');
            setMyLikeDocId(localStorage.getItem(LIKE_DOC_KEY(blog.id)));
            setMyCommentIds(getMyCommentIds(blog.id));
        }
    }, [blog?.id]);

    // ── fetch likers ──────────────────────────────────────────────────────────
    useEffect(() => {
        const fetchLikers = async () => {
            if (!blog?.id) return;
            try {
                const q = query(
                    collection(db, 'blogs', blog.id, 'likes'),
                    orderBy('createdAt', 'desc'), limit(20)
                );
                const snap = await getDocs(q);
                setLikersList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            } catch (err) { console.warn('Could not fetch likers:', err.message); }
        };
        fetchLikers();
    }, [blog?.id]);

    // ── fetch comments ────────────────────────────────────────────────────────
    useEffect(() => {
        const fetchComments = async () => {
            if (!blog?.id) return;
            try {
                const q = query(
                    collection(db, 'blogs', blog.id, 'comments'),
                    orderBy('createdAt', 'desc')
                );
                const snap = await getDocs(q);
                setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            } catch (err) { console.warn('Could not fetch comments:', err.message); }
        };
        fetchComments();
    }, [blog?.id]);

    // ── close popovers on outside click ───────────────────────────────────────
    useEffect(() => {
        if (!showLikePopover) return;
        const handler = (e) => {
            if (likePopoverRef.current && !likePopoverRef.current.contains(e.target))
                setShowLikePopover(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showLikePopover]);

    // ── like handlers ─────────────────────────────────────────────────────────

    const handleLikeClick = () => {
        if (hasLiked) return;
        setShowLikePopover(true);
    };

    const handleLikeConfirm = async () => {
        if (hasLiked || !blog?.id) return;
        setIsLiking(true);
        const name = likeName.trim() || 'Anonymous';

        setLikes(prev => prev + 1);
        setHasLiked(true);
        setShowLikePopover(false);
        setLikeAnimate(true);
        setTimeout(() => setLikeAnimate(false), 600);
        localStorage.setItem(LIKED_KEY(blog.id), 'true');
        const optimisticLiker = { id: 'temp-like', name, createdAt: { seconds: Math.floor(Date.now() / 1000) } };
        setLikersList(prev => [optimisticLiker, ...prev]);

        try {
            const likeRef = await addDoc(collection(db, 'blogs', blog.id, 'likes'), {
                name, createdAt: serverTimestamp()
            });
            // store the doc ID AND update state so unlike button appears immediately
            localStorage.setItem(LIKE_DOC_KEY(blog.id), likeRef.id);
            setMyLikeDocId(likeRef.id);
            await updateDoc(doc(db, 'blogs', blog.id), { likesCount: increment(1) });
            // swap temp with real ID
            setLikersList(prev => prev.map(l => l.id === 'temp-like' ? { ...l, id: likeRef.id } : l));
        } catch (err) {
            console.error('Like failed:', err);
            setLikes(prev => prev - 1);
            setHasLiked(false);
            setMyLikeDocId(null);
            setLikersList(prev => prev.filter(l => l.id !== 'temp-like'));
            localStorage.removeItem(LIKED_KEY(blog.id));
            localStorage.removeItem(LIKE_DOC_KEY(blog.id));
        } finally {
            setIsLiking(false);
            setLikeName('');
        }
    };

    const handleUnlike = async () => {
        if (!hasLiked || !blog?.id || !myLikeDocId) return;

        // Optimistic
        setLikes(prev => Math.max(0, prev - 1));
        setHasLiked(false);
        setLikersList(prev => prev.filter(l => l.id !== myLikeDocId));
        const prevDocId = myLikeDocId;
        setMyLikeDocId(null);
        localStorage.removeItem(LIKED_KEY(blog.id));
        localStorage.removeItem(LIKE_DOC_KEY(blog.id));

        try {
            await deleteDoc(doc(db, 'blogs', blog.id, 'likes', prevDocId));
            await updateDoc(doc(db, 'blogs', blog.id), { likesCount: increment(-1) });
        } catch (err) {
            console.error('Unlike failed:', err);
            // rollback
            setLikes(prev => prev + 1);
            setHasLiked(true);
            setMyLikeDocId(prevDocId);
            localStorage.setItem(LIKED_KEY(blog.id), 'true');
            localStorage.setItem(LIKE_DOC_KEY(blog.id), prevDocId);
        }
    };

    // ── comment handlers ──────────────────────────────────────────────────────

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim() || !blog?.id) return;
        setIsCommenting(true);

        const name = commentName.trim() || 'Anonymous';
        const tempId = 'temp-' + Date.now();
        const optimistic = {
            id: tempId, name,
            text: commentText.trim(),
            createdAt: { seconds: Math.floor(Date.now() / 1000) }
        };

        setComments(prev => [optimistic, ...prev]);
        setCommentsCount(prev => prev + 1);
        setCommentText('');
        setCommentName('');

        try {
            const ref = await addDoc(collection(db, 'blogs', blog.id, 'comments'), {
                name, text: optimistic.text, createdAt: serverTimestamp()
            });
            await updateDoc(doc(db, 'blogs', blog.id), { commentsCount: increment(1) });
            // swap temp ID with real ID and save to localStorage
            setComments(prev => prev.map(c => c.id === tempId ? { ...c, id: ref.id } : c));
            addMyCommentId(blog.id, ref.id);
            setMyCommentIds(getMyCommentIds(blog.id));
        } catch (err) {
            console.error('Comment failed:', err);
        } finally { setIsCommenting(false); }
    };

    const handleStartEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentText(comment.text);
    };

    const handleSaveEditComment = async (commentId) => {
        if (!editingCommentText.trim() || !blog?.id) return;
        const newText = editingCommentText.trim();

        setComments(prev => prev.map(c => c.id === commentId ? { ...c, text: newText } : c));
        setEditingCommentId(null);
        setEditingCommentText('');

        try {
            await updateDoc(doc(db, 'blogs', blog.id, 'comments', commentId), {
                text: newText, updatedAt: serverTimestamp()
            });
        } catch (err) {
            console.error('Edit comment failed:', err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Delete this comment?') || !blog?.id) return;

        setComments(prev => prev.filter(c => c.id !== commentId));
        setCommentsCount(prev => Math.max(0, prev - 1));
        removeMyCommentId(blog.id, commentId);
        setMyCommentIds(prev => prev.filter(id => id !== commentId));

        try {
            await deleteDoc(doc(db, 'blogs', blog.id, 'comments', commentId));
            await updateDoc(doc(db, 'blogs', blog.id), { commentsCount: increment(-1) });
        } catch (err) {
            console.error('Delete comment failed:', err);
        }
    };

    // ── share handler ─────────────────────────────────────────────────────────

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Check out this article: ${blog?.title}`;
        const urls = {
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            twitter:  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        };
        if (platform === 'copy') {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        } else {
            window.open(urls[platform], '_blank', 'noopener,noreferrer');
        }
        setShowShareMenu(false);
    };

    const scrollToComments = () =>
        commentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // ── likers summary ────────────────────────────────────────────────────────

    const formatLikersSummary = () => {
        if (likersList.length === 0) return null;
        const names = likersList.slice(0, 3).map(l => l.name || 'Anonymous');
        const rest  = likersList.length - 3;
        if (likersList.length === 1) return `${names[0]} liked this`;
        if (likersList.length === 2) return `${names[0]} and ${names[1]} liked this`;
        if (rest <= 0)               return `${names[0]}, ${names[1]}, and ${names[2]} liked this`;
        return `${names[0]}, ${names[1]}, and ${rest + 1} others liked this`;
    };

    // ── loading / error ───────────────────────────────────────────────────────

    if (loading) return (
        <div className="min-h-screen bg-bloom-dark flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error || !blog) return (
        <div className="min-h-screen bg-bloom-dark flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-bold mb-4">Oops!</h2>
            <p className="text-bloom-text-muted mb-8">{error || 'Blog not found'}</p>
            <Link to="/blogs" className="text-bloom-primary hover:underline flex items-center gap-2">
                <ArrowLeft size={18} /> Back to Blogs
            </Link>
        </div>
    );

    const likersSummary = formatLikersSummary();

    // ── render ────────────────────────────────────────────────────────────────

    return (
        <div className="bg-bloom-dark min-h-screen text-white pt-24 pb-20">
            {/* Hero Image */}
            <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-bloom-dark to-transparent z-10"></div>
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>

            <div className="container mx-auto px-4 relative z-20 -mt-32">
                <Reveal width="100%">
                    <div className="max-w-6xl mx-auto bg-bloom-dark/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-bloom-primary/10 text-bloom-primary px-4 py-1.5 rounded-full text-sm font-bold border border-bloom-primary/20 uppercase tracking-wider">
                                {blog.category}
                            </span>
                            <div className="flex items-center gap-2 text-bloom-text-muted text-sm"><Calendar size={16} /> {blog.date}</div>
                            <div className="flex items-center gap-2 text-bloom-text-muted text-sm"><User size={16} /> {blog.author}</div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white leading-tight">{blog.title}</h1>

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

                        {/* ── Interaction Bar ──────────────────────────────────────────────── */}
                        <div className="mt-10 pt-8 border-t border-white/10">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">

                                    {/* Like / Unlike */}
                                    <div className="relative flex items-center gap-1" ref={likePopoverRef}>
                                        <button
                                            id="like-btn"
                                            onClick={handleLikeClick}
                                            disabled={hasLiked}
                                            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 font-semibold text-sm
                                                ${hasLiked
                                                    ? 'bg-red-500/15 border-red-500/40 text-red-400 cursor-default'
                                                    : 'bg-white/5 border-white/10 text-bloom-text-muted hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
                                                }`}
                                            aria-label="Like this post"
                                        >
                                            <Heart size={18} className={`transition-all duration-300 ${hasLiked ? 'fill-red-400 text-red-400' : 'group-hover:text-red-400'} ${likeAnimate ? 'scale-125' : 'scale-100'}`} />
                                            <span>{likes}</span>
                                            {hasLiked && <span className="text-xs opacity-70">Liked</span>}
                                        </button>

                                        {/* Unlike (only if they liked AND we have the doc ID) */}
                                        {hasLiked && myLikeDocId && (
                                            <button
                                                id="unlike-btn"
                                                onClick={handleUnlike}
                                                title="Remove your like"
                                                className="p-1.5 rounded-full text-red-400/50 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}

                                        {/* Like Name Popover */}
                                        {showLikePopover && (
                                            <div className="absolute left-0 bottom-14 bg-bloom-dark/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl shadow-black/60 w-72 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Who's liking this?</span>
                                                    <button onClick={() => setShowLikePopover(false)} className="text-bloom-text-muted hover:text-white transition-colors"><X size={14} /></button>
                                                </div>
                                                <input
                                                    id="like-name-input"
                                                    type="text"
                                                    value={likeName}
                                                    onChange={e => setLikeName(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && handleLikeConfirm()}
                                                    placeholder="Your name (optional)"
                                                    autoFocus
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloom-primary/50 transition-all mb-3"
                                                />
                                                <button
                                                    id="like-confirm-btn"
                                                    onClick={handleLikeConfirm}
                                                    disabled={isLiking}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 text-white font-bold text-sm transition-all duration-200 disabled:opacity-50"
                                                >
                                                    <Heart size={14} className={isLiking ? 'animate-pulse fill-white' : 'fill-white'} />
                                                    {isLiking ? 'Liking...' : `Like as "${likeName.trim() || 'Anonymous'}"`}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Comment scroll */}
                                    <button
                                        id="scroll-to-comments-btn"
                                        onClick={scrollToComments}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-bloom-text-muted hover:bg-bloom-blue/10 hover:border-bloom-blue/30 hover:text-bloom-blue transition-all duration-300 font-semibold text-sm"
                                    >
                                        <MessageCircle size={18} />
                                        <span>{commentsCount}</span>
                                        <span className="hidden sm:inline text-xs opacity-70">Comments</span>
                                    </button>
                                </div>

                                {/* Share */}
                                <div className="relative">
                                    <button
                                        id="share-btn"
                                        onClick={() => setShowShareMenu(prev => !prev)}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-bloom-text-muted hover:bg-bloom-primary/10 hover:border-bloom-primary/30 hover:text-bloom-primary transition-all duration-300 font-semibold text-sm"
                                    >
                                        <Share2 size={18} />
                                        <span className="hidden sm:inline">Share</span>
                                    </button>
                                    {showShareMenu && (
                                        <div className="absolute right-0 bottom-14 bg-bloom-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl shadow-black/50 w-52 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                            <div className="flex justify-between items-center px-2 pb-2 mb-1 border-b border-white/10">
                                                <span className="text-xs font-bold text-white uppercase tracking-wider">Share via</span>
                                                <button onClick={() => setShowShareMenu(false)} className="text-bloom-text-muted hover:text-white transition-colors"><X size={14} /></button>
                                            </div>
                                            <button id="share-linkedin-btn" onClick={() => handleShare('linkedin')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-sm text-gray-300 hover:text-white">
                                                <div className="w-7 h-7 bg-[#0A66C2]/20 rounded-lg flex items-center justify-center text-[#0A66C2]"><Linkedin size={14} /></div>
                                                LinkedIn
                                            </button>
                                            <button id="share-twitter-btn" onClick={() => handleShare('twitter')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-sm text-gray-300 hover:text-white">
                                                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-white"><Twitter size={14} /></div>
                                                X / Twitter
                                            </button>
                                            <button id="share-copy-btn" onClick={() => handleShare('copy')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-sm text-gray-300 hover:text-white">
                                                <div className="w-7 h-7 bg-bloom-primary/10 rounded-lg flex items-center justify-center text-bloom-primary">
                                                    {copied ? <Check size={14} /> : <Link2 size={14} />}
                                                </div>
                                                {copied ? 'Copied!' : 'Copy Link'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Liked-By Strip */}
                            {likersList.length > 0 && (
                                <div className="mt-4 flex items-center gap-3 flex-wrap">
                                    <div className="flex -space-x-2">
                                        {likersList.slice(0, 6).map((liker, idx) => (
                                            <div
                                                key={liker.id || idx}
                                                title={liker.name || 'Anonymous'}
                                                className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColor(liker.name)} flex items-center justify-center text-white text-[10px] font-bold border-2 border-bloom-dark shadow-sm`}
                                                style={{ zIndex: likersList.length - idx }}
                                            >
                                                {(liker.name || 'A')[0].toUpperCase()}
                                            </div>
                                        ))}
                                        {likersList.length > 6 && (
                                            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white text-[9px] font-bold border-2 border-bloom-dark">
                                                +{likersList.length - 6}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-bloom-text-muted leading-tight">
                                        <Heart size={10} className="inline fill-red-400 text-red-400 mr-1" />
                                        {likersSummary}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ── Comment Section ──────────────────────────────────────────────── */}
                        <div ref={commentSectionRef} className="mt-14 scroll-mt-8">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <div className="w-9 h-9 bg-bloom-blue/10 rounded-xl flex items-center justify-center text-bloom-blue">
                                    <MessageCircle size={18} />
                                </div>
                                Discussion
                                <span className="text-sm font-normal text-bloom-text-muted">({commentsCount})</span>
                            </h2>

                            {/* Comment Form */}
                            <form id="comment-form" onSubmit={handleCommentSubmit}
                                className="relative mb-10 bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-bloom-primary/10 rounded-full blur-[60px] pointer-events-none"></div>
                                <h3 className="text-sm font-bold text-bloom-blue uppercase tracking-wider mb-5">Leave a Comment</h3>
                                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">Name (optional)</label>
                                        <input
                                            id="comment-name"
                                            type="text"
                                            value={commentName}
                                            onChange={e => setCommentName(e.target.value)}
                                            placeholder="Your name or leave blank"
                                            className="w-full bg-bloom-dark/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/30 transition-all"
                                        />
                                    </div>
                                    <div className="sm:flex sm:items-end">
                                        <p className="text-xs text-bloom-text-muted leading-relaxed">
                                            Commenting as <strong className="text-white">{commentName.trim() || 'Guest'}</strong>. Be respectful and constructive.
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Comment *</label>
                                    <textarea
                                        id="comment-text"
                                        value={commentText}
                                        onChange={e => setCommentText(e.target.value)}
                                        required rows="4"
                                        placeholder="Share your thoughts on this article..."
                                        className="w-full bg-bloom-dark/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 resize-y focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/30 transition-all"
                                    />
                                </div>
                                <button
                                    id="submit-comment-btn"
                                    type="submit"
                                    disabled={isCommenting || !commentText.trim()}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-bloom-primary to-bloom-blue text-bloom-dark font-bold text-sm hover:scale-[1.02] hover:shadow-lg hover:shadow-bloom-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isCommenting
                                        ? <div className="w-4 h-4 border-2 border-bloom-dark border-t-transparent rounded-full animate-spin"></div>
                                        : <Send size={15} />}
                                    {isCommenting ? 'Posting...' : 'Post Comment'}
                                </button>
                            </form>

                            {/* Comment List */}
                            <div className="space-y-4">
                                {comments.length === 0 ? (
                                    <div className="text-center py-12 text-bloom-text-muted">
                                        <MessageCircle size={36} className="mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
                                    </div>
                                ) : (
                                    comments.map((comment) => {
                                        const isMine = myCommentIds.includes(comment.id);
                                        const isEditing = editingCommentId === comment.id;

                                        return (
                                            <div key={comment.id} className="group flex gap-4 p-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-white/15 transition-all duration-200">
                                                {/* Avatar */}
                                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(comment.name)} flex items-center justify-center text-white font-bold text-sm shrink-0 border border-white/10`}>
                                                    {(comment.name || 'G')[0].toUpperCase()}
                                                </div>

                                                {/* Body */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                                                        <div className="flex items-baseline gap-3">
                                                            <span className="font-bold text-white text-sm">{comment.name || 'Guest'}</span>
                                                            <span className="text-xs text-bloom-text-muted">{timeAgo(comment.createdAt)}</span>
                                                            {comment.updatedAt && (
                                                                <span className="text-[10px] text-bloom-text-muted/50 italic">edited</span>
                                                            )}
                                                        </div>

                                                        {/* Edit / Delete — only for own comments */}
                                                        {isMine && !isEditing && (
                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => handleStartEditComment(comment)}
                                                                    title="Edit comment"
                                                                    className="p-1.5 rounded-lg text-gray-500 hover:text-bloom-primary hover:bg-bloom-primary/10 transition-all"
                                                                >
                                                                    <Edit2 size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteComment(comment.id)}
                                                                    title="Delete comment"
                                                                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Text or Edit Textarea */}
                                                    {isEditing ? (
                                                        <div className="space-y-2">
                                                            <textarea
                                                                value={editingCommentText}
                                                                onChange={e => setEditingCommentText(e.target.value)}
                                                                rows="3"
                                                                autoFocus
                                                                className="w-full bg-bloom-dark/60 border border-bloom-primary/40 rounded-xl px-4 py-2.5 text-sm text-white resize-y focus:outline-none focus:ring-1 focus:ring-bloom-primary/50 transition-all"
                                                            />
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => handleSaveEditComment(comment.id)}
                                                                    disabled={!editingCommentText.trim()}
                                                                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-bloom-primary text-bloom-dark font-bold text-xs hover:scale-[1.02] transition-all disabled:opacity-50"
                                                                >
                                                                    <Check size={12} /> Save
                                                                </button>
                                                                <button
                                                                    onClick={() => { setEditingCommentId(null); setEditingCommentText(''); }}
                                                                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white/5 text-gray-400 font-bold text-xs hover:bg-white/10 transition-all"
                                                                >
                                                                    <X size={12} /> Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-gray-300 leading-relaxed break-words">{comment.text}</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Back link */}
                        <div className="mt-12 pt-8 border-t border-white/10">
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
