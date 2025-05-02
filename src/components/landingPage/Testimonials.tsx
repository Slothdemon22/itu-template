import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    content: "Elevate has completely transformed how we operate. The analytics tools gave us insights we never knew we needed, and the collaboration features have made our remote teams more productive than ever.",
    author: "Sarah Johnson",
    role: "Chief Marketing Officer",
    company: "Quantum Media",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5
  },
  {
    content: "The automation capabilities alone saved us 20+ hours per week. Our team can now focus on strategic initiatives instead of repetitive tasks. The ROI was visible within the first month.",
    author: "Michael Chen",
    role: "Operations Director",
    company: "Nexus Technologies",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5
  },
  {
    content: "We evaluated multiple platforms before choosing Elevate. The decision has paid off tremendously - implementation was smooth, user adoption was high, and our productivity metrics are up by 34%.",
    author: "Emily Rodriguez",
    role: "VP of Product",
    company: "Horizon Innovations",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5
  }
];

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, company, avatar, rating }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{content}"</p>
      <div className="flex items-center">
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Innovative Companies
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers have to say about how Elevate has transformed their businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {['Netflix', 'Shopify', 'Spotify', 'Airbnb', 'Slack', 'Adobe'].map((company) => (
            <div key={company} className="text-gray-400 text-xl font-semibold">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;