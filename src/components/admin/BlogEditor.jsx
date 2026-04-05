import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { generateSlug } from '../../utils/slug';
import { db, auth } from '../../firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowLeft, Upload, Save, X, BarChart2, Trash2, Edit2 } from 'lucide-react';
import { blogCategories } from '../../data/blogs';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ChartModal from './ChartModal';
import BlogRenderer from '../blog/BlogRenderer';

// Register Custom Chart Blot to prevent Quill from stripping attributes
const BlockEmbed = Quill.import('blots/block/embed');
class ChartBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();
        node.setAttribute('class', 'custom-chart-placeholder relative group my-8');
        node.setAttribute('data-chart', value.dataChart || value);
        node.setAttribute('contenteditable', 'false');

        const title = value.title || 'Untitled';

        // Use innerHTML to add the controls overlay with new CSS classes
        node.innerHTML = `
            <div class="pointer-events-none p-8 font-bold text-bloom-text-muted text-center border-2 border-dashed border-white/10 rounded-2xl">[Interactive Chart: ${title}]</div>
            <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-2xl pointer-events-auto">
                <button type="button" class="edit-chart-btn media-control-btn edit-media-btn px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xl bg-bloom-primary text-bloom-dark">Edit Chart</button>
                <button type="button" class="delete-chart-btn media-control-btn delete-media-btn px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xl bg-red-500 text-white">Delete Chart</button>
            </div>
        `;

        return node;
    }

    static value(node) {
        return {
            dataChart: node.getAttribute('data-chart'),
            title: node.querySelector('div')?.innerText.replace('[Interactive Chart: ', '').replace(']', '') || 'Untitled'
        };
    }
}
ChartBlot.blotName = 'chart';
ChartBlot.tagName = 'div';
ChartBlot.className = 'custom-chart-placeholder';
Quill.register(ChartBlot);

