import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, X, Instagram, Facebook } from 'lucide-react';
import logo from '../assets/logo.webp';
import logoDark from '../assets/logo-dark.png';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-bloom-dark text-slate-800 dark:text-white pt-20 pb-4 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-4">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src={logoDark} alt="Offshore Minds" className="h-16 w-auto block dark:hidden" />
              <img src={logo} alt="Offshore Minds" className="h-16 w-auto hidden dark:block" />
            </Link>
            <p className="text-slate-600 dark:text-bloom-text-muted text-sm mb-6">Offshore Minds Pvt Ltd.</p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/company/offshore-minds" target="_blank" rel="noopener noreferrer" className="bg-slate-200/80 dark:bg-white/5 p-2 rounded-lg text-slate-700 dark:text-white hover:bg-bloom-primary hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://x.com/Offshore_Minds?t=eUSUE7KF8oeYvHy-00Y5rA&s=09" target="_blank" rel="noopener noreferrer" className="bg-slate-200/80 dark:bg-white/5 p-2 rounded-lg text-slate-700 dark:text-white hover:bg-bloom-primary hover:text-white transition-colors" aria-label="X / Twitter"><X size={20} /></a>
              <a href="https://www.instagram.com/offshoreminds" target="_blank" rel="noopener noreferrer" className="bg-slate-200/80 dark:bg-white/5 p-2 rounded-lg text-slate-700 dark:text-white hover:bg-bloom-primary hover:text-white transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/profile.php?id=61563836794375" target="_blank" rel="noopener noreferrer" className="bg-slate-200/80 dark:bg-white/5 p-2 rounded-lg text-slate-700 dark:text-white hover:bg-bloom-primary hover:text-white transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="bg-slate-200/80 dark:bg-white/5 p-2 rounded-lg text-slate-700 dark:text-white hover:bg-bloom-primary hover:text-white transition-colors font-bold flex items-center justify-center w-9 h-9">G</a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">About Company</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Services We Provide</Link></li>
              <li><Link to="/about" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">How we Operate</Link></li>
              <li><Link to="/about" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Who We are</Link></li>
              <li><Link to="/careers" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Join Our Team (Careers)</Link></li>
            </ul>
          </div>

          {/* Col 3: Legal Pages */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-slate-900 dark:text-white">Legal Pages</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/disclaimers" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Disclaimers</Link></li>
            </ul>
          </div>

          {/* Col 4: Our Services */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-bloom-blue dark:from-white dark:to-bloom-blue">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services/financial-services" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Real Estate Financial Analysis</Link></li>
              <li><Link to="/services/asset-management" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Real Estate Asset Management</Link></li>
              <li><Link to="/services/accounting-services" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Real Estate Accounting</Link></li>
              <li><Link to="/services/financial-modeling" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Financial Modeling</Link></li>
              <li><Link to="/services/marketing" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Real Estate Marketing</Link></li>
              <li><Link to="/services/analytics-services" className="text-slate-600 dark:text-bloom-text-muted hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors">Real Estate Analytics</Link></li>
            </ul>
          </div>

          {/* Col 5: Addresses (Headquarters) */}
          <div>
            <h4 className="font-heading text-sm font-bold mb-2 text-slate-900 dark:text-white">Our US Headquarters</h4>
            <p className="text-slate-600 dark:text-bloom-text-muted text-xs mb-6 leading-relaxed">
              205 W 37th St. Fl 8, New York, NY, 10018
            </p>

            <h4 className="font-heading text-sm font-bold mb-2 text-slate-900 dark:text-white">Our India Headquarters</h4>
            <p className="text-slate-600 dark:text-bloom-text-muted text-xs mb-6 leading-relaxed">
              H-41 Lal Market, Vikas Puri, New Delhi 110018
            </p>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs text-center md:text-left">
          <p>&copy; 2026 Offshore Minds Pvt Ltd.</p>
          <p>Powered by Offshore Minds</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
