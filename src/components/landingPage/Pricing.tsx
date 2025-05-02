// app/components/PricingSection.tsx

'use client'

import React from 'react'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

interface Plan {
  name: string
  price: string
  description: string
  features: string[]
  ctaText: string
  isPopular?: boolean
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for small businesses and startups',
    features: ['Up to 10 team members', 'Basic analytics', '5GB storage', 'Email support', '2 projects'],
    ctaText: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 50 team members',
      'Advanced analytics',
      '50GB storage',
      'Priority support',
      'Unlimited projects',
      'Custom dashboards',
      'API access',
    ],
    ctaText: 'Get Started',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited team members',
      'Enterprise analytics',
      'Unlimited storage',
      '24/7 dedicated support',
      'Unlimited projects',
      'Custom integrations',
      'Dedicated account manager',
      'SSO & advanced security',
    ],
    ctaText: 'Contact Sales',
  },
]

const PricingCard: React.FC<Plan> = ({ name, price, description, features, ctaText, isPopular }) => {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-md ${
        isPopular
          ? 'border-blue-500 ring-2 ring-blue-500/20 relative'
          : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
          Most Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {price !== 'Custom' && <span className="text-gray-600 ml-2 text-base">/month</span>}
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-gray-700">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/payment"
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center group ${
            isPopular
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          } transition-colors duration-300`}
        >
          {ctaText}
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  )
}

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">Choose the plan that best fits your needs. No hidden fees or commitments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <Link href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
            Compare plans in detail
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
