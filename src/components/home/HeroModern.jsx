import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, ShieldCheck, ChevronDown, Sparkles, Play } from 'lucide-react';
import videoSource from '../../assets/video1.webm';
import fallbackImage from "../../assets/home.webp"; // adjust path based on your file location
import TickerBar from './TickerBar';


const HeroModern = () => {
    const heroContent = [
        {
            title: "Real Estate ",
            gradientText: "Financial Analysis",
            description: "The most successful real estate investments are built on intelligence, not instinct. Our financial analysts deliver real estate investment analysis, financial modelling, deal underwriting, and IRR forecasting to evaluate every opportunity with precision."
        },
        {
            title: "Asset Management",
            gradientText: "Support",
            description: "From rent roll audits to capex tracking, we provide actionable support for owners, sponsors, and brokers managing U.S. real estate portfolios"
        },
        {
            title: "Real Estate Analytics ",
            gradientText: "Intelligence Reporting",
            description: "In real estate, data wins. We turn insights from platforms like CoStar and LoopNet into powerful analytics and dashboards that reveal opportunities and keep you ahead."
        },
        {
            title: "Real Estate ",
            gradientText: "Accounting Services",
            description: "Our offshore accounting specialists provide end-to-end financial management—bookkeeping, reconciliations, cash flow, and investor reporting—ensuring your numbers tell a flawless story."
        },

        {
            title: "Real Estate ",
            gradientText: "Accounting Services",
            description: "Your numbers tell your investment story—we ensure it’s flawless. Our offshore real estate accounting experts deliver bookkeeping, reconciliations, CAM audits, and investor reporting with precision and compliance."
        },



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

                {/* Modern Animated Badge */}
                <div className="relative group  mt-12 mb-6 animate-fade-in">
                    <TickerBar />
                </div>

                <div className={`transition-all duration-700 transform min-h-[300px] w-full flex flex-col justify-center items-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}`}>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-[-0.02em] leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                        {heroContent[currentIndex].title}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-bloom-blue to-bloom-primary">
                            {heroContent[currentIndex].gradientText}
                        </span>
                    </h1>

                    <p className="text-bloom-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed font-light opacity-90">
                        {heroContent[currentIndex].description}
                    </p>
                </div>

                {/* Services List - Endless marquee */}
                {/* Key Features / Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                        <Users size={16} className="text-bloom-primary" />
                        <span className="text-sm font-medium text-gray-200">Expert Teams</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                        <TrendingUp size={16} className="text-bloom-blue" />
                        <span className="text-sm font-medium text-gray-200">Scalable Growth</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                        <ShieldCheck size={16} className="text-green-400" />
                        <span className="text-sm font-medium text-gray-200">Secure & Compliant</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-3 relative z-30 mb-4">
                    <Link to="/contact" className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-bloom-primary text-white font-bold hover:bg-white hover:text-bloom-dark transition-all duration-500 shadow-[0_0_20px_rgba(93,92,222,0.3)] hover:shadow-[0_0_40px_rgba(93,92,222,0.6)] flex items-center justify-center gap-2 group transform hover:-translate-y-1.5 focus:ring-2 focus:ring-bloom-primary/50">
                        Get Started
                        <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-500" />
                    </Link>
                    <Link to="/case-studies" className="btn-glass w-full sm:w-auto px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 group transition-all duration-500 border border-white/10 hover:bg-white/10 hover:-translate-y-1.5">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black mr-1 shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
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
                <div className="flex flex-col items-center -space-y-5 opacity-45">
                    <ChevronDown className="text-white font-bold w-10 h-10 animate-arrow-blend" style={{ animationDelay: '0s' }} />
                    <ChevronDown className="text-white font-bold w-10 h-10 animate-arrow-blend" style={{ animationDelay: '0.2s' }} />
                    <ChevronDown className="text-white font-bold w-10 h-10 animate-arrow-blend" style={{ animationDelay: '0.4s' }} />
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
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes tilt {
                    0%, 50%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(0.5deg); }
                    75% { transform: rotate(-0.5deg); }
                }
                .animate-tilt {
                    animation: tilt 10s infinite linear;
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s forwards ease-out;
                }
            `}} />
        </section>
    );
};

export default HeroModern;
