import { ArrowRight } from 'lucide-react';
import Reveal from '../common/Reveal';

const SubServicesGrid = ({ subServices }) => {
    if (!subServices || subServices.length === 0) return null;

    return (
        <section className="py-20 bg-bloom-dark relative">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Specialized Services</h2>
                        <div className="w-16 h-1 bg-bloom-primary rounded-full"></div>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subServices.map((sub, index) => (
                        <div key={index} className="h-full">
                            <Reveal delay={index * 100} width="100%" height="100%">
                                <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-bloom-primary/50 transition-all duration-300 h-full flex flex-col">
                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-bloom-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Image Section */}
                                    <div className="h-48 overflow-hidden relative shrink-0">
                                        <img
                                            src={sub.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                            alt={sub.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-bloom-dark/20 mix-blend-multiply"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 relative z-10 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-bloom-blue transition-colors">
                                            {sub.title}
                                        </h3>
                                        <p className="text-bloom-text-muted text-sm leading-relaxed mb-6">
                                            {sub.description}
                                        </p>
                                        <div className="mt-auto">
                                            <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-bloom-primary transition-colors">
                                                Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SubServicesGrid;
