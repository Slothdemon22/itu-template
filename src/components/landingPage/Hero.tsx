"use client";
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, PlayCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 overflow-hidden"
      style={{ 
        '--mouse-x': '0.5', 
        '--mouse-y': '0.5'
      } as React.CSSProperties}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10" />
        <div 
          className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/20 blur-[120px]" 
          style={{ 
            transform: `translate(calc(var(--mouse-x) * 40px), calc(var(--mouse-y) * 40px))`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div 
          className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-500/20 blur-[120px]" 
          style={{ 
            transform: `translate(calc(var(--mouse-x) * -40px), calc(var(--mouse-y) * -40px))`,
            transition: 'transform 0.2s ease-out'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 md:pt-48 md:pb-32 flex flex-col lg:flex-row items-center">
        <div className="max-w-3xl lg:w-1/2 mb-16 lg:mb-0">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md text-blue-300 text-xs font-medium mb-6 border border-blue-500/30">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Introducing Elevate Platform 2.0
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 text-white leading-[1.1]">
            <span className="block">Elevate Your</span>
            <span className="block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                Business Growth
              </span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
            Transform your ideas into reality with our comprehensive suite of tools designed to boost productivity, enhance collaboration, and drive measurable growth for businesses of all sizes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center gap-2">
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/15 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border border-white/20">
              <PlayCircle size={20} />
              Watch Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                  alt={`User ${i}`}
                  className="w-8 h-8 rounded-full border-2 border-slate-900"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-medium text-white border-2 border-slate-900">
                +5k
              </div>
            </div>
            <div className="ml-4 text-sm text-gray-300">
              <span className="font-semibold text-white">5,000+</span> businesses already growing
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 lg:pl-16 flex justify-center">
          <div className="relative w-full max-w-lg">
            {/* Glass card mockup */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-2xl backdrop-blur-md border border-white/10 p-6 shadow-xl transform rotate-3 hover:rotate-1 transition-transform duration-500">
              <div className="h-4 w-4 rounded-full bg-white/20 mb-4"></div>
              <div className="h-3 w-24 rounded-md bg-white/20 mb-2"></div>
              <div className="h-2 w-32 rounded-md bg-white/10 mb-6"></div>
              <div className="h-32 w-full rounded-lg bg-white/10"></div>
              <div className="mt-4 h-3 w-16 rounded-md bg-white/20"></div>
            </div>
            
            {/* Main dashboard mockup */}
            <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-white/10 shadow-2xl p-6 backdrop-blur-lg transform hover:translate-y-[-8px] transition-all duration-500">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"></div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="h-3 w-24 rounded-md bg-white/20 mb-2"></div>
                  <div className="h-5 w-32 rounded-md bg-white/30"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-blue-300" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-purple-500/30 flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-purple-300" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="h-3 w-12 rounded-md bg-white/20 mb-2"></div>
                  <div className="h-6 w-20 rounded-md bg-white/30 mb-2"></div>
                  <div className="h-2 w-full rounded-md bg-gradient-to-r from-blue-500 to-blue-300"></div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="h-3 w-12 rounded-md bg-white/20 mb-2"></div>
                  <div className="h-6 w-24 rounded-md bg-white/30 mb-2"></div>
                  <div className="h-2 w-full rounded-md bg-gradient-to-r from-purple-500 to-purple-300"></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-6">
                <div className="flex justify-between mb-4">
                  <div className="h-3 w-32 rounded-md bg-white/20"></div>
                  <div className="h-3 w-16 rounded-md bg-white/10"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 mr-3"></div>
                      <div className="flex-1">
                        <div className="h-3 w-1/2 rounded-md bg-white/20 mb-1"></div>
                        <div className="h-2 w-24 rounded-md bg-white/10"></div>
                      </div>
                      <div className="h-4 w-12 rounded-md bg-emerald-500/30"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="h-9 w-32 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats bar */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-8 border-t border-white/10">
          {[
            { label: 'Active Users', value: '100K+' },
            { label: 'Revenue Growth', value: '37%' },
            { label: 'Countries', value: '150+' },
            { label: 'Uptime', value: '99.99%' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;