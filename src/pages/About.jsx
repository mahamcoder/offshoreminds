import AboutHero from '../components/about/AboutHero';
import WhoWeAre from '../components/about/WhoWeAre';
import WhoWeServe from '../components/about/WhoWeServe';
import WhyOffshore from '../components/about/WhyOffshore';
import TeamSection from '../components/about/TeamSection';
import EngagementModel from '../components/about/EngagementModel';
import MissionValues from '../components/about/MissionValues';
import HomeContact from '../components/home/HomeContact';
import SEO from '../components/SEO';

const About = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Offshore Minds — a specialized KPO partner for commercial real estate and accounting firms. Our expert team delivers financial analysis, asset management, and accounting support globally."
        path="/about"
        keywords="about offshore minds, real estate KPO, offshore outsourcing, CRE support team"
      />
      <AboutHero />
      <WhoWeAre />
      <WhoWeServe />
      <WhyOffshore />
      <TeamSection />
      <EngagementModel />
      <MissionValues />
      <HomeContact />
    </>
  );
};

export default About;
