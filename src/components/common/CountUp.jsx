import { useEffect, useState, useRef } from 'react';

const CountUp = ({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        // Observer options
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger only when 50% of the element is visible
        };

        const currentRef = ref.current;

        const observer = new IntersectionObserver(([entry]) => {
            // Only trigger if intersecting AND we haven't animated yet
            if (entry.isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;

                let startTime;
                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = currentTime - startTime;

                    // Ease out expo
                    const percentage = Math.min(progress / duration, 1);
                    const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

                    const currentCount = end * ease;
                    setCount(currentCount);

                    if (progress < duration) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(end);
                    }
                };
                requestAnimationFrame(animate);

                // Stop observing once triggered
                if (currentRef) observer.unobserve(currentRef);
            }
        }, observerOptions);

        // Add a small delay before observing to prevent false positives during initial layout render
        // This solves the issue where elements appear "visible" for a split second before styles load/layout shifts
        const timeoutId = setTimeout(() => {
            if (currentRef) {
                observer.observe(currentRef);
            }
        }, 500); // 500ms delay to be safe

        return () => {
            clearTimeout(timeoutId);
            if (currentRef) {
                observer.disconnect(); // Use disconnect to be cleaner
            }
        };
    }, [end, duration]);

    return (
        <span ref={ref} className="inline-block min-w-[1ch]">
            {/* inline-block helps with transforms/dimensions, min-w prevents 0-width issues */}
            {prefix}{count.toFixed(decimals)}{suffix}
        </span>
    );
};

export default CountUp;
