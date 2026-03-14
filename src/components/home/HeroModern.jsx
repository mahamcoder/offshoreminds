import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, ShieldCheck, ChevronDown, Sparkles, Play } from 'lucide-react';
import videoSource from '../../assets/video1.webm';
import fallbackImage from "../../assets/home.webp"; // adjust path based on your file location


const HeroModern = () => {
    const heroContent = [
        {
            title: "Asset Management",
            gradientText: "Support",
            description: "From rent roll audits to capex tracking, we provide actionable support for owners, sponsors, and brokers managing U.S. real estate portfolios"
        },
        {
            title: "Real Estate ",
            gradientText: "Analytics & Reporting",
            description: "We combine data from platforms like CoStar, RealPage, and LoopNet to deliver market trend analysis, leasing performance, and investor-ready dashboards."
        },
        {
            title: "Real Estate ",
            gradientText: "Financial Analysis",
            description: "We help real estate investors, sponsors, and brokers make informed decisions through advanced financial modeling, deal underwriting, IRR forecasting, and investment performance review."
        },
        {
            title: "Real Estate ",
            gradientText: "Accounting Services",
            description: "We manage bookkeeping, reconciliations, CAM audits, and financial reporting tailored for real estate portfolios—ensuring your numbers are clean, compliant, and investment-ready."
        }

    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % heroContent.length);
                setIsVisible(true);
            }, 500); // Wait for fade out
        }, 5000);
        return () => clearInterval(interval);
    }, [heroContent.length]);

    const services = [
        "Real Estate Analytics & Reporting",
        "Asset Management Support",
        "Real Estate Accounting Services",
        "Real Estate Financial Analysis"
    ];

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden section-fade animate-on-scroll">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 bg-bloom-dark">
                {/* Subtle Video Background - Desktop Only */}
                {!isMobile && (
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={fallbackImage} // Lightweight fallback
                            className="w-full h-full object-cover opacity-25 mix-blend-screen"
                        >
                            <source src={videoSource} type="video/mp4" />
                        </video>
                    </div>
                )}

                {/* Mobile Fallback Background */}
                {isMobile && (
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <img
                            src={fallbackImage}
                            alt="Background"
                            fetchpriority="high"
                            className="w-full h-full object-cover opacity-20 mix-blend-screen"
                        />
                    </div>
                )}
                {/* Gradient Blobs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-bloom-primary/30 rounded-full blur-[100px] animate-pulse float-soft"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] float-soft" style={{ animationDelay: '1.2s' }}></div>

                {/* 3D-like ground/texture overlay - mimic the purple fields in reference */}
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-bloom-dark via-bloom-primary/10 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 pb-20 z-20 text-center relative flex flex-col items-center">
                
                {/* Trusted Clients Badge */}
                <div className="flex items-center gap-3 mb-2 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-md shadow-lg w-fit mt-10">
                    <div className="flex -space-x-3">
                        <img className="w-8 h-8 rounded-full border-2 border-[#0a0f1c] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="Avatar 1" />
                        <img className="w-8 h-8 rounded-full border-2 border-[#0a0f1c] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80" alt="Avatar 2" />
                        <img className="w-8 h-8 rounded-full border-2 border-[#0a0f1c] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="Avatar 3" />
                    </div>
                    <span className="text-[14px] font-medium text-gray-300 tracking-wide">
                        10,000 + active users
                    </span>
                </div>

                <div className={`transition-all duration-700 transform min-h-[300px] w-full flex flex-col justify-center items-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                        {heroContent[currentIndex].title}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue">
                            {heroContent[currentIndex].gradientText}
                        </span>
                    </h1>

                    <p className="text-bloom-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-2 leading-relaxed font-light">
                        {heroContent[currentIndex].description}
                    </p>
                </div>

                {/* Services List - Endless marquee */}
                {/* Key Features / Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Users size={16} className="text-bloom-primary" />
                        <span className="text-sm font-medium text-gray-200">Expert Teams</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <TrendingUp size={16} className="text-bloom-blue" />
                        <span className="text-sm font-medium text-gray-200">Scalable Growth</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <ShieldCheck size={16} className="text-green-400" />
                        <span className="text-sm font-medium text-gray-200">Secure & Compliant</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 relative z-30">
                    <Link to="/contact" className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-bloom-primary text-white font-bold hover:bg-white hover:text-bloom-dark transition-all duration-300 shadow-[0_0_20px_rgba(93,92,222,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 group transform hover:-translate-y-1">
                        Get Started
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/contact" className="btn-glass w-full sm:w-auto px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black mr-1 shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
                            <Play size={12} className="ml-0.5" fill="currentColor" />
                        </span>
                        Watch Demo
                    </Link>
                </div>

                {/* Decorative Elements Removed */}
            </div>

            {/* Bottom Fade for smooth transition */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-bloom-dark to-transparent z-10 pointer-events-none"></div>
            {/* Scroll Down Indicator - Triple Animated Arrows */}
            <div
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center -space-y-5">
                    <ChevronDown className="text-white font-bold w-9 h-9 animate-arrow-blend" style={{ animationDelay: '0s' }} />
                    <ChevronDown className="text-white font-bold w-9 h-9 animate-arrow-blend" style={{ animationDelay: '0.2s' }} />
                    <ChevronDown className="text-white font-bold w-9 h-9 animate-arrow-blend" style={{ animationDelay: '0.4s' }} />
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes arrow-blend {
                    0% { opacity: 0; transform: translateY(-10px); }
                    50% { opacity: 0.5; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(10px); }
                }
                .animate-arrow-blend {
                    animation: arrow-blend 2s infinite ease-in-out;
                }
            `}} />
        </section>
    );
};

export default HeroModern;
