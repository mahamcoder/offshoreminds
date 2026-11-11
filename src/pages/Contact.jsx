import { useState } from 'react';
import ContactInfo from '../components/contact/ContactInfo';
import FAQ from '../components/contact/FAQ';
import { Send } from 'lucide-react';
import Reveal from '../components/common/Reveal';
import SEO from '../components/SEO';

const Contact = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");

        const formData = new FormData(event.target);
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message sent successfully!");
                event.target.reset();
            } else {
                setResult("Error: " + data.message);
            }
        } catch (error) {
            setResult("Error sending message. Please try again.");
        }
    };

    return (
        <div className="bg-bloom-dark min-h-screen text-white">
            <SEO
                title="Contact Us"
                description="Get in touch with Offshore Minds. We provide specialized real estate outsourcing services — financial analysis, accounting, asset management, and more."
                path="/contact"
                keywords="contact offshore minds, real estate outsourcing inquiries, CRE support"
            />
            {/* Bloom Theme Hero & Form Section */}
            <section className="relative pt-32 pb-20 lg:pb-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bloom-primary/20 rounded-full blur-[120px] animate-pulse float-soft"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bloom-blue/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 lg:mb-24 flex flex-col items-center">
                        <Reveal>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                Let's <span className="text-bloom-primary">Grow Together</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-xl text-bloom-text-muted max-w-2xl mx-auto font-light leading-relaxed">
                                Ready to optimize your real estate operations? Our expert team is here to help you scale efficiently.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">

                        {/* Left: Decorative Vertical Image/Card */}
                        <div className="hidden lg:flex relative min-h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                alt="Skyscraper"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-bloom-dark/40 mix-blend-multiply"></div>
                            <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-bloom-dark to-transparent">
                                <Reveal delay={300}>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Global Reach,</h3>
                                        <p className="text-bloom-primary text-xl">Local Expertise.</p>
                                    </div>
                                </Reveal>
                            </div>
                        </div>

                        {/* Right: Form + Info Stack */}
                        <div className="space-y-8 flex flex-col">
                            {/* Contact Form Card */}
                            <Reveal delay={200} width="100%">
                                <div className="bg-white/5 backdrop-blur-md p-8 lg:p-10 rounded-3xl shadow-xl border border-white/10 hover:border-bloom-primary/30 transition-all duration-300">
                                    <h2 className="text-3xl font-bold text-white mb-6 font-heading">Send Us A Message</h2>
                                    <form className="space-y-6" onSubmit={onSubmit}>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <input type="text" name="name" placeholder="Name" required className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-bloom-primary focus:bg-white/10 transition-all duration-300" />
                                            <input type="email" name="email" placeholder="Email" required className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-bloom-primary focus:bg-white/10 transition-all duration-300" />
                                        </div>
                                        <input type="text" name="subject" placeholder="Subject" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-bloom-primary focus:bg-white/10 transition-all duration-300" />
                                        <textarea rows="4" name="message" placeholder="Message" required className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-bloom-primary focus:bg-white/10 transition-all duration-300"></textarea>
                                        <button type="submit" className="bg-bloom-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-bloom-dark transition-all duration-300 w-full flex items-center justify-center gap-2 transform hover:-translate-y-1 shadow-lg shadow-bloom-primary/20">
                                            Send Message <Send size={18} />
                                        </button>
                                        {result && (
                                            <p className={`text-center font-medium ${result.includes("Error") || result.includes("Sending") ? "text-bloom-text-muted" : "text-bloom-secondary"}`}>
                                                {result}
                                            </p>
                                        )}
                                    </form>
                                </div>
                            </Reveal>

                            {/* Contact Info Card */}
                            <Reveal delay={400} width="100%">
                                <ContactInfo />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ />
        </div>
    );
};

export default Contact;
