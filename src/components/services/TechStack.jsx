import Reveal from '../common/Reveal';

const TechStack = ({ toolLogos }) => {
    if (!toolLogos || toolLogos.length === 0) return null;

    return (
        <section className="py-12 bg-bloom-dark border-y border-white/5">
            <div className="container mx-auto px-4">
                <Reveal width="100%">
                    <div className="text-center">
                        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] mb-12">Role Specific Tools & Technologies</h2>

                        <div className="marquee-wrapper">
                            <div className="marquee-track py-4">
                                {[...toolLogos, ...toolLogos, ...toolLogos].map((tool, index) => {
                                    const isImage = typeof tool === 'object' && tool.logo;

                                    if (isImage) {
                                        return (
                                            <div key={index} className="flex items-center justify-center w-32 h-16 cursor-default group shrink-0 mx-6">
                                                <img
                                                    src={tool.logo}
                                                    alt={tool.name}
                                                    className="max-h-full max-w-full object-contain transition-all duration-300 opacity-85 group-hover:opacity-100 group-hover:scale-110"
                                                />
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={index} className="flex items-center justify-center px-10 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default shrink-0">
                                            <span className="text-xl font-bold text-white font-mono whitespace-nowrap">
                                                {typeof tool === 'string' ? tool : tool.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default TechStack;
