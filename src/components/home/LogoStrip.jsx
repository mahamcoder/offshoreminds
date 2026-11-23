import jllLogo from '../../assets/logos/jll.webp';
import berkadiaLogo from '../../assets/logos/berkadia.webp';
import brookfieldLogo from '../../assets/logos/brookfield.webp';
import greysteelLogo from '../../assets/logos/greysteel.webp';
import cbreLogo from '../../assets/logos/cbre.webp';

const LogoStrip = () => {
    const brands = [
        { name: "JLL", logo: jllLogo },
        { name: "Berkadia", logo: berkadiaLogo },
        { name: "Brookfield", logo: brookfieldLogo },
        { name: "Greysteel", logo: greysteelLogo },
        { name: "CBRE", logo: cbreLogo }
    ];

    return (
        <section className="py-20 bg-bloom-dark text-center border-t border-slate-200 dark:border-white/5 section-fade animate-on-scroll transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 font-heading">Powering Global Brands</h2>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                    {brands.map((brand, index) => (
                        <div key={index} className="group relative">
                            {/* Logo Image */}
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-10 md:h-12 w-auto object-contain opacity-70 dark:opacity-80 grayscale dark:grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 dark:filter dark:brightness-200 dark:contrast-0 dark:group-hover:filter-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoStrip;
