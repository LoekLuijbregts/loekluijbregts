import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const site = 'https://loekluijbregts.com';
const modified = '2026-08-18';

const articles = {
  'business-more-valuable-than-proposition': {
    seoTitle: 'How to Write a Stronger Value Proposition | Loek Luijbregts',
    description: 'A practical Outside-In audit for founders who want to uncover hidden customer value and turn it into a clearer proposition, offer and proof.',
    intent: 'Value proposition strategy for founders',
    category: 'Founder positioning and overlooked value',
    published: '2026-08-18', readTime: '8 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts discussing strategy at an international business and tourism panel',
    caption: 'Outside-In strategy in the room: translating expertise into value other people can recognise.',
    related: ['call-three-best-customers-before-positioning', 'help-ideal-customers-buy-the-work-you-love', 'customer-reviews-are-strategy-research']
  },
  'call-three-best-customers-before-positioning': {
    seoTitle: 'Customer Interviews for Better Positioning | Loek Luijbregts',
    description: 'Five customer interview questions that replace internal positioning assumptions with evidence from the people who value your work most.',
    intent: 'Customer interviews for brand positioning',
    category: 'Founder positioning and overlooked value',
    published: '2026-08-18', readTime: '7 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts speaking with an international panel about customer and destination strategy',
    caption: 'Better positioning begins outside the business: with customers, context and credible proof.',
    related: ['business-more-valuable-than-proposition', 'customer-reviews-are-strategy-research', 'help-ideal-customers-buy-the-work-you-love']
  },
  'help-ideal-customers-buy-the-work-you-love': {
    seoTitle: 'How to Attract More Ideal Clients | Loek Luijbregts',
    description: 'A practical method for turning your best work, best customer and strongest proof into an offer ideal clients can understand and buy.',
    intent: 'Ideal client positioning and offer design',
    category: 'Founder positioning and overlooked value',
    published: '2026-08-18', readTime: '8 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts sharing strategic marketing experience during a panel discussion',
    caption: 'Make the work you most want to do easier for the right customer to recognise and request.',
    related: ['business-more-valuable-than-proposition', 'call-three-best-customers-before-positioning', 'when-the-founder-is-the-only-salesperson']
  },
  'customer-reviews-are-strategy-research': {
    seoTitle: 'Use Customer Reviews for Market Research | Loek Luijbregts',
    description: 'Learn how to analyse customer reviews for positioning language, buying motives, hidden strengths and practical growth opportunities.',
    intent: 'Customer review analysis for positioning',
    category: 'Founder positioning and overlooked value',
    published: '2026-08-18', readTime: '7 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts on stage sharing strategic marketing lessons with an international audience',
    caption: 'Customer language is often the shortest route to a proposition the market already understands.',
    related: ['call-three-best-customers-before-positioning', 'business-more-valuable-than-proposition', 'small-audience-that-acts']
  },
  'earned-media-is-borrowed-trust': {
    seoTitle: 'Earned Media Strategy: Build Trust, Not Reach | Loek Luijbregts',
    description: 'Why earned media works as borrowed trust, and how founders can combine credible outsiders, proof and timing to make value easier to believe.',
    intent: 'Earned media strategy for founders and launches',
    category: 'Earned media and commercial proof',
    published: '2026-08-18', readTime: '8 minute read',
    image: '/images/real-gravaa-media-proof.webp', imageWidth: 1600, imageHeight: 900,
    imageAlt: 'Marianne Vos winning the Gravel World Championships surrounded by international GRAVAA headlines',
    caption: 'GRAVAA earned international headlines by connecting real product proof to a moment the market already cared about.',
    related: ['build-proof-before-the-launch', 'earned-media-roi-beyond-impressions', 'gravaa-case-study']
  },
  'build-proof-before-the-launch': {
    seoTitle: 'Launch Strategy: Build Proof Before You Launch | Loek Luijbregts',
    description: 'A six-week launch strategy for preparing the story, evidence, outside voices, distribution and commercial next step before attention arrives.',
    intent: 'Product launch proof and PR strategy',
    category: 'Earned media and commercial proof',
    published: '2026-08-18', readTime: '8 minute read',
    image: '/images/hero-gravaa-global-launch-bram-berkien.jpg', imageWidth: 1632, imageHeight: 2040,
    imageAlt: 'Professional cyclist testing GRAVAA adaptable tyre pressure technology during the global launch',
    caption: 'GRAVAA Global Launch - photo by Bram Berkien.',
    related: ['earned-media-is-borrowed-trust', 'earned-media-roi-beyond-impressions', 'gravaa-case-study']
  },
  'earned-media-roi-beyond-impressions': {
    seoTitle: 'How to Measure Earned Media ROI | Loek Luijbregts',
    description: 'A practical earned media measurement framework connecting impressions to trust, leads, sales, rebookings and reusable commercial assets.',
    intent: 'Earned media ROI and campaign measurement',
    category: 'Earned media and commercial proof',
    published: '2026-08-18', readTime: '9 minute read',
    image: '/images/proof-pilot.jpg', imageWidth: 1200, imageHeight: 675,
    imageAlt: 'Pilot Cycles activation demonstrating earned media, event content and qualified demand',
    caption: 'Pilot Cycles: 9M impressions and 270+ leads for €8,000+ bikes, produced remotely with €0 ad spend.',
    related: ['earned-media-is-borrowed-trust', 'pilot-cycles-case-study', 'followers-are-rented-customer-permission-is-owned']
  },
  'creator-influencer-ugc-or-media-partner': {
    seoTitle: 'Creator vs Influencer vs UGC: Which Do You Need? | Loek Luijbregts',
    description: 'Choose between a creator, influencer, UGC producer or media partner by matching the role, brief and measurement to the customer outcome.',
    intent: 'Creator marketing roles and briefing',
    category: 'Creator economy and outdoor media',
    published: '2026-08-18', readTime: '9 minute read',
    image: '/images/pack-bts-crew.jpg', imageWidth: 1400, imageHeight: 933,
    imageAlt: 'Outdoor content creators working together on location during a cycling production',
    caption: 'The right creator role depends on the job: production, distribution, credibility, community or a complete media story.',
    related: ['outdoor-creators-are-becoming-media-businesses', 'followers-are-rented-customer-permission-is-owned', 'earned-media-is-borrowed-trust']
  },
  'outdoor-creators-are-becoming-media-businesses': {
    seoTitle: 'Outdoor Creator Marketing: A Maturity Model | Loek Luijbregts',
    description: 'A five-level maturity model for outdoor creators and brands building stronger content formats, partnerships, distribution and commercial value.',
    intent: 'Outdoor creator partnerships and business models',
    category: 'Creator economy and outdoor media',
    published: '2026-08-18', readTime: '9 minute read',
    image: '/images/real-iceland-wout-van-de-donk.webp', imageWidth: 1600, imageHeight: 1066,
    imageAlt: 'Two cyclists crossing the remote Icelandic highlands during an outdoor media production',
    caption: 'Iceland - photo by Wout van de Donk. Strong outdoor media begins inside a real experience.',
    related: ['creator-influencer-ugc-or-media-partner', 'followers-are-rented-customer-permission-is-owned', 'cycling-tourism-content-strategy']
  },
  'followers-are-rented-customer-permission-is-owned': {
    seoTitle: 'Turn Social Followers Into Leads and Subscribers | Loek Luijbregts',
    description: 'A practical system for turning social reach into email subscribers, qualified leads and customer relationships your business can continue.',
    intent: 'Convert social media followers into owned demand',
    category: 'Creator economy and outdoor media',
    published: '2026-08-18', readTime: '8 minute read',
    image: '/images/pack-bts-crew.jpg', imageWidth: 1400, imageHeight: 933,
    imageAlt: 'A content production crew creating cycling stories designed for social distribution',
    caption: 'Content earns attention. A clear next step turns that attention into permission and future demand.',
    related: ['lean-social-media-growth-stack-for-founders', 'small-audience-that-acts', 'earned-media-roi-beyond-impressions']
  },
  'lean-social-media-growth-stack-for-founders': {
    seoTitle: 'Social Media Growth Tools for Founders | Loek Luijbregts',
    description: 'A lean social media tool stack for capturing ideas, creating useful content, starting conversations and keeping customer permission.',
    intent: 'Social media growth tools and systems for founders',
    category: 'Founder visibility and content systems',
    published: '2026-01-15', readTime: '8 minute read',
    image: '/images/pack-bts-crew.jpg', imageWidth: 1400, imageHeight: 933,
    imageAlt: 'A small outdoor media crew creating founder and brand content on location',
    caption: 'The best content stack is the smallest repeatable system that turns expertise into useful customer conversations.',
    related: ['iphone-first-content-creation', 'stop-asking-what-to-post-build-a-story-inventory', 'followers-are-rented-customer-permission-is-owned']
  },
  'iphone-first-content-creation': {
    seoTitle: 'iPhone Content Creation for Founders | Loek Luijbregts',
    description: 'A practical iPhone-first content creation workflow for founders, including a five-shot format and a repeatable 30-minute publishing system.',
    intent: 'iPhone-first content creation for founders',
    category: 'Founder visibility and content systems',
    published: '2026-01-29', readTime: '8 minute read',
    image: '/images/pack-bts-crew.jpg', imageWidth: 1400, imageHeight: 933,
    imageAlt: 'A compact content team filming a cycling story outdoors with lightweight equipment',
    caption: 'Start with the camera you already understand, a useful idea and a format you can repeat.',
    related: ['lean-social-media-growth-stack-for-founders', 'stop-asking-what-to-post-build-a-story-inventory', 'founder-led-linkedin-writing']
  },
  'founder-led-linkedin-writing': {
    seoTitle: 'Founder-Led LinkedIn: DIY vs Ghostwriter | Loek Luijbregts',
    description: 'A decision guide for founder-led LinkedIn writing, from writing alone to working with an interviewer, editor or trusted CEO ghostwriter.',
    intent: 'Founder-led LinkedIn writing and CEO ghostwriting',
    category: 'Founder visibility and content systems',
    published: '2026-02-12', readTime: '9 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts speaking from first-hand experience during an international panel',
    caption: 'The founder owns the truth. A strong writer can help extract, challenge and translate it without manufacturing a voice.',
    related: ['stop-asking-what-to-post-build-a-story-inventory', 'personal-brand-is-transferable-trust', 'when-the-founder-is-the-only-salesperson']
  },
  'stop-asking-what-to-post-build-a-story-inventory': {
    seoTitle: 'How to Build a Founder Content Story Inventory | Loek Luijbregts',
    description: 'A practical story inventory for collecting customer language, founder beliefs, decisions, proof and field notes before they disappear.',
    intent: 'Founder content ideas and story inventory',
    category: 'Founder visibility and content systems',
    published: '2026-03-13', readTime: '8 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts explaining a strategic idea during an international panel discussion',
    caption: 'The valuable story is usually already happening in the work. The system makes sure somebody notices and keeps it.',
    related: ['founder-led-linkedin-writing', 'iphone-first-content-creation', 'customer-reviews-are-strategy-research']
  },
  'personal-brand-is-transferable-trust': {
    seoTitle: 'Founder Personal Brand Strategy: Build Trust | Loek Luijbregts',
    description: 'A founder personal brand strategy for making judgment, values and proof visible, then transferring that trust into the wider business.',
    intent: 'Founder personal brand and transferable trust',
    category: 'Founder visibility and content systems',
    published: '2026-05-22', readTime: '8 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts sharing expertise in front of an international professional audience',
    caption: 'Useful founder visibility makes judgment easier to recognise before the customer conversation starts.',
    related: ['founder-led-linkedin-writing', 'when-the-founder-is-the-only-salesperson', 'small-audience-that-acts']
  },
  'ironman-maastricht-seven-months-of-focused-work': {
    seoTitle: 'How 7 Months of Focus Led to an 11-Hour Ironman | Loek Luijbregts',
    description: 'What completing Ironman Maastricht in under 11 hours taught me about seven months of consistent work, practical milestones and earned belief.',
    intent: 'Consistency, endurance and ambitious goal setting',
    category: 'Founder trust and long-game growth',
    published: '2026-02-27', readTime: '10 minute read',
    image: '/images/real-iceland-wout-van-de-donk.webp', imageWidth: 1600, imageHeight: 1066,
    imageAlt: 'Two endurance cyclists crossing a remote Icelandic highland landscape',
    caption: 'Big outcomes are built through ordinary training days, honest milestones and the decision to keep moving.',
    related: ['generosity-is-a-growth-system', 'small-audience-that-acts', 'loek-luijbregts-cyclist-endurance-athlete']
  },
  'when-the-founder-is-the-only-salesperson': {
    seoTitle: 'How to Fix a Founder-Led Sales Bottleneck | Loek Luijbregts',
    description: 'Turn founder intuition into transferable positioning, proof and sales assets so customers understand the value before the founder explains it.',
    intent: 'Founder-led sales bottleneck and scalable positioning',
    category: 'Founder trust and long-game growth',
    published: '2026-03-31', readTime: '8 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts translating specialist experience into a clear story during a panel',
    caption: 'The goal is not to remove the founder. It is to make the founder’s best explanation transferable.',
    related: ['business-more-valuable-than-proposition', 'help-ideal-customers-buy-the-work-you-love', 'personal-brand-is-transferable-trust']
  },
  'small-audience-that-acts': {
    seoTitle: 'Audience Growth Metrics That Matter for Founders | Loek Luijbregts',
    description: 'Measure qualified action, customer permission and commercial movement instead of treating follower growth and applause as business results.',
    intent: 'Audience growth metrics and qualified demand',
    category: 'Founder trust and long-game growth',
    published: '2026-04-17', readTime: '8 minute read',
    image: '/images/real-mark-gunter-chris-burkard-1200.webp', imageWidth: 1200, imageHeight: 1500,
    imageAlt: 'Mark Gunter Photo Awards announcing Chris Burkard as a judge for its tenth edition',
    caption: 'The right respected person taking action can be more valuable than a much larger passive audience.',
    related: ['followers-are-rented-customer-permission-is-owned', 'earned-media-roi-beyond-impressions', 'teach-before-you-pitch']
  },
  'teach-before-you-pitch': {
    seoTitle: 'How Much Expertise Should You Give Away Free? | Loek Luijbregts',
    description: 'Teach prospects enough to recognise the problem and judge the options while keeping diagnosis, context and implementation inside paid work.',
    intent: 'Content strategy for consultants and expert founders',
    category: 'Founder trust and long-game growth',
    published: '2026-05-06', readTime: '8 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts teaching and sharing marketing experience during an international panel',
    caption: 'Teach recognition and decision quality. Sell the diagnosis, context and implementation that create the result.',
    related: ['generosity-is-a-growth-system', 'small-audience-that-acts', 'business-more-valuable-than-proposition']
  },
  'generosity-is-a-growth-system': {
    seoTitle: 'How Generosity Creates Business Growth and Proof | Loek Luijbregts',
    description: 'A practical framework for using recognition, access and strategic help to create stronger work, visible proof and compounding relationships.',
    intent: 'Strategic generosity as a business growth system',
    category: 'Founder trust and long-game growth',
    published: '2026-06-12', readTime: '9 minute read',
    image: '/images/real-mark-gunter-chris-burkard-1200.webp', imageWidth: 1200, imageHeight: 1500,
    imageAlt: 'Chris Burkard announced as a judge for the tenth Mark Gunter Photo Awards',
    caption: 'Strategic generosity creates value when it helps good work become stronger, more credible and easier to see.',
    related: ['teach-before-you-pitch', 'small-audience-that-acts', 'earned-media-is-borrowed-trust']
  },
  'gravaa-case-study': {
    seoTitle: 'GRAVAA Case Study: 60M Earned Impressions | Loek Luijbregts',
    description: 'How GRAVAA generated 60 million earned impressions, tripled its social following and built 9,000+ subscribers with zero advertising spend.',
    intent: 'Earned media case study for a technology launch',
    category: 'Case study: earned media and product launch',
    published: '2026-07-02', readTime: '12 minute read',
    image: '/images/real-gravaa-media-proof.webp', imageWidth: 1600, imageHeight: 900,
    imageAlt: 'Marianne Vos winning the Gravel World Championships with international GRAVAA media coverage',
    caption: 'International earned media surrounding the GRAVAA launch and Marianne Vos’s Gravel World Championship victory.',
    related: ['earned-media-is-borrowed-trust', 'build-proof-before-the-launch', 'earned-media-roi-beyond-impressions']
  },
  'pilot-cycles-case-study': {
    seoTitle: 'Pilot Cycles: 9M Impressions, 270+ Leads | Loek Luijbregts',
    description: 'How Pilot Cycles earned 9M impressions and 270+ qualified leads for €8,000+ bikes through remote content with zero advertising spend.',
    intent: 'Cycling brand lead generation case study',
    category: 'Case study: qualified demand and earned media',
    published: '2026-08-18', readTime: '12 minute read',
    image: '/images/proof-pilot.jpg', imageWidth: 1200, imageHeight: 675,
    imageAlt: 'Pilot Cycles activation at CyclingWorld Düsseldorf generating qualified high-value bike leads',
    caption: 'Pilot Cycles: 9M impressions, 270+ leads for €8,000+ bikes, 100% remote and €0 ad spend.',
    related: ['earned-media-roi-beyond-impressions', 'social-media-marketing-cycling-brands', 'eurobike-trade-show-marketing']
  },
  'atta-2026-adventure-travel-review': {
    seoTitle: 'Adventure Travel Trends 2026: What ATTA Data Means | Loek Luijbregts',
    description: 'A practical interpretation of the ATTA 2026 adventure travel report for destinations, including e-bikes, midlife women and changing demand.',
    intent: '2026 adventure travel trends for destinations',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-04-15', readTime: '11 minute read',
    image: '/images/real-iceland-wout-van-de-donk.webp', imageWidth: 1600, imageHeight: 1066,
    imageAlt: 'Adventure cyclists crossing the Icelandic highlands during a destination content project',
    caption: 'Iceland - photo by Wout van de Donk. Adventure demand becomes meaningful when a destination translates trends into a credible experience.',
    related: ['cycling-destination-marketing-dmo', 'cycling-tourism-content-strategy', 'adventure-cycling-marketing-international']
  },
  'earned-media-cycling-tourism': {
    seoTitle: 'Earned Media Strategy for Cycling Tourism | Loek Luijbregts',
    description: 'How destinations can use route proof, cycling media, creator distribution and long-term partnerships to earn reach without an ad budget.',
    intent: 'Earned media for cycling tourism destinations',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '11 minute read',
    image: '/images/proof-tourism-zuiderwaterlinie.webp', imageWidth: 1280, imageHeight: 720,
    imageAlt: 'Gravel cycling route content for the Zuiderwaterlinie tourism campaign',
    caption: 'Zuiderwaterlinie: 900,000+ route clicks, multiple annual rebookings, €0 licence costs and €0 ad spend.',
    related: ['cycling-tourism-content-strategy', 'cycling-destination-marketing-dmo', 'earned-media-is-borrowed-trust']
  },
  'cycling-tourism-content-strategy': {
    seoTitle: 'Cycling Tourism Content Strategy: What Works | Loek Luijbregts',
    description: 'A practical cycling tourism content strategy built on real routes, credible creators, useful distribution and measurable traveller intent.',
    intent: 'Cycling tourism content strategy and route marketing',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '11 minute read',
    image: '/images/real-iceland-wout-van-de-donk.webp', imageWidth: 1600, imageHeight: 1066,
    imageAlt: 'Cyclists riding through Icelandic highlands during first-hand destination storytelling',
    caption: 'Iceland - photo by Wout van de Donk. Useful route content is created from inside the experience.',
    related: ['earned-media-cycling-tourism', 'cycling-destination-marketing-dmo', 'outdoor-creators-are-becoming-media-businesses']
  },
  'social-media-marketing-cycling-brands': {
    seoTitle: 'Social Media Marketing for Cycling Brands | Loek Luijbregts',
    description: 'An organic social media strategy for cycling brands using first-hand product proof, creator partnerships and customer permission.',
    intent: 'Organic social media marketing for cycling brands',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '10 minute read',
    image: '/images/proof-pilot.jpg', imageWidth: 1200, imageHeight: 675,
    imageAlt: 'CyclingWorld content activation for Pilot Cycles connecting product proof to qualified leads',
    caption: 'Pilot Cycles demonstrated how genuine product use and partner amplification can turn organic reach into qualified demand.',
    related: ['pilot-cycles-case-study', 'creator-influencer-ugc-or-media-partner', 'followers-are-rented-customer-permission-is-owned']
  },
  'eurobike-trade-show-marketing': {
    seoTitle: 'Eurobike Marketing: Turn Trade Shows Into Media | Loek Luijbregts',
    description: 'How cycling brands can turn Eurobike and other trade shows into planned media, creator and lead-generation moments before the doors open.',
    intent: 'Eurobike and cycling trade show marketing',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '10 minute read',
    image: '/images/hero-gravaa-global-launch-bram-berkien.jpg', imageWidth: 1632, imageHeight: 2040,
    imageAlt: 'Professional cycling technology launch content created for GRAVAA',
    caption: 'GRAVAA Global Launch - photo by Bram Berkien. The event is the distribution moment, not the start of preparation.',
    related: ['build-proof-before-the-launch', 'pilot-cycles-case-study', 'social-media-marketing-cycling-brands']
  },
  'fractional-marketing-partner-cycling': {
    seoTitle: 'Fractional Marketing Partner for Cycling Brands | Loek Luijbregts',
    description: 'What a fractional marketing partner does for cycling brands and destinations, when the model fits and how to judge the commercial value.',
    intent: 'Fractional marketing leadership for cycling businesses',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '10 minute read',
    image: '/images/real-loek-strategy-panel.webp', imageWidth: 1600, imageHeight: 1200,
    imageAlt: 'Loek Luijbregts contributing strategic cycling and destination marketing experience on an international panel',
    caption: 'Fractional leadership adds senior judgment and a repeatable system without requiring a full-time senior marketing hire.',
    related: ['when-the-founder-is-the-only-salesperson', 'social-media-marketing-cycling-brands', 'cycling-destination-marketing-dmo']
  },
  'cycling-destination-marketing-dmo': {
    seoTitle: 'Cycling Destination Marketing Guide for DMOs | Loek Luijbregts',
    description: 'A practical guide for DMOs and tourism boards using route content, earned media and long-term creator partnerships to attract cyclists.',
    intent: 'Cycling destination marketing for DMOs',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '12 minute read',
    image: '/images/proof-tourism-zuiderwaterlinie.webp', imageWidth: 1280, imageHeight: 720,
    imageAlt: 'Zuiderwaterlinie gravel route campaign connecting heritage, cycling and destination discovery',
    caption: 'Zuiderwaterlinie: 900,000+ route clicks, multiple annual rebookings, €0 licence costs and €0 ad spend.',
    related: ['earned-media-cycling-tourism', 'cycling-tourism-content-strategy', 'cycling-destination-marketing-europe']
  },
  'cycling-destination-marketing-europe': {
    seoTitle: 'Cycling Destination Marketing in Europe | Loek Luijbregts',
    description: 'How European destinations can use real routes, cycling media, creator partnerships and intent signals to build long-term cycling demand.',
    intent: 'European cycling destination marketing strategy',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '12 minute read',
    image: '/images/proof-tourism-zuiderwaterlinie.webp', imageWidth: 1280, imageHeight: 720,
    imageAlt: 'A documented gravel route crossing the historic Zuiderwaterlinie landscape',
    caption: 'Route proof helps a destination replace generic promises with an experience cyclists can inspect and plan.',
    related: ['cycling-destination-marketing-dmo', 'earned-media-cycling-tourism', 'adventure-cycling-marketing-international']
  },
  'adventure-cycling-marketing-international': {
    seoTitle: 'Adventure Cycling Marketing Beyond Europe | Loek Luijbregts',
    description: 'Lessons from cycling storytelling and destination campaigns in Morocco, Türkiye and East Africa for international adventure markets.',
    intent: 'International adventure cycling marketing',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '11 minute read',
    image: '/images/hero-morocco.jpg', imageWidth: 1400, imageHeight: 933,
    imageAlt: 'Adventure cyclist riding through Morocco during an international outdoor content project',
    caption: 'International adventure marketing works when the experience, local context and rider truth remain visible.',
    related: ['atta-2026-adventure-travel-review', 'cycling-destination-marketing-europe', 'cycling-tourism-content-strategy']
  },
  'cycling-brand-marketing-netherlands': {
    seoTitle: 'Cycling Brand Marketing in the Netherlands | Loek Luijbregts',
    description: 'A Dutch cycling brand marketing strategy built on category credibility, product proof, earned media and qualified customer action.',
    intent: 'Cycling brand marketing in the Netherlands',
    category: 'Cycling, outdoor and destination marketing',
    published: '2026-07-02', readTime: '10 minute read',
    image: '/images/proof-pilot.jpg', imageWidth: 1200, imageHeight: 675,
    imageAlt: 'Dutch premium bike brand Pilot Cycles presented during an earned media activation',
    caption: 'Pilot Cycles: Dutch product credibility translated into 9M impressions and 270+ leads for €8,000+ bikes.',
    related: ['social-media-marketing-cycling-brands', 'pilot-cycles-case-study', 'gravaa-case-study']
  },
  'loek-luijbregts-cyclist-endurance-athlete': {
    seoTitle: 'Endurance Cycling Experience Behind the Work | Loek Luijbregts',
    description: 'The endurance riding, bikepacking and international field experience behind Loek Luijbregts’ cycling and outdoor marketing work.',
    intent: 'Endurance cycling experience behind the marketing work',
    category: 'First-hand expertise and author background',
    published: '2026-07-02', readTime: '10 minute read',
    image: '/images/real-iceland-wout-van-de-donk.webp', imageWidth: 1600, imageHeight: 1066,
    imageAlt: 'Endurance cyclists crossing the remote Icelandic highlands during a gravel event',
    caption: 'Iceland - photo by Wout van de Donk. First-hand field experience is the foundation of credible cycling storytelling.',
    related: ['ironman-maastricht-seven-months-of-focused-work', 'adventure-cycling-marketing-international', 'cycling-tourism-content-strategy']
  }
};

