import React from 'react';
import { Network, Users, UserCheck, ArrowRight } from 'lucide-react';
import Reveal from '../common/Reveal';

const EngagementModel = () => {
    return (
        <section className="py-24 bg-bloom-dark relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20 flex flex-col items-center">
                    <Reveal>
                        <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm">Our Workflow</span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-white">How We Operate</h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-bloom-text-muted max-w-2xl mx-auto text-lg">
                            A structured delivery model where specialized teams collaborate to ensure quality and efficiency.
                        </p>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                    {/* Connecting Lines for Desktop */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-bloom-blue/0 via-bloom-blue/50 to-bloom-blue/0 z-0"></div>

                    <Reveal delay={200} width="100%" height="100%">
                        <ModelCard
                            icon={Network}
                            title="Managers"
                            description="Lead the team, streamlined processes, and conduct quality checks."
                            step="01"
                        />
                    </Reveal>
                    <Reveal delay={400} width="100%" height="100%">
                        <ModelCard
                            icon={Users}
                            title="Assistant Managers"
                            description="Review work, support analysts, and ensure timely completion."
                            step="02"
                        />
                    </Reveal>
                    <Reveal delay={600} width="100%" height="100%">
                        <ModelCard
                            icon={UserCheck}
                            title="Analysts"
                            description="Allocated experts operating as an extended part of your team."
                            step="03"
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

const ModelCard = ({ icon: Icon, title, description, step }) => (
    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md hover:translate-y-[-10px] transition-transform duration-300 z-10 h-full">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-bloom-dark border border-white/10 p-2 rounded-xl">
            <div className="w-10 h-10 bg-bloom-blue/20 rounded-lg flex items-center justify-center text-bloom-blue font-bold">
                {step}
            </div>
        </div>

        <div className="mt-6 text-center">
            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
            <p className="text-bloom-text-muted leading-relaxed text-sm">
                {description}
            </p>
        </div>
    </div>
);

export default EngagementModel;
