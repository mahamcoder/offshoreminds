import { useState } from 'react';
import BlogGrid from '../components/blogs/BlogGrid';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Reveal from '../components/common/Reveal';
import { blogCategories } from '../data/blogs';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const serviceLinks = [
    "Real Estate Financial Analysis",
    "Real Estate Accounting Support",
    "Real Estate Marketing",
    "Financial Modeling",
    "Real Estate Asset Management",
    "Real Estate Analytics"
  ];

  return (
    <div className="bg-bloom-dark min-h-screen text-white">
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg"></div>

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue">Services</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {serviceLinks.map((link, i) => (
              <Reveal key={i} delay={i * 100} width="100%">
                <Link
                  to="/services"
                  className="group bg-bloom-dark/50 border border-white/10 p-6 rounded-xl hover:bg-bloom-primary hover:border-bloom-primary transition-all duration-300 flex items-center justify-between text-left h-full"
                >
                  <span className="font-bold text-white group-hover:text-bloom-dark transition-colors">{link}</span>
                  <ArrowRight size={20} className="text-bloom-primary group-hover:text-bloom-dark transition-colors" />
                </Link>
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
