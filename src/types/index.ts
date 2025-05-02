export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
  }
  
  export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
  }
  
  export interface PricingTier {
    id: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    buttonText: string;
  }
  
  export interface FooterLink {
    id: number;
    title: string;
    links: Array<{
      name: string;
      href: string;
    }>;
  }