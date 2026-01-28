import { useState, useEffect } from 'react';
import { Linkedin, X } from 'lucide-react';
import Reveal from '../common/Reveal';
import rahulImg from "../../assets/Rahul.webp";
import gayana from "../../assets/Gayana.webp";
import sanjitImg from "../../assets/sanjit.webp";
import JapnahImg from "../../assets/Japnah.webp";
import Sythum from "../../assets/AC/Sythum shah.webp";


const TeamSection = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    // Scroll Lock logic
    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedMember]);

    const team = [
        {
            name: "Rahul Kathuria",
            role: "Co-founder, CEO",
            image: rahulImg,
            linkedin: "#",
            bio: "With over five years of hands-on experience across the investment landscape, spanning roles as a General Partner, Limited Partner, broker, and developer, I bring a practical, multi-dimensional understanding of what high-performing real estate and finance firms need to scale with precision. As Co-Founder and CEO of Offshore Minds, I lead our Client Partnerships and Marketing strategy, ensuring clients don’t just outsource tasks, they unlock strategic growth. My role centers on transforming operational inefficiencies into streamlined solutions that enhance performance, reduce overhead, and empower teams to focus on what truly moves the needle"
        },
        {
            name: "Gyanasarathi Pradhan",
            role: "Partner, COO",
            image: gayana,
            linkedin: "https://www.linkedin.com/in/gyanasarathi/",
            bio: "GP is a real estate investment professional with 7+ years of experience across all major asset classes, including multifamily, commercial, hospitality, and renewable energy. As Partner & COO at Offshore Minds, he leads outsourcing and advisory services for real estate and finance firms globally. With strong expertise in investment analysis, financial modeling, deal structuring, and capital markets, and an MBA in Finance & Business Analytics, GP specializes in transforming complex financial data into clear, strategic insights that help clients scale confidently."
        },
        {
            name: "Sanjit Khaus",
            role: "Senior Accountant",
            image: sanjitImg,
            linkedin: "#",
            bio: "Sanjit Khuas is a Cost Management Accountant (CMA) with 5 years of experience in accounting and finance. He is skilled in NetSuite, QuickBooks, Xero, Odoo, and payroll systems like Gusto, ADP, and Rippling. With strong expertise in property accounting and experience across real estate, e-commerce, retail, construction, and non-profits, Sanjit is known for his analytical mindset, clear communication, and efficient process management."
        },
        {
            name: "Japnah Gambhir",
            role: "Senior Manager (CRE)",
            image: JapnahImg,
            linkedin: "#",
            bio: "Japnah Gambhir brings 7+ years of experience in commercial and residential real estate, with expertise across asset classes including Office, Retail, Industrial, Multifamily, Student Housing, Storage, Data Centers, and Land. She is highly skilled in tools such as Excel, RedIQ, Argus, CoStar, RealPage, AppFolio, and Yardi, and has worked with leading firms like JLL, Newmark, Colliers, and Brookfield. Known for her in-depth research, strategic insights, and strong project management, Japnah consistently delivers enhanced property performance and client satisfaction."
        },
        {
            name: "Satyam Sah",
            role: "Senior Financial Analyst",
            image: Sythum,
            linkedin: "#",
            bio: "Satyam specializes in institutional-grade financial analysis. From underwriting new acquisitions to complex sensitivity analysis, he provides the data-driven support our clients need to make informed decisions."
        }
    ];

    return (
        <section className="py-24 bg-bloom-dark relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                    <Reveal>
                        <span className="text-bloom-primary font-semibold tracking-wider uppercase text-sm">Our Team</span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 mb-6 text-white">
                            Meet the Experts
                        </h2>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-center">
                    {team.map((member, index) => (
                        <div key={index} className="h-full">
                            <Reveal delay={index * 100} width="100%" height="100%">
                                <div
                                    className="group text-center h-full flex flex-col items-center cursor-pointer"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    <div className="relative inline-block mb-6 shrink-0">
                                        {/* Glowing Ring */}
                                        <div className="absolute inset-0 rounded-full border-2 border-bloom-primary/30 group-hover:border-bloom-primary scale-105 transition-all duration-500"></div>

                                        <div className="w-32 h-32 rounded-full overflow-hidden relative z-10 mx-auto border-2 border-white/10">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* LinkedIn Indicator */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-bloom-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20 shadow-xl">
                                            <Linkedin className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-bloom-blue transition-colors">{member.name}</h3>
                                        <p className="text-bloom-text-muted text-sm font-medium">{member.role}</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Member Modal */}
            {selectedMember && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-bloom-dark/80 backdrop-blur-md"
                        onClick={() => setSelectedMember(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-2xl w-full relative z-10 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                            <div className="w-40 h-40 rounded-3xl overflow-hidden shrink-0 border-2 border-white/10 shadow-xl">
                                <img
                                    src={selectedMember.image}
                                    alt={selectedMember.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col h-full">
                                <div className="mb-4">
                                    <h3 className="text-3xl font-bold text-white mb-2">{selectedMember.name}</h3>
                                    <p className="text-bloom-blue font-semibold">{selectedMember.role}</p>
                                </div>

                                <p className="text-bloom-text-muted leading-relaxed mb-6 font-light">
                                    {selectedMember.bio}
                                </p>

                                <div className="mt-auto flex items-center justify-center md:justify-start gap-4">
                                    <a
                                        href={selectedMember.linkedin}
                                        className="flex items-center gap-2 bg-bloom-primary text-white px-4 py-2 rounded-xl hover:bg-white hover:text-bloom-primary transition-all font-medium text-sm"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        LinkedIn Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TeamSection;
