import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Search, Eye } from 'lucide-react';
import Reveal from '../../components/common/Reveal';
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
            const blogsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBlogs(blogsList);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            try {
                const querySnapshot = await getDocs(collection(db, "blogs"));
                 const blogsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                blogsList.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
                setBlogs(blogsList);
            } catch(e) {}
        } finally {
            setLoading(false);
        }
    };

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const jobsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJobs(jobsList);
        } catch (error) {
             console.error("Error fetching jobs:", error);
             try {
                const querySnapshot = await getDocs(collection(db, "jobs"));
                 const jobsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                jobsList.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
                setJobs(jobsList);
            } catch(e) {}
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
        navigate('/admin/login');
    };

    const handleDelete = async (id, collectionName) => {
        const itemType = collectionName === 'blogs' ? 'blog' : 'job';
        if (window.confirm(`Are you sure you want to delete this ${itemType}? This action cannot be undone.`)) {
            try {
                await deleteDoc(doc(db, collectionName, id));
                if (collectionName === 'blogs') {
                    setBlogs(prev => prev.filter(blog => blog.id !== id));
                } else {
                    setJobs(prev => prev.filter(job => job.id !== id));
                }
                toast.success(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully!`);
            } catch (error) {
                console.error(`Error deleting ${itemType}:`, error);
                toast.error(`Failed to delete ${itemType}.`);
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
                // Check if already exists by checking title roughly or just add blindly?
                // To be safe against duplicates, we could check, but user asked to add them.
                // We'll trust the user knows what they are doing or just add them.
                // Converting image import to string if it's not already
                // In production build this might be a path.
                
                await addDoc(collection(db, "blogs"), {
                    title: blog.title,
                    excerpt: blog.excerpt,
                    category: blog.category,
                    date: blog.date,
                    author: blog.author || 'Admin',
                    // We can't easily upload the local image here without fetch/blob. 
                    // We'll skip image for now or use a placeholder if it's an object.
                    // If it's a string path, we save it.
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
             // Assuming JobEditor is imported
            return <JobEditor existingJob={currentItem} onClose={handleCloseEditor} />;
        }
    }

    return (
        <div className="min-h-screen bg-bloom-dark text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-bloom-text-muted">Manage your articles and jobs.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleMigrate}
                            className="text-bloom-text-muted hover:text-white px-4 py-2 text-sm transition-colors"
                        >
                            Import Legacy Data
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-full hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-200 transition-all duration-300 flex items-center gap-2"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`pb-4 px-4 font-bold transition-all ${activeTab === 'blogs' ? 'text-bloom-primary border-b-2 border-bloom-primary' : 'text-bloom-text-muted hover:text-white'}`}
                    >
                        Blogs
                    </button>
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`pb-4 px-4 font-bold transition-all ${activeTab === 'jobs' ? 'text-bloom-primary border-b-2 border-bloom-primary' : 'text-bloom-text-muted hover:text-white'}`}
                    >
                        Jobs
                    </button>
                </div>

                <div className="flex justify-between items-center mb-8 gap-4">
                     {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bloom-text-muted" size={20} />
                        <input 
                            type="text" 
                            placeholder={`Search ${activeTab}...`} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors text-white"
                        />
                    </div>
                     <button 
                        onClick={handleCreate}
                        className="bg-bloom-primary text-bloom-dark font-bold px-6 py-3 rounded-full hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-lg shadow-bloom-primary/20 whitespace-nowrap"
                    >
                        <Plus size={20} /> New {activeTab === 'blogs' ? 'Blog' : 'Job'}
                    </button>
                </div>

                {/* List */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-bloom-blue text-sm uppercase tracking-wider">
                                        <th className="p-6 font-bold">Details</th>
                                        <th className="p-6 font-bold">Category/Level</th>
                                        <th className="p-6 font-bold">Updated</th>
                                        <th className="p-6 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {filteredItems.map(item => (
                                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    {activeTab === 'blogs' && item.image && (
                                                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-bloom-dark" />
                                                    )}
                                                    <div>
                                                        <h3 className="font-bold text-white line-clamp-1 mb-1">{item.title}</h3>
                                                        <p className="text-bloom-text-muted text-xs line-clamp-1">
                                                            {activeTab === 'blogs' ? item.excerpt : `${item.location} • ${item.type}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="bg-bloom-primary/10 text-bloom-primary px-3 py-1 rounded-full text-xs font-bold border border-bloom-primary/20">
                                                    {activeTab === 'blogs' ? item.category : item.level}
                                                </span>
                                            </td>
                                            <td className="p-6 text-sm text-bloom-text-muted">
                                                {/* Use server timestamp date if available, else date string */}
                                                 {item.updatedAt?.seconds ? new Date(item.updatedAt.seconds * 1000).toLocaleDateString() : (item.date || 'N/A')}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-end items-center gap-2">
                                                    {activeTab === 'blogs' && (
                                                         <button 
                                                            onClick={() => navigate(`/blogs/${item.id}`)}
                                                            className="p-2 text-bloom-blue hover:bg-bloom-blue/10 rounded-lg transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2 text-bloom-secondary hover:bg-bloom-secondary/10 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id, activeTab)}
                                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-bloom-text-muted text-lg mb-4">No {activeTab} found.</p>
                        <button 
                            onClick={handleCreate}
                            className="text-bloom-primary font-bold hover:underline"
                        >
                            Create your first {activeTab === 'blogs' ? 'blog post' : 'job posting'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
