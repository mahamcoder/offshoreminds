import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import ServiceOverview from '../components/services/ServiceOverview';
import SubServicesGrid from '../components/services/SubServicesGrid';
import TechStack from '../components/services/TechStack';
import ServiceTeam from '../components/services/ServiceTeam';
import WhyChooseUs from '../components/services/WhyChooseUs';
import HomeContact from '../components/home/HomeContact';
import { ArrowLeft } from 'lucide-react';
import Reveal from '../components/common/Reveal';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bloom-dark text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <Link to="/services" className="text-bloom-blue hover:text-white transition-colors">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bloom-dark min-h-screen text-white">
      {/* Bloom Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bloom-primary/20 rounded-full blur-[120px] animate-pulse float-soft"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bloom-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-start">
          <Link to="/services" className="inline-flex items-center gap-2 text-bloom-text-muted hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Services
          </Link>

          <div className="max-w-4xl">
            <Reveal>
              <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm mb-2 block">Our Expertise</span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue mb-6 leading-tight">
                {service.title}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-xl text-bloom-text-muted font-light leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Fade Bottom */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-bloom-dark to-transparent z-10"></div>
      </section>

      <ServiceOverview overview={service.overview} description={service.fullDescription} title={service.title} />

      <SubServicesGrid subServices={service.subServices} />

      <TechStack toolLogos={service.toolLogos} />

      <ServiceTeam
        initialServiceId={service.id}
      />

      <WhyChooseUs />

      <HomeContact />
    </div>
  );
};

export default ServiceDetail;
