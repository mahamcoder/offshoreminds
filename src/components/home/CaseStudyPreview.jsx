import { CheckCircle2 } from 'lucide-react';
import CountUp from '../common/CountUp';
import Reveal from '../common/Reveal';

const CaseStudyPreview = () => {
    return (
        <section className="bg-bloom-dark border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2">
                    {/* Left Side: Case Study Text */}
                    <div className="p-12 lg:p-20 bg-slate-100/70 dark:bg-bloom-dark/50 relative overflow-hidden flex flex-col justify-center rounded-2xl md:rounded-r-none dark:rounded-none my-4 md:my-0">
                        <Reveal>
                            <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-bloom-blue dark:from-white dark:to-bloom-blue">Case Study</h3>
                            <p className="text-bloom-primary dark:text-bloom-text-muted mb-6 text-sm uppercase tracking-widest font-semibold">Success Stories</p>
                        </Reveal>

                        <Reveal delay={100}>
                            <h4 className="text-base font-bold mb-6 text-slate-700 dark:text-gray-300">
                                Custom Financial Model for a $13B, 10,000-Acre<br /> Mixed-Use Mega Development:
                            </h4>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed max-w-md">
                               We created a $13B, 10,000-acre development model covering multiple asset types.
Built from scratch, it handled complex loans, multi-phase funding, and scenario testing.
An automated timeline streamlined planning, giving the client a robust platform for confident decisions.
                            </p>
                        </Reveal>

                        <Reveal delay={300}>
                            <a href="https://drive.google.com/file/d/1htOX7kre5haD6BD3FvwIJP52lNPWrgxY/view" target="_blank" rel="noopener noreferrer" className="btn-glass px-8 py-3 rounded-full font-medium inline-block w-fit">
                                Read More
                            </a>
                        </Reveal>
                    </div>

                    {/* Right Side: Benefits */}
                    <div className="p-12 lg:p-20 bg-white dark:bg-bloom-dark flex flex-col justify-center rounded-2xl md:rounded-l-none dark:rounded-none border border-slate-200/80 dark:border-none shadow-sm dark:shadow-none my-4 md:my-0">
                        <Reveal>
                            <h3 className="text-2xl font-bold mb-8 capitalize text-slate-900 dark:text-white">Benefits of outsourcing</h3>
                        </Reveal>

                        <div className="space-y-8">
                            <Reveal delay={100} width="100%">
                                <div className="flex gap-4 items-start group">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-bloom-primary transition-colors">
                                        <span className="text-xl font-bold text-bloom-primary dark:text-bloom-secondary group-hover:text-white">
                                            <CountUp end={70} suffix="%" duration={4000} />
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">Lower Operational Costs</h4>
                                        <p className="text-slate-600 dark:text-gray-400 text-sm">Elite expertise. Fraction of the price.</p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={200} width="100%">
                                <div className="flex gap-4 items-start group">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-bloom-primary transition-colors">
                                        <CheckCircle2 className="text-bloom-primary dark:text-bloom-secondary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                                            <CountUp end={100} suffix="%" duration={4000} />
                                            <span> Process Accuracy</span>
                                        </h4>
                                        <p className="text-slate-600 dark:text-gray-400 text-sm">Precision is not a promise. It is our standard.</p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={300} width="100%">
                                <div className="flex gap-4 items-start group">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-bloom-primary transition-colors">
                                        <span className="text-xl font-bold text-bloom-primary dark:text-bloom-secondary group-hover:text-white">24/7</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">Continuous Support</h4>
                                        <p className="text-slate-600 dark:text-gray-400 text-sm">Always-on turnaround for fast-moving deals.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudyPreview;
