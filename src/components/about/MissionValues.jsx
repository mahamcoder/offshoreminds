import React from 'react';
import { Target, Eye, Heart, Zap, Award } from 'lucide-react';
import Reveal from '../common/Reveal';

const MissionValues = () => {
    return (
        <section className="py-24 bg-bloom-dark relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
                    <Reveal width="100%" height="100%">
                        <div className="bg-gradient-to-br from-white/5 to-transparent p-10 rounded-3xl border border-white/5 backdrop-blur-sm h-full flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-bloom-primary/20 rounded-xl text-bloom-primary">
                                    <Target className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-bold font-heading text-white">Our Mission</h2>
                            </div>
                            <p className="text-bloom-text-muted leading-relaxed text-lg font-light flex-grow">
                                To be the foremost provider of Real Estate Knowledge Process Outsourcing (KPO) solutions, renowned for our unwavering commitment to client success. We aim to realize this vision by harnessing our extensive industry expertise, a team of passionate professionals, and a robust offshore infrastructure.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={200} width="100%" height="100%">
                        <div className="bg-gradient-to-br from-white/5 to-transparent p-10 rounded-3xl border border-white/5 backdrop-blur-sm h-full flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-bloom-blue/20 rounded-xl text-bloom-blue">
                                    <Eye className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-bold font-heading text-white">Our Vision</h2>
                            </div>
                            <p className="text-bloom-text-muted leading-relaxed text-lg font-light flex-grow">
                                To revolutionize the commercial real estate sector through innovative offshore strategies, empowering clients with unparalleled insights and fostering global growth and success.
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* Values */}
                <div className="text-center mb-16 flex flex-col items-center">
                    <Reveal>
                        <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm">Core Principles</span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h2 className="text-4xl font-bold font-heading mt-3 text-white">Our Values</h2>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Reveal delay={200} width="100%" height="100%">
                        <ValueCard
                            icon={Heart}
                            title="Trust"
                            description="We focus on building relationships through honest and transparent communication and operate with integrity."
                        />
                    </Reveal>
                    <Reveal delay={400} width="100%" height="100%">
                        <ValueCard
                            icon={Zap}
                            title="Innovation"
                            description="We remain curious and continuously learn, unlearn, and relearn from a variety of experiences."
                        />
                    </Reveal>
                    <Reveal delay={600} width="100%" height="100%">
                        <ValueCard
                            icon={Award}
                            title="Quality"
                            description="We strive for the best-in-class output by being focussed on high-quality results."
                        />
                    </Reveal>
                </div>

            </div>
        </section>
    );
};

const ValueCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-bloom-primary/50 transition-all duration-300 text-center group hover:bg-white/10 h-full flex flex-col">
        <div className="shrink-0 w-16 h-16 bg-white/5 rounded-full shadow-inner flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-8 h-8 text-bloom-text group-hover:text-bloom-primary transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-bloom-text-muted leading-relaxed mt-auto">
            {description}
        </p>
    </div>
);

export default MissionValues;
