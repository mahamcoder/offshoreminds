import videoSource from '../../assets/video1.mp4';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoSection = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="py-20 bg-bloom-dark relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        className="w-full h-auto object-cover"
                        loop
                        muted
                        playsInline

                        onClick={togglePlay}
                    >
                        <source src={videoSource} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                        <button
                            onClick={togglePlay}
                            className="btn-glass w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        >
                            {isPlaying ? (
                                <Pause size={32} className="text-white fill-white" />
                            ) : (
                                <Play size={32} className="text-white fill-white ml-1" />
                            )}
                        </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-bloom-primary/30 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-bloom-secondary/20 rounded-full blur-[80px] pointer-events-none"></div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-bloom-text-muted text-lg max-w-3xl mx-auto">
                        Experience the precision and dedication we bring to every real estate financial solution.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