const BlogEditor = ({ existingBlog = null, onClose = null }) => {
    const navigate = useNavigate();
    const quillRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState('write'); // 'write' or 'preview'
    const [isChartModalOpen, setIsChartModalOpen] = useState(false);
    const [editingChartInfo, setEditingChartInfo] = useState(null); // { node, data }
    const [extractedCharts, setExtractedCharts] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '', // In a real app this would be rich text
        category: 'Market Trends & Analytics',
        image: null, // File object
        imageUrl: '', // URL string
        author: existingBlog ? existingBlog.author : (auth.currentUser?.displayName || 'Admin'),
        keywords: existingBlog ? (existingBlog.keywords ? existingBlog.keywords.join(', ') : '') : '',
        linkedInUrl: existingBlog ? (existingBlog.linkedInUrl || '') : ''
    });

    // ... existing useEffect ...

    // ... existing imageHandler ...

    const chartHandler = useCallback(() => {
        setIsChartModalOpen(true);
    }, []);

    const handleInsertChart = (chartData) => {
        const quill = quillRef.current.getEditor();

        // Use Base64 to avoid quoting issues
        const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(chartData))));

        if (editingChartInfo) {
            // Replace existing chart node
            const { node } = editingChartInfo;
            const blot = Quill.find(node);
            const index = quill.getIndex(blot);

            quill.deleteText(index, 1);
            quill.insertEmbed(index, 'chart', {
                dataChart: encodedData,
                title: chartData.title || 'Untitled'
            });
            setEditingChartInfo(null);
        } else {
            // Insert new chart
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'chart', {
                dataChart: encodedData,
                title: chartData.title || 'Untitled'
            });
            quill.setSelection(range.index + 1);
        }
    };

    // Close Modal and Reset Editing Info
    const handleCloseChartModal = () => {
        setIsChartModalOpen(false);
        setEditingChartInfo(null);
    };

    // Universal Click Listener for Media (Charts and Images)
    useEffect(() => {
        if (quillRef.current && editMode === 'write') {
            const quill = quillRef.current.getEditor();
            const container = quill.root;

            const handleClick = (e) => {
                // 1. Handle Chart Controls
                const editBtn = e.target.closest('.edit-chart-btn');
                const deleteChartBtn = e.target.closest('.delete-chart-btn');

                if (editBtn || deleteChartBtn) {
                    const chartPlaceholder = e.target.closest('.custom-chart-placeholder');
                    if (chartPlaceholder) {
                        const rawData = chartPlaceholder.getAttribute('data-chart');
                        if (editBtn) {
                            try {
                                const chartData = JSON.parse(decodeURIComponent(escape(atob(rawData))));
                                setEditingChartInfo({ node: chartPlaceholder, data: chartData });
                                setIsChartModalOpen(true);
                            } catch (err) {
                                console.error("Failed to parse chart:", err);
                                toast.error("Could not edit chart data");
                            }
                        } else if (deleteChartBtn) {
                            if (window.confirm("Delete this chart?")) {
                                const blot = Quill.find(chartPlaceholder);
                                quill.deleteText(quill.getIndex(blot), 1);
                                toast.success("Chart deleted");
                            }
                        }
                        return; // Done
                    }
                }

                // 2. Handle Regular Image Clicks
                if (e.target.tagName === 'IMG') {
                    const img = e.target;
                    // Provide a simple prompt for now, or we could show an overlay
                    if (window.confirm("Do you want to delete this image?")) {
                        const blot = Quill.find(img);
                        quill.deleteText(quill.getIndex(blot), 1);
                        toast.success("Image deleted");
                    }
                }
            };

            container.addEventListener('click', handleClick);
            return () => container.removeEventListener('click', handleClick);
        }
    }, [editMode]);

    // Extract charts from content to show in the manager
    useEffect(() => {
        const timer = setTimeout(() => {
            if (quillRef.current) {
                const quill = quillRef.current.getEditor();
                const chartBlots = quill.scroll.descendants(Quill.import('blots/embed') || Quill.import('blots/block')).filter(blot => blot.statics.blotName === 'chart');

                const charts = chartBlots.map(blot => {
                    const node = blot.domNode;
                    const rawData = node.getAttribute('data-chart');
                    if (!rawData) return null; // Ignore placeholders without data

                    try {
                        const data = JSON.parse(decodeURIComponent(escape(atob(rawData))));
                        return { id: Math.random().toString(36).substr(2, 9), blot, data };
                    } catch (e) {
                        return null; // Strict: ignore corrupted data
                    }
                }).filter(Boolean);
                setExtractedCharts(charts);
            }
        }, 500); // Debounce
        return () => clearTimeout(timer);
    }, [formData.content]);

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear the entire description? This cannot be undone.")) {
            setFormData(prev => ({ ...prev, content: '' }));
            toast.success("Content cleared");
        }
    };

    const handleDeleteChartFromList = (blot) => {
        const quill = quillRef.current.getEditor();
        const index = quill.getIndex(blot);
        quill.deleteText(index, 1);
        toast.success("Chart removed");
    };

    const handleEditChartFromList = (blot, data) => {
        setEditingChartInfo({ node: blot.domNode, data });
        setIsChartModalOpen(true);
    };

    const handleDeleteBlog = async () => {
        if (!existingBlog) return;
        if (window.confirm("CRITICAL: Are you sure you want to delete this entire blog post? This action is permanent.")) {
            try {
                setLoading(true);
                await deleteDoc(doc(db, "blogs", existingBlog.id));
                toast.success("Blog post deleted");
                if (onClose) onClose();
                else navigate('/admin/dashboard');
            } catch (error) {
                toast.error("Delete failed: " + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    const loadingToast = toast.loading("Uploading image...");
                    // Assume uploadToCloudinary returns the URL string
                    const url = await uploadToCloudinary(file);

                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection(true);

                    quill.insertEmbed(range.index, 'image', url);
                    quill.setSelection(range.index + 1);

                    toast.dismiss(loadingToast);
                    toast.success("Image uploaded!");
                } catch (error) {
                    toast.error("Image upload failed");
                    console.error("Error uploading image:", error);
                }
            }
        };
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                ['blockquote', { 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'code-block'],
                ['clean']
            ],
            handlers: {
                image: imageHandler,
                'code-block': chartHandler
            }
        }
    }), [imageHandler, chartHandler]);

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
                linkedInUrl: existingBlog.linkedInUrl || ''
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

            // Cleanup content: Remove empty chart placeholders or ghost divs
            // Use DOMParser for robust cleaning instead of brittle regex
            const parser = new DOMParser();
            const tempDoc = parser.parseFromString(formData.content, 'text/html');
            const placeholders = tempDoc.querySelectorAll('.custom-chart-placeholder');

            placeholders.forEach(p => {
                if (!p.getAttribute('data-chart')) {
                    p.remove();
                }
            });

            const cleanContent = tempDoc.body.innerHTML;

            const blogData = {
                title: formData.title,
                excerpt: formData.excerpt,
                content: cleanContent,
                category: formData.category,
                image: imageUrl,
                author: formData.author,
                keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
                linkedInUrl: formData.linkedInUrl,
                slug: generateSlug(formData.title),
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
                blogData.likesCount = 0;
                blogData.commentsCount = 0;

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

                        {/* LinkedIn URL Redirect */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-bloom-blue">LinkedIn URL (Optional Redirect)</label>
                            <input
                                type="url"
                                name="linkedInUrl"
                                value={formData.linkedInUrl}
                                onChange={handleChange}
                                className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                placeholder="https://www.linkedin.com/pulse/..."
                            />
                            <p className="text-xs text-bloom-text-muted mt-2 tracking-wide">
                                If provided, clicking the blog will redirect to this LinkedIn post instead of opening the internal page.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="h-full">
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-semibold text-bloom-blue">Content Description</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={handleClearAll}
                                        className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest"
                                    >
                                        Clear All
                                    </button>
                                    <div className="flex bg-white/5 p-1 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setEditMode('write')}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${editMode === 'write' ? 'bg-bloom-primary text-bloom-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Write
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditMode('preview')}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${editMode === 'preview' ? 'bg-bloom-primary text-bloom-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {editMode === 'write' ? (
                                <div className="space-y-6">
                                    <div className="bg-bloom-dark/50 border border-white/10 rounded-xl overflow-hidden focus-within:border-bloom-primary transition-colors text-white">
                                        <ReactQuill
                                            ref={quillRef}
                                            theme="snow"
                                            value={formData.content}
                                            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                            style={{ height: '300px', marginBottom: '50px' }}
                                            className="text-white"
                                            modules={modules}
                                            formats={[
                                                'header', 'size',
                                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                'list', 'bullet',
                                                'link', 'image', 'code-block', 'chart',
                                                'color', 'background'
                                            ]}
                                        />
                                        <p className="text-xs text-bloom-text-muted p-4 border-t border-white/5">
                                            Use the <strong>Code Block</strong> icon (<code>&lt;/&gt;</code>) to insert an Interactive Chart.
                                        </p>
                                    </div>

                                    {/* Media Manager Panel */}
                                    {extractedCharts.length > 0 && (
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-8 h-8 bg-bloom-primary/10 rounded-lg flex items-center justify-center text-bloom-primary">
                                                    <BarChart2 size={18} />
                                                </div>
                                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Charts in this post ({extractedCharts.length})</h3>
                                            </div>

                                            <div className="space-y-3">
                                                {extractedCharts.map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/5 hover:border-white/10 transition-all group">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-white leading-none mb-1">{item.data.title || 'Untitled Chart'}</span>
                                                            <span className="text-[10px] text-bloom-text-muted uppercase tracking-widest">{item.data.type} chart</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEditChartFromList(item.blot, item.data)}
                                                                className="p-2 text-gray-400 hover:text-bloom-primary transition-colors opacity-0 group-hover:opacity-100"
                                                                title="Edit Chart"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteChartFromList(item.blot)}
                                                                className="p-2 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                                                title="Delete Chart"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-bloom-dark/50 border border-white/10 rounded-xl p-8 min-h-[400px]">
                                    <BlogRenderer content={formData.content} />
                                </div>
                            )}
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
                        <div className="pt-8 flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-bloom-primary text-bloom-dark font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-bloom-primary/10"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-bloom-dark"></div>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        {existingBlog ? 'Update Blog Post' : 'Publish Blog Post'}
                                    </>
                                )}
                            </button>

                            {existingBlog && (
                                <button
                                    type="button"
                                    onClick={handleDeleteBlog}
                                    disabled={loading}
                                    className="w-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold py-4 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={20} />
                                    Delete Entire Blog Post
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <ChartModal
                isOpen={isChartModalOpen}
                onClose={handleCloseChartModal}
                onInsert={handleInsertChart}
                editingData={editingChartInfo?.data}
            />
        </div>
    );
};

export default BlogEditor;
