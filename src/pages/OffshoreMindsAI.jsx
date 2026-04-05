import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Building2, FileText, TrendingUp, 
  Database, UserCheck, Briefcase, Landmark, ArrowRight, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
        // Clear status after 5 seconds
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
    <div className="min-h-screen bg-bloom-dark text-white pt-24 pb-20 overflow-hidden relative selection:bg-bloom-primary/30">
      
      {/* Space Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-bloom-dark"></div>
        
        {/* Stars */}
        <div className="absolute inset-0 z-0" style={{ 
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', 
          backgroundSize: '40px 40px', 
          opacity: 0.15 
        }}></div>

        {/* Central Eclipse/Planet glowing effect */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
          {/* Inner dark circle */}
          <div className="absolute inset-0 rounded-full bg-bloom-dark z-10 shadow-[inset_-20px_-20px_100px_rgba(30,20,50,0.5)]"></div>
          {/* Top bright rim */}
          <div className="absolute -top-4 left-[20%] right-[20%] h-32 bg-gradient-to-r from-bloom-primary via-purple-400 to-bloom-secondary rounded-full blur-[20px] opacity-80 z-0 mix-blend-screen"></div>
          {/* Outer diffuse glow */}
          <div className="absolute -inset-10 rounded-full bg-gradient-to-b from-bloom-primary/30 to-transparent blur-[50px] z-0"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-bloom-secondary/40 blur-[30px] rounded-full z-0 mix-blend-screen"></div>
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
            <p className="text-[#8b9bb4] tracking-[0.3em] text-xs font-semibold uppercase">
              Site Under Reconstruction.
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.5em] md:tracking-[0.8em] mb-16 ml-[0.3em] md:ml-[0.5em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            COMING SOON
          </motion.h1>
          
          {/* Sleek Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="w-full max-w-sm mx-auto mb-4"
          >
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
              <div className="h-full w-[62%] bg-gradient-to-r from-bloom-primary to-bloom-secondary rounded-full shadow-[0_0_10px_rgba(200,100,255,0.5)]"></div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-[#8b9bb4] text-xs font-semibold tracking-widest"
          >
            62%
          </motion.p>
          
        </section>

        {/* AI SUITE SECTION */}
        <section className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our AI Suite</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
                 className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-bloom-primary/0 via-transparent to-bloom-secondary/0 group-hover:from-bloom-primary/10 group-hover:to-bloom-secondary/10 transition-all duration-500"></div>
                 <div className="relative bg-bloom-dark/80 backdrop-blur-sm h-full rounded-2xl p-8 border border-white/5 flex flex-col items-start gap-4 hover:bg-white/[0.02] transition-colors duration-300">
                    <div className={`p-4 rounded-xl bg-white/5 text-white shadow-lg ${tool.shadowClass}`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mt-2">{tool.title}</h3>
                    
                    <div className="space-y-4 mt-2 w-full pt-4 border-t border-white/5">
                      <div>
                        <span className="text-xs font-bold text-bloom-primary uppercase tracking-wider mb-1 block">Functionality</span>
                        <p className="text-sm text-gray-300 leading-relaxed">{tool.functionality}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-bloom-secondary uppercase tracking-wider mb-1 block">Impact</span>
                        <p className="text-sm text-gray-300 leading-relaxed">{tool.impact}</p>
                      </div>
                    </div>
                 </div>
               </motion.div>
            ))}
          </div>
        </section>

        {/* WHO WE SERVE SECTION */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Who We Serve</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our specialized AI tools are custom-built for high-performance real estate teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {targetAudiences.map((audience, index) => (
              <motion.div
                 key={index}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors flex gap-5 items-start"
              >
                <div className="p-3 bg-bloom-dark rounded-xl border border-white/10 shrink-0 text-white shadow-lg">
                  {audience.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{audience.audience}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{audience.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section id="waitlist" className="max-w-4xl mx-auto pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden p-[1px] group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-bloom-primary via-purple-500 to-bloom-secondary opacity-70 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative bg-bloom-dark px-6 py-16 md:p-20 rounded-3xl flex flex-col items-center text-center">
              
              <div className="mb-8 p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 inline-block">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Join the Private Beta
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                We are currently in private development. Be among the first to test our AI Deal Screener and gain early access to the suite.
              </p>

              <form onSubmit={handleJoinWaitlist} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bloom-primary focus:border-transparent transition-all"
                />
                <button 
                  type="submit"
                  className="bg-white text-bloom-dark font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  Join Waitlist
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
              {result && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-sm font-medium ${result.includes("Error") || result.includes("wrong") ? "text-red-400" : "text-bloom-secondary"}`}
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
    icon: <FileText className="w-6 h-6 text-purple-400" />,
    shadowClass: 'shadow-purple-400/20',
    title: 'Automated Lease & Rent Roll Abstractor',
    functionality: 'Upload PDF rent rolls and complex leases.',
    impact: 'Receive clean, structured data ready for seamless integration into Excel or Argus models.'
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
    shadowClass: 'shadow-pink-400/20',
    title: 'LIHTC & Development Stress-Tester',
    functionality: 'AI-driven sensitivity engine for complex tax credit and development models.',
    impact: 'Rapidly iterate on development assumptions and stress-test assumptions against real-time market volatility.'
  },
  {
    icon: <Database className="w-6 h-6 text-bloom-secondary" />,
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
