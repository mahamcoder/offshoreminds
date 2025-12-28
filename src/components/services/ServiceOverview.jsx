import Reveal from '../common/Reveal';

const ServiceOverview = ({ overview, title }) => {
    return (
        <section className="py-20  text-center relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bloom-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center">
                <Reveal>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue mb-8 font-heading">
                        Overview
                    </h2>
                </Reveal>

                <Reveal delay={200} width="100%">
                    <div className="">
                        <p className="text-bloom-text-muted leading-relaxed text-xl md:text-xl font-light ">
                            {overview || "We provide comprehensive solutions tailored to your real estate needs, ensuring efficiency, accuracy, and strategic growth."}
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default ServiceOverview;
