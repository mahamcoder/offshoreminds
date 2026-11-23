import { useEffect, useState } from 'react';

const ExpandSection = () => {
    const expandServices = [
        "Underwritings",
        "Financial Analysis",
        "Asset Management",
        "Due Diligence",
        "Portfolio Reporting"
    ];

    const [displayText, setDisplayText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const currentFullWord = expandServices[wordIndex];

            if (isDeleting) {
                setDisplayText(currentFullWord.substring(0, displayText.length - 1));
                setTypingSpeed(75);
            } else {
                setDisplayText(currentFullWord.substring(0, displayText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && displayText === currentFullWord) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % expandServices.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, wordIndex, typingSpeed, expandServices]);

    return (
        <section className="bg-bloom-dark relative transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="py-20 border-t border-slate-200 dark:border-white/5 text-center">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Expand with us for your{' '}
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-bloom-blue dark:from-white dark:to-bloom-blue">
                                {displayText}
                            </span>
                            <span className="inline-block w-[3px] h-[30px] md:h-[40px] bg-bloom-blue ml-1 animate-pulse align-middle"></span>
                        </span>
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default ExpandSection;
