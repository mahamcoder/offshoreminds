export const BLOCK_DEFINITIONS = [
  // ───────────────────────────────────────────────────────────────────────────
  // BASICS
  // ───────────────────────────────────────────────────────────────────────────
  {
    type: 'heading',
    name: 'Heading',
    category: 'BASICS',
    description: 'Custom headline with selectable size and alignment.',
    icon: 'FileText',
    defaultData: {
      text: 'Section Headline',
      level: 'h2', // h1 | h2 | h3 | h4
      alignment: 'center', // left | center | right
      subtitle: ''
    }
  },
  {
    type: 'text',
    name: 'Text Paragraph',
    category: 'BASICS',
    description: 'Rich paragraph block for narratives, intros, or summaries.',
    icon: 'FileText',
    defaultData: {
      content: 'Offshore Minds delivers Fortune-grade real estate financial analysis, underwriting, and lease administration to institutional investors globally.',
      alignment: 'left',
      size: 'normal' // small | normal | large
    }
  },
  {
    type: 'bulletList',
    name: 'Bullet / Checklist',
    category: 'BASICS',
    description: 'Highlighted checkmark list for features, requirements, or deliverables.',
    icon: 'CheckCircle',
    defaultData: {
      title: 'Key Deliverables Included:',
      items: [
        'Dynamic Excel DCF models with debt sizing and waterfall promotes',
        'Standardized rent roll abstraction and lease term verification',
        'Executive investment committee presentation decks and offering memos',
        'Real-time sensitivity matrices across cap rates and exit multiples'
      ]
    }
  },
  {
    type: 'image',
    name: 'Image Showcase',
    category: 'BASICS',
    description: 'Standalone image with customizable caption and rounded corners.',
    icon: 'Layers',
    defaultData: {
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      alt: 'Real Estate Analysis',
      caption: 'Institutional real estate portfolio modeling and financial operations.',
      alignment: 'center'
    }
  },
  {
    type: 'button',
    name: 'Button CTA',
    category: 'BASICS',
    description: 'Standalone call-to-action button with destination URL.',
    icon: 'ArrowRight',
    defaultData: {
      label: 'Schedule a Consultation',
      url: '/contact',
      variant: 'primary', // primary | outline | ghost
      alignment: 'center'
    }
  },
  {
    type: 'divider',
    name: 'Thin Line / Divider',
    category: 'BASICS',
    description: 'Subtle horizontal separation line between content sections.',
    icon: 'Minus',
    defaultData: {
      style: 'solid', // solid | dashed
      spacing: 'medium' // small | medium | large
    }
  },
  {
    type: 'spacer',
    name: 'Spacer / Gap',
    category: 'BASICS',
    description: 'Adjustable vertical spacing between blocks.',
    icon: 'ArrowRight',
    defaultData: {
      height: 48 // px
    }
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTIONS
  // ───────────────────────────────────────────────────────────────────────────
  {
    type: 'hero',
    name: 'Top Banner (Hero)',
    category: 'SECTIONS',
    description: 'Prominent top header with badge, headline, description, and action buttons.',
    icon: 'Sparkles',
    defaultData: {
      badgeText: 'Strategic Intelligence',
      badgeIcon: 'Sparkles',
      title: 'Accelerate Your Real Estate Intelligence',
      subtitle: 'Unlock institutional-grade underwriting, automated data extraction, and dedicated analysts at scale.',
      primaryBtnText: 'Get Started',
      primaryBtnUrl: '/contact',
      secondaryBtnText: 'Explore Solutions',
      secondaryBtnUrl: '#features',
      alignment: 'center',
      style: 'glow',
      bgImageUrl: '',
      showStats: true,
      stats: [
        { label: 'Asset Underwriting', value: '$15B+' },
        { label: 'Turnaround Time', value: '<24 Hours' },
        { label: 'Accuracy Rating', value: '99.8%' }
      ]
    }
  },
  {
    type: 'featureGrid',
    name: 'Cards Grid',
    category: 'SECTIONS',
    description: 'Multi-column cards grid showcasing capabilities, tools, or service tiers.',
    icon: 'Layers',
    defaultData: {
      badgeText: 'Core Capabilities',
      title: 'End-to-End Specialized Solutions',
      subtitle: 'Engineered specifically for private equity sponsors, lenders, brokers, and asset managers.',
      columns: 3,
      cardStyle: 'glass',
      items: [
        {
          id: 'feat-1',
          icon: 'TrendingUp',
          badge: 'High Impact',
          title: 'Financial Modeling & Valuation',
          description: 'Bespoke DCF models, waterfall equity distribution, sensitivity analysis, and debt sizing.',
          linkText: 'Learn More',
          linkUrl: '/contact'
        },
        {
          id: 'feat-2',
          icon: 'Cpu',
          badge: 'Automated',
          title: 'AI Data Extraction & Scrubbing',
          description: 'Instant conversion of rent rolls, operating statements, and T-12s into clean standard formats.',
          linkText: 'Learn More',
          linkUrl: '/contact'
        },
        {
          id: 'feat-3',
          icon: 'Shield',
          badge: 'Secure',
          title: 'Due Diligence & Audit Support',
          description: 'Comprehensive lease abstraction, loan covenant verification, and estoppel audits.',
          linkText: 'Learn More',
          linkUrl: '/contact'
        }
      ]
    }
  },
  {
    type: 'photoGallery',
    name: 'Photo Gallery Grid',
    category: 'SECTIONS',
    description: 'Grid of portfolio photos, asset pictures, or facility snapshots.',
    icon: 'Layers',
    defaultData: {
      badgeText: 'Visual Showcase',
      title: 'Asset Portfolios Evaluated',
      subtitle: 'Commercial properties, multifamily communities, and industrial logistics facilities analyzed.',
      images: [
        { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', caption: 'Commercial Towers - Manhattan, NY' },
        { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop', caption: 'Multifamily Portfolio - Austin, TX' },
        { url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop', caption: 'Logistics Center - Chicago, IL' },
        { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', caption: 'Headquarters Deal Pods - Global Hub' }
      ]
    }
  },
  {
    type: 'faq',
    name: 'FAQ Accordion',
    category: 'SECTIONS',
    description: 'Interactive collapsible accordion addressing common customer inquiries.',
    icon: 'HelpCircle',
    defaultData: {
      badgeText: 'Frequently Asked Questions',
      title: 'Everything You Need to Know',
      subtitle: 'Transparent answers regarding onboarding speed, security, and analyst qualifications.',
      items: [
        {
          id: 'faq-1',
          question: 'How quickly can our dedicated analyst pod start?',
          answer: 'Client deal pods are matched, calibrated, and operational within 48 to 72 hours following initial template review.'
        },
        {
          id: 'faq-2',
          question: 'How do you safeguard proprietary deal and financial data?',
          answer: 'We employ bank-grade security protocols: strict bilateral NDAs, encrypted virtual environments, and continuous compliance checks.'
        },
        {
          id: 'faq-3',
          question: 'Can your team work directly inside our proprietary Excel models?',
          answer: 'Yes, 100%. Our analysts master custom Excel templates, Argus Enterprise, Yardi, RealPage, and bespoke waterfall frameworks.'
        }
      ]
    }
  },
  {
    type: 'cta',
    name: 'Call to Action',
    category: 'SECTIONS',
    description: 'High-converting banner with glowing gradients and direct meeting booking links.',
    icon: 'Rocket',
    defaultData: {
      badgeText: 'Ready to Expand?',
      title: 'Supercharge Your Real Estate Capabilities Today',
      description: 'Schedule a 30-minute discovery call to review your pipeline and explore custom analyst deployment.',
      primaryBtnText: 'Book a 30-Min Strategy Call',
      primaryBtnUrl: 'https://calendly.com/gyan-offshoreminds/30min',
      secondaryBtnText: 'Contact Deal Desk',
      secondaryBtnUrl: '/contact',
      style: 'gradient'
    }
  },
  {
    type: 'partners',
    name: 'Partner Logos Strip',
    category: 'SECTIONS',
    description: 'Institutional client and partner trust badges strip.',
    icon: 'Building2',
    defaultData: {
      title: 'Trusted by Institutional Leaders Worldwide',
      logos: [
        { name: 'Brookfield', label: 'Brookfield' },
        { name: 'JLL', label: 'JLL' },
        { name: 'CBRE', label: 'CBRE' },
        { name: 'Berkadia', label: 'Berkadia' },
        { name: 'Greysteel', label: 'Greysteel' }
      ]
    }
  },
  {
    type: 'stats',
    name: 'Stats / Metrics',
    category: 'SECTIONS',
    description: 'Highlight key statistics, deal volumes, and precision ratings in bold counters.',
    icon: 'BarChart2',
    defaultData: {
      badgeText: 'Track Record',
      title: 'Measurable Impact, Delivered Globally',
      subtitle: 'Our numbers speak for our precision, scalability, and long-term client trust.',
      items: [
        { id: 'stat-1', value: '15k+', label: 'Deals Analyzed', subtext: 'Multifamily, Retail, Industrial', icon: 'BarChart2' },
        { id: 'stat-2', value: '70%', label: 'Cost Optimization', subtext: 'Compared to local in-house hiring', icon: 'DollarSign' },
        { id: 'stat-3', value: '24h', label: 'Fast Turnaround', subtext: 'Overnight execution advantage', icon: 'Clock' },
        { id: 'stat-4', value: '99.8%', label: 'Quality Precision', subtext: 'Multi-tier verification checklist', icon: 'Award' }
      ]
    }
  },
  {
    type: 'benefits',
    name: 'Feature / Benefit List',
    category: 'SECTIONS',
    description: 'Domain specialization cards with bullet points and checkmarks.',
    icon: 'Award',
    defaultData: {
      badgeText: 'Why Offshore Minds',
      title: 'The Advantage of Elite Domain Specialization',
      subtitle: 'We are credentialed real estate financial specialists, not generalist virtual assistants.',
      items: [
        {
          id: 'ben-1',
          icon: 'CheckCircle',
          title: 'Institutional Grade Rigor',
          description: 'Every deliverable undergoes strict QA by senior review principals before reaching your desk.',
          points: ['Multi-tier formula audit', 'Underwriting sanity checks', 'Variance reconciliations']
        },
        {
          id: 'ben-2',
          icon: 'Zap',
          title: 'Overnight Speed Advantage',
          description: 'Leverage our global time-zone differential to turn around complex models while you sleep.',
          points: ['Same-day rush analysis', 'Weekend coverage available', 'Real-time sprint updates']
        },
        {
          id: 'ben-3',
          icon: 'Users',
          title: 'Plug-and-Play Scalability',
          description: 'Scale up during deal surges and scale down during market pauses without recruitment overhead.',
          points: ['Flexible monthly retainer', 'Dedicated analyst pods', 'Pre-screened elite talent']
        }
      ]
    }
  },
  {
    type: 'processSteps',
    name: 'Process Steps',
    category: 'SECTIONS',
    description: 'Step-by-step engagement roadmap showing onboarding and delivery milestones.',
    icon: 'Target',
    defaultData: {
      badgeText: 'Engagement Roadmap',
      title: 'From Discovery to Full Deployment in 3 Days',
      subtitle: 'A straightforward, hassle-free onboarding procedure built for busy executives.',
      steps: [
        { stepNumber: '01', title: 'Discovery & Workflow Alignment', description: 'We review your deal pipeline, financial templates, and operational preferences.', icon: 'Search', duration: 'Day 1' },
        { stepNumber: '02', title: 'Analyst Matching & Calibration', description: 'We assign dedicated certified analysts calibrated specifically to your asset class.', icon: 'Users', duration: 'Day 2' },
        { stepNumber: '03', title: 'Pilot Task & Model Benchmark', description: 'Complete a live pilot model together to establish baseline formatting and speed.', icon: 'Cpu', duration: 'Day 3' },
        { stepNumber: '04', title: 'Full Continuous Execution', description: 'Your offshore deal pod operates seamlessly with daily standups and sprint reviews.', icon: 'Rocket', duration: 'Ongoing' }
      ]
    }
  },
  {
    type: 'testimonial',
    name: 'Testimonials',
    category: 'SECTIONS',
    description: 'Executive client review quote card with avatar, rating stars, and verified deal badge.',
    icon: 'MessageSquare',
    defaultData: {
      quote: 'Offshore Minds has fundamentally transformed how quickly our acquisitions team can underwrite incoming offerings. What used to take our analysts two days is now waiting in our inbox when we arrive in the morning.',
      authorName: 'David Sterling',
      authorRole: 'Managing Director, Acquisitions',
      company: 'Institutional Real Estate Partners',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      rating: 5,
      verifiedDeal: '$450M Portfolio Underwritten'
    }
  },
  {
    type: 'contactForm',
    name: 'Form / Contact Card',
    category: 'SECTIONS',
    description: 'Interactive consultation request form directly embedded on the page.',
    icon: 'Phone',
    defaultData: {
      badgeText: 'Direct Inquiry',
      title: 'Schedule a Consultation with our Deal Desk',
      subtitle: 'Tell us about your portfolio volume and our principals will get back within 2 business hours.',
      submitBtnText: 'Submit Inquiry',
      phoneText: '+1 (800) 555-0199',
      emailText: 'info@offshoreminds.com'
    }
  },
  {
    type: 'quote',
    name: 'Callout Quote',
    category: 'SECTIONS',
    description: 'Prominent, minimalist callout statement for mission statements or slogans.',
    icon: 'MessageSquare',
    defaultData: {
      quote: 'Precision is not an accident. In commercial real estate valuation, precision is the difference between winning a transaction and missing the market.',
      author: 'Offshore Minds Executive Committee'
    }
  },

  // ───────────────────────────────────────────────────────────────────────────
  // ADVANCED
  // ───────────────────────────────────────────────────────────────────────────
  {
    type: 'contentMedia',
    name: '2-Column Split (Media + Text)',
    category: 'ADVANCED',
    description: 'Side-by-side section featuring detailed storytelling, bullet checklists, and an image or video.',
    icon: 'FileText',
    defaultData: {
      badgeText: 'How It Operates',
      title: 'Seamless Extension of Your In-House Deal Team',
      text: 'We embed senior analysts directly into your workflows. Using your firm\'s proprietary templates or industry standards, our analysts work overnight so your models are ready before the market opens.',
      bullets: [
        'Dedicated senior analysts trained in US, UK & European real estate markets',
        'Direct Slack, Teams, and email communication seamlessly embedded',
        'Strict SOC-compliant data security, NDA protection, and encrypted vaults',
        'Zero setup friction — scalable from 1 analyst to full deal pods'
      ],
      layout: 'image-right',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      mediaCaption: 'Fortune-grade financial modeling and institutional underwriting in action.',
      btnText: 'Schedule Technical Discussion',
      btnUrl: '/contact'
    }
  },
  {
    type: 'comparison',
    name: 'Comparison Matrix',
    category: 'ADVANCED',
    description: 'Side-by-side comparison matrix showing traditional hiring hurdles vs Offshore Minds advantages.',
    icon: 'Shield',
    defaultData: {
      badgeText: 'Strategic Comparison',
      title: 'Why Top Funds Choose Offshore Minds',
      subtitle: 'Compare the total cost, ramp time, and reliability between traditional hiring and our managed model.',
      leftTitle: 'Traditional In-House Hiring',
      leftSubtitle: 'Slow, expensive, high turnover',
      leftItems: [
        '$120,000+ base salary plus benefits per analyst',
        '3 to 6 months recruitment and onboarding lag',
        'High turnover risk disrupting active deal flow',
        'Limited to standard 9-5 working hours',
        'Fixed overhead during slow deal pipelines'
      ],
      rightTitle: 'With Offshore Minds',
      rightSubtitle: 'Agile, certified, cost-effective',
      rightItems: [
        'Up to 70% reduction in total operational cost',
        'Immediate onboarding — productive on day one',
        'Permanent bench backup ensures zero downtime',
        'Overnight timezone advantage delivers faster',
        'Elastic team size scales up/down on demand'
      ]
    }
  },
  {
    type: 'videoPlayer',
    name: 'Video Showcase',
    category: 'ADVANCED',
    description: 'Full-width cinematic video showcase player with play button overlay.',
    icon: 'Play',
    defaultData: {
      badgeText: 'Watch Video Presentation',
      title: 'Inside Our Real Estate Underwriting Pods',
      subtitle: 'See how our financial modelers construct institutional waterfall models in real-time.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'
    }
  },
  {
    type: 'calendly',
    name: 'Calendly Scheduler',
    category: 'ADVANCED',
    description: 'Embedded 30-minute consultation booking calendar for direct client scheduling.',
    icon: 'Clock',
    defaultData: {
      title: 'Schedule a 30-Minute Strategy Session',
      subtitle: 'Select an available time directly on our partners\' calendar.',
      calendlyUrl: 'https://calendly.com/gyan-offshoreminds/30min'
    }
  },
  {
    type: 'notice',
    name: 'Notice / Announcement Banner',
    category: 'ADVANCED',
    description: 'Prominent notification ribbon for announcements, special offers, or alerts.',
    icon: 'Sparkles',
    defaultData: {
      badge: 'Announcement',
      message: 'Now expanding dedicated underwriting pods for European and UK logistics portfolios.',
      btnText: 'Learn More',
      btnUrl: '/contact',
      variant: 'purple' // purple | blue | emerald
    }
  },
  {
    type: 'embed',
    name: 'Custom Embed / Code',
    category: 'ADVANCED',
    description: 'Raw HTML / iFrame / Widget container for custom third-party integrations.',
    icon: 'Code',
    defaultData: {
      title: 'Custom Widget Container',
      subtitle: '',
      htmlCode: '<div style="padding: 40px; text-align: center; border: 2px dashed rgba(255,255,255,0.2); border-radius: 1rem;"><p style="font-weight: bold; margin-bottom: 8px;">Interactive Widget Area</p><p style="color: #94a3b8; font-size: 14px;">Paste iframe, embed script, or custom HTML here.</p></div>'
    }
  }
];

export const getBlockDefinition = (type) => {
  return BLOCK_DEFINITIONS.find((b) => b.type === type) || BLOCK_DEFINITIONS[0];
};

export const createDefaultBlock = (type) => {
  const def = getBlockDefinition(type);
  return {
    id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    type: def.type,
    name: def.name,
    collapsed: false,
    data: JSON.parse(JSON.stringify(def.defaultData))
  };
};
