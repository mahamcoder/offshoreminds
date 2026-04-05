import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowLeft, Save, X, Plus, Trash2, Briefcase, MapPin, Clock, Layout } from 'lucide-react';
import { toast } from 'react-hot-toast';

const JobEditor = ({ existingJob = null, onClose = null }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        level: 'Mid Level',
        experience: '',
        location: 'Remote',
        type: 'Full-Time',
        category: 'Finance',
        description: '',
        responsibilities: [''],
        requirements: [''],
        applyLink: ''
    });

    useEffect(() => {
        if (existingJob) {
            setFormData({
                title: existingJob.title || '',
                level: existingJob.level || 'Mid Level',
                experience: existingJob.experience || '',
                location: existingJob.location || 'Remote',
                type: existingJob.type || 'Full-Time',
                category: existingJob.category || 'Finance',
                description: existingJob.description || '',
                responsibilities: existingJob.responsibilities && existingJob.responsibilities.length > 0 ? existingJob.responsibilities : [''],
                requirements: existingJob.requirements && existingJob.requirements.length > 0 ? existingJob.requirements : [''],
                applyLink: existingJob.applyLink || ''
            });
        }
    }, [existingJob]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeArrayItem = (field, index) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Filter out empty strings from arrays
            const cleanResponsibilities = formData.responsibilities.filter(item => item.trim() !== '');
            const cleanRequirements = formData.requirements.filter(item => item.trim() !== '');

            const jobData = {
                title: formData.title,
                level: formData.level,
                experience: formData.experience,
                location: formData.location,
                type: formData.type,
                category: formData.category,
                description: formData.description,
                responsibilities: cleanResponsibilities,
                requirements: cleanRequirements,
                applyLink: formData.applyLink,
                updatedAt: serverTimestamp()
            };

            if (existingJob) {
                await updateDoc(doc(db, "jobs", existingJob.id), jobData);
                toast.success("Job updated successfully!");
                if (onClose) onClose();
            } else {
                jobData.createdAt = serverTimestamp();
                await addDoc(collection(db, "jobs"), jobData);
                toast.success("Job posted successfully!");
                if (onClose) onClose();
            }
        } catch (error) {
            console.error("Error saving job:", error);
            toast.error("Failed to save job.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-bloom-dark min-h-screen text-white pt-28 pb-12 px-6 md:px-12 font-sans overflow-x-hidden">
            <div className="max-w-5xl mx-auto">
                {!onClose && (
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-bloom-text-muted hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                    </button>
                )}

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Decorative background glow */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-bloom-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-bloom-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {existingJob ? 'Edit Job Posting' : 'Create New Job'}
                            </h1>
                            <p className="text-bloom-text-muted mt-2">Fill in the details below to post a new opening.</p>
                        </div>
                        {onClose && (
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-bloom-text-muted hover:text-white">
                                <X size={24} />
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {/* Section: Basic Details */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-6">
                            <h3 className="text-lg font-semibold text-bloom-blue flex items-center gap-2">
                                <Layout size={18} /> Basic Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Job Title</label>
                                    <div className="relative">
                                        <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/50 transition-all text-white placeholder-gray-600"
                                            placeholder="e.g. Senior Financial Analyst"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Experience Level</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-bloom-secondary"></div>
                                        <select
                                            name="level"
                                            value={formData.level}
                                            onChange={handleChange}
                                            className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/50 transition-all text-white appearance-none cursor-pointer"
                                        >
                                            <option value="Entry Level">Entry Level</option>
                                            <option value="Associate / Mid">Associate / Mid</option>
                                            <option value="Senior Level">Senior Level</option>
                                            <option value="Management">Management</option>
                                            <option value="Executive">Executive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Years of Experience</label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/50 transition-all text-white placeholder-gray-600"
                                        placeholder="e.g. 3-5 Years"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Location</label>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/50 transition-all text-white placeholder-gray-600"
                                            placeholder="e.g. Remote"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Employment Type</label>
                                    <div className="relative">
                                        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/50 transition-all text-white appearance-none cursor-pointer"
                                        >
                                            <option value="Full-Time">Full-Time</option>
                                            <option value="Part-Time">Part-Time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            {/* Application Link */}
                            <div className="space-y-2 pt-4 border-t border-white/5">
                                <label className="text-sm font-medium text-gray-300">Application Link (Optional)</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-xs">URL</div>
                                    <input
                                        type="url"
                                        name="applyLink"
                                        value={formData.applyLink}
                                        onChange={handleChange}
                                        className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/50 transition-all text-white placeholder-gray-600"
                                        placeholder="https://docs.google.com/forms/..."
                                    />
                                    <p className="text-xs text-bloom-text-muted mt-2 ml-1">If provided, the 'Apply Now' button will redirect here. If empty, it opens the default email client.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section: Job Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Job Description & Overview</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                                className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary/50 focus:ring-1 focus:ring-bloom-primary/50 transition-all text-white placeholder-gray-600 resize-y"
                                placeholder="Describe the role, company culture, and main objectives..."
                                required
                            ></textarea>
                        </div>

                        {/* Section: Responsibilities */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-lg font-semibold text-bloom-blue">Key Responsibilities</label>
                                <button type="button" onClick={() => addArrayItem('responsibilities')} className="text-xs flex items-center gap-2 bg-bloom-primary/10 text-bloom-primary px-3 py-1.5 rounded-lg hover:bg-bloom-primary hover:text-white transition-all">
                                    <Plus size={14} /> Add Item
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.responsibilities.map((item, index) => (
                                    <div key={index} className="flex gap-3 group">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs text-gray-500 shrink-0 mt-1">
                                            {index + 1}
                                        </div>
                                        <textarea
                                            rows="2"
                                            value={item}
                                            onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                                            className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-bloom-primary/50 transition-all text-sm text-gray-300"
                                            placeholder="Enter a responsibility..."
                                        />
                                        <button type="button" onClick={() => removeArrayItem('responsibilities', index)} className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors h-fit mt-1 opacity-0 group-hover:opacity-100">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section: Requirements */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-lg font-semibold text-bloom-blue">Requirements & Qualifications</label>
                                <button type="button" onClick={() => addArrayItem('requirements')} className="text-xs flex items-center gap-2 bg-bloom-primary/10 text-bloom-primary px-3 py-1.5 rounded-lg hover:bg-bloom-primary hover:text-white transition-all">
                                    <Plus size={14} /> Add Item
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.requirements.map((item, index) => (
                                    <div key={index} className="flex gap-3 group">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs text-gray-500 shrink-0 mt-1">
                                            {index + 1}
                                        </div>
                                        <textarea
                                            rows="2"
                                            value={item}
                                            onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                            className="w-full bg-bloom-dark/80 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-bloom-primary/50 transition-all text-sm text-gray-300"
                                            placeholder="Enter a requirement..."
                                        />
                                        <button type="button" onClick={() => removeArrayItem('requirements', index)} className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors h-fit mt-1 opacity-0 group-hover:opacity-100">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                            {onClose && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all font-semibold"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-10 py-3 rounded-xl bg-gradient-to-r from-bloom-primary to-bloom-blue text-white font-bold hover:shadow-lg hover:shadow-bloom-primary/25 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        {existingJob ? 'Update Job Posting' : 'Publish Job Posting'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default JobEditor;
