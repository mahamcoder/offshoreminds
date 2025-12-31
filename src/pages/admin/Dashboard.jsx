import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Search, Eye, FileText, Briefcase, RefreshCw } from 'lucide-react';
import BlogEditor from '../../components/admin/BlogEditor';
import JobEditor from '../../components/admin/JobEditor';
import { blogsData } from '../../data/blogs';
import { jobsData } from '../../data/jobs';
import { serverTimestamp, addDoc } from 'firebase/firestore';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' or 'jobs'
    const [blogs, setBlogs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null); // Blog or Job object
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const firestoreBlogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                isDynamic: true
            }));

            // switch-over Logic: If user has their own blogs, show ONLY those.
            let finalBlogs = [];
            if (firestoreBlogs.length > 0) {
                finalBlogs = firestoreBlogs;
            } else {
                finalBlogs = blogsData.map(b => ({ ...b, isDynamic: false }));
            }

            setBlogs(finalBlogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            if (error.code === 'permission-denied') {
                toast.error("Access denied. Please check your Firestore rules.");
            }
            // Fallback to static data
            setBlogs(blogsData.map(b => ({ ...b, isDynamic: false })));
        } finally {
            setLoading(false);
        }
    };

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const firestoreJobs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                isDynamic: true
            }));

            // switch-over Logic: If user has their own jobs, show ONLY those.
            let finalJobs = [];
            if (firestoreJobs.length > 0) {
                finalJobs = firestoreJobs;
            } else {
                finalJobs = jobsData.map(j => ({ ...j, isDynamic: false }));
            }

            setJobs(finalJobs);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            if (error.code === 'permission-denied') {
                toast.error("Access denied. Please check your Firestore rules.");
            }
            // Fallback to static data
            setJobs(jobsData.map(j => ({ ...j, isDynamic: false })));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'blogs') fetchBlogs();
        else fetchJobs();
    }, [activeTab]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/blogs');
    };

    const handleDelete = async (item, collectionName) => {
        const itemType = collectionName === 'blogs' ? 'blog' : 'job';

        // If it's a static example, we can't delete it from Firestore
        if (item.isDynamic === false) {
            toast.error(`This is a sample ${itemType}. To edit or delete it, please click 'Import Data' first.`);
            return;
        }

        if (window.confirm(`Are you sure you want to delete this ${itemType}? This action cannot be undone.`)) {
            try {
                await deleteDoc(doc(db, collectionName, item.id));
                if (collectionName === 'blogs') {
                    setBlogs(prev => prev.filter(blog => blog.id !== item.id));
                } else {
                    setJobs(prev => prev.filter(job => job.id !== item.id));
                }
                toast.success(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully!`);
            } catch (error) {
                console.error(`Error deleting ${itemType}:`, error);
                toast.error(`Failed to delete ${itemType}: ${error.message || 'Unknown error'}`);
            }
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentItem(null);
        setIsEditing(true);
    };

    const handleCloseEditor = () => {
        setIsEditing(false);
        setCurrentItem(null);
        if (activeTab === 'blogs') fetchBlogs();
        else fetchJobs();
    };

    const handleMigrate = async () => {
        if (!window.confirm("This will import legacy blogs and jobs into your database. Continue?")) return;
        setLoading(true);
        try {
            // Migrate Blogs
            let blogsAdded = 0;
            for (const blog of blogsData) {
                await addDoc(collection(db, "blogs"), {
                    title: blog.title,
                    excerpt: blog.excerpt,
                    category: blog.category,
                    date: blog.date,
                    author: blog.author || 'Admin',
                    image: typeof blog.image === 'string' ? blog.image : '',
                    createdAt: serverTimestamp()
                });
                blogsAdded++;
            }

            // Migrate Jobs
            let jobsAdded = 0;
            for (const job of jobsData) {
                await addDoc(collection(db, "jobs"), {
                    title: job.title,
                    level: job.level || 'Mid Level',
                    experience: job.experience || '',
                    location: job.location || 'Remote',
                    type: job.type || 'Full-Time',
                    category: job.category || 'Finance',
                    description: job.description || '',
                    responsibilities: job.responsibilities || [],
                    requirements: job.requirements || [],
                    createdAt: serverTimestamp()
                });
                jobsAdded++;
            }

            toast.success(`Imported ${blogsAdded} blogs and ${jobsAdded} jobs!`);
            fetchBlogs();
            fetchJobs();
        } catch (error) {
            console.error("Migration failed:", error);
            toast.error("Migration failed.");
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = (activeTab === 'blogs' ? blogs : jobs).filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (isEditing) {
        if (activeTab === 'blogs') {
            return <BlogEditor existingBlog={currentItem} onClose={handleCloseEditor} />;
        } else {
            return <JobEditor existingJob={currentItem} onClose={handleCloseEditor} />;
        }
    }

    return (
        // Added pt-28 to clear fixed navbar
        <div className="min-h-screen bg-bloom-dark text-white pt-32 pb-12 px-6 md:px-12 font-sans relative overflow-x-hidden">
            {/* Background glow effects */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-bloom-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-bloom-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-bloom-text-muted text-lg">Manage your articles and jobs.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleMigrate}
                            className="text-bloom-text-muted hover:text-white px-4 py-2 text-sm transition-all flex items-center gap-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10"
                            title="Import legacy static data"
                        >
                            <RefreshCw size={16} /> Import Data
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </header>

                {/* Tabs & Actions Bar */}
                <div className="space-y-6 mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
                        <div className="flex p-1 bg-black/40 rounded-xl self-start md:self-auto">
                            <button
                                onClick={() => setActiveTab('blogs')}
                                className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'blogs' ? 'bg-bloom-primary text-white shadow-lg shadow-bloom-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <FileText size={18} /> Blogs
                            </button>
                            <button
                                onClick={() => setActiveTab('jobs')}
                                className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'jobs' ? 'bg-bloom-primary text-white shadow-lg shadow-bloom-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Briefcase size={18} /> Jobs
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row flex-1 max-w-xl gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/50 transition-colors text-white placeholder-gray-500"
                                />
                            </div>
                            <button
                                onClick={handleCreate}
                                className="bg-gradient-to-r from-bloom-primary to-bloom-blue text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-bloom-primary/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <Plus size={20} /> Add New
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content List */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 opacity-50">
                        <div className="w-12 h-12 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-bloom-text-muted">Loading content...</p>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-white/5">
                                        <th className="p-6">Content Details</th>
                                        <th className="p-6">Category / Level</th>
                                        <th className="p-6">Last Updated</th>
                                        <th className="p-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredItems.map((item, index) => (
                                        <tr key={item.id} className="group hover:bg-white/[0.04] transition-colors relative">
                                            <td className="p-6">
                                                <div className="flex items-center gap-5">
                                                    {activeTab === 'blogs' && (
                                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-bloom-dark/50 shrink-0 border border-white/10">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                                    <FileText size={20} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    {activeTab === 'jobs' && (
                                                        <div className="w-12 h-12 rounded-xl bg-bloom-primary/10 flex items-center justify-center text-bloom-primary shrink-0 border border-bloom-primary/20">
                                                            <Briefcase size={20} />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-bloom-blue transition-colors">{item.title}</h3>
                                                            {item.isDynamic === false && (
                                                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-500 border border-amber-500/20 font-bold uppercase tracking-wider">Example</span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-500 text-sm line-clamp-1">
                                                            {activeTab === 'blogs' ? item.excerpt : `${item.location} • ${item.type}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${activeTab === 'blogs' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                                    {activeTab === 'blogs' ? item.category : item.level}
                                                </span>
                                            </td>
                                            <td className="p-6 text-sm text-gray-500 font-mono">
                                                {item.updatedAt?.seconds ? new Date(item.updatedAt.seconds * 1000).toLocaleDateString() : (item.date || 'N/A')}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-end items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    {activeTab === 'blogs' && (
                                                        <button
                                                            onClick={() => navigate(`/blogs/${item.id}`)}
                                                            className="p-2.5 text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all hover:scale-110"
                                                            title="View Live"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2.5 text-emerald-400 hover:bg-emerald-400/10 rounded-xl transition-all hover:scale-110"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item, activeTab)}
                                                        className="p-2.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-all hover:scale-110"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-600">
                            {activeTab === 'blogs' ? <FileText size={32} /> : <Briefcase size={32} />}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No {activeTab} found</h3>
                        <p className="text-gray-500 mb-8 max-w-sm text-center">It looks like you haven't added any {activeTab === 'blogs' ? 'blog posts' : 'jobs'} yet. Get started by creating one.</p>
                        <button
                            onClick={handleCreate}
                            className="bg-bloom-primary text-bloom-dark font-bold px-8 py-3 rounded-full hover:bg-white transition-all shadow-lg shadow-bloom-primary/20"
                        >
                            Create {activeTab === 'blogs' ? 'Blog Post' : 'Job'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
