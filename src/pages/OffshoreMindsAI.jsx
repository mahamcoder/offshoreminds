import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Building2, FileText, TrendingUp, 
  Database, UserCheck, Briefcase, Landmark, ArrowRight, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const OffshoreMindsAI = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const handleJoinWaitlist = async (e) => {
    e.preventDefault();
    setResult("Sending...");
    
    const formData = new FormData(e.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Private Beta Waitlist Joiner");
    formData.append("from_name", "Offshore Minds AI");
    formData.append("message", `A new user has joined the waitlist for Offshore Minds AI.\n\nUser Email: ${email}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Thank you for joining! We'll be in touch soon.");
        setEmail("");
        setTimeout(() => setResult(""), 5000);
      } else {
        console.error("Error", data);
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      setResult("Connection error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-bloom-dark text-slate-900 dark:text-white pt-24 pb-20 overflow-hidden relative selection:bg-bloom-primary/30 transition-colors duration-300">
      <SEO
        title="Offshore Minds AI — Cognitive Intelligence for CRE"
        description="Experience the future of real estate decision-making. Offshore Minds AI automates underwriting, lease abstraction, and market intelligence."
        path="/offshoreminds-ai"
        keywords="real estate AI, CRE automation, AI underwriting, cognitive intelligence real estate"
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-bloom-dark"></div>
        
        {/* Subtle dot grid */}
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-15" style={{ 
          backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)', 
          backgroundSize: '40px 40px', 
        }}></div>

        {/* Central glowing effect */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
          <div className="absolute inset-0 rounded-full bg-bloom-dark z-10 shadow-[inset_-20px_-20px_100px_rgba(93,92,222,0.15)] dark:shadow-[inset_-20px_-20px_100px_rgba(30,20,50,0.5)]"></div>
          <div className="absolute -top-4 left-[20%] right-[20%] h-32 bg-gradient-to-r from-bloom-primary via-purple-400 to-bloom-secondary rounded-full blur-[20px] opacity-40 dark:opacity-80 z-0 mix-blend-screen"></div>
          <div className="absolute -inset-10 rounded-full bg-gradient-to-b from-bloom-primary/15 dark:from-bloom-primary/30 to-transparent blur-[50px] z-0"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-bloom-secondary/20 dark:bg-bloom-secondary/40 blur-[30px] rounded-full z-0 mix-blend-screen"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-32">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-20 pb-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-slate-500 dark:text-[#8b9bb4] tracking-[0.3em] text-xs font-semibold uppercase">
              Site Under Reconstruction.
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.5em] md:tracking-[0.8em] mb-16 ml-[0.3em] md:ml-[0.5em] text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            COMING SOON
          </motion.h1>
          
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="w-full max-w-sm mx-auto mb-4"
          >
            <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden flex">
              <div className="h-full w-[62%] bg-gradient-to-r from-bloom-primary to-bloom-secondary rounded-full shadow-[0_0_10px_rgba(93,92,222,0.4)]"></div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-slate-500 dark:text-[#8b9bb4] text-xs font-semibold tracking-widest"
          >
            62%
          </motion.p>
          
        </section>

        {/* AI SUITE SECTION */}
        <section className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Our AI Suite</h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We are currently developing a proprietary suite of AI-powered tools designed to eliminate manual &quot;grunt work&quot; and provide high-stakes real estate professionals with a competitive edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiTools.map((tool, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
                 className="relative group p-[1px] rounded-2xl overflow-hidden bg-slate-200/60 dark:bg-gradient-to-b dark:from-white/10 dark:to-transparent shadow-sm hover:shadow-xl transition-all"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-bloom-primary/0 via-transparent to-bloom-secondary/0 group-hover:from-bloom-primary/10 group-hover:to-bloom-secondary/10 transition-all duration-500"></div>
                 <div className="relative bg-white dark:bg-bloom-dark/80 backdrop-blur-sm h-full rounded-2xl p-8 border border-slate-200/90 dark:border-white/5 flex flex-col items-start gap-4 transition-colors duration-300">
                    <div className={`p-4 rounded-xl bg-slate-100 dark:bg-white/5 text-bloom-primary dark:text-white shadow-sm dark:shadow-lg ${tool.shadowClass}`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">{tool.title}</h3>
                    
                    <div className="space-y-4 mt-2 w-full pt-4 border-t border-slate-100 dark:border-white/5">
                      <div>
                        <span className="text-xs font-bold text-bloom-primary uppercase tracking-wider mb-1 block">Functionality</span>
                        <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">{tool.functionality}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-bloom-secondary uppercase tracking-wider mb-1 block">Impact</span>
                        <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">{tool.impact}</p>
                      </div>
                    </div>
                 </div>
               </motion.div>
            ))}
          </div>
        </section>

        {/* TARGET AUDIENCE SECTION */}
        <section className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Who Is This For?</h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Built specifically for commercial real estate professionals who require speed without sacrificing analytical rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudiences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-bloom-dark/40 border border-slate-200/90 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-bloom-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-bloom-primary mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.audience}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WAITLIST SECTION */}
        <section className="max-w-3xl mx-auto text-center relative pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-white dark:bg-white/5 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-bloom-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bloom-primary/10 dark:bg-bloom-primary/20 text-bloom-primary dark:text-bloom-secondary text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Private Beta Access
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Get Early Access</h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-lg mx-auto text-sm md:text-base">
                Join an exclusive group of CRE professionals testing our suite before public launch.
              </p>

              <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bloom-primary focus:border-transparent transition-all"
                />
                <button 
                  type="submit"
                  className="bg-bloom-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-900 dark:hover:bg-gray-200 dark:hover:text-bloom-dark transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Join Waitlist
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
              {result && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-sm font-medium ${result.includes("Error") || result.includes("wrong") ? "text-red-500" : "text-bloom-primary dark:text-bloom-secondary"}`}
                >
                  {result}
                </motion.p>
              )}
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

