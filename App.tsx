
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  User, Mail, Phone, MapPin, Linkedin, Github, 
  Cpu, Layout, Settings, Rocket, Award, BookOpen, ChevronRight,
  ExternalLink, Download, FileText, Target, Zap
} from 'lucide-react';

import { 
  PERSONAL_INFO, EXPERIENCES, EDUCATIONS, 
  PROJECTS, SKILLS, ACHIEVEMENTS, CERTIFICATIONS 
} from './constants';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center ">
      <div className="text-xl font-bold tracking-tighter text-indigo-600">ZAHEER.</div>
      <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
        {['About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Contact'].map((item) => (
          <button 
            key={item} 
            onClick={() => scrollTo(item.toLowerCase())}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            {item}
          </button>
        ))}
      </div>
      <a href="https://www.linkedin.com/in/mohammed-zaheer-ahamad" className="hidden md:flex" target="_blank">
      <button 
        className="px-5 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 cursor-pointer"
      >
        Hire Me
      </button>
      </a>
    </nav>
  );
};

const Hero = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-text-item", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.4");

      gsap.to(".hero-blob", {
        x: "random(-15, 15)",
        y: "random(-15, 15)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="min-h-screen pt-24 pb-12 flex flex-col md:flex-row items-center justify-center px-6 md:px-24 overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 hero-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 hero-blob" style={{animationDelay: '1s'}}></div>
      
      <div className="flex-1 text-center md:text-left z-10">
        <h4 className="hero-text-item text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4">Innovative Mechanical Engineer</h4>
        <h1 className="hero-text-item text-5xl md:text-7xl font-serif text-slate-900 leading-tight mb-6">
          Designing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Future of Robotics</span>
        </h1>
        <p className="hero-text-item text-lg text-slate-600 max-w-xl mb-10 leading-relaxed">
          {PERSONAL_INFO.summary}
        </p>
        <div className="hero-text-item flex flex-wrap gap-4 justify-center md:justify-start">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all transform hover:-translate-y-1 cursor-pointer">
            View Projects <Rocket size={18} />
          </button>
          <a href="#" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all transform hover:-translate-y-1 shadow-sm">
            Resume <Download size={18} />
          </a>
        </div>
      </div>

      <div ref={imageRef} className="flex-1 mt-12 md:mt-0 relative flex justify-center">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 bg-indigo-600 rounded-[2rem] rotate-6 opacity-10"></div>
          <div className="absolute inset-0 bg-blue-500 rounded-[2rem] -rotate-3 opacity-10"></div>
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-200">
            <img 
              src="/Heroimg.jpeg" 
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `/Heroimg.jpeg`;
              }}
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <Settings size={20} />
             </div>
             <div>
               <div className="text-xs text-slate-500">Mechanical Precision</div>
               <div className="text-sm font-bold text-slate-900">CAD Specialist</div>
             </div>
          </div>
          <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Cpu size={20} />
             </div>
             <div>
               <div className="text-xs text-slate-500">Intelligence</div>
               <div className="text-sm font-bold text-slate-900">Robotics & CV</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-12 text-center md:text-left section-header-animate">
    <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mt-2">{title}</h2>
    <div className="h-1.5 w-20 bg-indigo-600 mt-4 rounded-full"></div>
  </div>
);

const About = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 px-6 md:px-24 bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto about-content">
        <SectionHeader title="A New Era of Engineering" subtitle="About Me" />
        <div className="grid md:grid-cols-5 gap-12 items-center">
           <div className="md:col-span-2 relative">
  {/* rotated accent layer */}
  <div className="aspect-square bg-indigo-600 rounded-3xl rotate-3 absolute inset-0 opacity-10"></div>

  {/* image card */}
  <div className="relative aspect-square bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
    <img
      src="/Heroimg.jpeg"   // replace with your image path
      alt="About Me"
      className="w-full h-full object-cover"
    />
  </div>
