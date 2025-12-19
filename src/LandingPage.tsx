// import React from 'react';
import { useRef } from 'react';
import { Tick02Icon, Cancel01Icon, Database01Icon, Linkedin01Icon, Facebook01Icon, NoteEditIcon } from 'hugeicons-react';
import { Search, Filter, UserCheck, Play, CheckCircle2, Target, ArrowDown } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardFooter } from './components/ui/card';
import { Input } from './components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Tilt } from './components/ui/tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  // New ref for the context section
  const contextRef = useRef<HTMLElement>(null);
  const engineRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Hero Animation
    if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll(".hero-animate"), {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }

    // Context Section Animation
    if (contextRef.current) {
        gsap.from(contextRef.current.querySelectorAll("h2"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: contextRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(contextRef.current.querySelectorAll(".flex-1"), { // The image placeholder
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: contextRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(contextRef.current.querySelectorAll(".space-y-12 > div"), { // The 3 points
            x: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: contextRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Role Rotator Animation
    if (rolesRef.current) {
        const roles = rolesRef.current.querySelectorAll('.role-item');
        const tl = gsap.timeline({ repeat: -1 });

        // Initial setup - hide all except first
        gsap.set(roles, { y: 20, opacity: 0 });
        
        roles.forEach((role, i) => {
             // Animate in
             tl.to(role, { 
                y: 0, 
                opacity: 1, 
                duration: 0.5, 
                ease: "power2.out" 
             })
             // Stay visible
             .to(role, { 
                duration: 1.5 
             })
             // Animate out
             .to(role, { 
                y: -20, 
                opacity: 0, 
                duration: 0.5, 
                ease: "power2.in" 
             });
        });
    }

    // Steps Animation
    const steps = stepsRef.current?.children;
    if (steps) {
        gsap.fromTo(steps, 
            { 
                y: 50, 
                opacity: 0 
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stepsRef.current,
                    start: "top 80%", // Start animation when top of the container hits 80% of viewport
                    toggleActions: "play none none reverse" 
                }
            }
        );
    }

    // Engine Section Animation
    if (engineRef.current) {
        gsap.from(engineRef.current.querySelector("h2"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: engineRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(engineRef.current.querySelector("p"), {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1,
            scrollTrigger: {
                trigger: engineRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(engineRef.current.querySelector(".group"), { // The video container
            scale: 0.95,
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: engineRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Pipeline Section Animation (How the Engine Works)
    if (pipelineRef.current) {
        // Header
        gsap.from(pipelineRef.current.querySelector(".text-center"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: pipelineRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // Pipeline Steps
        gsap.from(pipelineRef.current.querySelectorAll(".grid > div"), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: pipelineRef.current.querySelector(".grid"),
                start: "top 80%",
                toggleActions: "play none none reverse",
                markers: false // Disable markers for production
            }
        });

        // Outcome Section (Bottom part)
        const outcomeSection = pipelineRef.current.querySelector(".outcome-section-container");
        if (outcomeSection) {
             gsap.fromTo(outcomeSection.querySelector(".order-2"), 
                { x: -40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: outcomeSection,
                        start: "top 75%",
                        toggleActions: "play none none none",
                        once: true
                    }
                }
            );

            gsap.fromTo(outcomeSection.querySelector(".order-1"),
                { x: 40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: outcomeSection,
                        start: "top 75%",
                        toggleActions: "play none none none",
                        once: true
                    }
                }
            );
        }
    }

    // Features Animation
    if (featuresRef.current) {
        const featureCards = featuresRef.current.querySelectorAll(".feature-card");
        gsap.fromTo(featureCards,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
  }, { scope: undefined });

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-gray-200">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            <div className="font-semibold text-base sm:text-lg tracking-tight">Product</div>
            <div className="flex gap-2 sm:gap-4">
                <Button variant="default" size="sm" className="bg-[#111111] text-white hover:bg-black/90 text-xs sm:text-sm px-3 sm:px-4">Join the waitlist</Button>
            </div>
        </div>
      </nav>

      {/* 1. Hero / Promise */}
      <section ref={heroRef} className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero-bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-x-12 lg:gap-y-8 items-center relative z-10">
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="hero-animate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
                10 Quality Leads <br className="hidden sm:block"/>Every Day
              </h1>
              <p className="hero-animate text-base sm:text-lg md:text-xl text-gray-500 font-light max-w-md leading-relaxed">
                Build to deliver verified contacts you can confidently message - meet your most promising prospects today.
              </p>
            </div>
            <div className="hero-animate flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                <Button className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-[#111111] text-white hover:bg-black/90 rounded-md w-full sm:w-auto">Join the waitlist</Button>
            </div>
          </div>
          <div className="hero-animate relative w-full flex items-center justify-center lg:justify-end order-1 lg:order-2">
            {/* Tilt Container */}
            <Tilt className="w-full max-w-[640px] lg:max-w-none lg:scale-[1.2] lg:origin-center group" rotationFactor={8} perspective={2000}>
                {/* 3D Rotated Card (Base static skew + Dynamic tilt) */}
                {/* Note: We apply the static skew to a wrapper, and let Tilt handle the dynamic part, OR we combine them. */}
                {/* Since Tilt component wraps children in a transform div, we need to be careful not to conflict transforms. */}
                {/* Let's modify the structure slightly: The Tilt component rotates its inner div based on mouse. */}
                {/* We want the static skew (-12deg Y) to ALWAYS be there, and the mouse movement to add to it. */}
                
                {/* Actually, looking at the Tilt implementation I just wrote, it sets transform directly. */}
                {/* Let's customize the Tilt usage here or modify the Tilt component to accept a base rotation. */}
                {/* For simplicity, I will inline the specific logic for this hero card instead of using the generic component, 
                    OR I'll use the generic component and wrap the skewed content inside it. */}

                 <div className="relative w-full transition-all duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(-12deg)_rotateX(2deg)] rounded-xl pointer-events-none">
                    <img 
                        src="/assets/dashboard-preview.png" 
                        alt="Platform Preview" 
                        className="w-full h-auto rounded-xl border border-white/20 shadow-[0_20px_50px_rgba(255,255,255,0.3)]"
                    />
                </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* 2. Context section – "Where are these leads coming from?" */}
      <section ref={contextRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-gray-100 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left Column */}
            <div className="space-y-8 flex flex-col h-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111]">
                    These leads were found for you
                </h2>
                <div className="flex-1 bg-[#111111] rounded-3xl flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden min-h-[300px] relative">
                        <iframe 
                            src="https://player.vimeo.com/video/1148118071?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1" 
                            className="absolute inset-0 w-full h-full scale-[1.02] object-cover"
                            frameBorder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="table-animation"
                        ></iframe>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12 flex flex-col justify-center py-4 lg:py-8">
                {/* Point 1 */}
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-[#111111]">
                        <Database01Icon size={44} />
                    </div>
                    <p className="text-xl sm:text-[24px] text-gray-600 leading-[1.3] tracking-tight pt-1">
                        with <span className="font-semibold text-[#111111]">your requirements</span> in mind from 100+ verified sources.
                    </p>
                </div>

                {/* Point 2 */}
                <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 relative w-16 h-16 pt-1">
                         <div className="absolute top-0 left-0 w-10 h-10 rounded-xl border-2 border-[#111111] flex items-center justify-center -rotate-12 bg-white shadow-sm z-10">
                            <Linkedin01Icon size={20} strokeWidth={2.5} />
                         </div>
                         <div className="absolute bottom-0 right-0 w-10 h-10 rounded-xl border-2 border-[#111111] flex items-center justify-center rotate-12 bg-white shadow-sm">
                            <Facebook01Icon size={20} strokeWidth={2.5} />
                         </div>
                    </div>
                    <p className="text-xl sm:text-[24px] text-gray-600 leading-[1.3] tracking-tight pt-1">
                        pulled from <span className="font-semibold text-[#111111]">social platforms and business databases</span>, filtered to <span className="font-semibold text-[#111111]">fit</span>
                    </p>
                </div>

                {/* Point 3 */}
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-[#111111]">
                        <NoteEditIcon size={44} />
                    </div>
                    <p className="text-xl sm:text-[24px] text-gray-600 leading-[1.3] tracking-tight pt-1">
                        then enriched with <span className="font-semibold text-[#111111]">context</span> so <span className="font-semibold text-[#111111]">your first message is always personal and does not sound templated</span>
                    </p>
                </div>
            </div>
        </div>
      </section>

        {/* --- SECTION: MEET OUR ENGINE --- */}
        <section ref={engineRef} className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Header Text */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#111111] leading-[1.1]">
                Meet our engine
              </h2>
              <p className="text-lg sm:text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                …that delivers quality leads in minutes. We don’t just find emails – we verify fit to your criteria and add the context you need for successful outreach.
              </p>
            </div>

            {/* Video Asset */}
            <div className="max-w-5xl mx-auto">
              <div className="w-full bg-[#111111] rounded-2xl flex flex-col items-center justify-center text-zinc-400 relative overflow-hidden group shadow-2xl border border-gray-100">
                <div className="w-full relative" style={{ padding: '61.43% 0 0 0' }}>
                  <iframe 
                      src="https://player.vimeo.com/video/1148118000?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1" 
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="agent-prepare"
                  ></iframe>
                </div>
              </div>
              <p className="text-center text-xs sm:text-sm text-gray-400 mt-6 uppercase tracking-wider font-medium">
                Watch the Agent in Action
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION: HOW IT WORKS (Dark Mode) --- */}
        <section ref={pipelineRef} className="py-16 sm:py-20 md:py-24 bg-[#111111] text-zinc-50 relative overflow-hidden">
           {/* Decorative background glow for dark mode */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-zinc-900/50 blur-[100px] pointer-events-none rounded-full opacity-50"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            
            {/* Pipeline Header */}
            <div className="text-center mb-16 space-y-4">
              <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">How the Engine Works</h3>
              <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto">A continuous pipeline from definition to delivery.</p>
            </div>

            {/* The Pipeline Graph */}
            <div className="relative w-full">
              
              {/* Horizontal Connecting Line (Dark Mode) */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-white/10 z-0">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 animate-pulse-line"></div>
              </div>
              
              {/* Vertical Line on Mobile (Dark Mode) */}
              <div className="md:hidden absolute top-[5%] bottom-[5%] left-8 w-px bg-white/10 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
                {[
                    { step: "01", title: "Define", desc: "Set precise targeting criteria for your ideal prospect.", icon: Target },
                    { step: "02", title: "Scan", desc: "Engine pulls prospects from LinkedIn & business databases.", icon: Search },
                    { step: "03", title: "Verify", desc: "Filters out junk to ensure fresh, valid contact data.", icon: Filter },
                    { step: "04", title: "Enrich", desc: "Adds personal context for tailored outreach messages.", icon: UserCheck }
                ].map((item, i) => (
                  <div key={i} className="flex md:flex-col items-start md:items-center gap-6 md:gap-0 group">
                    
                    {/* Node (Dark Mode) */}
                    <div className="relative">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-[#111111] rounded-full border border-white/10 flex items-center justify-center z-10 transition-all duration-300 group-hover:border-white/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-500 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-[#111111] text-[10px] font-bold px-2 py-0.5 rounded-full text-gray-400 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                        {item.step}
                      </div>
                    </div>

                    {/* Content (Dark Mode) */}
                    <div className="md:text-center md:mt-8 pt-2 md:pt-0 max-w-xs">
                      <h4 className="text-lg font-medium text-white mb-2 group-hover:text-white transition-colors tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Visual Connector to Outcome (Dark Mode) */}
            <div className="flex flex-col items-center justify-center my-16 md:my-20">
              <div className="h-16 w-px bg-white/10"></div>
              <div className="w-8 h-8 rounded-full bg-[#111111] border border-white/10 text-gray-500 flex items-center justify-center -mt-1 z-10">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Integrated Outcome Section (Dark Mode) */}
            <div className="w-full mt-8 outcome-section-container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                <div className="order-2 lg:order-1">
                    {/* Asset Representation - Dark Mode */}
                    <div className="bg-[#111111] border border-white/10 rounded-xl p-3 shadow-lg transform transition-transform hover:scale-[1.02] duration-500">
                      <div className="flex items-center gap-2 mb-4 px-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                      </div>
                      <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-black opacity-90 relative" style={{ padding: '60.88% 0 0 0' }}>
                        <iframe 
                          src="https://player.vimeo.com/video/1148118015?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1" 
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0" 
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                          referrerPolicy="strict-origin-when-cross-origin"
                          title="ai-agent-chat"
                        ></iframe>
                      </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2 space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
                      You get actionable Leads
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-400 font-light leading-relaxed">
                      A personalized list lands in your inbox, Sheet/CSV, or CRM.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white font-medium">Feedback Loop</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            You can make it better each day with quick <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-white text-[#111111] align-middle mx-0.5"><Tick02Icon size={10} /></span>/<span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-white text-[#111111] align-middle mx-0.5"><Cancel01Icon size={10} /></span> feedback.
                        </p>
                      </div>
                  </div>

                  <Button variant="secondary" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-100 border-0">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </section>

      {/* 4. Features / Factors of value */}
      <section ref={featuresRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
             <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#111111]">Why this works</h2>
                <p className="text-lg sm:text-xl text-gray-500 font-light leading-relaxed">
                    Quality over quantity. We focus on the factors that actually convert.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6">
                 {/* Card 1: 2 minutes - Top Left - Spans 2 cols */}
                 <div className="feature-card md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] transition-all hover:shadow-sm">
                      <div className="mt-8 space-y-2">
                           <h3 className="flex flex-wrap items-baseline gap-2 font-medium tracking-tighter text-[#111111]"><span className="text-7xl sm:text-8xl">2</span><span className="text-2xl sm:text-3xl font-bold text-[#111111]">minutes</span></h3>
                           <p className="text-gray-500 leading-relaxed text-lg">to set your ICP criteria and generate your first lead list.</p>
                      </div>
                 </div>

                 {/* Card 2: 8/10 leads - Top Right - Spans 4 cols (Wide) */}
                 <div className="feature-card md:col-span-4 bg-[#fcfcfc] border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-center min-h-[280px] transition-all hover:shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 z-0">
                          <img src="/assets/quality-card-bg.png" alt="Background" className="w-full h-full object-cover opacity-100" />
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 relative z-10">
                           <h3 className="flex flex-wrap items-baseline gap-2 font-medium tracking-tighter text-[#111111] whitespace-nowrap"><span className="text-7xl sm:text-8xl">8/10</span><span className="text-2xl sm:text-3xl font-bold text-[#111111]">leads</span></h3>
                           <p className="text-gray-500 leading-relaxed text-lg max-w-md">Our target after 14 days of feedback. At least 80% of leads match your ICP. Guaranteed.</p>
                      </div>
                 </div>

                 {/* Card 3: 3 minutes/day - Bottom Left - Spans 2 cols */}
                 <div className="feature-card md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] transition-all hover:shadow-sm">
                      <div className="mt-8 space-y-2">
                           <h3 className="flex flex-wrap items-baseline gap-2 font-medium tracking-tighter text-[#111111]"><span className="text-7xl sm:text-8xl">3</span><span className="text-2xl sm:text-3xl font-bold text-[#111111]">minutes/day</span></h3>
                           <p className="text-gray-500 leading-relaxed text-lg">to review leads with <span className="inline-flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#111111] text-white align-middle mx-1"><Tick02Icon size={12} /></span>/<span className="inline-flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#111111] text-white align-middle mx-1"><Cancel01Icon size={12} /></span> feedback - we handle the rest.</p>
                      </div>
                 </div>

                 {/* Card 4: 83% - Bottom Middle - Spans 2 cols */}
                 <div className="feature-card md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] transition-all hover:shadow-sm">
                      <div className="mt-8 space-y-2">
                           <h3 className="flex flex-wrap items-baseline gap-1 font-medium tracking-tighter text-[#111111]"><span className="text-7xl sm:text-8xl">83</span><span className="text-6xl sm:text-7xl font-medium text-[#111111]">%</span></h3>
                           <p className="text-gray-500 leading-relaxed text-lg">Users report higher reply rates when using our AI-written first lines + context notes.</p>
                      </div>
                 </div>

                 {/* Card 5: 10 leads - Bottom Right - Spans 2 cols */}
                 <div className="feature-card md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] transition-all hover:shadow-sm">
                      <div className="mt-8 space-y-2">
                           <h3 className="flex flex-wrap items-baseline gap-2 font-medium tracking-tighter text-[#111111]"><span className="text-7xl sm:text-8xl">10</span><span className="text-2xl sm:text-3xl font-bold text-[#111111]">leads</span></h3>
                           <p className="text-gray-500 leading-relaxed text-lg">delivered to your inbox daily - ready to contact.</p>
                      </div>
                 </div>
            </div>
        </div>
      </section>

      {/* 5. Testimonials section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Feedback</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                 {[1, 2, 3].map((_, i) => (
                    <Card key={i} className="bg-white border-gray-100/50 shadow-sm h-40 sm:h-48 flex flex-col justify-between">
                         <CardContent className="pt-4 sm:pt-6">
                            <div className="space-y-2 animate-pulse">
                                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400 font-medium">Early users feedback coming soon</p>
                         </CardContent>
                         <CardFooter className="pb-4 sm:pb-6">
                             <div className="flex items-center gap-2 sm:gap-3">
                                 <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gray-200 animate-pulse"></div>
                                 <div className="h-2 w-20 sm:w-24 bg-gray-200 rounded animate-pulse"></div>
                             </div>
                         </CardFooter>
                    </Card>
                 ))}
            </div>
        </div>
      </section>

      {/* 6. Dashboard preview + CTA */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
         <div className="max-w-6xl mx-auto bg-[#111111] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 text-white overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10">
                <div className="bg-white/10 border border-white/10 rounded-lg sm:rounded-xl aspect-video flex items-center justify-center order-2 lg:order-1 overflow-hidden relative">
                    <div className="w-full" style={{ padding: '61.43% 0 0 0', position: 'relative' }}>
                        <iframe 
                            src="https://player.vimeo.com/video/1148118051?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1" 
                            frameBorder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                            title="sent-mail"
                        ></iframe>
                    </div>
                </div>
                <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">Your leads are waiting for you. Get to know them!</h2>
                    <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    Sign up for a waitlist. Be the first to boost your outreach game.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                         <Input placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 h-11 sm:h-12 flex-1" />
                         <Button className="h-11 sm:h-12 px-6 sm:px-8 bg-white text-black hover:bg-gray-100 font-medium w-full sm:w-auto whitespace-nowrap">Join the waitlist</Button>
                    </div>
                </div>
            </div>
            {/* Abstract background blobs */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
         </div>
      </section>

      {/* 7. FAQs */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {[
                    { q: "How do you ensure lead quality?", a: "We use a multi-stage verification process that checks email deliverability, social presence, and recent company activity signals." },
                    { q: "How do I set up my ICP?", a: "During onboarding, we'll ask you about your ideal customer size, industry, and role. You can also upload a list of current customers for lookalike modeling." },
                    { q: "Does the system learn from feedback?", a: "Yes. Every time you reject or accept a lead, our algorithm adjusts your profile to improve future recommendations." },
                    { q: "When will I get access?", a: "We are rolling out invites weekly to ensure stability. Join the waitlist to be notified immediately when a spot opens." }
                ].map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="text-base sm:text-lg text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </section>

      <footer className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-t border-gray-100 bg-white text-xs sm:text-sm text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="order-2 sm:order-1">© 2025 Product Name. All rights reserved.</div>
            <div className="flex gap-4 sm:gap-6 order-1 sm:order-2">
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Twitter</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
