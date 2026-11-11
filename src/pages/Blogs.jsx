import { useState } from 'react';
import BlogGrid from '../components/blogs/BlogGrid';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Reveal from '../components/common/Reveal';
import { blogCategories } from '../data/blogs';
import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../data/services';
import SEO from '../components/SEO';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");



  return (
    <div className="bg-bloom-dark min-h-screen text-white">
      <SEO
        title="Blog"
        description="Read the latest insights on commercial real estate, financial modeling, accounting trends, and AI in CRE from the Offshore Minds team."
        path="/blogs"
        keywords="real estate blog, CRE insights, financial modeling articles, accounting trends, AI in real estate"
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
            <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm mb-4 block">Our Latest Thinking</span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Insights & <span className="text-bloom-primary">News</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl text-bloom-text-muted font-light leading-relaxed max-w-2xl mx-auto">
              Explore the latest trends, strategies, and technologies shaping the future of real estate outsourcing.
            </p>
          </Reveal>
        </div>

        {/* Fade Bottom */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-bloom-dark to-transparent z-10"></div>
      </section>

      {/* Category Filter */}
      <section className="py-8 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {blogCategories.map((category, index) => (
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

      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal delay={200}>
            <BlogGrid selectedCategory={selectedCategory} searchQuery={searchQuery} />
          </Reveal>
        </div>
      </section>

      {/* Services Links Section */}
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

      {/* Pre-Footer Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bloom-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm mb-3 block">Ready to Scale?</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue mb-6">Get Your Free Consultation</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-bloom-text-muted max-w-2xl mx-auto mb-10 text-lg">
              Discover how our specialized KPO services can transform your real estate operations and drive efficiency.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-bloom-primary text-bloom-dark font-bold py-4 px-10 rounded-full hover:bg-white hover:text-bloom-dark transition-all duration-300 shadow-[0_0_20px_rgba(202,240,248,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Contact Us Today <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
