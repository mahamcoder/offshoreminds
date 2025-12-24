import React from 'react';
import Reveal from '../common/Reveal';
import { servicesData } from '../../data/services';

const HorizontalTools = () => {
    return (
        <section className="py-24 bg-bloom-dark overflow-hidden">
            <div className="container mx-auto px-4 mb-16">
                <Reveal width="100%">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Tools of the <span className="bg-gradient-to-r from-bloom-primary to-bloom-blue bg-clip-text text-transparent">Trade</span>
                        </h2>
                        <p className="text-bloom-text-muted text-lg">
                            We leverage industry-leading technologies and specialized platforms to deliver
                            precision, efficiency, and actionable insights across every project.
                        </p>
                    </div>
                </Reveal>
            </div>

            <div className="space-y-20">
                {servicesData.map((service, sIndex) => {
                    if (!service.toolLogos || service.toolLogos.length === 0) return null;

                    return (
                        <div key={service.id} className="relative">
                            <Reveal width="100%" delay={sIndex * 100}>
                                <div className="container mx-auto px-4 mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                        <h3 className="text-bloom-blue text-sm font-bold uppercase tracking-[0.3em] whitespace-nowrap">
                                            {service.title}
                                        </h3>
                                        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                    </div>
                                </div>
                            </Reveal>

                            <div className="container mx-auto px-4">
                                <Reveal width="100%" delay={sIndex * 150}>
                                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 opacity-90">
                                        {service.toolLogos.map((tool, tIndex) => (
                                            <div
                                                key={`${service.id}-${tIndex}`}
                                                className="flex flex-col items-center justify-center group"
                                            >
                                                <div className="w-32 h-20 flex items-center justify-center p-2 mb-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-bloom-primary/50 transition-all duration-300">
                                                    <img
                                                        src={tool.logo}
                                                        alt={tool.name}
                                                        title={tool.name}
                                                        className="max-h-full max-w-full object-contain filter brightness-110 group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-bloom-text-muted uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    {tool.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HorizontalTools;
