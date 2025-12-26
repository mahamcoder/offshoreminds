import { useEffect, useState } from 'react';
import CountUp from '../common/CountUp';

const BenefitsSection = () => {
    const stats = [
        {
            value: 15,
            suffix: "k+",
            label: "Assets Analyzed",

        },
        {
            value: 20,
            suffix: "+",
            label: "Global Clients Served",

        },
        {
            value: 20,
            suffix: "+",
            label: "Real Estate Specialists",

        },
        {
            value: 7,
            suffix: "+",
            label: "Years of Excellence",

        }
    ];

    return (
        <section className="py-24 bg-bloom-dark relative section-fade animate-on-scroll">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Benefits of Outsourcing</h2>
                    <div className="w-24 h-1 bg-bloom-primary rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="relative group h-full">
                            {/* Card Background with Glassmorphism */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-sm -z-10 group-hover:blur-md transition-all duration-300"></div>

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 py-8 backdrop-blur-xl h-full min-h-[220px] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between shadow-2xl">
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-bloom-blue mb-4">
                                        <CountUp end={stat.value} suffix={stat.suffix} duration={4000} />
                                    </h3>
                                    <h4 className="text-xl font-bold text-white mb-3">
                                        {stat.label}
                                    </h4>
                                    <p className="text-bloom-text-muted text-sm leading-relaxed">
                                        {stat.desc}
                                    </p>
                                </div>

                                {/* Decoration */}
                                <div className="mt-8 flex items-end justify-between">
                                    <div className="w-10 h-10 rounded-full bg-bloom-primary/20 flex items-center justify-center group-hover:bg-bloom-primary transition-colors duration-300">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    {/* Abstract line graphic */}
                                    <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent to-white/30"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
