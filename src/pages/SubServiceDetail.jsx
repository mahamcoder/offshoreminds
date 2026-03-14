import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { subServicesData } from '../data/subServices'; // Added Import
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Reveal from '../components/common/Reveal';
import HomeContact from '../components/home/HomeContact';
import ServiceTeam from '../components/services/ServiceTeam';
import ServiceCard from '../components/ServiceCard';

const SubServiceDetail = () => {
    const { serviceId, subServiceId } = useParams();
    const service = servicesData.find(s => s.id === serviceId);
    const subService = service?.subServices.find(ss => ss.id === subServiceId);

    // Get specific data for this sub-service or fallback to empty object to prevent errors
    const specificData = subServicesData[subServiceId] || {};

    if (!service || !subService) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bloom-dark text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
                    <Link to="/services" className="text-bloom-blue hover:text-white transition-colors">Back to Services</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bloom-dark min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative min-h-[100vh] flex items-center overflow-hidden">
                {/* Background Image & Effects */}
                <div className="absolute inset-0 z-0 select-none">
                    <img
                        src={subService.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=95"}
                        alt={subService.title}
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />

                    {/* Gradient Overlays for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-bloom-dark via-bloom-dark/90 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-bloom-dark via-transparent to-transparent opacity-90"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:border-white/20 w-fit"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium tracking-wide">Back to {service.title}</span>
                    </Link>

                    <div className="max-w-4xl">
                        <Reveal>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-12 h-[2px] bg-bloom-primary"></span>
                                <span className="text-bloom-blue font-bold tracking-[0.2em] uppercase text-sm">
                                    Specialized Service
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl lg:text-5xl  text-white mb-8 leading-[1.1] tracking-tight">
                                {subService.title}

                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-2xl text-balance">
                                {specificData.heroDescription || subService.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <Link
                                    to="/contact"
                                    className="bg-bloom-primary text-white font-bold px-7 py-3 rounded-full hover:bg-white hover:text-bloom-dark transition-all duration-300 shadow-xl shadow-bloom-primary/20 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3 group"
                                >
                                    Get Started
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <a
                                    href="#overview"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-7 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                                >
                                    Learn More
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                </div>
            </section>
            {/* Overview Section - ServiceOverview Style */}
            {/* <section id="overview" className="py-20 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bloom-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue mb-8 font-heading">
                            Overview
                        </h2>
                    </Reveal>
                    <Reveal delay={200} width="100%">
                        <p className="text-bloom-text-muted leading-relaxed text-xl md:text-xl font-light">
                            {service.overview || subService.description}
                        </p>
                    </Reveal>
                </div>
            </section> */}

            {/* Button-Style Moving Marquee */}
            <section className="py-16 overflow-hidden backdrop-blur-sm">
                <div className="marquee-wrapper">
                    <div className="marquee-track py-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex gap-8 items-center">
                                {["Strategic Planning", "Market Analysis", "Risk Management", "Financial Modeling", "Due Diligence", "Asset Management", "Valuation", "Closing Support"].map((text, idx) => (
                                    <div 
                                        key={idx} 
                                        className="group relative flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:border-bloom-blue/50 transition-all duration-500 cursor-default hover:bg-white/10 hover:transform hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
                                    >
                                        <Sparkles 
                                            size={16} 
                                            className="text-bloom-blue opacity-50 group-hover:opacity-100 transition-opacity duration-500" 
                                        />
                                        <span className="text-sm md:text-base text-white/80 group-hover:text-white font-bold uppercase tracking-widest transition-colors duration-500 whitespace-nowrap">
                                            {text}
                                        </span>
                                        {/* Subtle internal glow */}
                                        <div className="absolute inset-0 rounded-full bg-bloom-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comprehensive Services Section */}
            <section className="py-24 relative overflow-hidden bg-white/5">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <Reveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Comprehensive Services</h2>
                        </Reveal>

                        <div className="grid md:grid-cols-2 gap-8">
                            {(specificData.features || [
                                {
                                    title: "Expert Execution",
                                    description: `Our specialized team brings deep domain expertise to handle complex ${subService.title.toLowerCase()} requirements with precision and accuracy.`
                                },
                                {
                                    title: "Strategic Value",
                                    description: "We go beyond simple processing to provide strategic insights that help you make better real estate investment and management decisions."
                                },
                                {
                                    title: "Scalable Support",
                                    description: `Our model allows you to scale your ${subService.title.toLowerCase()} capacity up or down as needed without the overhead of internal hiring.`
                                },
                                {
                                    title: "Quality Assurance",
                                    description: "Multi-level quality checks ensure that every deliverable meets the highest institutional standards for clarity and reliability."
                                }
                            ]).map((feature, idx) => (
                                <Reveal key={idx} delay={(idx + 1) * 100}>
                                    <div className="bg-bloom-dark/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-bloom-primary/50 transition-all duration-300 h-full">
                                        <h3 className="text-xl font-bold text-bloom-blue mb-4">{feature.title}</h3>
                                        <p className="text-bloom-text-muted leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Expertise Section - Using Reused Component */}
            <ServiceTeam
                initialServiceId={service.id}
                customTitle={specificData.expertise?.title || "Expert Team & Capabilities"}
                customHeading={specificData.expertise?.heading || `Real Estate ${service.title} Experts`}
                customLabel="Our Expertise"
                customDescription={specificData.expertise?.description}
                hideDropdown={true}
                customCapabilities={specificData.expertise?.capabilities || service.capabilities}
                customHighlight={specificData.expertise?.highlight} // Added Prop
            />
            {/* Services Links Section */}
            <section className="py-24 relative overflow-hidden bg-bloom-dark/50 border-y border-white/5">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Reveal width="100%">
                            <span className="text-bloom-blue font-semibold uppercase tracking-widest text-sm mb-4 block">Take the Next Step</span>
                        </Reveal>
                        <Reveal delay={100} width="100%">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Our <span className="text-bloom-primary">Services</span></h2>
                        </Reveal>
                        <Reveal delay={200} width="100%">
                            <p className="text-bloom-text-muted text-lg">
                                Discover how our specialized expertise can be tailored to meet your unique real estate challenges.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <Reveal key={service.id} delay={index * 100} width="100%" height="100%">
                                <ServiceCard
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.shortDescription}
                                    link={`/services/${service.id}`}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <HomeContact />
        </div>
    );
};

export default SubServiceDetail;