const ctaByCategory = {
  'Founder positioning and overlooked value': {
    title: 'Make your real value easier to buy',
    text: 'An Outside-In conversation identifies what ideal customers already value, where the proposition loses that value and which proof or offer deserves attention first.'
  },
  'Earned media and commercial proof': {
    title: 'Find the story the market will repeat',
    text: 'Bring the proposition, proof, outside voices, timing and commercial next step together before the attention window opens.'
  },
  'Case study: earned media and product launch': {
    title: 'What could your next credible proof point be?',
    text: 'Explore where product truth, a meaningful market moment and the right outside voices can create earned attention and commercial momentum.'
  },
  'Case study: qualified demand and earned media': {
    title: 'Turn product proof into qualified demand',
    text: 'Explore the customer, story, distribution and follow-up system that could make your strongest product evidence travel further.'
  },
  'Creator economy and outdoor media': {
    title: 'Build a creator partnership with commercial depth',
    text: 'Start with the customer outcome, then design the creator role, proof, distribution and measurable next step as one connected programme.'
  },
  'Founder visibility and content systems': {
    title: 'Turn your expertise into a repeatable content system',
    text: 'Find the useful stories already inside your work and build a practical system that turns them into recognition, trust and qualified conversations.'
  },
  'Founder trust and long-game growth': {
    title: 'Build proof that compounds',
    text: 'An Outside-In conversation can turn founder judgment, customer evidence and consistent action into a clearer commercial growth system.'
  },
  'Cycling, outdoor and destination marketing': {
    title: 'Turn cycling expertise into earned demand',
    text: 'Connect the real product or destination experience to credible stories, specialist distribution and customer actions worth measuring.'
  },
  'First-hand expertise and author background': {
    title: 'Need strategy from someone who knows the field?',
    text: 'Explore how first-hand cycling, outdoor media and commercial experience can strengthen your positioning, campaign or destination programme.'
  }
};

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const stripTags = value => value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const read = file => fs.readFileSync(file, 'utf8');
const write = (file, value) => fs.writeFileSync(file, value);

