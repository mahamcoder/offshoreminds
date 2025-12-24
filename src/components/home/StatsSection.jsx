import { Building2, Users, Briefcase, Trophy } from 'lucide-react';
import CountUp from '../common/CountUp';
import Reveal from '../common/Reveal';

const StatsSection = () => {
    const stats = [
        { label: "Assets Analyzed", value: 15000, suffix: "+", icon: Building2 },
        { label: "Global Clients Served", value: 20, suffix: "+", icon: Users },
        { label: "Real Estate Specialists", value: 20, suffix: "+", icon: Briefcase },
        { label: "Years Delivering Excellence", value: 7, suffix: "+", icon: Trophy },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <Reveal key={index} delay={index * 100} width="100%">
                            <div className="flex flex-col items-center text-center group h-full">
                                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg group-hover:bg-secondary transition-colors duration-300">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-primary mb-2">
                                    <CountUp end={stat.value} suffix={stat.suffix} duration={4000} />
                                </h3>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide max-w-[150px]">{stat.label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Ticker below stats as seen in design reference roughly, or just a separator */}
            <div className="text-center mt-12 mb-4">
                <p className="inline-block border-b border-primary/20 pb-1 text-primary font-medium italic">
                    Unlock with us for your <span className="text-red-500 font-bold not-italic">Underwriting!</span>
                </p>
            </div>
        </section>
    );
};

export default StatsSection;
