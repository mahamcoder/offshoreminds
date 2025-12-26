import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import Reveal from '../components/common/Reveal';
import ServiceTeam from '../components/services/ServiceTeam';
import HorizontalTools from '../components/services/HorizontalTools';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Services = () => {
    return (
        <div className="bg-bloom-dark min-h-screen text-white">
            {/* Bloom Theme Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-bloom-primary/20 rounded-full blur-[120px] animate-pulse float-soft"></div>
                    <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-bloom-blue/10 rounded-full blur-[100px] float-soft" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Reveal width="100%">
                        <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm mb-4 block">Our Expertise</span>
                    </Reveal>
                    <Reveal delay={100} width="100%">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Comprehensive <span className="text-bloom-primary">Real Estate Solutions</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={200} width="100%">
                        <p className="text-xl text-bloom-text-muted font-light leading-relaxed max-w-3xl mx-auto">
                            From financial modeling to lease administration, we provide the back-office engine that powers your front-office success.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <Reveal key={service.id} delay={index * 100} width="100%" height="100%">
                                <ServiceCard
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.shortDescription}
                                    link={`/services/${service.id}`}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-bloom-dark relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bloom-primary/5 via-bloom-dark to-bloom-dark pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <Reveal>
                            <span className="text-bloom-blue font-semibold uppercase tracking-wider text-sm">How We Work</span>
                        </Reveal>
                        <Reveal delay={100}>
                            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-white">Seamless Integration</h2>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-bloom-text-muted text-lg">We adapt to your workflows and systems, acting as a natural extension of your team.</p>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-bloom-blue/0 via-bloom-blue/30 to-bloom-blue/0 -z-0"></div>

                        <ProcessStep
                            number="01"
                            title="Discovery"
                            desc="We assess your current processes and identify areas where we can add the most value."
                            delay={200}
                        />
                        <ProcessStep
                            number="02"
                            title="Onboarding"
                            desc="We train our dedicated specialists on your specific templates and software systems."
                            delay={400}
                        />
                        <ProcessStep
                            number="03"
                            title="Execution"
                            desc="Our team delivers high-quality work with regular reporting and quality assurance checks."
                            delay={600}
                        />
                    </div>
                </div>
            </section>

            <HorizontalTools />

            <ServiceTeam />

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-bloom-dark to-bloom-primary/10"></div>
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">Need a custom solution?</h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-bloom-text-muted mb-10 text-xl font-light">We understand every real estate firm is unique. Let's discuss a tailored engagement model that fits your needs.</p>
                    </Reveal>
                    <Reveal delay={300}>
                        <a href="https://calendly.com/gyan-offshoreminds/30min?month=2025-12" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-bloom-primary text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-bloom-dark transition-all duration-300 shadow-[0_0_20px_rgba(93,92,222,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                            Schedule a Call <ArrowRight size={18} />
                        </a>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

const ProcessStep = ({ number, title, desc, delay }) => (
    <Reveal delay={delay} width="100%" height="100%">
        <div className="text-center relative z-10 group h-full">
            <div className="w-24 h-24 bg-bloom-dark border-4 border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-bloom-primary transition-colors duration-500 shadow-xl relative">
                <span className="text-3xl font-bold text-white/20 group-hover:text-bloom-primary transition-colors">{number}</span>
                <div className="absolute inset-0 rounded-full border border-white/10 scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-bloom-blue transition-colors">{title}</h3>
            <p className="text-bloom-text-muted px-4 leading-relaxed">{desc}</p>
        </div>
    </Reveal>
);

export default Services;