function rewriteDuplicatedNetherlandsArticle() {
  const file = path.join(root, 'cycling-brand-marketing-netherlands', 'index.html');
  let html = read(file);
  if (!html.includes('<h1>Cycling destination marketing in Europe</h1>')) return;

  const body = `<div class="eyebrow">Essay - Cycling brands &amp; growth</div>
  <h1>Cycling brand marketing in the Netherlands</h1>
  <div class="byline">By <a href="/">Loek Luijbregts</a> · Cycling Incubators B.V.</div>
  <div class="content">

    <p>The Netherlands may be the most familiar cycling market in the world. That does not make it an easy market for a cycling brand.</p>

    <p>Cycling is part of daily life, sporting identity and national infrastructure. Customers understand bikes. Retailers have seen many product claims. Journalists and creators know the category. A generic promise that might feel distinctive elsewhere can disappear inside the Dutch cycling landscape.</p>

    <p>The marketing challenge is therefore not simply to reach more cyclists. It is to make the specific value of the brand easy to recognise, believe and act on.</p>

    <h2>The Dutch cycling-market paradox</h2>

    <p>A mature cycling culture creates a large potential audience and a high credibility threshold at the same time.</p>

    <p><strong>Customers have reference points.</strong> Experienced riders compare geometry, components, materials, service and total ownership experience. Broad lifestyle language rarely answers the questions that influence a premium purchase.</p>

    <p><strong>The trade is densely connected.</strong> Retailers, component brands, media, athletes, creators and event organisers operate inside overlapping networks. A useful story can travel quickly, but a weak claim is tested just as quickly.</p>

    <p><strong>Dutch modesty can hide real value.</strong> Founder-led and engineering-led companies often prefer the product to speak for itself. Unfortunately, markets do not automatically discover the most valuable truth. Somebody still needs to translate why the innovation, craftsmanship or service matters.</p>

    <p><strong>International ambition requires more than English copy.</strong> A Dutch brand may sell globally while its stories, proof and relationships remain organised around the home market. International growth requires local credibility and distribution, not only translation.</p>

    <h2>Start with the buying situation, not the content calendar</h2>

    <p>Before choosing platforms or formats, define the moment in which the product becomes unusually valuable.</p>

    <p>For a custom titanium bike, that moment may be a rider preparing for years of dependable long-distance use. For a tyre-pressure innovation, it may be a race where changing surfaces make fixed pressure visibly limiting. For an urban mobility product, it may be an employer or municipality trying to make daily cycling easier for a specific group.</p>

    <p>The strongest cycling marketing connects six elements:</p>

    <ol>
      <li><strong>Customer:</strong> the rider, buyer, retailer or partner with the strongest reason to care.</li>
      <li><strong>Truth:</strong> the product or company advantage that is genuinely defensible.</li>
      <li><strong>Situation:</strong> the moment in which that advantage becomes easy to understand.</li>
      <li><strong>Proof:</strong> a test, customer result, athlete use, demonstration or respected outside voice.</li>
      <li><strong>Distribution:</strong> the media, creators, partners, events and platforms already trusted by that customer.</li>
      <li><strong>Capture:</strong> the next step that turns interest into permission, a lead, a retailer conversation or a sale.</li>
    </ol>

    <h2>Pilot Cycles: premium product proof translated into demand</h2>

    <p>Pilot Cycles sells custom titanium bikes priced at €8,000 and above. That is not an impulse category. Potential customers need to understand the product, imagine years of use and trust the people behind it.</p>

    <p>A remote earned-media sprint built around real adventures, event initiative and partner amplification produced 9 million impressions and 270+ qualified leads. The work was completed with €0 advertising spend.</p>

    <p>The important lesson is not that every brand should copy the same trips or formats. The lesson is that premium products need premium evidence. The strongest content showed the bikes inside demanding, credible use and placed that proof in front of riders already interested in adventure, durability and high-end equipment.</p>

    <h2>GRAVAA: make technical innovation part of a story people already follow</h2>

    <p>GRAVAA developed adaptable tyre-pressure technology. The engineering was real, but the value was difficult to explain through specifications alone.</p>

    <p>The communication strategy connected the technology to professional cycling moments where tyre pressure clearly affected performance. International race context, respected athletes and prepared media relationships helped turn a technical explanation into a story journalists and riders wanted to understand.</p>

    <p>The programme generated 60 million earned impressions, tripled the social audience and built more than 9,000 email subscribers with zero advertising spend.</p>

    <p>Again, the value came from the connection: genuine innovation, credible use, market timing, trusted distribution and a direct customer relationship after the attention.</p>

    <h2>What Dutch cycling brands should measure</h2>

    <p>Reach matters, but it should not stand alone. A useful measurement system separates attention from commercial movement.</p>

    <p><strong>Attention:</strong> qualified views, relevant media coverage and partner amplification.</p>

    <p><strong>Recognition:</strong> branded search, profile visits, product-page engagement and customers repeating the intended proposition.</p>

    <p><strong>Permission:</strong> email subscribers, event registrations, product alerts and conversations the brand can continue.</p>

    <p><strong>Demand:</strong> dealer enquiries, test-ride requests, qualified leads, proposals and sales.</p>

    <p><strong>Compounding assets:</strong> photography, case evidence, customer language, media relationships and evergreen content that remain useful after the campaign.</p>

    <h2>A practical first move</h2>

    <p>Choose the three customers, retailers or partners you would most like to attract again. Ask what made them pay attention, what removed doubt and which part of the experience proved the value.</p>

    <p>Then compare those answers with the first screen of the website, the retailer presentation and the next campaign brief.</p>

    <p>If the strongest reason to choose the brand only becomes clear after a founder conversation, a technical demonstration or months of ownership, the marketing opportunity is not to become louder. It is to make that proof visible sooner.</p>

  </div>
  <div class="cta-block">`;

  html = html.replace(/<div class="eyebrow">[\s\S]*?<div class="cta-block">/i, body);
  write(file, html);
}

