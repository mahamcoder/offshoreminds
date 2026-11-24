import React, { useState } from 'react';
import { generateSlug } from '../../utils/slug';
import { PAGE_TEMPLATES } from './templates';
import {
  FileText, Sparkles, Layers, Building2, Check,
  X, Image as ImageIcon, ArrowRight, Upload, Calendar, Phone, Award
} from 'lucide-react';

const STARTER_TEMPLATES = [
  {
    id: 'blank-page',
    category: 'Clean Slate',
    name: 'Blank Page',
    description: 'Completely clean canvas. Add your own headings, text, buttons, and sections freely.',
    icon: FileText
  },
  {
    id: 'real-estate-lead-gen',
    category: 'Lead Capture',
    name: 'Real Estate Underwriting Lead Gen',
    description: 'High-converting landing page with consultation form, business pain points, and service highlights.',
    icon: Sparkles
  },
  {
    id: 'services-solutions',
    category: 'Service Overview',
    name: 'Services & Solutions Page',
    description: 'Structured presentation with Top Banner, 3-card capability grid, 4-step process roadmap, and booking.',
    icon: Layers
  },
  {
    id: 'financial-advisory',
    category: 'Company & Team',
    name: 'Financial Advisory & About Page',
    description: 'Overview page featuring an introductory story, core views, feature list, and connect callout.',
    icon: Building2
  },
  {
    id: 'case-study-showcase',
    category: 'Showcase',
    name: 'Case Study & Project Showcase',
    description: 'Visual media showcase featuring an introductory heading, photo gallery grid, and client results.',
    icon: Award
  },
  {
    id: 'events-webinar',
    category: 'Events & RSVP',
    name: 'Events & Webinar Page',
    description: 'Event landing page with headline, agenda schedule, speaker information, and direct RSVP.',
    icon: Calendar
  },
  {
    id: 'contact-consultation',
    category: 'Contact & Booking',
    name: 'Contact & Consultation Page',
    description: 'Dedicated inquiry page featuring contact details, interactive Calendly scheduling, and FAQ accordion.',
    icon: Phone
  }
];

