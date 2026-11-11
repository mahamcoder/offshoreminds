import HeroModern from '../components/home/HeroModern';
import BenefitsSection from '../components/home/BenefitsSection';
import ExpandSection from '../components/home/ExpandSection';
import TickerBar from '../components/home/TickerBar';
// import StatsSection from '../components/home/StatsSection'; // Replaced by BenefitsSection
import ServicesGrid from '../components/home/ServicesGrid';
import DifferenceSection from '../components/home/DifferenceSection';
import RealmSection from '../components/home/RealmSection';
import CaseStudyPreview from '../components/home/CaseStudyPreview';
import LogoStrip from '../components/home/LogoStrip';
import Testimonials from '../components/home/Testimonials';
import HomeContact from '../components/home/HomeContact';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO
        title={null}
        description="Offshore Minds provides specialized Knowledge Process Outsourcing (KPO) services for the real estate industry — financial analysis, asset management, accounting, ARGUS modeling, and lease administration."
        path="/"
        keywords="real estate outsourcing, KPO, financial analysis, asset management, accounting services, ARGUS modeling, underwriting, commercial real estate, CRE outsourcing, offshore real estate services"
      />
      <HeroModern />

      {/* <Hero 
        badge="Strategic Intelligence, Financial Clarity"
        title="Real Estate Financial Analysis"
        description="Empowering real estate businesses with precision, expertise, and a touch of brilliance. We seamlessly integrate professional expertise to redefine outsourcing."
        primaryCtx="Get Started"
        primaryLink="/contact"
        secondaryCtx="Our Services"
        secondaryLink="/services"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      /> */}

  
      <BenefitsSection />
      <ExpandSection />

      {/* <StatsSection /> */}
      <ServicesGrid />
      <DifferenceSection />
      <RealmSection />
      <CaseStudyPreview />
      <LogoStrip />
      <Testimonials />
      <HomeContact />
    </>
  );
};

export default Home;