rewriteDuplicatedNetherlandsArticle();

const headlineHtml = {};
for (const slug of Object.keys(articles)) {
  const html = read(path.join(root, slug, 'index.html'));
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) throw new Error(`No H1 found in ${slug}`);
  headlineHtml[slug] = match[1].trim();
}

function seoGraph(slug, item) {
  const canonical = `${site}/${slug}/`;
  const image = `${site}${item.image}`;
  const headline = stripTags(headlineHtml[slug]);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${site}/#organization`,
        name: 'Cycling Incubators B.V.', url: 'https://cyclingincubators.com/'
      },
      {
        '@type': 'Person', '@id': `${site}/#loek-luijbregts`,
        name: 'Loek Luijbregts', url: `${site}/`,
        jobTitle: 'Strategic Outside-In Partner and Founder',
        worksFor: {'@id': `${site}/#organization`},
        sameAs: ['https://www.linkedin.com/in/loekluijbregts/', 'https://cyclingincubators.com/']
      },
      {
        '@type': 'WebSite', '@id': `${site}/#website`,
        url: `${site}/`, name: 'Loek Luijbregts', inLanguage: 'en',
        author: {'@id': `${site}/#loek-luijbregts`}
      },
      {
        '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Home', item: `${site}/`},
          {'@type': 'ListItem', position: 2, name: 'Writing', item: `${site}/writing/`},
          {'@type': 'ListItem', position: 3, name: headline, item: canonical}
        ]
      },
      {
        '@type': 'Article', '@id': `${canonical}#article`,
        headline, description: item.description, articleSection: item.category,
        datePublished: item.published, dateModified: modified, inLanguage: 'en',
        image: {'@type': 'ImageObject', url: image, width: item.imageWidth, height: item.imageHeight, caption: item.caption},
        author: {'@id': `${site}/#loek-luijbregts`},
        publisher: {'@id': `${site}/#organization`},
        mainEntityOfPage: {'@type': 'WebPage', '@id': canonical},
        breadcrumb: {'@id': `${canonical}#breadcrumb`}
      }
    ]
  };
}

