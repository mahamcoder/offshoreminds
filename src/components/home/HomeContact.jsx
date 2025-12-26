import { useState } from 'react';
import { Send } from 'lucide-react';

const HomeContact = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");

        const formData = new FormData(event.target);
        formData.append("access_key", "b224d594-f4b3-4fa6-b8ce-363802a1b882");

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
        <section className="bg-bloom-dark py-24 relative overflow-hidden border-t border-white/5 section-fade animate-on-scroll">
            {/* Background elements */}
            <div className="absolute inset-0 bg-bloom-dark z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bloom-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <div className="text-white">
                        <div className="w-16 h-1 bg-bloom-secondary mb-8"></div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-bloom-blue">
                            Get Your Free <br /> Consultation
                        </h2>
                        <p className="text-bloom-text-muted text-lg mb-8 max-w-lg leading-relaxed font-light">
                            Ready to optimize your real estate operations? Connect with our experts to discuss your specific needs and how we can help you scale efficiently.
                        </p>
                        <a href="https://calendly.com/gyan-offshoreminds/30min?month=2025-12" target="_blank" rel="noopener noreferrer" className="btn-glass px-8 py-3 rounded-full font-medium inline-block">Schedule Now</a>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-bloom-primary to-bloom-secondary rounded-3xl opacity-20 blur group-hover:opacity-40 transition duration-500 -z-10"></div>

                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Send Us A Message</h3>
                        <form className="space-y-4" onSubmit={onSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="name" placeholder="Name" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-bloom-secondary focus:bg-white/10 focus:ring-1 focus:ring-bloom-secondary outline-none transition-all" />
                                <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-bloom-secondary focus:bg-white/10 focus:ring-1 focus:ring-bloom-secondary outline-none transition-all" />
                            </div>
                            <input type="text" name="subject" placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-bloom-secondary focus:bg-white/10 focus:ring-1 focus:ring-bloom-secondary outline-none transition-all" />
                            <textarea rows="4" name="message" placeholder="Message" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-bloom-secondary focus:bg-white/10 focus:ring-1 focus:ring-bloom-secondary outline-none resize-none"></textarea>

                            <button type="submit" className="w-full py-4 rounded-xl bg-bloom-primary/80 backdrop-blur-sm border border-white/10 text-white font-bold hover:bg-bloom-primary transition-all duration-300 shadow-lg shadow-bloom-primary/25 flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                                Send <Send size={18} />
                            </button>
                            {result && (
                                <p className={`text-center font-medium ${result.includes("Error") || result.includes("Sending") ? "text-bloom-text-muted" : "text-bloom-secondary"}`}>
                                    {result}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeContact;
