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
                
                <p className="text-bloom-text-muted max-w-2xl mx-auto leading-relaxed">
                   In our global operations, the expertise of our skilled professionals in India is pivotal. They deliver top-notch services that redefine outsourcing in the real estate industry by seamlessly integrating their knowledge with advanced systems, resulting in unparalleled service quality.
                </p>
            </div>
        </section>
    );
};

export default RealmSection;