function headBlock(slug, item) {
  const canonical = `${site}/${slug}/`;
  const image = `${site}${item.image}`;
  const original = stripTags(headlineHtml[slug]);
  return `<title>${esc(item.seoTitle)}</title>
<meta name="description" content="${esc(item.description)}">
<meta name="author" content="Loek Luijbregts">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(original)}">
<meta property="og:description" content="${esc(item.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="Loek Luijbregts">
<meta property="og:locale" content="en_GB">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="${item.imageWidth}">
<meta property="og:image:height" content="${item.imageHeight}">
<meta property="og:image:alt" content="${esc(item.imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(original)}">
<meta name="twitter:description" content="${esc(item.description)}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="${esc(item.imageAlt)}">
<script type="application/ld+json">${JSON.stringify(seoGraph(slug, item))}</script>
<link rel="stylesheet" href="/writing/seo-enhancements.css">`;
}

function replaceSeoHead(html, slug, item) {
  html = html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="(?:description|author|robots)"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<link\s+rel="stylesheet"\s+href="\/writing\/seo-enhancements\.css">\s*/gi, '');
  return html.replace(/(<meta\s+name="viewport"[^>]*>\s*)/i, `$1${headBlock(slug, item)}\n`);
}

function visibleDate(item) {
  const published = new Date(`${item.published}T12:00:00Z`).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'});
  const updated = new Date(`${modified}T12:00:00Z`).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'});
  const update = item.published === modified ? '' : ` · Updated ${updated}`;
  return `By <a href="/">Loek Luijbregts</a> · Published ${published}${update} · ${item.readTime}`;
}

