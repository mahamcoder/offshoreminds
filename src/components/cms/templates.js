import { createDefaultBlock } from './blockTypes';

export const PAGE_TEMPLATES = [
  {
    id: 'service-landing',
    name: 'New Service Page',
    description: 'Complete high-converting service landing page with Hero, Feature Cards, Metrics, How It Works, FAQ, and CTA.',
    badge: 'Recommended',
    category: 'Services',
    blocksFactory: () => [
      {
        ...createDefaultBlock('hero'),
        data: {
          badgeText: 'Specialized Service Offering',
          badgeIcon: 'Sparkles',
          title: 'Institutional-Grade Commercial Underwriting',
          subtitle: 'Empower your acquisitions and asset management teams with certified offshore financial analysts and automated data extraction.',
          primaryBtnText: 'Schedule Consultation',
          primaryBtnUrl: 'https://calendly.com/gyan-offshoreminds/30min',
          secondaryBtnText: 'View Capabilities',
          secondaryBtnUrl: '#capabilities',
          alignment: 'center',
          style: 'glow',
          showStats: true,
          stats: [
            { label: 'Asset Underwriting', value: '$15B+' },
            { label: 'Turnaround Speed', value: '<24 Hours' },
            { label: 'Accuracy Rating', value: '99.8%' }
          ]
        }
      },
      {
        ...createDefaultBlock('stats'),
        data: {
          badgeText: 'Proven Performance',
          title: 'The Numbers That Power Private Equity Confidence',
          subtitle: 'Unmatched volume, accuracy, and operational efficiency across premier asset classes.',
          items: [
            { id: 'stat-1', value: '15,000+', label: 'Deals Evaluated', subtext: 'Multifamily, Retail, Office, Industrial', icon: 'BarChart2' },
            { id: 'stat-2', value: '70%', label: 'Cost Reduction', subtext: 'Compared to local in-house hiring', icon: 'DollarSign' },
            { id: 'stat-3', value: '24 Hours', label: 'Average Turnaround', subtext: 'Overnight execution advantage', icon: 'Clock' },
            { id: 'stat-4', value: '100%', label: 'Confidentiality', subtext: 'Enterprise-grade NDA & security', icon: 'Shield' }
          ]
        }
      },
      {
        ...createDefaultBlock('featureGrid'),
        data: {
          badgeText: 'Service Capabilities',
          title: 'Comprehensive Deliverables Built for Real Estate Leaders',
          subtitle: 'Our dedicated analyst pods seamlessly adapt to your customized Excel modeling guidelines.',
          columns: 3,
          cardStyle: 'glass',
          items: [
            {
              id: 'feat-1',
              icon: 'TrendingUp',
              badge: 'Valuation',
              title: 'Dynamic DCF & Waterfall Models',
              description: 'Multi-tiered promote waterfalls, debt sizing, IRR sensitivities, and return attribution schedules.',
              linkText: 'Explore Models',
              linkUrl: '/contact'
            },
            {
              id: 'feat-2',
              icon: 'Cpu',
              badge: 'Data Cleansing',
              title: 'Automated Rent Roll & T-12 Scrubbing',
              description: 'Rapid standardization of complex lease structures, concessions, delinquency aging, and unit mix.',
              linkText: 'Explore Cleansing',
              linkUrl: '/contact'
            },
            {
              id: 'feat-3',
              icon: 'Shield',
              badge: 'Assurance',
              title: 'Offering Memorandum & Deck Creation',
              description: 'Compelling lender presentation packages, investment committee memos, and quarterly investor reports.',
              linkText: 'Explore Reports',
              linkUrl: '/contact'
            }
          ]
        }
      },
      {
        ...createDefaultBlock('contentMedia'),
        data: {
          badgeText: 'Operational Workflow',
          title: 'How Our Analysts Integrate With Your In-House Team',
          text: 'We function as a natural extension of your desk. Your deals are assigned to dedicated analysts who master your specific investment thesis, hurdle rates, and formatting standards.',
          bullets: [
            'Direct collaboration via Slack, Microsoft Teams, or firm email',
            'Overnight turnaround ensuring ready models at market opening',
            'Strict adherence to institutional quality checklists and formula audits',
            'Ability to ramp headcount up or down within 48 hours'
          ],
          layout: 'image-right',
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
          mediaCaption: 'Fortune-level financial engineering and real-time deal analysis.',
          btnText: 'Discuss Deployment',
          btnUrl: '/contact'
        }
      },
      {
        ...createDefaultBlock('comparison'),
        data: {
          badgeText: 'The Advantage',
          title: 'In-House Analysts vs Offshore Minds Pod',
          subtitle: 'Save up to 70% in overhead while gaining round-the-clock throughput.',
          leftTitle: 'Traditional In-House Hiring',
          leftSubtitle: 'High overhead, slow hiring, turnover risk',
          leftItems: [
            'Heavy recruitment fees and 90-day search cycles',
            '$120k+ base salary plus benefits, payroll tax & office space',
            'Risk of sudden resignation mid-deal flow',
            'Strictly limited to 9-to-5 working hours'
          ],
          rightTitle: 'Offshore Minds Managed Pod',
          rightSubtitle: 'Instant scale, senior rigor, 24/7 delivery',
          rightItems: [
            'Immediate deployment within 48-72 hours',
            'Predictable, transparent monthly retainer with 70% savings',
            'Permanent backup bench guarantees zero downtime',
            'Overnight sprint cycle delivers while your team rests'
          ]
        }
      },
      {
        ...createDefaultBlock('processSteps'),
        data: {
          badgeText: 'Deployment Roadmap',
          title: 'Start Operating In 3 Simple Steps',
          subtitle: 'From discovery to live deliverable in under a week.',
          steps: [
            { stepNumber: '01', title: 'Scope & Template Alignment', description: 'We review your deal criteria, sample models, and reporting expectations.', icon: 'Search', duration: 'Day 1' },
            { stepNumber: '02', title: 'Pod Assignment & Pilot', description: 'A designated analyst completes a live test deal to calibrate to your exact standards.', icon: 'Cpu', duration: 'Day 2-3' },
            { stepNumber: '03', title: 'Continuous Full Operations', description: 'Seamless daily pipeline execution with dedicated team standups.', icon: 'Rocket', duration: 'Ongoing' }
          ]
        }
      },
      {
        ...createDefaultBlock('faq'),
        data: {
          badgeText: 'FAQ',
          title: 'Frequently Asked Questions',
          subtitle: 'Have questions? Here are the most common inquiries from private equity sponsors and brokers.',
          items: [
            { id: 'f-1', question: 'How quickly can our dedicated analyst start?', answer: 'We can match and onboard a trained analyst within 48 to 72 hours.' },
            { id: 'f-2', question: 'Can you work with proprietary Excel models?', answer: 'Yes, 100%. We work directly within your bespoke templates, macros, and Argus files.' },
            { id: 'f-3', question: 'How is data protected?', answer: 'We maintain strict NDAs, encrypted virtual environments, and bank-grade data security protocols.' }
          ]
        }
      },
      {
        ...createDefaultBlock('cta'),
        data: {
          badgeText: 'Get Started Today',
          title: 'Scale Your Underwriting Capacity Without The Overhead',
          description: 'Book a 30-minute discovery call to discuss your deal flow and pilot our services with zero commitment.',
          primaryBtnText: 'Schedule 30-Min Call',
          primaryBtnUrl: 'https://calendly.com/gyan-offshoreminds/30min',
          secondaryBtnText: 'Message Our Team',
          secondaryBtnUrl: '/contact',
          style: 'gradient'
        }
      }
    ]
  },
  {
    id: 'solution-tech',
    name: 'Technology & AI Solution',
    description: 'Designed for AI automation, proprietary software tools, or technological capability showcases.',
    badge: 'Popular',
    category: 'Technology',
    blocksFactory: () => [
      {
        ...createDefaultBlock('hero'),
        data: {
          badgeText: 'AI Real Estate Intelligence',
          badgeIcon: 'Cpu',
          title: 'Autonomous Real Estate Financial Engineering',
          subtitle: 'Combine state-of-the-art AI automation with verified human analyst oversight for unprecedented underwriting throughput.',
          primaryBtnText: 'Request Live Demo',
          primaryBtnUrl: '/contact',
          secondaryBtnText: 'View How It Works',
          secondaryBtnUrl: '#process',
          alignment: 'center',
          style: 'glow',
          showStats: true,
          stats: [
            { label: 'Extraction Accuracy', value: '99.9%' },
            { label: 'Processing Speed', value: '10x Faster' },
            { label: 'Document Formats', value: 'PDF, XLS, CSV' }
          ]
        }
      },
      {
        ...createDefaultBlock('featureGrid'),
        data: {
          badgeText: 'Technology Suite',
          title: 'Cutting-Edge Intelligence for Commercial Real Estate',
          subtitle: 'Automate manual spreadsheet busywork and focus your high-value attention on closing transactions.',
          columns: 3,
          cardStyle: 'bordered',
          items: [
            { id: 'f-1', icon: 'Cpu', badge: 'AI Parser', title: 'Automated Rent Roll Scrubbing', description: 'Intelligent OCR parsing multi-page PDFs directly into clean, standardized Excel models.', linkText: 'Explore AI', linkUrl: '/contact' },
            { id: 'f-2', icon: 'TrendingUp', badge: 'Analytics', title: 'Predictive Operating Benchmarks', description: 'Instant comparison against 10M+ square feet of verified submarket expense comps.', linkText: 'Explore Benchmarks', linkUrl: '/contact' },
            { id: 'f-3', icon: 'Shield', badge: 'Security', title: 'SOC-2 Compliant Vault', description: 'Bank-grade encryption ensuring sensitive investor and financial information never leaks.', linkText: 'Explore Security', linkUrl: '/contact' }
          ]
        }
      },
      {
        ...createDefaultBlock('benefits'),
        data: {
          badgeText: 'Core Advantages',
          title: 'Why Human-in-the-Loop AI Wins Every Time',
          subtitle: 'Pure AI makes mistakes. Human analysts without AI are slow. Offshore Minds marries both for perfect execution.',
          items: [
            { id: 'b-1', icon: 'Zap', title: '10x Throughput', description: 'Process dozens of incoming deals per day rather than getting bogged down in formatting.', points: ['Instant OCR parsing', 'Automated variance checks'] },
            { id: 'b-2', icon: 'CheckCircle', title: '100% Verification', description: 'Senior real estate analysts review every output before it reaches investment committee.', points: ['Certified financial review', 'Zero hallucination guarantee'] },
            { id: 'b-3', icon: 'Lock', title: 'Private & Secure', description: 'Enterprise data protection with dedicated zero-retention infrastructure.', points: ['Custom NDA protection', 'Restricted access control'] }
          ]
        }
      },
      {
        ...createDefaultBlock('cta'),
        data: {
          badgeText: 'Pilot With Us',
          title: 'Experience The Future of Real Estate Analysis',
          description: 'Send us a sample deal package and see the completed model delivered overnight.',
          primaryBtnText: 'Book Strategy Session',
          primaryBtnUrl: 'https://calendly.com/gyan-offshoreminds/30min',
          secondaryBtnText: 'Contact Deal Desk',
          secondaryBtnUrl: '/contact',
          style: 'gradient'
        }
      }
    ]
  },
  {
    id: 'blank-canvas',
    name: 'Blank Canvas',
    description: 'Start with an empty page and add blocks freely from the block library.',
    badge: 'Custom',
    category: 'General',
    blocksFactory: () => [
      {
        ...createDefaultBlock('hero'),
        data: {
          badgeText: 'Welcome',
          badgeIcon: 'Sparkles',
          title: 'Your Page Headline Goes Here',
          subtitle: 'Add a compelling description of your offering, initiative, or market announcement.',
          primaryBtnText: 'Learn More',
          primaryBtnUrl: '/contact',
          secondaryBtnText: 'Contact Us',
          secondaryBtnUrl: '/contact',
          alignment: 'center',
          style: 'glow',
          showStats: false,
          stats: []
        }
      }
    ]
  }
];
