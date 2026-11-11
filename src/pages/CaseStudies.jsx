import { useState } from 'react';
import { Link } from 'react-router-dom';
import CaseStudyItem from '../components/case-studies/CaseStudyItem';
import HomeContact from '../components/home/HomeContact';
import Reveal from '../components/common/Reveal';
import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../data/services';
import { caseStudiesData, caseStudyCategories } from '../data/caseStudies';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredStudies = caseStudiesData.filter(study => {
    const matchesCategory = selectedCategory === "All" || 
      (Array.isArray(study.category) 
        ? study.category.includes(selectedCategory) 
        : study.category === selectedCategory);
    const matchesSearch = searchQuery === "" ||
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.challenge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const visibleStudies = filteredStudies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudies.length;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className="bg-bloom-dark min-h-screen text-white">
      <SEO
        title="Case Studies"
        description="Explore real-world case studies demonstrating how Offshore Minds delivers real estate financial modeling, underwriting, and asset management support."
        path="/case-studies"
        keywords="commercial real estate case studies, financial modeling examples, ARGUS modeling results, real estate underwriting portfolio"
      />
      {/* Bloom Theme Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bloom-primary/20 rounded-full blur-[120px] animate-pulse float-soft"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bloom-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm mb-4 block">Success Stories</span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Case <span className="text-bloom-primary">Studies</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl text-bloom-text-muted font-light leading-relaxed max-w-2xl mx-auto">
              Our portfolio exemplifies top-tier financial, accounting, and graphic design services crafted specifically for real estate professionals.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {caseStudyCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${selectedCategory === category
                    ? 'bg-bloom-primary text-bloom-dark shadow-lg shadow-bloom-primary/30'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-bloom-primary/50'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl space-y-16 relative z-10">
          {visibleStudies.length > 0 ? (
            <>
              {visibleStudies.map((study, index) => (
                <Reveal key={study.id} width="100%">
                  <CaseStudyItem
                    study={study}
                    isReversed={index % 2 !== 0}
                  />
                </Reveal>
              ))}

              {/* Show More Button */}
              {hasMore && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={handleShowMore}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-bloom-primary/20 to-bloom-blue/20 border border-bloom-primary/40 rounded-full text-white font-bold hover:from-bloom-primary hover:to-bloom-primary hover:text-bloom-dark transition-all duration-300 shadow-lg hover:shadow-bloom-primary/30"
                  >
                    Show More Case Studies
                    <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-bloom-text-muted text-lg">No case studies found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Explore Our Services Section */}
      <section className="py-24 relative overflow-hidden bg-bloom-dark/50 border-y border-white/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal width="100%">
              <span className="text-bloom-blue font-semibold uppercase tracking-widest text-sm mb-4 block">Take the Next Step</span>
            </Reveal>
            <Reveal delay={100} width="100%">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Our <span className="text-bloom-primary">Services</span></h2>
            </Reveal>
            <Reveal delay={200} width="100%">
              <p className="text-bloom-text-muted text-lg">
                Discover how our specialized expertise can be tailored to meet your unique real estate challenges.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <Reveal key={service.id} delay={index * 100} width="100%" height="100%">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.shortDescription}
                  link={`/services/${service.id}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeContact />
    </div>
  );
};

export default CaseStudies;