function authorNote(item) {
  const cycling = item.category === 'Cycling, outdoor and destination marketing' || item.category === 'First-hand expertise and author background';
  const text = cycling
    ? 'Loek Luijbregts is a strategic marketer and founder of Cycling Incubators. His work combines nine years of first-hand cycling and outdoor field experience with positioning, earned media and destination programmes across Europe and beyond.'
    : 'Loek Luijbregts is a strategic marketer and Outside-In partner to founders and leadership teams. He helps uncover overlooked value and turn it into clearer positioning, trusted stories, useful proof and focused commercial movement.';
  return `<aside class="author-note" aria-label="About the author"><span class="seo-label">About the author</span><p>${text} <a href="/work/">See selected work</a>.</p></aside>`;
}

function relatedReading(slug, item) {
  const links = item.related.map(other => `<li><a href="/${other}/">${headlineHtml[other]}</a></li>`).join('');
  return `<aside class="related-reading" aria-label="Related articles"><span class="seo-label">Related reading</span><h2>Continue this line of thinking</h2><ul>${links}</ul></aside>`;
}

function articleCta(slug, item, oldTemplate) {
  const cta = ctaByCategory[item.category];
  const cls = oldTemplate ? 'cta-block article-cta' : 'article-cta';
  return `<div class="${cls}"><h2>${cta.title}</h2><p>${cta.text}</p><a class="button" data-conversion="outside-in-conversation" data-source-article="${slug}" href="https://zcal.co/i/vcLERywI" target="_blank" rel="noopener">Plan an Outside-In conversation</a></div>`;
}

