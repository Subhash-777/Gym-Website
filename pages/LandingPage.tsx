
import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const { isDark } = useTheme();
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070" 
            alt="Gym background" 
            className="w-full h-full object-cover brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-700 rounded-full text-[10px] font-bold tracking-[0.2em] text-white uppercase animate-pulse">
            Premium Elite Fitness
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
            TRANSFORM YOUR <br /><span className="text-red-600">LIMITS</span> INTO POWER
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light">
            Professional equipment, elite trainers, and a community built on grit. Experience the next level of human performance at APEX.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={onLoginClick}
              className="px-10 py-4 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-red-900/40 w-full sm:w-auto hover:scale-105 active:scale-95"
            >
              MEMBER ACCESS
            </button>
            <button 
              onClick={scrollToContact}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold text-lg transition-all w-full sm:w-auto hover:scale-105 active:scale-95"
            >
              JOIN APEX TODAY
            </button>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold text-red-600 tracking-[0.3em] uppercase mb-2">Our Offerings</h2>
            <h3 className="text-4xl font-bold">EXCELLENCE IN EVERY REP</h3>
          </div>
          <p className="text-slate-500 max-w-sm text-sm">We provide tailored programs designed by world-class athletes to ensure you reach your maximum potential.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'BODYBUILDING', desc: 'Sculpt your physique with advanced hyper-trophy techniques.', img: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&q=80&w=400' },
            { title: 'POWERLIFTING', desc: 'Focus on the big three: Squat, Bench, and Deadlift for raw strength.', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400' },
            { title: 'ATHLETICISM', desc: 'Agility, speed, and functional power for peak sports performance.', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400' },
          ].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-96 mb-6 overflow-hidden rounded-2xl">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-2xl font-black text-white tracking-tight">{item.title}</h4>
                </div>
              </div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section className={`py-24 ${isDark ? 'bg-[#1e1e1e]' : 'bg-white shadow-inner'} rounded-3xl px-8`}>
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">MEMBERSHIP PLANS</h3>
          <p className="text-slate-500">Transparent pricing for premium results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: 'SILVER', price: '49', features: ['All Gym Equipment', 'Locker Access', 'Mobile App Access'] },
            { name: 'GOLD', price: '89', features: ['Personal Trainer', 'Group Classes', 'Nutrition Plan', 'Steam & Sauna'] },
            { name: 'PLATINUM', price: '149', features: ['Unlimited Guest Passes', 'Priority Booking', '24/7 Access', 'Physiotherapy'] },
          ].map((plan, idx) => (
            <div key={idx} className={`p-8 rounded-2xl border ${idx === 1 ? 'border-red-600 border-2 scale-105 shadow-xl' : isDark ? 'border-slate-800' : 'border-gray-200'} transition-all`}>
              <h4 className="text-xl font-black tracking-widest mb-2">{plan.name}</h4>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-slate-500 ml-1">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-400">
                    <svg className="w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${idx === 1 ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                GET STARTED
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="max-w-7xl mx-auto px-4 py-20">
        <div className={`rounded-3xl overflow-hidden border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200 shadow-xl'} flex flex-col lg:flex-row`}>
          <div className="lg:w-1/2 p-12 bg-red-700 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-4xl font-black mb-6">GET IN TOUCH</h3>
              <p className="text-red-100 text-lg mb-8 leading-relaxed">
                Have questions about our programs or memberships? Our team is here to help you start your journey.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-200">Phone</p>
                    <p className="font-bold">+1 (555) 000-APEX</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-200">Email</p>
                    <p className="font-bold">hello@apexgym.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-200">Location</p>
                    <p className="font-bold">123 Iron Street, Muscle Bay, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 flex space-x-6">
              {['facebook', 'instagram', 'twitter', 'youtube'].map(social => (
                <a key={social} href={`#${social}`} className="hover:scale-110 transition-transform">
                   <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                      <span className="sr-only capitalize">{social}</span>
                      <div className="w-5 h-5 bg-white/80 rounded-sm"></div>
                   </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 p-12">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your interest! We'll be in touch soon."); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Interested In</label>
                <select className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                  <option>General Membership</option>
                  <option>Personal Training</option>
                  <option>Bodybuilding Program</option>
                  <option>Powerlifting Program</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
                <textarea rows={4} placeholder="Tell us about your fitness goals..." className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-red-700 text-white rounded-xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-red-800 transition-all shadow-xl">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
