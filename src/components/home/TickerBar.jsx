import { ChevronLeft, ChevronRight } from 'lucide-react';

const TickerBar = () => {
    return (
        <div className="bg-bloom-dark/30 backdrop-blur-md text-white py-3 relative overflow-hidden border-b border-white/5">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <button className="p-1 hover:bg-white/10 rounded-full transition-colors hidden md:block">
                    <ChevronLeft size={20} className="text-white/60" />
                </button>
                
                <div className="flex-1 text-center overflow-hidden whitespace-nowrap">
                    <p className="text-sm md:text-base font-medium tracking-wide animate-marquee md:animate-none">
                        Back-Office Book-Office Support Services for Your Real Estate Business | Specific Art of Touch of Brilliance
                    </p>
                </div>

                <button className="p-1 hover:bg-white/10 rounded-full transition-colors hidden md:block">
                    <ChevronRight size={20} className="text-white/60" />
                </button>
            </div>
        </div>
    );
};

export default TickerBar;
