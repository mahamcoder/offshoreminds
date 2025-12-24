import React from 'react';
import { Layout, Database, ShieldCheck, CheckCircle2, UserCheck, MapPin } from 'lucide-react';
import Reveal from '../common/Reveal';

const WhyOffshore = () => {
    const benefits = [
        {
            title: "Integrated Services",
            description: "Fully integrated accounting firm offering Accounting, Lease Administration, Asset Management, and Back-office Services.",
            icon: Layout
        },
        {
            title: "Comprehensive Management",
            description: "Complete management services for residential, commercial, and mixed-use properties.",
            icon: Database
        },
        {
            title: "Lease Expertise",
            description: "Detailed lease abstraction and administration to ensure compliance and optimize lease management.",
            icon: ShieldCheck
        },
        {
            title: "Software Proficiency",
            description: "High expertise in Yardi, Appfolio, Real Page, RentManager, Buildium, MRI, Quickbooks, and more.",
            icon: CheckCircle2
        },
        {
            title: "Personalized Service",
            description: "Dedicated account managers ensuring personalized service and client satisfaction.",
            icon: UserCheck
        },
        {
            title: "Global Compliance",
            description: "Ability to handle multi-jurisdictional requirements with local expertise.",
            icon: MapPin
        }
    ];

    return (
        <section className="py-24 bg-bloom-dark relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bloom-primary/5 via-bloom-dark to-bloom-dark pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                    <Reveal>
                        <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 mb-6 text-white">
                            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-bloom-blue to-purple-400">Offshore Minds?</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-bloom-text-muted text-lg">
                            Unique blend of expertise, technology, and dedication.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="h-full">
                            <Reveal delay={index * 100} width="100%" height="100%">
                                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:border-bloom-blue/30 group h-full flex flex-col">
                                    <div className="flex items-start gap-5 flex-1">
                                        <div className="mt-1 shrink-0">
                                            <benefit.icon className="w-6 h-6 text-bloom-primary group-hover:text-bloom-blue transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                            <p className="text-bloom-text-muted text-sm leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
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

export default WhyOffshore;
