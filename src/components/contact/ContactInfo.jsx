import { Phone, MapPin, Mail, Clock, Linkedin, Facebook, Instagram, X } from 'lucide-react';

const ContactInfo = () => {
    return (
        <div className="bg-white/5 backdrop-blur-md p-8 lg:p-10 rounded-3xl shadow-xl border border-white/10 hover:border-bloom-primary/30 transition-all duration-300">
            <h3 className="text-3xl font-bold text-white mb-6 font-heading">Contact Info</h3>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Call Us */}
                <div className="flex gap-4 group">
                    <div className="w-12 h-12 bg-bloom-primary/20 rounded-2xl flex items-center justify-center text-bloom-primary shrink-0 group-hover:bg-bloom-primary group-hover:text-white transition-all duration-300">
                        <Phone size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Call Us</h4>
                        <p className="text-bloom-text-muted text-sm group-hover:text-bloom-blue transition-colors cursor-pointer">+1 206-566-0029</p>
                    </div>
                </div>

                {/* Our Location */}
                <div className="flex gap-4 group">
                    <div className="w-12 h-12 bg-bloom-primary/20 rounded-2xl flex items-center justify-center text-bloom-primary shrink-0 group-hover:bg-bloom-primary group-hover:text-white transition-all duration-300">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Our Location</h4>
                        <p className="text-bloom-text-muted text-sm">205 W 37th St, Fl 8<br />New York, NY 10018</p>
                    </div>
                </div>

                {/* Our Email */}
                <div className="flex gap-4 group">
                    <div className="w-12 h-12 bg-bloom-primary/20 rounded-2xl flex items-center justify-center text-bloom-primary shrink-0 group-hover:bg-bloom-primary group-hover:text-white transition-all duration-300">
                        <Mail size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Our Email</h4>
                        <p className="text-bloom-text-muted text-sm group-hover:text-bloom-blue transition-colors cursor-pointer">rahul@offshoreminds.com</p>
                    </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4 group">
                    <div className="w-12 h-12 bg-bloom-primary/20 rounded-2xl flex items-center justify-center text-bloom-primary shrink-0 group-hover:bg-bloom-primary group-hover:text-white transition-all duration-300">
                        <Clock size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Working Hours</h4>
                        <p className="text-bloom-text-muted text-sm">Mon-Fri: 9 AM-5 PM (EST, CST, PST)</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
                <h4 className="font-bold text-white mb-6">Follow Us</h4>
                <div className="flex gap-4">
                    <a href="https://linkedin.com/company/offshore-minds" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center hover:bg-bloom-primary hover:-translate-y-1 transition-all duration-300 border border-white/10 hover:border-bloom-primary">
                        <Linkedin size={18} />
                    </a>
                    <a href="https://x.com/Offshore_Minds?t=eUSUE7KF8oeYvHy-00Y5rA&s=09" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center hover:bg-bloom-primary hover:-translate-y-1 transition-all duration-300 border border-white/10 hover:border-bloom-primary">
                        <X size={18} />
                    </a>
                    <a href="https://www.instagram.com/offshoreminds" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center hover:bg-bloom-primary hover:-translate-y-1 transition-all duration-300 border border-white/10 hover:border-bloom-primary">
                        <Instagram size={18} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61563836794375" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center hover:bg-bloom-primary hover:-translate-y-1 transition-all duration-300 border border-white/10 hover:border-bloom-primary">
                        <Facebook size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
