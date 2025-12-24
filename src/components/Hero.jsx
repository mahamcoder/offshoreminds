import { Link } from 'react-router-dom';

const Hero = ({ badge, title, description, primaryCtx, primaryLink, secondaryCtx, secondaryLink, image }) => {
  return (
    <section className="relative bg-primary pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 skew-x-12 transform origin-top-right"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            {badge && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 font-medium text-sm mb-8 backdrop-blur-sm">
                {badge}
              </span>
            )}
            
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
              {title}
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-lg">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              {primaryCtx && (
                <Link to={primaryLink} className="btn bg-secondary text-white hover:bg-white hover:text-primary border-2 border-transparent hover:border-white shadow-lg shadow-secondary/30">
                  {primaryCtx}
                </Link>
              )}
              
              {secondaryCtx && (
                <Link to={secondaryLink} className="btn border-2 border-white/30 text-white hover:bg-white hover:text-primary">
                  {secondaryCtx}
                </Link>
              )}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative hidden lg:block">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10 opacity-60"></div>
                <img 
                  src={image} 
                  alt="Real Estate" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
             </div>
             {/* Floating Badge */}
             <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs border-l-4 border-secondary hidden xl:block">
                <p className="text-primary font-bold text-lg mb-1">Trusted Partner</p>
                <p className="text-sm text-gray-500">Optimizing portfolios for top global investment firms.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
