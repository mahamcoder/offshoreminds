import logo from '../assets/logo.webp';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { servicesData } from '../data/services';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic classes based on scroll and page
  const navBg = isHome && !isScrolled ? 'bg-transparent border-transparent' : 'bg-bloom-dark/80 backdrop-blur-md border-b border-white/10 shadow-lg';
  const textColor = 'text-white';
  const hoverColor = 'hover:text-bloom-secondary';

  const isActive = (path) => location.pathname === path ? 'font-semibold text-bloom-secondary' : `${textColor} ${hoverColor}`;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Offshore Minds" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-all duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/about" className={isActive('/about')}>About Us</Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <Link to="/services" className={`flex items-center gap-1 ${location.pathname.startsWith('/services') ? 'text-bloom-secondary font-semibold' : `${textColor} ${hoverColor}`}`}>
                Services <ChevronDown size={16} />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-72 bg-bloom-dark/95 backdrop-blur-xl rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-2 border border-white/10">
                <div className="py-2">
                  {servicesData.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/case-studies" className={isActive('/case-studies')}>Case Studies</Link>
            <Link to="/blogs" className={isActive('/blogs')}>Blogs</Link>
            <Link to="/careers" className={isActive('/careers')}>Careers</Link>

            <Link to="/contact" className={`btn-glass px-6 py-2 rounded-full font-medium transition-all`}>
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 bg-bloom-dark/95 backdrop-blur-xl absolute top-20 left-0 right-0 shadow-xl border-t border-white/10 px-4 flex flex-col gap-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-lg text-white font-medium">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-lg text-white font-medium">About Us</Link>
            <div className="py-2 border-y border-white/10">
              <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Services</p>
              {servicesData.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 pl-8 pr-4 text-sm text-gray-300 hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
            <Link to="/case-studies" onClick={() => setIsOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-lg text-white font-medium">Case Studies</Link>
            <Link to="/blogs" onClick={() => setIsOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-lg text-white font-medium">Blogs</Link>
            <Link to="/careers" onClick={() => setIsOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-lg text-white font-medium">Careers</Link>
            <div className="pt-2">
              <Link to="/contact" onClick={() => setIsOpen(false)} className="w-full block text-center py-3 rounded-xl bg-bloom-primary text-white font-medium">Contact Us</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
