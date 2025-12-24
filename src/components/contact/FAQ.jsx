import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const FAQ = () => {
    const questions = [
        {
            q: "What are the benefits of outsourcing tasks to Offshore Minds’s team?",
            a: "The primary advantage of outsourcing to Offshore Minds’ team is the significant cost savings, which helps reduce overheads and boost profitability. By offloading heavy tasks, businesses can clear bottlenecks and concentrate on their core competencies. Additionally, offshore teams offer access to a broader and more diverse talent pool, providing the expertise and skills that might not be available locally. This can enhance creativity and productivity, introducing fresh ideas and perspectives. Moreover, outsourcing non-core and repetitive tasks frees up resources, allowing businesses to focus on high-value activities such as networking, raising capital, and sourcing opportunities. Our goal is to support our clients in creating an efficient system that empowers their onshore team and fosters growth."
        },
        {
            q: "What ways can we utilize the services of the real estate analysis?",
            a: "Offshore Minds’ Real Estate Analysis division offers a wide range of services, including underwriting, financial modeling, market research, asset management, and investment deck preparation. Our team has extensive expertise across various asset classes in the United States and has collaborated with numerous syndicators, developers, and private equity groups. By leveraging the skills and knowledge of our real estate analysts, clients can enhance their competitive edge and increase the success of their real estate ventures."
        },
        {
            q: "What ways can we utilize the services of Real Estate Accounting?",
            a: "Our team can assist with property-level and entity-level bookkeeping, monthly audits, financial reporting, bank reconciliation, payroll processing, invoice handling, and more. We have experience with major accounting software such as QuickBooks, Yardi, AppFolio, Property Matrix, MRI, ResMan, etc. By leveraging our expertise, you can ensure accurate and timely financial records, minimize tax liability, and make informed decisions to enhance your bottom line."
        },
        {
            q: "Do we have to hire a full-time analyst?",
            a: "We provide a dedicated full-time analyst/accountant who will be your point of contact, available from 9 AM to 5 PM in your respective time zone. However, you are not required to hire on a full-time basis with Offshore Minds. We offer flexible options, including full-time, part-time, and quarter-time arrangements, allowing you to choose the best fit for your needs and budget. Depending on the size, turnaround expectations, and complexity of your project, you can opt for a part-time or quarter-time analyst. This flexibility enables you to scale up or down as needed without the hassle of hiring and training additional staff. Regardless of the option you choose, our analysts are highly trained and committed to delivering high-quality work and meeting your expectations."
        },
         {
            q: "What time zone does Offshore Minds works in?",
            a: "Offshore Minds’ team primarily operates on EST but is flexible and can work on CST, PST, or even IST if it better suits the client’s needs. Offshore Minds is committed to adjusting its schedule to align with the specific requirements and goals of its clients."
        },
         {
            q: "What types of models do you utilize for analysis and underwriting? Do you have proprietary models, or can your analysts work with our existing models?",
            a: "At Offshore Minds, we utilize a variety of models for analysis and underwriting, tailored to the specific needs of each project and client. We have developed proprietary models refined over many years, designed for various asset classes and investment structures. However, we are also flexible and can work with our clients’ existing models or customize them to meet specific requirements. Our team of analysts is proficient in a range of software and modeling tools, including Argus, Excel, and others. We are dedicated to delivering high-quality work that aligns with our clients’ unique needs and specifications."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-24 bg-bloom-dark relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bloom-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-3xl relative z-10">
                <div className="text-center mb-16">
                    <span className="text-bloom-blue font-semibold tracking-wider uppercase text-sm mb-3 block">Got Questions?</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div key={i} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === i ? 'bg-white/10 border-bloom-primary/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-bold text-lg ${openIndex === i ? 'text-bloom-primary' : 'text-white'}`}>{item.q}</span>
                                {openIndex === i ? <ChevronUp size={20} className="text-bloom-primary" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>

                            {openIndex === i && (
                                <div className="p-6 pt-0 text-bloom-text-muted leading-relaxed">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
