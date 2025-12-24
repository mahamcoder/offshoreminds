import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/jobs'; // Keep as fallback/initial state if needed, or remove later
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Briefcase, MapPin, Clock, ArrowRight, X, Globe, Zap, TrendingUp, Heart } from 'lucide-react';

const Careers = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const jobsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                if (jobsList.length > 0) {
                    setJobs(jobsList);
                } else {
                    // Fallback to static data if DB is empty to show something
                    setJobs(jobsData); 
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setJobs(jobsData); // Fallback on error
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const benefits = [
        {
            icon: <Globe className="text-bloom-secondary" size={24} />,
            title: "Global Exposure",
            description: "Work directly on live US real estate deals (Multifamily, Retail, Office)."
        },
        {
            icon: <Zap className="text-bloom-secondary" size={24} />,
            title: "Skill Mastery",
            description: "Get training on industry-standard tools like Argus Enterprise, Yardi, and MRI."
        },
        {
            icon: <TrendingUp className="text-bloom-secondary" size={24} />,
            title: "Growth Path",
            description: "Clear progression from Analyst to Senior Analyst to Manager."
        },
        {
            icon: <Heart className="text-bloom-secondary" size={24} />,
            title: "Work-Life Balance",
            description: "Fixed shifts, 5-day work weeks, and a supportive remote environment."
        }
    ];

    return (
        <div className="pt-20 min-h-screen bg-bloom-dark">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bloom-primary/10 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Accelerate Your Career in <span className="bg-gradient-to-r from-bloom-secondary to-white bg-clip-text text-transparent">Global Real Estate Finance.</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Join premier Real Estate KPO. Work with top US investors, master complex financial modeling, and build a world-class career.
                        </p>
                        <a
                            href="#openings"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-bloom-primary text-white rounded-full font-semibold hover:bg-bloom-secondary transition-all"
                        >
                            View Open Positions <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="py-20 bg-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Work With Us?</h2>
                        <p className="text-gray-400">Join a team that values your growth and provides unmatched opportunities.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-8 rounded-2xl bg-bloom-dark border border-white/10 hover:border-bloom-secondary/50 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-bloom-secondary/10 transition-colors">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Table */}
            <section id="openings" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Open Positions</h2>
                        <p className="text-gray-400">Discover your next challenge at Offshore Minds.</p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        {loading ? (
                             <div className="flex justify-center p-12">
                                <div className="w-8 h-8 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="px-6 py-5 text-sm font-semibold text-gray-300 uppercase tracking-wider">Job Title</th>
                                        <th className="px-6 py-5 text-sm font-semibold text-gray-300 uppercase tracking-wider">Experience Level</th>
                                        <th className="px-6 py-5 text-sm font-semibold text-gray-300 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {jobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="text-lg font-medium text-white">{job.title}</div>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="px-3 py-1 rounded-full bg-bloom-primary/20 text-bloom-secondary text-xs border border-bloom-secondary/30">
                                                    {job.level}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <button
                                                    onClick={() => setSelectedJob(job)}
                                                    className="px-5 py-2.5 rounded-lg border border-bloom-secondary text-bloom-secondary hover:bg-bloom-secondary hover:text-white transition-all text-sm font-semibold"
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
                            <div className="text-center p-12 text-gray-400">
                                No open positions at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Job Detail Modal */}
            {selectedJob && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-bloom-dark border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative p-8 md:p-12 shadow-2xl">
                        <button
                            onClick={() => setSelectedJob(null)}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-bloom-primary/20 text-bloom-secondary text-xs font-bold border border-bloom-secondary/30 mb-4 uppercase tracking-widest">
                                Currently Hiring
                            </span>
                            <h2 className="text-3xl font-bold text-white mb-4">{selectedJob.title}</h2>
                            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 whitespace-nowrap"><MapPin size={16} /> {selectedJob.location}</span>
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 whitespace-nowrap"><Clock size={16} /> {selectedJob.type}</span>
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 whitespace-nowrap"><Briefcase size={16} /> {selectedJob.level}</span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {selectedJob.description && (
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">About the Job</h3>
                                    <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                                        {selectedJob.description}
                                    </div>
                                </div>
                            )}

                            {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">Key Responsibilities</h3>
                                    <ul className="space-y-3">
                                        {selectedJob.responsibilities.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-400 leading-relaxed">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-bloom-secondary shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
                                    <ul className="space-y-3">
                                        {selectedJob.requirements.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-400 leading-relaxed">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-bloom-secondary shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="pt-8 border-t border-white/10">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Interested in this position?</h4>
                                        <p className="text-sm text-gray-400">Send your resume and cover letter to our recruitment team.</p>
                                    </div>
                                    <a
                                        href={`mailto:careers@offshoreminds.co?subject=Application for ${selectedJob.title}`}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-bloom-primary text-white rounded-xl font-bold hover:bg-bloom-secondary transition-all"
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
