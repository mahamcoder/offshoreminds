export const BLOCK_DEFINITIONS = [
  {
    type: 'hero',
    name: 'Hero Header',
    category: 'Headers',
    description: 'Prominent top section with heading, badge, description, and action buttons.',
    icon: 'Sparkles',
    defaultData: {
      badgeText: 'New Capability',
      badgeIcon: 'Sparkles',
      title: 'Accelerate Your Real Estate Intelligence',
      subtitle: 'Unlock institutional-grade underwriting, automated data extraction, and dedicated analysts at scale.',
      primaryBtnText: 'Get Started',
      primaryBtnUrl: '/contact',
      secondaryBtnText: 'Explore Solutions',
      secondaryBtnUrl: '#features',
      alignment: 'center', // center | left
      style: 'glow', // glow | gradient | minimal | media
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
    name: 'Feature & Service Cards',
    category: 'Content',
    description: 'Multi-column grid showcasing service capabilities, tools, or benefits with icons.',
    icon: 'Layers',
    defaultData: {
      badgeText: 'Core Capabilities',
      title: 'End-to-End Specialized Solutions',
      subtitle: 'Engineered specifically for private equity sponsors, lenders, brokers, and asset managers.',
      columns: 3, // 2 | 3 | 4
      cardStyle: 'glass', // glass | bordered | glow
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
    type: 'stats',
    name: 'Metrics & Stats Counter',
    category: 'Social Proof',
    description: 'Highlight key statistics, achievements, volumes, and metrics in high-impact counters.',
    icon: 'BarChart2',
    defaultData: {
      badgeText: 'Track Record',
      title: 'Measurable Impact, Delivered Globally',
      subtitle: 'Our numbers speak for our precision, scalability, and long-term client trust.',
      items: [
        { id: 'stat-1', value: '15k+', label: 'Deals Analyzed', subtext: 'Multifamily, Retail, Office, Industrial', icon: 'BarChart2' },
        { id: 'stat-2', value: '70%', label: 'Cost Optimization', subtext: 'Compared to local in-house hiring', icon: 'DollarSign' },
        { id: 'stat-3', value: '24h', label: 'Fast Turnaround', subtext: 'Sprint deliveries across time zones', icon: 'Clock' },
        { id: 'stat-4', value: '99.8%', label: 'Quality Precision', subtext: 'Multi-tier verification checklist', icon: 'Award' }
      ]
    }
  },
  {
    type: 'contentMedia',
    name: 'Rich Text & Media Split',
    category: 'Content',
    description: 'Side-by-side section featuring detailed storytelling, bullet checklists, and an image or video.',
    icon: 'FileText',
    defaultData: {
      badgeText: 'How It Operates',
      title: 'Seamless Extension of Your In-House Deal Team',
      text: 'We embed senior analysts directly into your workflows. Using your firm\'s proprietary templates or industry best-practice standards, our analysts work overnight so your models are ready before the market opens.',
      bullets: [
        'Dedicated senior analysts trained in US, UK & European real estate markets',
        'Direct Slack, Teams, and email communication seamlessly embedded',
        'Strict SOC-compliant data security, NDA protection, and encrypted vaults',
        'Zero setup friction — scalable from 1 analyst to full deal pods'
      ],
      layout: 'image-right', // image-right | image-left
      mediaType: 'image', // image | video
      mediaUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      mediaCaption: 'Fortune-grade financial modeling and institutional underwriting in action.',
      btnText: 'Schedule Technical Discussion',
      btnUrl: '/contact'
    }
  },
  {
    type: 'benefits',
    name: 'Key Advantages / Why Us',
    category: 'Content',
    description: 'Highlight competitive advantages with clean checkmarks and highlighted badges.',
    icon: 'Award',
    defaultData: {
      badgeText: 'Why Offshore Minds',
      title: 'The Advantage of Elite Domain Specialization',
      subtitle: 'We are not generalist virtual assistants — our teams are credentialed real estate financial specialists.',
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
    type: 'comparison',
    name: 'Comparison Matrix',
    category: 'Conversion',
    description: 'Side-by-side comparison showing traditional in-house hurdles vs Offshore Minds advantages.',
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
    type: 'processSteps',
    name: 'How It Works / Process',
    category: 'Content',
    description: 'Step-by-step roadmap demonstrating onboarding, collaboration, and delivery stages.',
    icon: 'Target',
    defaultData: {
      badgeText: 'Engagement Roadmap',
      title: 'From Discovery to Full Deployment in 3 Days',
      subtitle: 'A straightforward, hassle-free onboarding procedure built for busy executives.',
      steps: [
        {
          stepNumber: '01',
          title: 'Discovery & Workflow Alignment',
          description: 'We review your deal pipeline, financial templates, and operational preferences.',
          icon: 'Search',
          duration: 'Day 1'
        },
        {
          stepNumber: '02',
          title: 'Analyst Matching & Calibration',
          description: 'We assign dedicated certified analysts calibrated specifically to your asset class.',
          icon: 'Users',
          duration: 'Day 2'
        },
        {
          stepNumber: '03',
          title: 'Pilot Task & Model Benchmark',
          description: 'Complete a live pilot model together to establish baseline formatting and speed.',
          icon: 'Cpu',
          duration: 'Day 3'
        },
        {
          stepNumber: '04',
          title: 'Full Continuous Execution',
          description: 'Your offshore deal pod operates seamlessly with daily standups and sprint reviews.',
          icon: 'Rocket',
          duration: 'Ongoing'
        }
      ]
    }
  },
  {
    type: 'faq',
    name: 'Interactive FAQ Accordion',
    category: 'Content',
    description: 'Collapsible accordion answering frequent client questions with sleek animations.',
    icon: 'HelpCircle',
    defaultData: {
      badgeText: 'Frequently Asked Questions',
      title: 'Everything You Need to Know',
      subtitle: 'Clear answers to common questions regarding security, onboarding, and collaboration.',
      items: [
        {
          id: 'faq-1',
          question: 'How quickly can our dedicated analyst team start?',
          answer: 'Most client deal pods are onboarded and operational within 48 to 72 hours following the initial discovery call and template calibration.'
        },
        {
          id: 'faq-2',
          question: 'How do you safeguard proprietary deal and financial data?',
          answer: 'We employ enterprise-grade security protocols: strict non-disclosure agreements, encrypted cloud workspaces, role-based access permissions, and continuous compliance checks.'
        },
        {
          id: 'faq-3',
          question: 'Can your team work directly inside our proprietary Excel models?',
          answer: 'Yes, 100%. Our analysts are masters in custom real estate models, Argus Enterprise, Yardi, RealPage, MRI Software, and bespoke waterfall frameworks.'
        },
        {
          id: 'faq-4',
          question: 'What happens if deal volume temporarily slows down?',
          answer: 'Our contracts offer flexible engagement terms that allow you to adjust team hours or scale capacity up and down with reasonable notice.'
        }
      ]
    }
  },
  {
    type: 'testimonial',
    name: 'Client Testimonial & Quote',
    category: 'Social Proof',
    description: 'Prominent social proof quote card with executive author details, company, and star rating.',
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
    type: 'cta',
    name: 'Call to Action Banner',
    category: 'Conversion',
    description: 'High-converting banner with glowing gradients, compelling heading, and direct meeting links.',
    icon: 'Rocket',
    defaultData: {
      badgeText: 'Ready to Expand?',
      title: 'Supercharge Your Real Estate Capabilities Today',
      description: 'Schedule a 30-minute discovery call to review your pipeline and explore custom analyst deployment.',
      primaryBtnText: 'Book a 30-Min Strategy Call',
      primaryBtnUrl: 'https://calendly.com/gyan-offshoreminds/30min',
      secondaryBtnText: 'Contact Deal Desk',
      secondaryBtnUrl: '/contact',
      style: 'gradient' // gradient | mesh | minimal
    }
  },
  {
    type: 'embed',
    name: 'Embed Code / Widget',
    category: 'Advanced',
    description: 'Custom embed code for Calendly scheduling widgets, YouTube video players, or forms.',
    icon: 'Code',
    defaultData: {
      title: 'Interactive Schedule Embed',
      subtitle: 'Select an available time slot directly with our senior partners.',
      htmlCode: '<div style="padding: 40px; text-align: center; border: 2px dashed rgba(255,255,255,0.2); border-radius: 1rem;"><p style="font-weight: bold; margin-bottom: 8px;">Calendly / Custom Widget Embed Area</p><p style="color: #94a3b8; font-size: 14px;">Paste your iframe, Calendly embed script, or form HTML code here.</p></div>'
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
