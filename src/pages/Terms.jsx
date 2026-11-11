import Reveal from '../components/common/Reveal';
import SEO from '../components/SEO';

const Terms = () => {
    return (
        <div className="bg-bloom-dark min-h-screen text-white pt-20">
            <SEO
                title="Terms & Conditions"
                description="Terms and conditions for using Offshore Minds website and services."
                path="/terms-and-conditions"
            />
            {/* Hero Section */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-bloom-dark"></div>
                {/* Decorative gradients */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-bloom-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-bloom-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <Reveal>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Terms & <span className="text-bloom-primary">Conditions</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="text-bloom-text-muted max-w-2xl mx-auto">
                            Please read these terms and conditions carefully, as they affect your legal rights.
                        </p>
                    </Reveal>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-10">

                        <Reveal delay={200}>
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-bloom-primary/20 transition-colors">
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    These terms and conditions apply between you, the User of this Website (including any sub-domains, unless expressly excluded by their own terms and conditions), and
                                    <strong className="text-white"> Offshore Minds</strong>, the owner and operator of this Website. Your agreement to comply with and be bound by these terms and conditions is deemed to occur upon your first use of the Website. If you do not agree to be bound by these terms and conditions, you should stop using the Website immediately.
                                </p>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    In these terms and conditions, “User” or “Users” means any third party that accesses the Website and is not either (i) employed by Offshore Minds and acting in the course of their employment or (ii) engaged as a consultant or otherwise providing services to Offshore Minds and accessing the Website in connection with the provision of such services.
                                </p>
                                <div className="p-4 bg-bloom-primary/10 rounded-xl border border-bloom-primary/20">
                                    <p className="text-sm text-bloom-blue">
                                        You must be at least 18 years of age to use this Website. By using the Website and agreeing to these terms and conditions, you represent and warrant that you are at least 18 years of age.
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal>
                            <TermsSection title="Intellectual Property and Acceptable Use">
                                <p className="text-gray-400 mb-4">
                                    All Content included on the Website, unless uploaded by Users, is the property of Offshore Minds, our affiliates, or other relevant third parties. In these terms and conditions, “Content” means any text, graphics, images, audio, video, software, data compilations, page layout, underlying code and software, and any other form of information capable of being stored in a computer that appears on or forms part of this Website, including any such content uploaded by Users. By continuing to use the Website, you acknowledge that such Content is protected by copyright, trademarks, database rights, and other intellectual property rights. Nothing on this site shall be construed as granting, by implication, estoppel, or otherwise, any license or right to use any trademark, logo, or service mark displayed on the site without the owner’s prior written permission.
                                </p>
                                <ul className="space-y-4 text-gray-400">
                                    <li className="flex gap-3">
                                        <span className="text-bloom-primary mt-1">•</span>
                                        <span>You may, for your own personal, non-commercial use only, retrieve, display, and view the Content on a device.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-bloom-primary mt-1">•</span>
                                        <span>You must not otherwise reproduce, modify, copy, distribute or use for commercial purposes any Content without the written permission of Offshore Minds.</span>
                                    </li>
                                </ul>
                            </TermsSection>
                        </Reveal>

                        <Reveal>
                            <TermsSection title="Prohibited Use">
                                <p className="mb-4 text-gray-400">You may not use the Website for any of the following purposes:</p>
                                <ul className="space-y-3 text-gray-400">
                                    {[
                                        "in any way which causes, or may cause, damage to the Website or interferes with any other person’s use or enjoyment of the Website;",
                                        "in any way which is harmful, unlawful, illegal, abusive, harassing, threatening, or otherwise objectionable or in breach of any applicable law, regulation, or governmental order;",
                                        "making, transmitting, or storing electronic copies of Content protected by copyright without the permission of the owner."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TermsSection>
                        </Reveal>

                        <Reveal>
                            <TermsSection title="Registration">
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> You must ensure that the details provided by you on registration or at any time are correct and complete.</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> You must inform us immediately of any changes to the information that you provide when registering by updating your personal details to ensure we can communicate with you effectively.</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> We may suspend or cancel your registration with immediate effect for any reasonable purposes or if you breach these terms and conditions.</li>
                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-bloom-primary mt-2 flex-shrink-0"></div> You may cancel your registration at any time by informing us in writing. If you do so, you must immediately stop using the Website. Cancellation or suspension of your registration does not affect any statutory rights.</li>
                                </ul>
                            </TermsSection>
                        </Reveal>

                        <Reveal>
                            <TermsSection title="Links to Other Websites">
                                <p className="text-gray-400">
                                    This Website may contain links to other sites. Unless expressly stated, these sites are not under the control of Offshore Minds or that of our affiliates. We assume no responsibility for the content of such Websites and disclaim liability for any and all forms of loss or damage arising out of the use of them. The inclusion of a link to another site on this Website does not imply any endorsement of the sites themselves or of those in control of them.
                                </p>
                            </TermsSection>
                        </Reveal>

                        <Reveal>
                            <TermsSection title="Privacy Policy and Cookies Policy">
                                <p className="text-gray-400">
                                    Use of the Website is also governed by our Privacy Policy and Cookies Policy, which are incorporated into these terms and conditions by this reference.
                                </p>
                            </TermsSection>
                        </Reveal>

                        <Reveal>
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                                <h2 className="text-xl font-bold text-white mb-4">Availability of the Website and Disclaimers</h2>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    Any online facilities, tools, services, or information that Offshore Minds makes available through the Website (the “Service”) is provided “as is” and on an “as available” basis. We give no warranty that the Service will be free of defects and/or faults. To the maximum extent permitted by law, we provide no warranties (express or implied) of fitness for a particular purpose, accuracy of information, compatibility, and satisfactory quality. Offshore Minds is under no obligation to update information on the Website.
                                </p>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    Whilst Offshore Minds uses reasonable endeavours to ensure that the Website is secure and free of errors, viruses and other malware, we give no warranty or guarantee in that regard and all Users take responsibility for their own security, that of their personal details, and their computers.
                                </p>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    Offshore Minds accepts no liability for any disruption or non-availability of the Website. Offshore Minds reserves the right to alter, suspend or discontinue any part (or the whole) of the Website including, but not limited to, any products and/or services available.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal>
                            <TermsSection title="Limitation of Liability">
                                <p className="text-gray-400 mb-4">Nothing in these terms and conditions will:</p>
                                <ul className="text-gray-400 space-y-2 mb-4 pl-4 list-disc marker:text-bloom-primary">
                                    <li>limit or exclude our or your liability for death or personal injury resulting from our or your negligence, as applicable;</li>
                                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation; or</li>
                                    <li>limit or exclude any of our or your liabilities in any way that is not permitted under applicable law.</li>
                                </ul>
                                <p className="text-gray-400 mb-4">We will not be liable to you in respect of any losses arising out of events beyond our reasonable control.</p>
                                <p className="text-gray-400 mb-2">To the maximum extent permitted by law, Offshore Minds accepts no liability for any of the following:</p>
                                <ul className="text-gray-400 space-y-2 pl-4 list-disc marker:text-bloom-primary">
                                    <li>any business losses, such as loss of profits, income, revenue, anticipated savings, business, contracts, goodwill or commercial opportunities;</li>
                                    <li>loss or corruption of any data, database or software;</li>
                                    <li>any special, indirect or consequential loss or damage.</li>
                                </ul>
                            </TermsSection>
                        </Reveal>

                        <Reveal>
                            <TermsSection title="General">
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex gap-3"><span className="text-bloom-primary font-bold">•</span> If any court or competent authority finds that any provision of these terms and conditions (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of these terms and conditions will not be affected.</li>
                                    <li className="flex gap-3"><span className="text-bloom-primary font-bold">•</span> Unless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed a waiver of that, or any other, right or remedy.</li>
                                    <li className="flex gap-3"><span className="text-bloom-primary font-bold">•</span> This Agreement shall be governed by and interpreted according to the law of England and Wales and all disputes arising under the Agreement (including non-contractual disputes or claims) shall be subject to the exclusive jurisdiction of the English and Welsh courts.</li>
                                    <li className="flex gap-3"><span className="text-bloom-primary font-bold">•</span> You may not transfer any of your rights under these terms and conditions to any other person. We may transfer our rights under these terms and conditions where we reasonably believe your rights will not be affected.</li>
                                </ul>
                            </TermsSection>
                        </Reveal>

                        <Reveal>
                            <div className="bg-gradient-to-br from-bloom-dark to-black p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-6">Offshore Minds Details</h3>
                                <p className="text-gray-400 mb-6">
                                    Offshore Minds is a company operating under applicable laws, and it operates the Website www.offshoreminds.com.
                                </p>
                                <div className="grid md:grid-cols-2 gap-8 text-sm">
                                    <div>
                                        <h4 className="text-bloom-primary font-bold mb-2">US Headquarters</h4>
                                        <p className="text-gray-400">205 W 37th St, Fl 8,<br />New York, NY 10018</p>
                                    </div>
                                    <div>
                                        <h4 className="text-bloom-primary font-bold mb-2">India Headquarters</h4>
                                        <p className="text-gray-400">H-41 Lal Market, Vikas Puri,<br />New Delhi 110018</p>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                    <a href="mailto:info@offshoreminds.com" className="text-white hover:text-bloom-primary transition-colors">info@offshoreminds.com</a>
                                </div>
                            </div>
                        </Reveal>

                    </div>
                </div>
            </section>
        </div>
    );
};

const TermsSection = ({ title, children }) => (
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-bloom-primary/20 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">{title}</h3>
        {children}
    </div>
);

export default Terms;
