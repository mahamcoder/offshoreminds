import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import CountUp from '../common/CountUp';
import Reveal from '../common/Reveal';

const CaseStudyPreview = () => {
    return (
        <section className="bg-bloom-dark text-white border-t border-white/5">
            <div className="grid md:grid-cols-2">
                {/* Left Side: Case Study */}
                <div className="p-12 md:p-20 bg-bloom-dark/50 relative overflow-hidden group">
                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-bloom-primary/10 transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <Reveal>
                            <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue">Case Study</h3>
                            <p className="text-bloom-text-muted mb-6 text-sm uppercase tracking-widest">Success Stories</p>
                        </Reveal>

                        <Reveal delay={100}>
                            <h4 className="text-2xl font-bold mb-6 text-white">
                                Commercial Portfolio Valuation:<br />Reducing turnaround time by 40%
                            </h4>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                                We helped a NY-based investment firm streamline their quarterly valuation process through our dedicated analyst teams and standardized templates.
                            </p>
                        </Reveal>

                        <Reveal delay={300}>
                            <a href="https://drive.google.com/file/d/1htOX7kre5haD6BD3FvwIJP52lNPWrgxY/view" target="_blank" rel="noopener noreferrer" className="btn-glass px-8 py-3 rounded-full font-medium inline-block">
                                Read More
                            </a>
                        </Reveal>
                    </div>
                </div>

                {/* Right Side: Benefits */}
                <div className="p-12 md:p-20 bg-bloom-dark border-l border-white/5">
                    <Reveal>
                        <h3 className="text-2xl font-bold mb-8 capitalize text-white">Benefits of outsourcing</h3>
                    </Reveal>

                    <div className="space-y-8">
                        <Reveal delay={100} width="100%">
                            <div className="flex gap-4 items-start group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-bloom-primary transition-colors">
                                    <span className="text-xl font-bold text-bloom-secondary group-hover:text-white">
                                        <CountUp end={70} suffix="%" duration={4000} />
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">Cost Reduction</h4>
                                    <p className="text-gray-400 text-sm">Save significantly on operational overhead.</p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={200} width="100%">
                            <div className="flex gap-4 items-start group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-bloom-primary transition-colors">
                                    <CheckCircle2 className="text-bloom-secondary group-hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">
                                        <CountUp end={100} suffix="%" duration={4000} />
                                    </h4>
                                    <p className="text-gray-400 text-sm">Process Accuracy</p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={300} width="100%">
                            <div className="flex gap-4 items-start group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-bloom-primary transition-colors">
                                    <span className="text-xl font-bold text-bloom-secondary group-hover:text-white">24/7</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">Turnaround</h4>
                                    <p className="text-gray-400 text-sm">Round-the-clock operations support.</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudyPreview;
