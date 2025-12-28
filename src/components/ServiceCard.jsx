import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, link }) => {
  return (
    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-bloom-primary/50 transition-all duration-300 group flex flex-col h-full relative overflow-hidden backdrop-blur-sm">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-bloom-primary/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-bloom-primary/20 transition-colors duration-500"></div>

      <div className="flex-1 flex flex-col justify-center transition-all duration-500 group-hover:justify-start">
        <div className="w-14 h-14 bg-bloom-dark border border-white/10 rounded-2xl flex items-center justify-center text-bloom-primary mb-6 shadow-lg group-hover:scale-110 group-hover:border-bloom-primary transition-all duration-300 relative z-10">
          <Icon size={28} strokeWidth={1.5} />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-bloom-blue transition-colors relative z-10">
          {title}
        </h3>

        <div className="max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
          <p className="text-bloom-text-muted mb-6 leading-relaxed relative z-10 text-sm mt-2">
            {description}
          </p>
        </div>

        {link && (
          <div className="max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out delay-100">
            <Link to={link} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-bloom-primary uppercase tracking-wider relative z-10 group/link transition-colors">
              Explore Service <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
