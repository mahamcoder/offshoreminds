import { Star } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const Testimonials = () => {
    const originalReviews = [
        {
            name: "Brooks Whiteside,CEO",
            role: "Retail Unit Underwriting and Modeling",
            text: "This was my first experience with outsourcing, and I was pleasantly surprised by how well they understood the market and business landscape in the USA, despite not being physically present here. I can confidently say they are experts in their field. The team is highly capable and responsive, making them a pleasure to work with. I would definitely hire them again for my next project.",
            rating: 5
        },
        {
            name: "Kevin Hollins, CEO",
            role: "Office Underwriting and Valuation",
            text: "Offshore Minds' team is highly responsive and professional, allowing us to focus on other priorities. Their unwavering commitment to excellence raises our operational efficiency in every project. With expert analysis and proactive process improvements, they streamline workflows and spark innovative growth. This partnership has boosted our productivity while fostering a culture of trust and forward-thinking innovation",
            rating: 5
        },
        {
            name: "Jack Stone, CEO",
            role: "Multifamily Underwriting and Modeling",
            text: "Offshore Minds is extremely responsive and a valuable partner on our team. They consistently handle diverse analytical and research tasks with expertise and adapt quickly to feedback. Their collaborative spirit and commitment to excellence have truly elevated our workflow. I highly recommend Offshore Minds for any organization seeking a reliable and forward-thinking partner.",
            rating: 5
        },
        {
            name: "Jason Friedland, Owner",
            role: "Argus Modeling and Analysis",
            text: "Working on the project with Offshore Minds has been a highly positive experience. Their analytical expertise and proactive problem-solving streamlined our processes and boosted our operational efficiency. The team quickly adapted to feedback at every stage, ensuring high standards were maintained throughout, and their commitment to excellence allowed us to focus on strategic priorities.",
            rating: 5
        },
        {
            name: "Ameen Ascha, Vice Precident",
            role: "Argus Excel Integration Model",
            text: "I was thoroughly impressed by the Offshore Mind team’s exceptional proficiency in Excel and their extensive knowledge of commercial real estate. Their expertise was an invaluable asset to my project. They not only completed the task with great thoroughness but also delivered it in a timely manner. I highly recommend their services!.",
            rating: 5
        },
        {
            name: "Priscilla Mukiibi, Project Manager",
            role: "Underwriting Excel Template",
            text: "The Offshore Minds team excels in customer service, consistently striving to meet your needs. They are highly responsive and adept at incorporating feedback. I am confident they will continue to thrive in this industry.",
            rating: 5
        },
        {
            name: "Priscilla Mukiibi, Project Manager",
            role: "Underwriting Excel Template",
            text: "The Offshore Minds team excels in customer service, consistently striving to meet your needs. They are highly responsive and adept at incorporating feedback. I am confident they will continue to thrive in this industry.",
            rating: 5
        },
    ];

    const [visibleCount, setVisibleCount] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    // Responsive visible count
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setVisibleCount(1);
            } else {
                setVisibleCount(3);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Body scroll lock
    useEffect(() => {
        if (selectedReview) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedReview]);

    // Duplicate logic for infinite scroll illusion
    // Appending enough items to cover the visible area for smooth looping
    // We append 'visibleCount' items to the end.
    const reviews = [...originalReviews, ...originalReviews.slice(0, visibleCount)];

    useEffect(() => {
        // Continuous auto-play as requested
        const interval = setInterval(() => {
            setCurrentIndex(prev => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Since we appended 'visibleCount' items, the "end" of the real list is at length.
        // If we reach originalReviews.length, we are showing the first of the duplicated items.
        // We wait for transition to finish, then snap back to 0.
        if (currentIndex === originalReviews.length) {
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 500);
        } else if (currentIndex === 0) {
            // If we just snapped back to 0, re-enable transitions
            // We give it a tiny delay to ensure the DOM has updated with the "no transition" state first
            setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, originalReviews.length]);

    // Calculate width for each item based on visibleCount and gap
    // Gap is 32px (gap-8)
    // Formula: (100% - (visibleCount - 1) * gap) / visibleCount
    const gap = 32;

    return (
        <section className="py-20 bg-bloom-dark section-fade animate-on-scroll overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
                    <p className="text-bloom-text-muted">Trusted by industry leaders worldwide</p>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-hidden -mx-4 px-4 py-4">
                    <div
                        className={`flex gap-8 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
                        }}
                    >
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0"
                                style={{
                                    width: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`
                                }}
                            >
                                <div
                                    onClick={() => setSelectedReview(review)}
                                    className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-bloom-primary/30 transition-all duration-300 h-full flex flex-col justify-between group cursor-pointer hover:bg-white/10"
                                >
                                    <div>
                                        <div className="flex gap-1 text-yellow-400 mb-4">
                                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <div className="relative">
                                            <p className="text-gray-300 mb-4 italic leading-relaxed line-clamp-4">"{review.text}"</p>
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <h4 className="font-bold text-white text-lg">{review.name}</h4>
                                        <p className="text-sm text-bloom-text-muted">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonial Modal */}
                {selectedReview && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-bloom-dark/80 backdrop-blur-md animate-in fade-in duration-300"
                            onClick={() => setSelectedReview(null)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative w-full max-w-2xl bg-bloom-dark/90 border border-white/10 p-8 sm:p-12 rounded-3xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 backdrop-blur-2xl">
                            <button
                                onClick={() => setSelectedReview(null)}
                                className="absolute top-6 right-6 text-bloom-text-muted hover:text-white transition-colors p-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="flex gap-1 text-yellow-500 mb-6">
                                {[...Array(selectedReview.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                            </div>

                            <p className="text-xl sm:text-2xl text-white italic leading-relaxed mb-10 font-light">
                                "{selectedReview.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                                <div className="w-12 h-12 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary font-bold text-xl">
                                    {selectedReview.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-xl">{selectedReview.name}</h4>
                                    <p className="text-bloom-text-muted">{selectedReview.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dots Indicator */}
                <div className="flex justify-center mt-8 gap-2">
                    {originalReviews.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setIsTransitioning(true);
                                setCurrentIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${(currentIndex % originalReviews.length) === idx
                                ? 'bg-bloom-primary w-6'
                                : 'bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