const aiTools = [
  {
    icon: <Building2 className="w-6 h-6 text-bloom-primary" />,
    shadowClass: 'shadow-bloom-primary/20',
    title: 'AI Deal Screener (Go/No-Go)',
    functionality: 'Instantly extract key financial metrics from Offering Memorandums (OMs).',
    impact: 'Determine deal viability in seconds, allowing teams to move faster than the market.'
  },
  {
    icon: <FileText className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
    shadowClass: 'shadow-purple-400/20',
    title: 'Automated Lease & Rent Roll Abstractor',
    functionality: 'Upload PDF rent rolls and complex leases.',
    impact: 'Receive clean, structured data ready for seamless integration into Excel or Argus models.'
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-pink-500 dark:text-pink-400" />,
    shadowClass: 'shadow-pink-400/20',
    title: 'LIHTC & Development Stress-Tester',
    functionality: 'AI-driven sensitivity engine for complex tax credit and development models.',
    impact: 'Rapidly iterate on development assumptions and stress-test assumptions against real-time market volatility.'
  },
  {
    icon: <Database className="w-6 h-6 text-bloom-primary dark:text-bloom-secondary" />,
    shadowClass: 'shadow-bloom-secondary/20',
    title: 'Argus-to-Excel Data Bridge',
    functionality: 'Automated mapping and data migration.',
    impact: 'Seamlessly bridge the gap between platforms and keep custom models synced with institutional-grade accuracy.'
  }
];

const targetAudiences = [
  {
    icon: <Building2 className="w-6 h-6" />,
    audience: 'Real Estate Developers',
    value: 'Iterate on complex development and LIHTC structures without the burden of manual data entry.'
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    audience: 'Acquisition Teams',
    value: 'Screen 10x more deals without increasing internal headcount, focusing only on high-probability opportunities.'
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    audience: 'Asset Managers',
    value: 'Maintain institutional-grade accuracy by automating the "grunt work" of lease entry and data verification.'
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    audience: 'Private Equity Firms',
    value: 'Scale back-office capabilities with the speed of an AI-powered engine combined with offshore efficiency.'
  }
];

export default OffshoreMindsAI;
