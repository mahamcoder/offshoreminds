import { Calculator, Briefcase, Building2, PieChart, GraduationCap, HardHat } from 'lucide-react';
import Reveal from '../common/Reveal';

const WhoWeServe = () => {
    const clients = [
        { name: "Accounting Firms", icon: Calculator },
        { name: "Real Estate Consulting Firms", icon: Briefcase },
        { name: "Real Estate Brokerage Firms", icon: Building2 },
        { name: "Private Equity Firms", icon: PieChart },
        { name: "Real Estate Research Institutions", icon: GraduationCap },
        { name: "Real Estate Developers", icon: HardHat }
    ];

    return (
        <section className="py-24 bg-bloom-dark relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none float-soft"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 flex flex-col items-center">
                    <Reveal>
                        <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm">Our Clients</span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                            Who We Serve
                        </h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-bloom-text-muted text-lg max-w-2xl mx-auto">
                            Specialist KPO partner embedded within your teams.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client, index) => (
                        <div key={index} className="h-full">
                            <Reveal delay={index * 100} width="100%" height="100%">
                                <div className="relative group h-full">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-bloom-blue/0 to-bloom-blue/0 group-hover:from-bloom-blue/20 group-hover:to-purple-500/20 rounded-2xl transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100"></div>

                                    <div className="relative bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors duration-300 h-full flex flex-col items-center text-center">
                                        <div className="shrink-0 w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-bloom-blue group-hover:scale-110 group-hover:bg-bloom-blue group-hover:text-white transition-all duration-300">
                                            <client.icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{client.name}</h3>
                                        <p className="text-bloom-text-muted text-sm mt-auto">
                                            Tailored solutions for {client.name.toLowerCase()}.
                                        </p>
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

export default WhoWeServe;
