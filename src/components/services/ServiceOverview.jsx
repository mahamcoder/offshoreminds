import Reveal from '../common/Reveal';

const ServiceOverview = ({ overview, title }) => {
    return (
        <section className="py-20 bg-bloom-dark text-center relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bloom-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center">
                <Reveal>
                    <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm mb-3 block">Overview</span>
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-heading">
                        Comprehensive <span className="text-bloom-primary">{title || "Services"}</span>
                    </h2>
                </Reveal>

                <Reveal delay={200} width="100%">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                        <p className="text-bloom-text-muted leading-relaxed text-lg md:text-xl font-light">
                            {overview || "We provide comprehensive solutions tailored to your real estate needs, ensuring efficiency, accuracy, and strategic growth."}
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default ServiceOverview;
