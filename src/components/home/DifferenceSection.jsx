const DifferenceSection = () => {
    return (
        <section className="relative py-24 bg-bloom-dark overflow-hidden section-fade animate-on-scroll">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Skyscraper"
                    className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bloom-dark via-bloom-dark/90 to-bloom-primary/20"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 font-heading leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue">
                            How We Are <br /> Different
                        </h2>

                        <div className="border-l-4 border-secondary pl-6 mb-4 md:mb-0">
                            <p className="text-xl text-blue-100 font-light italic leading-relaxed">
                                "Where Intelligent Automation and Human Mastery <br className="hidden md:block" />Unite to Deliver the World's Most Powerful Real Estate KPO Services."
                            </p>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <p className="text-gray-300 text-lg leading-relaxed border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10">
                            Offshore Minds is a next-generation KPO company purpose-built for businesses, CPA firms, and real estate companies that refuse to settle for ordinary outsourcing. We are something fundamentally different, a high-performance knowledge engine where advanced automation and elite human expertise operate in perfect synchrony, delivering faster, smarter, and more impactful outcomes than any traditional offshore KPO model can offer.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DifferenceSection;
