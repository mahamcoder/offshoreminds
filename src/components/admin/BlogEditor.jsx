import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { db, auth } from '../../firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { blogCategories } from '../../data/blogs';

const BlogEditor = ({ existingBlog = null, onClose = null }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '', // In a real app this would be rich text
        category: 'Market Trends & Analytics',
        image: null, // File object
        imageUrl: '', // URL string
        author: existingBlog ? existingBlog.author : (auth.currentUser?.displayName || 'Admin'),
        keywords: '',
        externalLink: ''
    });

    useEffect(() => {
        if (existingBlog) {
            setFormData({
                title: existingBlog.title || '',
                excerpt: existingBlog.excerpt || '',
                content: existingBlog.content || '',
                category: existingBlog.category || 'Market Trends & Analytics',
                image: null,
                imageUrl: existingBlog.image || '',
                author: existingBlog.author || '',
                keywords: existingBlog.keywords ? existingBlog.keywords.join(', ') : '',
                externalLink: existingBlog.externalLink || ''
            });
        }
    }, [existingBlog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.imageUrl;

            if (formData.image) {
                imageUrl = await uploadToCloudinary(formData.image);
            }

            const blogData = {
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                category: formData.category,
                image: imageUrl,
                author: formData.author,
                keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
                externalLink: formData.externalLink,
                updatedAt: serverTimestamp()
            };

            if (existingBlog) {
                await updateDoc(doc(db, "blogs", existingBlog.id), blogData);
                toast.success("Blog updated successfully!");
                if (onClose) onClose();
            } else {
                blogData.createdAt = serverTimestamp();
                // For sorting reasons we might want a simple date string too, but timestamp is better
                blogData.date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                await addDoc(collection(db, "blogs"), blogData);
                toast.success("Blog created successfully!");
                navigate('/blogs');
            }
        } catch (error) {
            console.error("Error saving blog:", error);
            toast.error(`Failed to save blog: ${error.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-bloom-dark min-h-screen text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {!onClose && (
                    <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-bloom-text-muted hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={20} /> Back to Dashboard
                    </button>
                )}

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">{existingBlog ? 'Edit Blog' : 'Create New Blog'}</h1>
                        {onClose && (
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-bloom-blue">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                placeholder="Enter blog title"
                                required
                            />
                        </div>

                        {/* Category & Author */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors text-white"
                                >
                                    {blogCategories.filter(c => c !== "All").map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                    placeholder="Author name"
                                />
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-bloom-blue">Cover Image</label>
                            <div className="flex items-center gap-4">
                                {formData.imageUrl && (
                                    <img src={formData.imageUrl} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-white/10" />
                                )}
                                <label className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/10">
                                    <Upload size={18} />
                                    <span>{formData.imageUrl ? 'Change Image' : 'Upload Image'}</span>
                                    <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                </label>
                                {formData.image && <span className="text-sm text-bloom-text-muted">{formData.image.name}</span>}
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-bloom-blue">Excerpt (Short Description)</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows="3"
                                className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                placeholder="Brief summary of the blog post..."
                                required
                            ></textarea>
                        </div>

                        {/* External Link */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-bloom-blue">linked URL</label>
                            <input
                                type="url"
                                name="externalLink"
                                value={formData.externalLink}
                                onChange={handleChange}
                                className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                placeholder="https://example.com/full-article"
                            />
                            <p className="text-xs text-bloom-text-muted mt-2">If provided, the 'Read More' button will redirect here instead of the internal blog page.</p>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-bloom-blue">Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="12"
                                className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors font-mono text-sm leading-relaxed"
                                placeholder="Write your full blog content here..."
                                required
                            ></textarea>
                            <p className="text-xs text-bloom-text-muted mt-2">Basic support for entering text. For more complex formatting, HTML can be pasted here if rendering allows.</p>
                        </div>

                        {/* Keywords */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-bloom-blue">Keywords (Comma separated)</label>
                            <input
                                type="text"
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleChange}
                                className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                placeholder="e.g. AI, Real Estate, Technology"
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-bloom-primary text-bloom-dark font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-bloom-dark"></div>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        {existingBlog ? 'Update Blog' : 'Publish Blog'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
