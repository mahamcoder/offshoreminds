import { Globe, TrendingUp } from 'lucide-react';
import Reveal from '../common/Reveal';
import CountUp from '../common/CountUp';

const WhoWeAre = () => {
    return (
        <section id="who-we-are" className="py-20 bg-bloom-dark relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-bloom-dark via-primary/5 to-bloom-dark pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <div>
                            <Reveal>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                                    <Globe className="w-4 h-4 text-bloom-blue" />
                                    <span className="text-sm font-medium text-bloom-text-muted uppercase tracking-wider">Who We Are</span>
                                </div>
                            </Reveal>
                            <Reveal delay={200}>
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Premier Destination for <br />
                                    <span className="text-bloom-primary">Real Estate KPO</span>
                                </h2>
                            </Reveal>
                        </div>

                        <div className="space-y-6 text-lg text-bloom-text-muted font-light leading-relaxed">
                            <Reveal delay={300}>
                                <p>
                                    Welcome to Offshore Minds. With a wealth of experience and expertise, our dedicated team specializes in a wide range of services including accounting, financial analysis, statement preparation, lease administration, and asset management.
                                </p>
                            </Reveal>
                            <Reveal delay={400}>
                                <p>
                                    We pride ourselves on our innovative approach to offshore services, continually striving to redefine industry standards and exceed client expectations with solutions tailored to your specific needs.
                                </p>
                            </Reveal>
                        </div>
                    </div>

                    {/* Glass Card Visual */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-bloom-blue/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                        <Reveal delay={200}>
                            <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:border-white/20 transition-all duration-500 group">
                                <div className="flex flex-col gap-8">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-bloom-text-muted text-sm uppercase tracking-wider mb-2">Cost Efficiency</p>
                                            <h3 className="text-6xl font-bold text-white tracking-tighter">
                                                <CountUp end={70} suffix="%" duration={2500} />
                                            </h3>
                                        </div>
                                        <div className="w-14 h-14 rounded-2xl bg-bloom-blue/20 flex items-center justify-center text-bloom-blue group-hover:bg-bloom-blue group-hover:text-white transition-all duration-300">
                                            <TrendingUp className="w-8 h-8" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-white text-lg font-medium">Trusted by clients worldwide</p>
                                        <p className="text-bloom-text-muted text-sm leading-relaxed">
                                            Our commitment to excellence has consistently resulted in significant cost savings of 50–70% for our esteemed clientele, including real estate developers, funds, and property management firms.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
