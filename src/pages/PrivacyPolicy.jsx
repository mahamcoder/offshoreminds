import Reveal from '../components/common/Reveal';

const PrivacyPolicy = () => {
    return (
        <div className="bg-bloom-dark min-h-screen text-white pt-20">
            {/* Hero Section */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-bloom-primary/5"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-bloom-primary/20 rounded-full blur-[100px] animate-pulse"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <Reveal>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Privacy <span className="text-bloom-primary">Policy</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="text-bloom-text-muted text-lg">Effective July 12, 2025</p>
                    </Reveal>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {/* 1. Who We Are */}
                        <Reveal delay={200}>
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary text-sm">01</span>
                                    Who We Are
                                </h2>
                                <p className="text-gray-300 mb-4 leading-relaxed">This Privacy Policy applies to Offshore Minds Pvt Ltd (“Offshore Minds”, “we”, “our”, “us”) and our website www.offshoreminds.com. We operate from:</p>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div>
                                        <span><strong className="text-white">US HQ:</strong> 205 W 37th St, Fl 8, New York, NY 10018, USA</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div>
                                        <span><strong className="text-white">India HQ:</strong> H-41 Lal Market, Vikas Puri, New Delhi 110018, India</span>
                                    </li>
                                </ul>
                            </div>
                        </Reveal>

                        {/* 2. Data We Collect */}
                        <Reveal delay={300} width="100%">
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary text-sm">02</span>
                                    Data We Collect
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="p-4 border-b border-white/10 text-bloom-primary font-bold w-1/4">Category</th>
                                                <th className="p-4 border-b border-white/10 text-bloom-primary font-bold w-1/3">Examples</th>
                                                <th className="p-4 border-b border-white/10 text-bloom-primary font-bold w-1/3">Why we collect it</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-300">
                                            <tr>
                                                <td className="p-4 border-b border-white/5 font-semibold text-white">Information you give us</td>
                                                <td className="p-4 border-b border-white/5">Name, business e-mail, phone, company, messages sent through forms or e-mail</td>
                                                <td className="p-4 border-b border-white/5">To answer enquiries, deliver services, create project accounts</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 border-b border-white/5 font-semibold text-white">Automatic data</td>
                                                <td className="p-4 border-b border-white/5">IP address, browser/device info, pages visited, time on site</td>
                                                <td className="p-4 border-b border-white/5">Site security, analytics, service improvement</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-semibold text-white">Cookies & similar tech</td>
                                                <td className="p-4">Small files placed in your browser; includes Google Analytics cookies</td>
                                                <td className="p-4">Remember preferences, measure traffic; you can block cookies in your browser settings</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-4 text-xs text-bloom-text-muted italic">We do not knowingly collect data from anyone under 18.</p>
                            </div>
                        </Reveal>

                        {/* 3. How We Use Your Data */}
                        <Reveal width="100%">
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary text-sm">03</span>
                                    How We Use Your Data
                                </h2>
                                <ul className="space-y-4">
                                    {[
                                        "Provide and improve our services and website",
                                        "Communicate about quotes, projects, or support",
                                        "Send occasional marketing updates (opt-out anytime via the link in each e-mail)",
                                        "Analyse usage to enhance performance and security",
                                        "Comply with legal or regulatory obligations"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>

                        {/* 4. Sharing Your Data */}
                        <Reveal width="100%">
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary text-sm">04</span>
                                    Sharing Your Data
                                </h2>
                                <p className="text-gray-300 mb-4">We share personal information only:</p>
                                <ul className="space-y-3 text-gray-400 mb-4">
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> with trusted service providers who perform functions such as hosting, analytics, payment, or e-mail on our behalf;</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> within our US and India offices for internal administration;</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> if required by law, court order, or to protect rights and safety;</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> in connection with a corporate transaction (e.g., merger or asset sale).</li>
                                </ul>
                                <p className="text-bloom-text-muted font-semibold">We never sell or rent your data to third-party marketers.</p>
                            </div>
                        </Reveal>

                        {/* 5. International Transfers */}
                        <Reveal width="100%">
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary text-sm">05</span>
                                    International Transfers
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    Because we serve clients globally, your information may be processed in the United States, India, or other countries with adequate safeguards (standard contractual clauses where required).
                                </p>
                            </div>
                        </Reveal>

                        {/* 6. Security & Retention */}
                        <Reveal width="100%">
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary text-sm">06</span>
                                    Security & Retention
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    We use reasonable administrative, technical, and physical measures to protect data. Information is kept only as long as necessary for the purposes above or as required by law.
                                </p>
                            </div>
                        </Reveal>

                        {/* 7. Your Choices & Rights */}
                        <Reveal width="100%">
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary text-sm">07</span>
                                    Your Choices & Rights
                                </h2>
                                <ul className="space-y-3 text-gray-400 mb-4">
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> Access, correct, or delete your personal data</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> Object to marketing at any time</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> Withdraw consent where processing is based on consent</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> Lodge a complaint with your local data-protection authority</li>
                                </ul>
                                <p className="text-gray-300">Contact us to exercise these rights; we will respond promptly.</p>
                            </div>
                        </Reveal>

                        {/* 8. Cookies & Analytics */}
                        <Reveal width="100%">
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-bloom-primary/20 flex items-center justify-center text-bloom-primary text-sm">08</span>
                                    Cookies & Analytics
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    We use Google Analytics to understand site traffic. Google may set its own cookies—see Google’s policy for details and opt-out tools. Blocking cookies may affect site functionality.
                                </p>
                            </div>
                        </Reveal>


                        {/* 9. Contact Us */}
                        <Reveal width="100%">
                            <div className="bg-gradient-to-br from-bloom-primary/20 to-transparent p-8 rounded-3xl border border-bloom-primary/30 text-center w-full">
                                <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
                                <p className="text-gray-300 mb-2">Questions or requests?</p>
                                <a href="mailto:info@offshoreminds.com" className="text-bloom-blue hover:text-white transition-colors text-lg font-bold block mb-4">info@offshoreminds.com</a>
                                <p className="text-sm text-bloom-text-muted">Offshore Minds Pvt Ltd, H-41 Lal Market, Vikas Puri, New Delhi 110018, India.</p>
                                <p className="text-xs text-bloom-text-muted mt-6 pt-4 border-t border-white/10">This condensed notice highlights how we handle your information. For additional details, please contact us.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
