import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Reveal from '../components/common/Reveal';
import HomeContact from '../components/home/HomeContact';

const SubServiceDetail = () => {
    const { serviceId, subServiceId } = useParams();
    const service = servicesData.find(s => s.id === serviceId);
    const subService = service?.subServices.find(ss => ss.id === subServiceId);

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
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bloom-primary/20 rounded-full blur-[120px] animate-pulse float-soft"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bloom-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="mb-8">
                        <Link to={`/services/${service.id}`} className="inline-flex items-center gap-2 text-bloom-blue hover:text-white transition-colors group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Back to {service.title}
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm mb-4 block">Specialized Service</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue mb-6 leading-tight">
                                {subService.title}
                            </h1>
                            <p className="text-xl text-bloom-text-muted font-light leading-relaxed mb-8">
                                {subService.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="https://calendly.com/gyan-offshoreminds/30min?month=2025-12" target="_blank" rel="noopener noreferrer" className="bg-bloom-primary text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-bloom-dark transition-all duration-300">
                                    Get Started
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={200} className="relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={subService.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
                                    alt={subService.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bloom-dark/60 to-transparent"></div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-bloom-primary/20 blur-2xl rounded-full"></div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Detailed Content Section */}
            <section className="py-24 relative overflow-hidden bg-white/5">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <Reveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Comprehensive Solutions</h2>
                        </Reveal>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Reveal delay={100}>
                                <div className="bg-bloom-dark/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-bloom-primary/50 transition-all duration-300">
                                    <h3 className="text-xl font-bold text-bloom-blue mb-4">Expert Execution</h3>
                                    <p className="text-bloom-text-muted leading-relaxed">
                                        Our specialized team brings deep domain expertise to handle complex {subService.title.toLowerCase()} requirements with precision and accuracy.
                                    </p>
                                </div>
                            </Reveal>

                            <Reveal delay={200}>
                                <div className="bg-bloom-dark/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-bloom-primary/50 transition-all duration-300">
                                    <h3 className="text-xl font-bold text-bloom-blue mb-4">Strategic Value</h3>
                                    <p className="text-bloom-text-muted leading-relaxed">
                                        We go beyond simple processing to provide strategic insights that help you make better real estate investment and management decisions.
                                    </p>
                                </div>
                            </Reveal>

                            <Reveal delay={300}>
                                <div className="bg-bloom-dark/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-bloom-primary/50 transition-all duration-300">
                                    <h3 className="text-xl font-bold text-bloom-blue mb-4">Scalable Support</h3>
                                    <p className="text-bloom-text-muted leading-relaxed">
                                        Our model allows you to scale your {subService.title.toLowerCase()} capacity up or down as needed without the overhead of internal hiring.
                                    </p>
                                </div>
                            </Reveal>

                            <Reveal delay={400}>
                                <div className="bg-bloom-dark/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-bloom-primary/50 transition-all duration-300">
                                    <h3 className="text-xl font-bold text-bloom-blue mb-4">Quality Assurance</h3>
                                    <p className="text-bloom-text-muted leading-relaxed">
                                        Multi-level quality checks ensure that every deliverable meets the highest institutional standards for clarity and reliability.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <HomeContact />
        </div>
    );
};

export default SubServiceDetail;
