import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jobsData } from '../data/jobs';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Briefcase, MapPin, Clock, ArrowRight, X, Globe, Zap, TrendingUp, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const toSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const Careers = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sync URL ID (Slug) with selectedJob
    useEffect(() => {
        if (id && jobs.length > 0) {
            const foundJob = jobs.find(j => toSlug(j.title) === id || j.id === id);
            if (foundJob) {
                setSelectedJob(foundJob);
            }
        } else if (!id) {
            setSelectedJob(null);
        }
    }, [id, jobs]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { collection, getDocs, query, orderBy } = await import('firebase/firestore');

                let firestoreJobs = [];
                try {
                    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
                    const querySnapshot = await getDocs(q);
                    firestoreJobs = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        isDynamic: true
                    }));
                } catch (orderErr) {
                    console.warn("Ordered fetch failed for jobs, falling back to simple fetch:", orderErr.message);
                    try {
                        const querySnapshot = await getDocs(collection(db, "jobs"));
                        firestoreJobs = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                            isDynamic: true
                        }));
                    } catch (fetchErr) {
                        console.error("Critical job fetch error:", fetchErr);
                    }
                }

                let finalJobs = [];
                if (firestoreJobs.length > 0) {
                    finalJobs = firestoreJobs;
                } else {
                    finalJobs = jobsData.map(j => ({ ...j, isDynamic: false }));
                }

                finalJobs.sort((a, b) => {
                    const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : Date.now();
                    const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : Date.now();
                    return timeB - timeA;
                });

                setJobs(finalJobs);
            } catch (error) {
                console.error("Error initializing job fetch:", error);
                setJobs(jobsData.map(j => ({ ...j, isDynamic: false })));
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const benefits = [
        {
            icon: <Globe className="text-bloom-primary" size={24} />,
            title: "Global Exposure",
            description: "Work directly on live US real estate deals (Multifamily, Retail, Office)."
        },
        {
            icon: <Zap className="text-bloom-primary" size={24} />,
            title: "Skill Mastery",
            description: "Get training on industry-standard tools like Argus Enterprise, Yardi, and MRI."
        },
        {
            icon: <TrendingUp className="text-bloom-primary" size={24} />,
            title: "Growth Path",
            description: "Clear progression from Analyst to Senior Analyst to Manager."
        },
        {
            icon: <Heart className="text-bloom-primary" size={24} />,
            title: "Work-Life Balance",
            description: "Fixed shifts, 5-day work weeks, and a supportive remote environment."
        }
    ];

    return (
        <div className="pt-20 min-h-screen bg-bloom-dark text-slate-900 dark:text-white transition-colors duration-300">
            <SEO
                title={selectedJob ? `${selectedJob.title} — Careers` : 'Careers'}
                description={selectedJob ? `Join Offshore Minds as ${selectedJob.title}. Location: ${selectedJob.location}. Apply now.` : 'Join Offshore Minds — explore career opportunities in real estate financial analysis, accounting, and asset management.'}
                path={selectedJob ? `/careers/${id}` : '/careers'}
                keywords="offshore minds careers, real estate jobs, financial analyst careers, accounting jobs"
            />
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bloom-primary/10 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            Accelerate Your Career in <span className="bg-gradient-to-r from-bloom-primary to-bloom-blue dark:from-bloom-secondary dark:to-white bg-clip-text text-transparent">Global Real Estate Finance.</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                            Join premier Real Estate KPO. Work with top US investors, master complex financial modeling, and build a world-class career.
                        </p>
                        <a
                            href="#openings"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-bloom-primary text-white rounded-full font-semibold hover:bg-slate-900 dark:hover:bg-white dark:hover:text-bloom-dark transition-all shadow-lg shadow-bloom-primary/25"
                        >
                            View Open Positions <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="py-20 bg-slate-100/70 dark:bg-white/5 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Work With Us?</h2>
                        <p className="text-slate-600 dark:text-gray-400">Join a team that values your growth and provides unmatched opportunities.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-8 rounded-2xl bg-white dark:bg-bloom-dark border border-slate-200/90 dark:border-white/10 hover:border-bloom-primary/50 transition-all shadow-sm group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-bloom-primary/10 transition-colors">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{benefit.title}</h3>
                                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Table */}
            <section id="openings" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Open Positions</h2>
                        <p className="text-slate-600 dark:text-gray-400">Discover your next challenge at Offshore Minds.</p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-sm shadow-sm">
                        {loading ? (
                            <div className="flex justify-center p-12 text-slate-500 dark:text-bloom-text-muted">Loading openings...</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                                        <th className="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
                                        <th className="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Experience Level</th>
                                        <th className="px-6 py-5 text-sm font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {jobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="text-lg font-medium text-slate-900 dark:text-white">{job.title}</div>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="px-3 py-1 rounded-full bg-bloom-primary/10 dark:bg-bloom-primary/20 text-bloom-primary dark:text-bloom-secondary text-xs font-semibold border border-bloom-primary/30 dark:border-bloom-secondary/30">
                                                    {job.level}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <button
                                                    onClick={() => navigate(`/careers/${toSlug(job.title)}`)}
                                                    className="px-5 py-2.5 rounded-lg border border-bloom-primary text-bloom-primary hover:bg-bloom-primary hover:text-white transition-all text-sm font-semibold"
                                                >
                                                    View & Apply
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {!loading && jobs.length === 0 && (
                            <div className="text-center p-12 text-slate-500 dark:text-gray-400">
                                No open positions at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Job Detail Modal */}
            {selectedJob && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm">
                    <div className="bg-white dark:bg-bloom-dark border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative p-8 md:p-12 shadow-2xl">
                        <button
                            onClick={() => navigate('/careers')}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-bloom-primary/10 dark:bg-bloom-primary/20 text-bloom-primary dark:text-bloom-secondary text-xs font-bold border border-bloom-primary/30 dark:border-bloom-secondary/30 mb-4 uppercase tracking-widest">
                                Currently Hiring
                            </span>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{selectedJob.title}</h2>
                            <div className="flex flex-wrap gap-4 text-slate-600 dark:text-gray-400 text-sm">
                                <span className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-lg border border-slate-200 dark:border-white/5 whitespace-nowrap"><MapPin size={16} /> {selectedJob.location}</span>
                                <span className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-lg border border-slate-200 dark:border-white/5 whitespace-nowrap"><Clock size={16} /> {selectedJob.type}</span>
                                <span className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-lg border border-slate-200 dark:border-white/5 whitespace-nowrap"><Briefcase size={16} /> {selectedJob.level}</span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {selectedJob.description && (
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the Job</h3>
                                    <div className="text-slate-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                        {selectedJob.description}
                                    </div>
                                </div>
                            )}

                            {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Key Responsibilities</h3>
                                    <ul className="space-y-3">
                                        {selectedJob.responsibilities.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-gray-400 leading-relaxed">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-bloom-primary shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Requirements</h3>
                                    <ul className="space-y-3">
                                        {selectedJob.requirements.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-gray-400 leading-relaxed">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-bloom-primary shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="pt-8 border-t border-slate-200 dark:border-white/10">
                                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h4 className="text-slate-900 dark:text-white font-bold mb-1">Interested in this position?</h4>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">Send your resume and cover letter to our recruitment team.</p>
                                    </div>
                                    <a
                                        href={selectedJob.applyLink || `mailto:careers@offshoreminds.co?subject=Application for ${selectedJob.title}`}
                                        target={selectedJob.applyLink ? "_blank" : "_self"}
                                        rel={selectedJob.applyLink ? "noopener noreferrer" : ""}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-bloom-primary text-white rounded-xl font-bold hover:bg-bloom-primary/90 transition-all shadow-md"
                                    >
                                        Apply Now <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