const CreatePageModal = ({ isOpen, onClose, onCreate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('services-solutions');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [includeBanner, setIncludeBanner] = useState(true);
  const [eyebrow, setEyebrow] = useState('Strategic Financial Leadership');
  const [description, setDescription] = useState('Comprehensive institutional underwriting and portfolio management tailored to your investment thesis.');
  const [bgImage, setBgImage] = useState('');
  const [primaryBtnLabel, setPrimaryBtnLabel] = useState('Schedule Consultation');
  const [primaryBtnUrl, setPrimaryBtnUrl] = useState('/contact');
  const [secondaryBtnLabel, setSecondaryBtnLabel] = useState('Explore Solutions');
  const [secondaryBtnUrl, setSecondaryBtnUrl] = useState('/services');

  if (!isOpen) return null;

  const handleTitleChange = (val) => {
    setTitle(val);
    setSlug(generateSlug(val));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a Page Title.');
      return;
    }

    const initialBlocks = [];

    // Optional top hero header banner
    if (includeBanner) {
      initialBlocks.push({
        id: `block-${Date.now()}-hero`,
        type: 'hero',
        name: 'Top Banner (Hero)',
        collapsed: false,
        data: {
          badgeText: eyebrow,
          badgeIcon: 'Sparkles',
          title: title,
          subtitle: description,
          primaryBtnText: primaryBtnLabel,
          primaryBtnUrl: primaryBtnUrl,
          secondaryBtnText: secondaryBtnLabel,
          secondaryBtnUrl: secondaryBtnUrl,
          bgImageUrl: bgImage,
          alignment: 'center',
          style: 'glow',
          showStats: true,
          stats: [
            { label: 'Asset Underwriting', value: '$15B+' },
            { label: 'Turnaround Time', value: '<24 Hours' },
            { label: 'Accuracy Rating', value: '99.8%' }
          ]
        }
      });
    }

    // Append template sections if not blank
    if (selectedTemplate === 'services-solutions') {
      const tmpl = PAGE_TEMPLATES.find(t => t.id === 'service-landing');
      if (tmpl) {
        const extraBlocks = tmpl.blocksFactory().filter(b => b.type !== 'hero');
        initialBlocks.push(...extraBlocks);
      }
    } else if (selectedTemplate === 'real-estate-lead-gen') {
      const tmpl = PAGE_TEMPLATES.find(t => t.id === 'service-landing');
      if (tmpl) {
        initialBlocks.push(...tmpl.blocksFactory().filter(b => b.type !== 'hero'));
      }
      initialBlocks.push({
        id: `block-${Date.now()}-contact`,
        type: 'contactForm',
        name: 'Form / Contact Card',
        collapsed: false,
        data: {
          badgeText: 'Direct Deal Desk',
          title: 'Request a Portfolio Review',
          subtitle: 'Our underwriting partners will review your files and connect within 2 business hours.',
          submitBtnText: 'Submit Inquiry'
        }
      });
    } else if (selectedTemplate === 'contact-consultation') {
      initialBlocks.push(
        {
          id: `block-${Date.now()}-calendly`,
          type: 'calendly',
          name: 'Calendly Scheduler',
          collapsed: false,
          data: {
            title: 'Schedule a 30-Minute Strategy Session',
            subtitle: 'Direct calendar access with senior real estate finance partners.',
            calendlyUrl: 'https://calendly.com/gyan-offshoreminds/30min'
          }
        },
        {
          id: `block-${Date.now()}-faq`,
          type: 'faq',
          name: 'FAQ Accordion',
          collapsed: false,
          data: {
            badgeText: 'Common Questions',
            title: 'Consultation & Partnership FAQs',
            subtitle: 'Everything you need to know about partnering with Offshore Minds.',
            items: [
              { question: 'What is the format of the 30-minute consultation?', answer: 'We review your deal flow, current analyst pain points, and assess how a dedicated pod can optimize your underwriting.' },
              { question: 'Is there any commitment required?', answer: 'None at all. The discovery call is completely exploratory.' }
            ]
          }
        }
      );
    } else if (selectedTemplate === 'case-study-showcase') {
      initialBlocks.push(
        {
          id: `block-${Date.now()}-gallery`,
          type: 'photoGallery',
          name: 'Photo Gallery Grid',
          collapsed: false,
          data: {
            badgeText: 'Verified Transactions',
            title: 'Real Estate Portfolios Evaluated',
            subtitle: 'Institutional multifamily, industrial, and mixed-use acquisitions.',
            images: [
              { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', caption: 'Manhattan Commercial Tower' },
              { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop', caption: 'Austin Multifamily Portfolio' },
              { url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop', caption: 'Logistics Center - Chicago' },
              { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', caption: 'Offshore Deal Pods' }
            ]
          }
        },
        {
          id: `block-${Date.now()}-testimonial`,
          type: 'testimonial',
          name: 'Testimonials',
          collapsed: false,
          data: {
            quote: 'Offshore Minds has fundamentally transformed how quickly our acquisitions team can underwrite incoming offerings.',
            authorName: 'David Sterling',
            authorRole: 'Managing Director, Acquisitions',
            company: 'Institutional Real Estate Partners',
            rating: 5,
            verifiedDeal: '$450M Portfolio Underwritten'
          }
        }
      );
    }

    onCreate({
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      status: 'published',
      category: 'Services',
      includeInNav: false,
      seoTitle: title.trim(),
      seoDescription: description.trim(),
      seoKeywords: ['real estate underwriting', 'financial analysis', 'offshore minds'],
      blocks: initialBlocks
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-bloom-dark border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/10 flex items-start justify-between bg-slate-50/50 dark:bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bloom-primary mb-1">
              <span>Page Builder Setup</span>
              <span>•</span>
              <span className="text-slate-400">Offshore Minds Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Create New CMS Page
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 mt-1">
              Select a starter layout template or start from scratch, then customize in the visual studio editor.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleCreateSubmit} className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* 1. Starter Layout Templates Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-3">
              Choose a Starter Layout Template
            </label>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {STARTER_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate === tmpl.id;
                const IconComponent = tmpl.icon;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-bloom-primary bg-bloom-primary/5 dark:bg-bloom-primary/10 shadow-lg shadow-bloom-primary/10'
                        : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-bloom-primary">
                          {tmpl.category}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-bloom-primary text-white flex items-center justify-center">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                        <IconComponent size={15} className="text-bloom-primary shrink-0" />
                        <span>{tmpl.name}</span>
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                        {tmpl.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Page Title & URL Slug */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5">
                Page Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Commercial Real Estate Underwriting Services"
                className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-bloom-primary"
              />
              <p className="text-[11px] text-slate-400 mt-1">Used as the main page name and public page title.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5">
                URL Slug <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden px-4">
                <span className="text-xs font-mono text-slate-400 dark:text-gray-500 select-none">
                  offshoreminds.com/p/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="commercial-underwriting"
                  className="w-full bg-transparent py-3 px-1 text-sm text-bloom-primary font-mono font-bold focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Only lowercase letters, numbers, and hyphens.</p>
            </div>
          </div>

          {/* 3. Include Top Header / Image Banner (from Image 2) */}
          <div className="p-5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Include Top Header / Image Banner (Optional)
                </span>
                <span className="text-xs text-slate-500 dark:text-gray-400">
                  Adds a branded header banner at the top of your page.
                </span>
              </div>
              <input
                type="checkbox"
                checked={includeBanner}
                onChange={(e) => setIncludeBanner(e.target.checked)}
                className="w-5 h-5 rounded accent-bloom-primary cursor-pointer"
              />
            </div>

            {includeBanner && (
              <div className="space-y-4 pt-3 border-t border-slate-200 dark:border-white/10 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-gray-400 mb-1">Hero Eyebrow Badge</label>
                  <input
                    type="text"
                    value={eyebrow}
                    onChange={(e) => setEyebrow(e.target.value)}
                    placeholder="e.g. Strategic Financial Leadership"
                    className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 dark:text-gray-400 mb-1">Hero Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief summary for the hero section..."
                    className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 dark:text-gray-400 mb-1">Hero Background Image (Optional)</label>
                  <input
                    type="text"
                    value={bgImage}
                    onChange={(e) => setBgImage(e.target.value)}
                    placeholder="https://... (defaults to glow wallpaper)"
                    className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2 bg-white dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/10">
                    <span className="font-bold text-slate-700 dark:text-gray-300 block">Primary CTA Button</span>
                    <input
                      type="text"
                      value={primaryBtnLabel}
                      onChange={(e) => setPrimaryBtnLabel(e.target.value)}
                      placeholder="Button Label"
                      className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1.5"
                    />
                    <input
                      type="text"
                      value={primaryBtnUrl}
                      onChange={(e) => setPrimaryBtnUrl(e.target.value)}
                      placeholder="Destination URL (/contact)"
                      className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1.5"
                    />
                  </div>

                  <div className="space-y-2 bg-white dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/10">
                    <span className="font-bold text-slate-700 dark:text-gray-300 block">Secondary CTA Button</span>
                    <input
                      type="text"
                      value={secondaryBtnLabel}
                      onChange={(e) => setSecondaryBtnLabel(e.target.value)}
                      placeholder="Button Label"
                      className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1.5"
                    />
                    <input
                      type="text"
                      value={secondaryBtnUrl}
                      onChange={(e) => setSecondaryBtnUrl(e.target.value)}
                      placeholder="Destination URL (/services)"
                      className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1.5"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-xs font-bold text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-bloom-primary to-bloom-blue hover:shadow-xl hover:shadow-bloom-primary/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Create & Open In Editor</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePageModal;
