import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, Clock, CheckCircle, Share2 } from 'lucide-react';
import Reveal from '../components/common/Reveal';
import { caseStudiesData } from '../data/caseStudies';

const CaseStudyDetail = () => {
    const { id } = useParams();
    const [study, setStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Find study by ID or title-slug
        const foundStudy = caseStudiesData.find(s =>
            s.id.toString() === id || s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id
        );

        setStudy(foundStudy);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-bloom-dark flex items-center justify-center text-white">
                <div className="w-12 h-12 border-4 border-bloom-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!study) {
        return (
            <div className="min-h-screen bg-bloom-dark flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Case Study Not Found</h2>
                <Link to="/case-studies" className="text-bloom-primary hover:underline flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Case Studies
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-bloom-dark min-h-screen text-white pt-24 pb-20">
            {/* Hero Section */}
            <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden">
                <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bloom-dark to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10">
                    <div className="container mx-auto max-w-5xl text-left">
                        <Reveal>
                            <span className="bg-bloom-primary/20 text-bloom-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-bloom-primary/30 mb-6 inline-block">
                                {study.category}
                            </span>
                        </Reveal>
                        <Reveal delay={100}>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl text-white">
                                {study.title}
                            </h1>
                        </Reveal>
                        <Reveal delay={200}>
                            <div className="flex items-center text-bloom-blue font-medium">
                                <MapPin size={20} className="mr-2" />
                                <span>{study.location}</span>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 max-w-5xl">
                <div className="grid lg:grid-cols-3 gap-12 text-left">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <Reveal delay={300}>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                                    <Clock className="text-red-400" /> The Challenge
                                </h2>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {study.challenge}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={400}>
                            <div className="bg-bloom-primary/5 border border-bloom-primary/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-bloom-primary">
                                    <Building2 /> Our Solution
                                </h2>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {study.solution}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={500}>
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6 text-white">Key Results</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {study.results.map((result, idx) => (
                                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:border-bloom-secondary/50 transition-colors">
                                            <CheckCircle className="text-bloom-secondary shrink-0 mt-1" />
                                            <span className="text-gray-300 font-medium">{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
                            <h3 className="text-xl font-bold mb-6 text-white text-left">Study Details</h3>
                            <div className="space-y-4 text-sm text-left">
                                <div className="flex justify-between py-3 border-b border-white/5">
                                    <span className="text-gray-500">Industry</span>
                                    <span className="text-white font-medium">Real Estate Finance</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/5">
                                    <span className="text-gray-500">Service</span>
                                    <span className="text-white font-medium">{study.category}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/5">
                                    <span className="text-gray-500">Timeline</span>
                                    <span className="text-white font-medium">Completed 2024</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                                <button className="w-full py-4 bg-bloom-primary text-bloom-dark font-bold rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2">
                                    Share Success <Share2 size={18} />
                                </button>
                                <Link to="/contact" className="w-full py-4 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center">
                                    Get Similar Results
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                    <Link to="/case-studies" className="inline-flex items-center gap-2 text-bloom-primary font-bold hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft size={20} /> Back to All Case Studies
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CaseStudyDetail;
