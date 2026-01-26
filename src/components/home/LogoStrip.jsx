import jllLogo from '../../assets/logos/jll.png';
import berkadiaLogo from '../../assets/logos/berkadia.png';
import brookfieldLogo from '../../assets/logos/brookfield.png';
import greysteelLogo from '../../assets/logos/greysteel.png';
import cbreLogo from '../../assets/logos/cbre.png';

const LogoStrip = () => {
    const brands = [
        { name: "JLL", logo: jllLogo },
        { name: "Berkadia", logo: berkadiaLogo },
        { name: "Brookfield", logo: brookfieldLogo },
        { name: "Greysteel", logo: greysteelLogo },
        { name: "CBRE", logo: cbreLogo }
    ];

    return (
        <section className="py-20 bg-bloom-dark text-center border-t border-white/5 section-fade animate-on-scroll">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-12 font-heading">Powering Global Brands</h2>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                    {brands.map((brand, index) => (
                        <div key={index} className="group relative">
                            {/* Logo Image */}
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-10 md:h-12 w-auto object-contain opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 filter brightness-200 contrast-0 group-hover:filter-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoStrip;
