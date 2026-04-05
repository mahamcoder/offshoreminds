import React from 'react';
import Reveal from '../common/Reveal';

const AboutHero = () => {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden bg-bloom-dark">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Blobs */}
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-bloom-primary/20 rounded-full blur-[100px] animate-pulse float-soft"></div>
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] float-soft" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center relative flex flex-col items-center">
                <Reveal>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue">Offshore Minds</span>
                    </h1>
                </Reveal>

                <Reveal delay={200}>
                    <p className="text-bloom-text-muted text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        The KPO Partner That Ambitious Businesses Worldwide Trust to Deliver.
                    </p>
                </Reveal>

                <div className="flex justify-center">
                    <a href="#who-we-are" className="group flex flex-col items-center gap-2 text-bloom-text-muted hover:text-white transition-colors duration-300">
                        <span className="text-sm tracking-widest uppercase">Scroll Down</span>
                        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 group-hover:border-white/40 transition-colors">
                            <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-bloom-dark to-transparent z-10"></div>
        </section>
    );
};

export default AboutHero;
