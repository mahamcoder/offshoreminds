import Reveal from '../components/common/Reveal';
import { AlertCircle } from 'lucide-react';

const Disclaimers = () => {
    return (
        <div className="bg-bloom-dark min-h-screen text-white pt-20">
            {/* Hero Section */}
            <div className="relative py-20 overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-bloom-primary/5 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <Reveal>
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <AlertCircle className="text-bloom-primary w-8 h-8" />
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Disclaimers and Availability of the Website
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-bloom-text-muted text-lg max-w-2xl mx-auto">
                            Important Information Regarding Use of Our Website
                        </p>
                    </Reveal>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Reveal delay={300}>
                        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                            {/* Hover Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-bloom-primary/10 rounded-full blur-[80px] group-hover:bg-bloom-primary/20 transition-colors duration-500"></div>

                            <div className="space-y-8 relative z-10 text-gray-300 leading-relaxed">
                                <p>
                                    Any online facilities, tools, services, or information that <strong className="text-white">Offshore Minds</strong> makes available through the Website (the "Service") are provided "as is" and on an "as available" basis. We give no warranty that the Service will be free from defects and/or faults. To the maximum extent permitted by law, we make no warranties (express or implied) regarding fitness for a particular purpose, accuracy of information, compatibility, or satisfactory quality. <strong className="text-white">Offshore Minds</strong> is under no obligation to update information on the Website.
                                </p>

                                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <p className="text-red-200 text-sm">
                                        While <strong className="font-bold">Offshore Minds</strong> uses reasonable efforts to ensure that the Website is secure and free from errors, viruses, and other malware, we do not guarantee or warrant this, and all users are responsible for their own security, including the protection of their personal details and their devices.
                                    </p>
                                </div>

                                <p>
                                    <strong className="text-white">Offshore Minds</strong> accepts no liability for any disruption or unavailability of the Website.
                                </p>

                                <p>
                                    We reserve the right to alter, suspend, or discontinue any part (or all) of the Website, including but not limited to, any products and/or services offered. These terms and conditions shall continue to apply to any modified version of the Website unless expressly stated otherwise.
                                </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 text-center">
                                <p className="text-sm text-gray-500 mb-2">For more information, please visit</p>
                                <a href="https://www.offshoreminds.com" className="text-bloom-primary hover:text-white font-bold transition-colors">www.offshoreminds.com</a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default Disclaimers;
