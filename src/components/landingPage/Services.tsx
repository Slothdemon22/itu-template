import React from 'react';
import { 
  BarChart3, 
  Users, 
  Zap, 
  ShieldCheck, 
  BarChart, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, color }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:border-blue-100">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const features: Array<FeatureCardProps> = [
  {
    title: 'Advanced Analytics',
    description: 'Gain deep insights into your business performance with our powerful analytics tools.',
    icon: <BarChart3 size={24} className="text-blue-600" />,
    color: 'bg-blue-100'
  },
  {
    title: 'Team Collaboration',
    description: 'Seamlessly collaborate with your team members in real-time across all devices.',
    icon: <Users size={24} className="text-purple-600" />,
    color: 'bg-purple-100'
  },
  {
    title: 'Lightning Fast',
    description: 'Experience blazing fast performance with our optimized infrastructure.',
    icon: <Zap size={24} className="text-amber-600" />,
    color: 'bg-amber-100'
  },
  {
    title: 'Enterprise Security',
    description: 'Rest easy knowing your data is protected by enterprise-grade security measures.',
    icon: <ShieldCheck size={24} className="text-emerald-600" />,
    color: 'bg-emerald-100'
  },
  {
    title: 'Customizable Dashboards',
    description: 'Create personalized dashboards that show exactly what matters to your business.',
    icon: <BarChart size={24} className="text-rose-600" />,
    color: 'bg-rose-100'
  },
  {
    title: 'Automation Tools',
    description: 'Save time and reduce errors by automating repetitive tasks and workflows.',
    icon: <Clock size={24} className="text-indigo-600" />,
    color: 'bg-indigo-100'
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features to Transform Your Business
          </h2>
          <p className="text-xl text-gray-600">
            Our platform provides all the tools you need to streamline operations, boost productivity, and drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
            Explore all features
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;