for (const [slug, item] of Object.entries(articles)) {
  const file = path.join(root, slug, 'index.html');
  let html = replaceSeoHead(read(file), slug, item);
  const oldTemplate = !html.includes('/writing/article.css');

  html = html
    .replace(/<div class="eyebrow">[\s\S]*?<\/div>/i, `<div class="eyebrow">${esc(item.intent)} · ${esc(item.category)}</div>`)
    .replace(/<p class="seo-dek">[\s\S]*?<\/p>\s*/gi, '')
    .replace(/<figure class="article-hero">[\s\S]*?<\/figure>\s*/gi, '')
    .replace(/<aside class="author-note"[\s\S]*?<\/aside>\s*/gi, '')
    .replace(/<aside class="related-reading"[\s\S]*?<\/aside>\s*/gi, '')
    .replace(/<div class="byline">[\s\S]*?<\/div>/i, `<div class="byline">${visibleDate(item)}</div>`);

  if (oldTemplate) {
    html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/i, `$1\n  <p class="seo-dek">${esc(item.description)}</p>`);
  }

  const figure = `<figure class="article-hero"><img loading="eager" fetchpriority="high" decoding="async" src="${item.image}" width="${item.imageWidth}" height="${item.imageHeight}" alt="${esc(item.imageAlt)}"><figcaption>${esc(item.caption)}</figcaption></figure>`;
  html = html.replace(/(<div class="byline">[\s\S]*?<\/div>)/i, `$1\n${figure}`);

  const additions = `${authorNote(item)}\n${relatedReading(slug, item)}`;
  if (oldTemplate) {
    html = html.replace(/<div class="cta-block(?: article-cta)?">[\s\S]*?<\/div>/i, `${additions}\n${articleCta(slug, item, true)}`);
  } else {
    html = html.replace(/<div class="article-cta">[\s\S]*?<\/div>/i, `${additions}\n${articleCta(slug, item, false)}`);
  }

  html = html.replaceAll('—', '-').replaceAll('–', '-');
  html = html.replaceAll('href="/writing"', 'href="/writing/"');
  for (const target of Object.keys(articles)) {
    html = html.replaceAll(`href="/${target}"`, `href="/${target}/"`);
  }
  write(file, html);
}

