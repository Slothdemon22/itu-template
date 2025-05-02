import { Service, Testimonial, PricingTier, FooterLink } from "@/types/index";

export const services: Service[] = [
  {
    id: 1,
    title: 'Intuitive Design',
    description: 'Our thoughtfully crafted interfaces are designed to be intuitive and user-friendly, enhancing user experience.',
    icon: 'palette',
  },
  {
    id: 2,
    title: 'Advanced Analytics',
    description: 'Gain valuable insights with our comprehensive analytics tools that help you make data-driven decisions.',
    icon: 'bar-chart-2',
  },
  {
    id: 3,
    title: 'Robust Security',
    description: 'Enterprise-grade security ensuring your data remains protected with state-of-the-art encryption.',
    icon: 'shield',
  },
  {
    id: 4,
    title: 'Seamless Integration',
    description: 'Connect with your favorite tools and platforms through our extensive API and integration options.',
    icon: 'link',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechGrowth Inc.',
    content: 'This platform has transformed how we approach our marketing campaigns. The analytics and insights have been invaluable to our growth strategy.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Product Lead',
    company: 'Innovate Solutions',
    content: 'The intuitive interface and powerful features make this the perfect solution for our team. Our productivity has increased dramatically since implementation.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 3,
    name: 'Melissa Rodriguez',
    role: 'CEO',
    company: 'Stellar Startups',
    content: 'As a startup founder, I needed a solution that could scale with my business. This platform has exceeded all my expectations in flexibility and performance.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 1,
    name: 'Basic',
    price: '$29',
    description: 'Perfect for individuals and small projects',
    features: [
      'Core features',
      '5 project limit',
      'Basic analytics',
      'Community support',
    ],
    buttonText: 'Get Started',
  },
  {
    id: 2,
    name: 'Pro',
    price: '$79',
    description: 'Ideal for growing businesses and teams',
    features: [
      'All Basic features',
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'API access',
    ],
    highlighted: true,
    buttonText: 'Get Pro',
  },
  {
    id: 3,
    name: 'Enterprise',
    price: '$199',
    description: 'For large organizations with advanced needs',
    features: [
      'All Pro features',
      'Dedicated support',
      'Custom integrations',
      'Advanced security',
      'Usage insights',
      'SLA agreement',
    ],
    buttonText: 'Contact Sales',
  },
];

export const footerLinks: FooterLink[] = [
  {
    id: 1,
    title: 'Product',
    links: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Integrations', href: '#' },
      { name: 'Changelog', href: '#' },
    ],
  },
  {
    id: 2,
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Community', href: '#' },
    ],
  },
  {
    id: 3,
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    id: 4,
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  },
];