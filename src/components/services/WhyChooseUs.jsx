import { Globe, Lightbulb, Users, Target, Zap, ShieldCheck } from 'lucide-react';
import Reveal from '../common/Reveal';

const WhyChooseUs = () => {
    const reasons = [
        { icon: Globe, title: "Global Expertise", desc: "Insights from international markets." },
        { icon: Lightbulb, title: "Industry Expertise", desc: "Deep understanding of real estate dynamics." },
        { icon: Users, title: "Skilled Professionals", desc: "Top-tier talent recruited for your needs." },
        { icon: Target, title: "Customized Solutions", desc: "Tailored strategies for your specific goals." },
        { icon: Zap, title: "Cost-Effective", desc: "Significant operational savings vs onshore." },
        { icon: ShieldCheck, title: "Data Security", desc: "Bank-grade security protocols." },
    ];

    return (
        <section className="py-24 bg-bloom-dark relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bloom-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 flex flex-col items-center">
                    <Reveal>
                        <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm">Our Advantage</span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mt-2 text-white">Why Choose Offshore Minds?</h2>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reasons.map((reason, index) => (
                        <div key={index} className="h-full">
                            <Reveal delay={index * 50} width="100%">
                                <div className="group bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:border-bloom-primary/30 text-center h-full">
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-bloom-primary group-hover:scale-110 transition-all duration-300 shadow-inner">
                                        <reason.icon className="text-bloom-text group-hover:text-white w-8 h-8 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-bloom-blue transition-colors">{reason.title}</h3>
                                    <p className="text-bloom-text-muted text-sm leading-relaxed">{reason.desc}</p>
                                </div>
                            </Reveal>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