// Make the writing index a clear collection hub while keeping every editorial title.
{
  const file = path.join(root, 'writing', 'index.html');
  let html = read(file)
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="(?:description|author|robots)"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');

  const items = Object.keys(articles).map((slug, index) => ({'@type': 'ListItem', position: index + 1, url: `${site}/${slug}/`, name: stripTags(headlineHtml[slug])}));
  const graph = {
    '@context': 'https://schema.org', '@graph': [
      {'@type': 'Person', '@id': `${site}/#loek-luijbregts`, name: 'Loek Luijbregts', url: `${site}/`, jobTitle: 'Strategic Outside-In Partner and Founder', sameAs: ['https://www.linkedin.com/in/loekluijbregts/', 'https://cyclingincubators.com/']},
      {'@type': 'CollectionPage', '@id': `${site}/writing/#collection`, url: `${site}/writing/`, name: 'Founder Positioning, Earned Media and Growth Articles', description: 'Practical essays and case studies on founder positioning, earned media, creator partnerships, content systems and cycling or destination marketing.', author: {'@id': `${site}/#loek-luijbregts`}, mainEntity: {'@type': 'ItemList', itemListElement: items}}
    ]
  };
  const desc = 'Practical essays and case studies on founder positioning, earned media, creator partnerships, content systems and cycling or destination marketing.';
  const block = `<title>Founder Growth &amp; Earned Media Articles | Loek Luijbregts</title>
<meta name="description" content="${desc}">
<meta name="author" content="Loek Luijbregts">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${site}/writing/">
<meta property="og:type" content="website">
<meta property="og:title" content="Useful Thinking. Visible Proof. - Loek Luijbregts">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${site}/writing/">
<meta property="og:site_name" content="Loek Luijbregts">
<meta property="og:locale" content="en_GB">
<meta property="og:image" content="${site}/images/real-loek-strategy-panel.webp">
<meta property="og:image:width" content="1600">
<meta property="og:image:height" content="1200">
<meta property="og:image:alt" content="Loek Luijbregts sharing strategic marketing experience during an international panel">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Useful Thinking. Visible Proof. - Loek Luijbregts">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${site}/images/real-loek-strategy-panel.webp">
<script type="application/ld+json">${JSON.stringify(graph)}</script>`;
  html = html.replace(/(<meta\s+name="viewport"[^>]*>\s*)/i, `$1${block}\n`)
    .replace('<div class="group-title">Overlooked Value</div>', '<div class="group-title">Founder Positioning &amp; Overlooked Value</div>')
    .replace('Earlier essays: earned media &amp; strategy</div>', 'Cycling &amp; Outdoor Growth Strategy</div>')
    .replace('Earlier essays: destinations &amp; regions</div>', 'Destination &amp; Regional Marketing</div>')
    .replace(/href="\/(gravaa-case-study|atta-2026-adventure-travel-review|earned-media-cycling-tourism|cycling-tourism-content-strategy|social-media-marketing-cycling-brands|eurobike-trade-show-marketing|fractional-marketing-partner-cycling|cycling-destination-marketing-dmo|cycling-destination-marketing-europe|adventure-cycling-marketing-international|cycling-brand-marketing-netherlands|loek-luijbregts-cyclist-endurance-athlete)"/g, 'href="/$1/"')
    .replaceAll('—', '-').replaceAll('–', '-');
  for (const target of Object.keys(articles)) {
    html = html.replaceAll(`href="/${target}"`, `href="/${target}/"`);
  }
  write(file, html);
}

// Keep the sitemap aligned with the canonical URL format and current article updates.
{
  const file = path.join(root, 'sitemap.xml');
  let xml = read(file);
  for (const slug of Object.keys(articles)) {
    const loc = `${site}/${slug}/`;
    const block = new RegExp(`<url>\\s*<loc>${site.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}/${slug}/?</loc>[\\s\\S]*?</url>`, 'i');
    const existing = xml.match(block)?.[0];
    const priority = existing?.match(/<priority>([^<]+)<\/priority>/)?.[1] || '0.7';
    const replacement = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${modified}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    if (existing) xml = xml.replace(block, replacement);
  }
  write(file, xml);
}

console.log(`Updated ${Object.keys(articles).length} articles, the writing hub and sitemap.`);
