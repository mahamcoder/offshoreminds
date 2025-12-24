import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react';
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
        requirements: ['']
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
                requirements: existingJob.requirements && existingJob.requirements.length > 0 ? existingJob.requirements : ['']
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
                 // If not using modal in future, allow navigate
            }
        } catch (error) {
            console.error("Error saving job:", error);
            toast.error("Failed to save job.");
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
                        <h1 className="text-3xl font-bold">{existingJob ? 'Edit Job' : 'Post New Job'}</h1>
                        {onClose && (
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                    placeholder="e.g. Senior Financial Analyst"
                                    required
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue">Level</label>
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors text-white"
                                >
                                    <option value="Entry Level">Entry Level</option>
                                    <option value="Associate / Mid">Associate / Mid</option>
                                    <option value="Senior Level">Senior Level</option>
                                    <option value="Management">Management</option>
                                    <option value="Executive">Executive</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                             <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue">Experience</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                    placeholder="e.g. 3-5 Years"
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                    placeholder="e.g. Remote"
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors text-white"
                                >
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-bloom-blue">Job Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                                className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bloom-primary transition-colors"
                                placeholder="Overview of the role and company..."
                                required
                            ></textarea>
                        </div>

                        {/* Responsibilities */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-bloom-blue">Key Responsibilities</label>
                                <button type="button" onClick={() => addArrayItem('responsibilities')} className="text-xs flex items-center gap-1 text-bloom-primary hover:text-white transition-colors">
                                    <Plus size={14} /> Add Item
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.responsibilities.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <textarea
                                            rows="2"
                                            value={item}
                                            onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                                            className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-bloom-primary transition-colors text-sm"
                                            placeholder={`Responsibility ${index + 1}`}
                                        />
                                        <button type="button" onClick={() => removeArrayItem('responsibilities', index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors h-fit mt-1">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* Requirements */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-bloom-blue">Requirements</label>
                                <button type="button" onClick={() => addArrayItem('requirements')} className="text-xs flex items-center gap-1 text-bloom-primary hover:text-white transition-colors">
                                    <Plus size={14} /> Add Item
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.requirements.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <textarea
                                            rows="2"
                                            value={item}
                                            onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                            className="w-full bg-bloom-dark/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-bloom-primary transition-colors text-sm"
                                            placeholder={`Requirement ${index + 1}`}
                                        />
                                        <button type="button" onClick={() => removeArrayItem('requirements', index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors h-fit mt-1">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
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
                                        {existingJob ? 'Update Job' : 'Post Job'}
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

export default JobEditor;
