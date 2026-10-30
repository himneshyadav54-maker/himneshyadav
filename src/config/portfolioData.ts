export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  iconName: string;
  deliverables: string[];
  idealFor: string;
  typicalTimeline: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Video Editing' | 'Instagram Carousel Designs' | 'Promotional Creatives' | 'Social Media Campaigns' | 'Marketing Projects' | 'Influencer Campaigns';
  tag: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string; // URL or placeholder image
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
  role: string;
  deliverableCount?: string;
  isCustomPlaceholder?: boolean;
}

export interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  details: string[];
}

export interface WhyWorkItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight: string;
}

export const PORTFOLIO_CONFIG = {
  personal: {
    name: 'HIMNESH YADAV',
    firstName: 'Himnesh',
    shortLogo: 'HY.',
    role: 'Digital Marketing Specialist | Social Media Manager | Video Editor | Influencer Marketing & Brand Partnerships Manager',
    tagline: 'Turning Ideas Into Digital Impact.',
    bio: `I'm Himnesh Yadav — an independent digital marketing professional passionate about creativity, content, and building meaningful digital connections.

I work with businesses, personal brands, influencers, and content creators to help them grow through high-impact social media management, premium video editing, performance marketing strategies, and mutually rewarding brand partnerships.

My focus is simple: combining creative execution with smart strategies to create meaningful results without unnecessary fluff.`,
    location: 'Available Globally / Remote & On-Site Partnerships',
    email: 'himneshyadav54@gmail.com',
    whatsappNumber: '+917722983376',
    whatsappDisplay: '+91 7722983376',
    instagramHandle: '@himneshyadav',
    instagramUrl: 'https://instagram.com/himneshyadav',
    linkedinUrl: 'https://linkedin.com/in/himneshyadav',
    commissionRate: 0.20, // 20%
    // Customizable avatar/portrait image
    portraitUrl: '', // Left empty so placeholder frame shows stylish art / upload CTA as requested
  },

  rotatingRoles: [
    'SOCIAL MEDIA MANAGEMENT',
    'VIDEO EDITING & REELS',
    'INFLUENCER MARKETING',
    'BRAND COLLABORATIONS',
    'DIGITAL ADVERTISING & META ADS',
  ],

  services: [
    {
      id: 'social-media',
      number: '01',
      title: 'Social Media Management',
      shortDesc: 'End-to-end organic growth, content calendars, publishing routines, and audience engagement strategy.',
      iconName: 'Instagram',
      deliverables: [
        'Instagram account management & aesthetic curation',
        'Monthly content calendars & strategic themes',
        'Content planning, scripting & ideation',
        'Daily/weekly posting, scheduling & story cadence',
        'Community engagement & inbound DM strategy',
        'Profile & bio conversion optimization',
      ],
      idealFor: 'Businesses & Personal Brands ready for consistent authority',
      typicalTimeline: 'Monthly Retainer',
    },
    {
      id: 'video-editing',
      number: '02',
      title: 'Video Editing & Creative Design',
      shortDesc: 'High-retention Instagram Reels, short-form video edits, carousel designs, and thumb-stopping creatives.',
      iconName: 'Film',
      deliverables: [
        'Instagram Reels & TikTok short-form video editing',
        'High-retention hooks, kinetic typography & sound design',
        'Educational & high-converting carousel design sets',
        'Brand promotional videos & announcement teasers',
        'Event posters, digital banners & ad graphics',
        'Color grading, motion graphics & dynamic pacing',
      ],
      idealFor: 'Creators, Founders & Brands producing visual content',
      typicalTimeline: 'Per Project or Monthly Batch',
    },
    {
      id: 'digital-marketing',
      number: '03',
      title: 'Digital Marketing & Meta Ads',
      shortDesc: 'Targeted paid ad campaigns designed for customer acquisition, qualified leads, and positive ROAS.',
      iconName: 'Target',
      deliverables: [
        'Meta Ads campaign architecture (Facebook & Instagram)',
        'In-depth audience research & competitor analysis',
        'Conversion funnel strategy & offer positioning',
        'Ad creative planning, hook testing & copy variants',
        'Budget pacing & bid strategy optimization',
        'Weekly transparent performance monitoring & KPI reporting',
      ],
      idealFor: 'E-commerce, Local Businesses, Agencies & Service Providers',
      typicalTimeline: 'Monthly Campaign Management',
    },
    {
      id: 'influencer-marketing',
      number: '04',
      title: 'Influencer Marketing',
      shortDesc: 'End-to-end creator scouting, brand matchmaking, campaign coordination, and deliverable oversight.',
      iconName: 'Users',
      deliverables: [
        'Targeted influencer & creator discovery across niches',
        'Audience quality, engagement rate & demographic vetting',
        'Curated influencer shortlisting & outreach decks',
        'Brand-creator matchmaking aligned with target personas',
        'Campaign briefing, content guidelines & schedule planning',
        'Cross-platform influencer campaign coordination & oversight',
      ],
      idealFor: 'Brands looking for authentic word-of-mouth reach',
      typicalTimeline: 'Campaign Basis / Multi-Flight',
    },
    {
      id: 'brand-collaborations',
      number: '05',
      title: 'Brand Collaborations',
      shortDesc: 'Connecting brands with high-affinity sponsorship opportunities and executing strategic partnerships.',
      iconName: 'Handshake',
      deliverables: [
        'Identifying relevant brands with aligned core values',
        'Personalized brand outreach & introductory pitches',
        'High-value sponsorship & co-marketing opportunities',
        'Contract terms, usage rights & deal negotiation',
        'Multi-stakeholder partnership coordination',
        'Ensuring flawless delivery of agreed campaign assets',
      ],
      idealFor: 'Growing Brands & High-Traffic Digital Platforms',
      typicalTimeline: 'Per Deal / Ongoing Partnership',
    },
    {
      id: 'creator-management',
      number: '06',
      title: 'Creator Management',
      shortDesc: 'Managing commercial deals for content creators, securing paid sponsorships, and protecting creator value.',
      iconName: 'Sparkles',
      deliverables: [
        'Sourcing paid brand deals & inbound collaboration triage',
        'Proactive creator brand outreach to potential sponsors',
        'Commercial rate negotiations & contract term protection',
        'Deliverable tracking, revision buffers & payment coordination',
        'Fair market pricing guidance based on creator analytics',
        'Building long-term, recurring brand ambassador partnerships',
      ],
      idealFor: 'Influencers & Creators wanting to focus purely on content',
      typicalTimeline: 'Ongoing Creator Representation',
    },
  ] as ServiceItem[],

  brandProcess: [
    {
      step: '01',
      title: 'Understand Your Brand',
      desc: 'We analyze your product, positioning, target audience demographics, campaign objectives, and budget expectations.',
    },
    {
      step: '02',
      title: 'Discover Relevant Creators',
      desc: 'We curate a verified shortlist of creators whose audience affinity, engagement authenticities, and tone match your brand.',
    },
    {
      step: '03',
      title: 'Plan The Collaboration',
      desc: 'We formulate content briefs, messaging angles, posting schedules, and strict usage guidelines to protect your brand equity.',
    },
    {
      step: '04',
      title: 'Coordinate The Campaign',
      desc: 'We handle communication, review drafts, coordinate timely approvals, and ensure every creator posts precisely on schedule.',
    },
    {
      step: '05',
      title: 'Track Deliverables',
      desc: 'We verify deliverable fulfillment, link tracking, views, and campaign engagement to provide a clear summary of results.',
    },
  ],

  influencerFeatures: [
    { title: 'Brand Deal Sourcing', desc: 'Active outreach to brands looking to sponsor creators in your exact niche.' },
    { title: 'Proactive Outreach', desc: 'Custom pitch decks highlighting your unique audience engagement and style.' },
    { title: 'Sponsorship Opportunities', desc: 'Securing product placement, dedicated reviews, and ambassadorships.' },
    { title: 'Rate Negotiation', desc: 'Ensuring you get paid what your content and reach are genuinely worth.' },
    { title: 'Collaboration Management', desc: 'Buffer between you and brands so you never stress over contracts or revisions.' },
    { title: 'Partnership Coordination', desc: 'Managing posting dates, campaign briefs, and timely payment collection.' },
  ],

  workingProcess: [
    {
      number: '01',
      phase: 'Phase 01',
      title: 'DISCOVER',
      description: 'Deep dive into your business, creator brand, objectives, and market landscape.',
      details: [
        'Identify target audience and tone of voice',
        'Review existing digital assets & competitor positioning',
        'Establish clear milestone expectations and deliverables',
      ],
    },
    {
      number: '02',
      phase: 'Phase 02',
      title: 'STRATEGIZE',
      description: 'Develop a tailored marketing, content, or influencer collaboration strategy.',
      details: [
        'Formulate content pillars, visual directions, or ad funnels',
        'Select suitable platforms and outreach frameworks',
        'Prepare realistic timelines and deliverable schedules',
      ],
    },
    {
      number: '03',
      phase: 'Phase 03',
      title: 'CREATE & CONNECT',
      description: 'Produce high-retention content, scout matching creators, and align campaigns.',
      details: [
        'Edit short-form videos, carousels, or ad creatives',
        'Initiate brand/creator outreach and briefing calls',
        'Review drafts against technical standards and brand briefs',
      ],
    },
    {
      number: '04',
      phase: 'Phase 04',
      title: 'EXECUTE',
      description: 'Orchestrate flawless publishing, ad launching, and campaign deliverables.',
      details: [
        'Schedule posts during optimal engagement windows',
        'Launch & monitor paid ad campaigns with strict budget checks',
        'Ensure all sponsorship deliverables are posted on time',
      ],
    },
    {
      number: '05',
      phase: 'Phase 05',
      title: 'OPTIMIZE',
      description: 'Examine results, extract actionable insights, and elevate future execution.',
      details: [
        'Analyze watch times, click-through rates, and audience comments',
        'Iterate on winning creative hooks and content formats',
        'Refine subsequent campaigns for compounding digital impact',
      ],
    },
  ] as ProcessStep[],

  whyWorkWithMe: [
    {
      id: 'creative-approach',
      title: 'Creative Approach',
      description: 'Bold visual direction combined with modern internet culture to create content that stops thumbs.',
      icon: 'Palette',
      highlight: 'Fresh Visual Energy',
    },
    {
      id: 'professional-execution',
      title: 'Professional Execution',
      description: 'Reliable timelines, structured workflows, and high attention to detail in every asset and communication.',
      icon: 'ShieldCheck',
      highlight: 'Reliable Quality',
    },
    {
      id: 'strategic-planning',
      title: 'Strategic Planning',
      description: 'Every post, video, and partnership serves a specific commercial purpose rather than vanity metrics.',
      icon: 'TrendingUp',
      highlight: 'Purpose-Driven',
    },
    {
      id: 'clear-communication',
      title: 'Clear Communication',
      description: 'Transparent updates, quick turnaround times, and proactive problem-solving at every milestone.',
      icon: 'MessageSquare',
      highlight: 'Direct & Responsive',
    },
    {
      id: 'flexible-solutions',
      title: 'Flexible Solutions',
      description: 'Agile workflows adaptable to independent creators, growing businesses, or established brand campaigns.',
      icon: 'SlidersHorizontal',
      highlight: 'Adaptive Models',
    },
    {
      id: 'focus-business-goals',
      title: 'Focus On Business Goals',
      description: 'Committed to tangible outcomes: brand authority, engaged followers, and commercial value creation.',
      icon: 'CheckCircle2',
      highlight: 'Tangible Outcomes',
    },
  ] as WhyWorkItem[],

  // Default replaceable projects: structured samples clearly marked as creative demo frameworks
  // The user can edit or replace them in real-time or update this file.
  initialProjects: [
    {
      id: 'proj-1',
      title: 'High-Retention Kinetic Reel Framework',
      category: 'Video Editing',
      tag: 'Short-Form Reel',
      description: 'Dynamic pacing, animated captions, custom sound design, and split-second pattern interrupts crafted for maximum watch-time.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '9:16',
      role: 'Video Editor & Motion Designer',
      deliverableCount: '15s & 30s Vertical Formats',
    },
    {
      id: 'proj-2',
      title: 'Authority Carousel Series Architecture',
      category: 'Instagram Carousel Designs',
      tag: 'Instagram Carousel',
      description: 'Seamless multi-slide swipeable educational carousel with strong typography hierarchy, custom diagrams, and conversion-focused call-to-action.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '4:5',
      role: 'Creative Designer & Copy Strategist',
      deliverableCount: '10-Slide High-Value Set',
    },
    {
      id: 'proj-3',
      title: 'Brand Launch Promotional Creative Kit',
      category: 'Promotional Creatives',
      tag: 'Brand Campaign Kit',
      description: 'High-impact digital promotional posters, story banners, and digital ads created with modern dark aesthetics and vibrant typography.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '16:9',
      role: 'Creative Director & Designer',
      deliverableCount: 'Multi-Asset Launch Package',
    },
    {
      id: 'proj-4',
      title: 'E-Commerce Direct Response Meta Ad Creative',
      category: 'Marketing Projects',
      tag: 'Meta Ads & Creative',
      description: 'Problem-solution hook structure with product feature callouts designed specifically for conversion and return on ad spend.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '1:1',
      role: 'Media Buyer & Creative Producer',
      deliverableCount: 'A/B Testing Variants',
    },
    {
      id: 'proj-5',
      title: 'Creator Matchmaking & Campaign Briefing Blueprint',
      category: 'Influencer Campaigns',
      tag: 'Influencer Strategy',
      description: 'Strategic creator outreach deck, product seed guidelines, and deliverable tracking sheet for synchronized multi-creator campaign launch.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '16:9',
      role: 'Influencer Partnerships Manager',
      deliverableCount: 'Cross-Creator Coordination',
    },
    {
      id: 'proj-6',
      title: 'Organic Brand Growth & Aesthetic Grid Revamp',
      category: 'Social Media Campaigns',
      tag: 'Social Media Direction',
      description: 'Complete visual identity transformation including highlight icons, cohesive color treatments, storytelling posts, and daily story flow.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '4:5',
      role: 'Social Media Manager',
      deliverableCount: '30-Day Content Framework',
    },
  ] as PortfolioProject[],
};