</div>

           <div className="md:col-span-3 space-y-6">
              <p className="text-xl font-medium text-slate-800 leading-relaxed">
                I am a passionate Mechanical Engineer and Robotics specialist dedicated to bridging the gap between hardware and software.
              </p>
              <p className="text-slate-600 leading-relaxed">
                With a background in both structural design (CAD) and intelligence (AI/CV), I focus on creating machines that aren't just efficient, but smart. Whether it's optimizing the aerodynamics of an Ornithopter or developing computer-vision algorithms for a 5-DOF robotic arm, my goal is to push the limits of what automated systems can achieve.
              </p>
              <div className="flex gap-4 pt-4">
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold text-indigo-600">5+</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Robotic Builds</span>
                 </div>
                 <div className="w-px h-10 bg-slate-200"></div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold text-indigo-600">3+</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Industry Wins</span>
                 </div>
                 <div className="w-px h-10 bg-slate-200"></div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold text-indigo-600">94%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Robotics Cert</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from("#skills .section-header-animate", {
        scrollTrigger: {
          trigger: "#skills",
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8
      });

      // Skill Cards
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: "#skills",
          start: "top 75%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all" // Ensure visibility if something goes wrong
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="py-24 px-6 md:px-24 bg-white min-h-[400px]">
      <SectionHeader title="Technical Arsenal" subtitle="Skills & Tools" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="skill-card p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-all hover:shadow-xl group">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6 group-hover:scale-110 transition-transform">
            <Layout size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-900">Core Engineering</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.core.map(s => <span key={s} className="px-3 py-1.5 bg-white text-slate-600 rounded-lg text-sm border border-slate-200 shadow-sm">{s}</span>)}
          </div>
        </div>

        <div className="skill-card p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-all hover:shadow-xl group">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:scale-110 transition-transform">
            <Settings size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-900">Technologies & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.technologies.map(s => <span key={s} className="px-3 py-1.5 bg-white text-slate-600 rounded-lg text-sm border border-slate-200 shadow-sm">{s}</span>)}
          </div>
        </div>

        <div className="skill-card p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-all hover:shadow-xl group">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm mb-6 group-hover:scale-110 transition-transform">
            <Cpu size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-900">AI & Computer Vision</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.ai.map(s => <span key={s} className="px-3 py-1.5 bg-white text-slate-600 rounded-lg text-sm border border-slate-200 shadow-sm">{s}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceTimeline = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: "#experience",
          start: "top 80%",
        },
        x: -20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-24 px-6 md:px-24 bg-slate-50">
      <div className="grid md:grid-cols-2 gap-24">
        <div>
          <SectionHeader title="Professional Journey" subtitle="Experience" />
          <div className="space-y-12">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="timeline-item relative pl-10 border-l-2 border-indigo-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-sm"></div>
                <div className="text-indigo-600 font-bold text-sm mb-2">{exp.duration}</div>
                <h3 className="text-2xl font-bold text-slate-900">{exp.role}</h3>
                <div className="text-lg text-slate-600 font-medium mb-4">{exp.organization}</div>
                <ul className="space-y-3">
                  {exp.points.map((p, i) => (
                    <li key={i} className="text-slate-500 text-sm flex gap-3">
                      <ChevronRight size={16} className="text-indigo-400 mt-1 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="Academic Roots" subtitle="Education" />
          <div className="space-y-12">
            {EDUCATIONS.map((edu) => (
              <div key={edu.id} className="timeline-item relative pl-10 border-l-2 border-blue-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
                <div className="text-blue-500 font-bold text-sm mb-2">{edu.duration}</div>
                <h3 className="text-2xl font-bold text-slate-900">{edu.degree}</h3>
                <div className="text-lg text-slate-600 font-medium mb-4">{edu.institution}</div>
                <p className="text-slate-500 text-sm">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       // Header Animation
       gsap.from("#projects .section-header-animate", {
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8
      });

      // Projects Grid Animation
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: "#projects",
          start: "top 70%",
          toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        clearProps: "all"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 md:px-24 bg-white min-h-[600px]">
      <SectionHeader title="Engineering Feats" subtitle="Featured Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PROJECTS.map((proj) => (
          <div key={proj.id} className="project-card group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-white transition-all hover:shadow-2xl hover:shadow-indigo-100">
            <div className="p-8 md:p-10 flex flex-col h-full">
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tech.map(t => <span key={t} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">{t}</span>)}
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{proj.title}</h3>
              
              <div className="mb-6 space-y-4">
                {proj.description.map((d, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed text-sm">{d}</p>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap size={14} className="text-indigo-500" />
                  Impact & Results
                </div>
                <ul className="space-y-2">
                  {proj.impact.map((im, i) => (
                    <li key={i} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      {im}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 px-6 md:px-24 bg-slate-900 text-white rounded-[3rem] mx-4 mb-12 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-16 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div>
          <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Milestones</span>
          <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-12">Achievements & Awards</h2>
          <div className="grid gap-6">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-start gap-4">
                <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{ach.title}</h4>
                  <p className="text-slate-400 text-sm">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Verified</span>
          <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-12">Certifications</h2>
          <div className="grid gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all flex justify-between items-center group">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-lg">
                      <BookOpen size={20} />
                   </div>
                   <div>
                     <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{cert.name}</h4>
                     <p className="text-xs text-slate-500">{cert.issuer}</p>
                   </div>
                </div>
                <ExternalLink size={18} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <SectionHeader title="Let's Build Something" subtitle="Contact Me" />
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            Interested in collaboration or have a complex mechanical engineering challenge? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(`mailto:${PERSONAL_INFO.email}`)}>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <Mail size={20} />
              </div>
              <span className="text-slate-900 font-semibold">{PERSONAL_INFO.email}</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <Phone size={20} />
              </div>
              <span className="text-slate-900 font-semibold">{PERSONAL_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(`https://${PERSONAL_INFO.linkedin}`, '_blank')}>
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                <Linkedin size={20} />
              </div>
              <span className="text-slate-900 font-semibold">linkedin.com/in/mohammed-zaheer-ahamad</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-indigo-50">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Subject</label>
              <input type="text" placeholder="Project Inquiry" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Message</label>
              <textarea rows={4} placeholder="Hello, I have an idea for..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition-all resize-none"></textarea>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all transform active:scale-95 shadow-lg shadow-indigo-100 cursor-pointer">
              Send Message <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-slate-100 bg-white">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-2xl font-bold tracking-tighter text-indigo-600">ZAHEER.</div>
      <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Zaheer Ahamad Mohammed. Built with Precision & Code.</p>
      <div className="flex gap-4">
        {[Linkedin, Github, FileText].map((Icon, i) => (
          <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">
            <Icon size={18} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger to ensure all triggers are correctly placed after initial mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="antialiased scroll-smooth selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <ExperienceTimeline />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
