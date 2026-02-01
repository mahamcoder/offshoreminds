import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Building2, Clock, CheckCircle, Share2,
    Download, Video, Volume2, Maximize, DollarSign, Building, MapPinHouse
} from 'lucide-react';
import Reveal from '../components/common/Reveal';
import { caseStudiesData } from '../data/caseStudies';

const CaseStudyDetail = () => {
    const { id } = useParams();
    const [study, setStudy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isReading, setIsReading] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    // Icon mapping for metrics
    const getMetricIcon = (iconName) => {
        switch (iconName) {
            case 'Maximize': return <Maximize className="text-white" size={32} />;
            case 'DollarSign': return <DollarSign className="text-white" size={32} />;
            case 'Building': return <Building className="text-white" size={32} />;
            case 'Building2': return <Building2 className="text-white" size={32} />;
            case 'Clock': return <Clock className="text-white" size={32} />;
            case 'CheckCircle': return <CheckCircle className="text-white" size={32} />;
            case 'MapPin': return <MapPin className="text-white" size={32} />;
            default: return <CheckCircle className="text-white" size={32} />;
        }
    };

    useEffect(() => {
        // Find study by ID or title-slug
        const foundStudy = caseStudiesData.find(s =>
            s.id.toString() === id || s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id
        );

        setStudy(foundStudy);
        setLoading(false);
    }, [id]);

    // Share functionality
    const handleShare = async () => {
        const shareData = {
            title: study.title,
            text: `Check out this case study: ${study.title}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };

    // Download functionality
    const handleDownload = () => {
        // Create a formatted text document
        const content = `
${study.title}
${'='.repeat(study.title.length)}

Category: ${study.category}
Location: ${study.location}

THE CHALLENGE
-------------
${study.challenge}

OUR SOLUTION
------------
${study.solution}

KEY RESULTS
-----------
${study.results.map((result, i) => `${i + 1}. ${result}`).join('\n')}

---
Downloaded from: ${window.location.href}
        `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${study.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-case-study.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    // Voice/Read Aloud functionality
    const handleVoice = () => {
        if (isReading) {
            window.speechSynthesis.cancel();
            setIsReading(false);
        } else {
            const text = `
                ${study.title}. 
                The Challenge: ${study.challenge}. 
                Our Solution: ${study.solution}. 
                Key Results: ${study.results.join('. ')}.
            `;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.onend = () => setIsReading(false);
            window.speechSynthesis.speak(utterance);
            setIsReading(true);
        }
    };

    // Cleanup speech on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

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
                        {study.atGlance && (
                            <Reveal delay={200}>
                                <div className="bg-bloom-blue/5 border border-bloom-blue/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-bloom-blue">
                                        <CheckCircle /> At a Glance
                                    </h2>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {study.atGlance}
                                    </p>
                                </div>
                            </Reveal>
                        )}

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

                        {study.benefits && (
                            <Reveal delay={450}>
                                <div className="bg-bloom-secondary/5 border border-bloom-secondary/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-bloom-secondary">
                                        <CheckCircle /> Key Benefits
                                    </h2>
                                    <ul className="space-y-4">
                                        {study.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-bloom-secondary mt-2.5 shrink-0" />
                                                <span className="text-gray-300 text-lg leading-relaxed">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        )}

                        <Reveal delay={500}>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold mb-10 text-white">Key Metrics</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {(study.keyMetrics || []).map((metric, idx) => (
                                        <div key={idx} className="flex items-start gap-6 group">
                                            <div className="bg-white/5 rounded-2xl group-hover:bg-bloom-primary/20 transition-colors shrink-0">
                                                {getMetricIcon(metric.icon)}
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-white leading-none mb-2">
                                                    {metric.value}
                                                </div>
                                                <div className="text-gray-400 text-sm  leading-snug">
                                                    {metric.label}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 sticky top-32">
                            <h3 className="text-2xl font-bold mb-8 text-white text-left">Study Details</h3>
                            <div className="space-y-6 text-sm text-left">
                                <div className="flex flex-col gap-2 pb-5 border-b border-white/10">
                                    <span className="text-gray-400 text-xs uppercase tracking-wider">Industry</span>
                                    <span className="text-white font-semibold text-base">Real Estate Finance</span>
                                </div>
                                <div className="flex flex-col gap-2 pb-5 border-b border-white/10">
                                    <span className="text-gray-400 text-xs uppercase tracking-wider">Service</span>
                                    <span className="text-white font-semibold text-base leading-snug">{study.category}</span>
                                </div>
                                <div className="flex flex-col gap-2 pb-5">
                                    <span className="text-gray-400 text-xs uppercase tracking-wider">Timeline</span>
                                    <span className="text-white font-semibold text-base">Completed 2024</span>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/10 space-y-3">
                                <button
                                    onClick={handleShare}
                                    className="w-full py-4 px-6 bg-bloom-primary text-white font-bold rounded-2xl hover:bg-bloom-primary/80 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-bloom-primary/20"
                                >
                                    Share Success <Share2 size={18} />
                                </button>

                                <button
                                    onClick={handleDownload}
                                    className="w-full py-4 px-6 bg-bloom-blue text-white font-bold rounded-2xl hover:bg-bloom-blue/80 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-bloom-blue/20"
                                >
                                    Download Study <Download size={18} />
                                </button>

                                <button
                                    onClick={() => setShowVideoModal(true)}
                                    className="w-full py-4 px-6 bg-bloom-secondary text-bloom-dark font-bold rounded-2xl hover:bg-bloom-secondary/80 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-bloom-secondary/20"
                                >
                                    Watch Video <Video size={18} />
                                </button>

                                <button
                                    onClick={handleVoice}
                                    className={`w-full py-4 px-6 ${isReading ? 'bg-bloom-primary/60 border-bloom-primary' : 'bg-white/10 border-white/10'} ${isReading ? 'text-white' : 'text-bloom-secondary'} font-bold rounded-2xl border-2 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${isReading ? 'shadow-bloom-primary/20' : 'shadow-white/5'}`}
                                >
                                    {isReading ? 'Stop Reading' : 'Read Aloud'} <Volume2 size={18} className={isReading ? 'animate-pulse' : ''} />
                                </button>

                                <Link to="/contact" className="w-full py-4 px-6 border-2 border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center">
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

            {/* Video Modal */}
            {showVideoModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
                    onClick={() => setShowVideoModal(false)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-bloom-dark rounded-3xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowVideoModal(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors"
                        >
                            ×
                        </button>
                        <div className="aspect-video bg-black">
                            {/* Replace with actual video URL */}
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="Case Study Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-6 bg-white/5 border-t border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2">{study.title} - Video Presentation</h3>
                            <p className="text-gray-400 text-sm">Learn more about this successful project implementation</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseStudyDetail;
