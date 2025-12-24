import { servicesData } from '../../data/services';
import { Link } from 'react-router-dom';

const ServicesGrid = () => {
    return (
        <section className="py-20 bg-bloom-dark text-white relative section-fade animate-on-scroll">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-bloom-primary/5 blur-[100px] pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue">Our Services</span>
                    </h2>
                    <p className="text-bloom-text-muted text-lg max-w-2xl mx-auto">Your Strategic partner in specialized and efficient real estate knowledge process outsourcing (KPO) services.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className="service-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center group hover:bg-white/10 transition-all duration-500 relative overflow-hidden animate-on-scroll"
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-bloom-dark/0 via-bloom-dark/30 to-bloom-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="w-16 h-16 rounded-full bg-bloom-primary/20 flex items-center justify-center mb-6 text-bloom-secondary group-hover:bg-bloom-primary group-hover:text-white transition-colors duration-300 relative z-10">
                                <service.icon size={32} />
                            </div>

                            <h3 className="service-title text-xl font-bold text-white mb-4 relative z-10">{service.title}</h3>

                            <p className="service-desc text-bloom-text-muted mb-8 text-sm leading-relaxed line-clamp-3 relative z-10">
                                {service.shortDescription}
                            </p>

                            <div className="mt-auto relative z-10">
                                <Link to={`/services/${service.id}`} className="px-6 py-2 rounded-full border border-bloom-secondary/30 text-bloom-secondary bg-white/10 backdrop-blur-sm hover:bg-bloom-secondary hover:text-white transition-all duration-300 text-sm font-medium">
                                    Read More &gt;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
