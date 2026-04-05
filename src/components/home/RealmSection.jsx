import { Snowflake } from 'lucide-react';

const RealmSection = () => {
    return (
        <section className="py-20 bg-bloom-dark text-center section-fade animate-on-scroll">
            <div className="container mx-auto px-4">
                <div className="inline-block p-4 mb-6">
                    <Snowflake className="w-12 h-12 text-bloom-primary mx-auto animate-spin-slow" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading uppercase tracking-wide">
                    Realm Of Intelligence
                </h2>
                
                <p className="text-bloom-text-muted max-w-4xl mx-auto leading-relaxed">
                  At the core of our global delivery model sits an elite team of knowledge professionals operating from the world's most proven hub for high-performance KPO. Powered by proprietary intelligent workflows, decades of combined domain expertise, and an unrelenting commitment to accuracy, our bench of domain-certified analysts, financial modellers, accountants, and strategic advisors does not simply process work. They think, strategize, and deliver Fortune-level intelligence to every engagement, at a fraction of the cost of building an in-house team. This is not outsourcing. This is your unfair advantage
                </p>
            </div>
        </section>
    );
};

export default RealmSection;
