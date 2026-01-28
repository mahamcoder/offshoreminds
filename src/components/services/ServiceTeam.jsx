import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import Reveal from '../common/Reveal';
import CountUp from '../common/CountUp';
import { servicesData } from '../../data/services';

const ServiceTeam = ({
    initialServiceId,
    customTitle,
    customDescription,
    customHeading,
    customLabel,
    customExpValue,
    customExpLabel,
    customCapabilities,
    customHighlight, // New prop
    hideDropdown = false
}) => {
    const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || servicesData[0].id);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedCapabilities, setExpandedCapabilities] = useState({});
    const dropdownRef = useRef(null);

    const selectedService = servicesData.find(s => s.id === selectedServiceId);

    // Use props if provided, otherwise fallback to selectedService data or defaults
    const displayTitle = customTitle || "Expert Team & Capabilities";
    const displayDescription = customDescription || selectedService?.teamDescription || "Our team comprises highly skilled professionals from India’s top universities, including individuals with CPA certifications, Master’s degrees, and MBAs. With over four years of experience, we ensure that only the best experts join our ranks.";
    const displayHeading = customHeading || selectedService?.teamHeading || "Our Team";
    const displayLabel = customLabel || "Our Expertise";
    const displayExpValue = customExpValue || "4";
    const displayExpLabel = customExpLabel || "Years of Average Experience";
    const displayCapabilities = customCapabilities || selectedService?.capabilities || [];

    // Update internal state if prop changes
    useEffect(() => {
        if (initialServiceId) {
            setSelectedServiceId(initialServiceId);
        }
    }, [initialServiceId]);

    // Toggle accordion item
    const toggleAccordion = (index) => {
        setExpandedCapabilities(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset accordion state when service changes
    useEffect(() => {
        setExpandedCapabilities({});
    }, [selectedServiceId]);

    return (
        <section className="py-24 bg-bloom-dark relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-bloom-primary/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <Reveal>
                            <span className="text-bloom-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
                                {displayLabel}
                            </span>
                        </Reveal>
                        <Reveal delay={100}>
                            <h2 className="text-4xl font-bold text-white mb-6 font-heading">
                                {displayTitle}
                            </h2>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-bloom-text-muted leading-relaxed text-lg mb-8 font-light">
                                {displayDescription}
                            </p>
                        </Reveal>

                        <Reveal delay={300}>
                            {customHighlight ? (
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-bloom-primary/20 to-bloom-blue/10 border border-bloom-primary/30 backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-bloom-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className="w-12 h-12 bg-bloom-primary/20 rounded-xl flex items-center justify-center text-bloom-primary flex-shrink-0">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-base  text-white mb-2">{customHighlight.title}</h3>
                                            <p className="text-bloom-text-muted text-sm leading-relaxed">{customHighlight.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-bloom-blue/10 border border-bloom-blue/20">
                                    <div className="w-12 h-12 bg-bloom-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                        <CountUp end={parseInt(displayExpValue)} suffix="+" duration={2000} />
                                    </div>
                                    <div className="text-sm text-bloom-text-muted leading-tight">
                                        <span className="text-white font-bold block">{displayExpLabel}</span>
                                        {customExpValue ? "" : "per team member"}
                                    </div>
                                </div>
                            )}
                        </Reveal>
                    </div>

                    <Reveal width="100%">
                        <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl relative group hover:border-bloom-primary/30 transition-colors duration-500">
                            {/* Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-bloom-primary/20 to-bloom-blue/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="relative mb-8" >
                                    {hideDropdown ? (
                                        <div className="text-2xl font-bold text-white">
                                            <span className="bg-gradient-to-r from-white to-bloom-blue bg-clip-text text-transparent">{displayHeading}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <button

                                                className="flex items-center gap-3 text-2xl font-bold text-white hover:text-bloom-primary transition-colors group/btn"
                                            >
                                                <span className="bg-gradient-to-r from-white to-bloom-blue bg-clip-text text-transparent">{displayHeading}</span>

                                            </button>

                                            {/* Dropdown Menu */}
                                            {isDropdownOpen && (
                                                <div className="absolute top-full left-0 mt-4 w-full sm:w-72 bg-bloom-dark border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <div className="py-2">
                                                        {servicesData.map((service) => (
                                                            <button
                                                                key={service.id}
                                                                onClick={() => {
                                                                    setSelectedServiceId(service.id);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className={`w-full text-left px-6 py-3 text-sm transition-colors flex items-center justify-between ${selectedServiceId === service.id
                                                                    ? 'bg-bloom-primary/20 text-white font-bold'
                                                                    : 'text-bloom-text-muted hover:bg-white/5 hover:text-white'
                                                                    }`}
                                                            >
                                                                {service.title}
                                                                {selectedServiceId === service.id && <div className="w-1.5 h-1.5 rounded-full bg-bloom-primary shadow-[0_0_8px_theme(colors.bloom-primary)]"></div>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {displayCapabilities.map((capability, index) => (
                                        <div key={index} className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
                                            <button
                                                onClick={() => toggleAccordion(index)}
                                                className="w-full flex items-start gap-4 text-left group/item"
                                            >
                                                <div className="mt-1.5 flex-shrink-0">
                                                    <ChevronDown
                                                        className={`text-bloom-primary transition-transform duration-300 ${expandedCapabilities[index] ? 'rotate-0' : '-rotate-90'}`}
                                                        size={20}
                                                    />
                                                </div>
                                                <span className={`text-lg font-bold transition-colors ${expandedCapabilities[index] ? 'text-white' : 'text-bloom-text-muted group-hover/item:text-white'}`}>
                                                    {capability.title}
                                                </span>
                                            </button>

                                            <div className={`grid transition-all duration-300 ease-in-out ${expandedCapabilities[index] ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                                <div className="overflow-hidden">
                                                    <ul className="space-y-3 pl-9">
                                                        {(capability.details || []).map((detail, dIndex) => (
                                                            <li key={dIndex} className="flex items-center gap-3 text-bloom-text-muted/80 text-[15px] hover:text-white transition-colors">
                                                                <div className="w-1 h-1 rounded-full bg-bloom-primary/50"></div>
                                                                {detail}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default ServiceTeam;
