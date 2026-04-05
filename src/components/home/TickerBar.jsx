import { MessageCircleHeart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const TickerBar = () => {
    return (
        <div className="flex justify-center relative z-40 px-4">
            <div className="group relative">
                {/* Border Beam Sparkle - Moving light effect around the capsule */}
                <div
                    className="absolute -inset-[1.5px] rounded-full overflow-hidden pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-1000 z-10"
                    style={{
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        MaskComposite: 'exclude',
                        padding: '1.5px'
                    }}
                >
                    {/* Primary Contrast Beam (Cyan) */}
                    <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_90%,#0ea5e9_93%,white_95%,#0ea5e9_97%,transparent_100%)]"></div>
                    {/* Secondary Theme Match Beam (Purple) - Moving Reverse */}
                    <div className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite_reverse] bg-[conic-gradient(from_0deg,transparent_0_92%,#5D5CDE_95%,white_97%,#5D5CDE_99%,transparent_100%)] opacity-60"></div>
                </div>

                {/* Outer Glow wrapper */}
                <div className="absolute -inset-1 bg-gradient-to-r from-bloom-primary/20 via-bloom-blue/20 to-bloom-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-1000"></div>

                <div className="relative flex items-center gap-3 md:gap-5 bg-[#1a1638]/80 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-2 py-1.5 md:py-2 md:pl-3 md:pr-3 shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(93,92,222,0.2)] z-20">

                    {/* Left Icon Capsule */}
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-bloom-primary/20 border border-bloom-primary/30 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                        <MessageCircleHeart size={18} className="text-[#5D5CDE] group-hover:animate-pulse" />
                    </div>

                    {/* Content Text */}
                    <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-3 pr-2">
                        <span className="text-white/60 font-bold text-[13px] md:text-sm tracking-wide">
                            Smarter Outsourcing, Unfair Advantage
                        </span>

                    </div>

                    {/* Action Button */}
                    <Link to="/services" className="relative px-3 py-1.5 md:px-5 md:py-2 rounded-full overflow-hidden group/btn">
                        {/* Button Background Gradient */}
                        <div className="absolute inset-0 bg-bloom-primary opacity-90 group-hover/btn:opacity-100 transition-opacity"></div>

                        {/* Inner Beam/Sparkle animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>

                        <div className="relative flex items-center gap-2 ">
                            <Sparkles size={14} className="text-white group-hover/btn:rotate-12 transition-transform" />
                            <span className="text-white font-bold text-[10px] md:text-[11px] tracking-[0.15em] uppercase">
                                Explore
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TickerBar;
