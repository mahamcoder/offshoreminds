import { ArrowRight, Building2, MapPin, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const CaseStudyItem = ({ study, isReversed }) => {
    return (
        <div className={`flex flex-col lg:flex-row ${isReversed ? 'lg:flex-row-reverse' : ''} gap-8 bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-bloom-primary/30 transition-all duration-300 group`}>
            {/* Image Side */}
            <div className="lg:w-1/2 relative min-h-[400px] overflow-hidden">
                <img
                    src={study.image}
                    alt={study.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-bloom-dark/30 mix-blend-multiply"></div>
                <div className="absolute top-6 left-6 bg-bloom-dark/90 text-bloom-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-white/10">
                    {study.category || "Case Study"}
                </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
                {/* Background Glow */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-bloom-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="mb-8 relative z-10">
                    <h2 className="text-3xl font-bold text-white mt-2 mb-3 leading-tight">{study.title}</h2>
                    <div className="flex items-center text-bloom-blue font-medium text-sm">
                        <MapPin size={16} className="mr-2" />
                        <span>{study.location}</span>
                    </div>
                </div>

                <div className="space-y-6 mb-8 relative z-10">
                    {/* Challenge Box */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="bg-red-500/20 text-red-400 p-2.5 rounded-xl shrink-0 border border-red-500/20">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">The Challenge</h4>
                                <p className="text-bloom-text-muted text-sm leading-relaxed">{study.challenge}</p>
                            </div>
                        </div>
                    </div>

                    {/* Solution Box */}
                    <div className="bg-bloom-primary/10 p-6 rounded-2xl border border-bloom-primary/20 hover:bg-bloom-primary/20 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="bg-bloom-primary text-bloom-dark p-2.5 rounded-xl shrink-0">
                                <Building2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Our Solution</h4>
                                <p className="text-bloom-text-muted text-sm leading-relaxed">{study.solution}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-8 relative z-10">
                    {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-bloom-secondary shrink-0" />
                            {result}
                        </div>
                    ))}
                </div>

                <button className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider hover:text-bloom-primary transition-colors w-fit group-hover:translate-x-2 transition-transform duration-300">
                    Read Full Case Study <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default CaseStudyItem;
