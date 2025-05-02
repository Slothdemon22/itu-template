import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import Logo from '@/components/landingPage/Logo'; // Adjust the import path as necessary

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Integrations', href: '#' },
        { name: 'Changelog', href: '#' },
        { name: 'Roadmap', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Support', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Community', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'GDPR', href: '#' },
        { name: 'Security', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Logo color="text-white" />
            <p className="mt-4 text-gray-400 leading-relaxed">
              Elevate is a comprehensive business platform designed to help companies streamline operations, boost productivity, and drive growth through innovative tools and insights.
            </p>
            <div className="flex mt-6 space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-colors duration-300 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="font-semibold text-lg mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight 
                        size={14} 
                        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Elevate. All rights reserved.
          </p>
          <div>
            <select className="bg-gray-800 text-gray-400 rounded-lg border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="en">English (US)</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;