import { useEffect, useRef, useState } from 'react';

const Reveal = ({ children, delay = 0, width = "fit-content", height, className = "" }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{ width, height }}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${className}`}
        >
            <div
                style={{ transitionDelay: `${delay}ms` }}
                className={height === '100%' ? 'h-full' : ''}
            >
                {children}
            </div>
        </div>
    );
};

export default Reveal;
