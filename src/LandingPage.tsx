// import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tick02Icon, Cancel01Icon, Database01Icon, Linkedin01Icon, Facebook01Icon, NoteEditIcon } from 'hugeicons-react';
import { Search, Filter, UserCheck, Play, CheckCircle2, Target, ArrowDown, Star } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardFooter } from './components/ui/card';
import { Input } from './components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Tilt } from './components/ui/tilt';
import { cn } from './lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const navigate = useNavigate();
  const stepsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  // New ref for the context section
  const contextRef = useRef<HTMLElement>(null);
  const engineRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLElement>(null);
  const pipelineStepsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);
  
  // Carousel state for the metrics section
  const [cardOrder, setCardOrder] = useState([0, 1, 2]); // [Front, Middle, Back]
  const [isAnimating, setIsAnimating] = useState(false);

  // Badge counts state for logo notifications
  const [badgeCounts, setBadgeCounts] = useState({
    LinkedIn: 85,
    Instagram: 56,
    Facebook: 91,
    X: 95
  });
  const badgeCountsRef = useRef(badgeCounts);
  const setBadgeCountsRef = useRef(setBadgeCounts);

  // Keep refs in sync with state
  useEffect(() => {
    badgeCountsRef.current = badgeCounts;
    setBadgeCountsRef.current = setBadgeCounts;
  }, [badgeCounts]);

  // Form state for the CTA section
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setFormStatus('error');
      // Track validation error
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: "waitlist_signup_error",
          form_id: "waitlist_cta",
          error_type: "validation"
        });
      }
      return;
    }

    setFormStatus('submitting');
    
    try {
      // Using 'no-cors' mode to bypass the CORS preflight check which Zapier webhooks 
      // sometimes struggle with in local development. 
      // Note: with 'no-cors', we won't be able to read the response, 
      // so we assume success if the fetch doesn't throw.
      await fetch('https://hooks.zapier.com/hooks/catch/15087615/uak87eb/', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          // We omit Content-Type: application/json to keep it a "simple request"
          // and avoid the OPTIONS preflight that is being blocked.
        },
        body: JSON.stringify({
          email: email,
          source: 'waitlist',
          timestamp: new Date().toISOString()
        }),
      });

      setFormStatus('success');
      setEmail('');
      
      // Track success event
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: "waitlist_signup_success",
          lead_type: "waitlist",
          form_id: "waitlist_cta"
        });
      }
    } catch (error) {
      setFormStatus('error');
      
      // Track error event
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: "waitlist_signup_error",
          form_id: "waitlist_cta",
          error_type: "network"
        });
      }
    }
  };

  const swapCards = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCardOrder(prev => [prev[2], prev[0], prev[1]]);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !introRef.current || hasCounted) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(20);
      setHasCounted(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = 20;
        const duration = 1200;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // easeOutQuad
          const easeProgress = progress * (2 - progress);
          
          const currentCount = Math.floor(easeProgress * end);
          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(end);
            setHasCounted(true);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(introRef.current);
    return () => observer.disconnect();
  }, [hasCounted]);

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

    // Context Section Animation (Source Logos)
    if (contextRef.current) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contextRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(contextRef.current.querySelector("h2"), 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(contextRef.current.querySelector("p"),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6"
        )
        .fromTo(contextRef.current.querySelectorAll(".logo-grid-item"),
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.7)" },
            "-=0.4"
        );

        // Auto-animation: highlight each logo item one at a time
        const logoItems = contextRef.current.querySelectorAll(".logo-grid-item");
        if (logoItems.length > 0) {
            const highlightTimeline = gsap.timeline({
                repeat: -1,
                scrollTrigger: {
                    trigger: contextRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });

            logoItems.forEach((item, index) => {
                const image = item.querySelector(".logo-image") as HTMLElement;
                const overlay = item.querySelector(".logo-overlay") as HTMLElement;
                const badge = item.querySelector(".logo-badge") as HTMLElement;
                const logoName = item.getAttribute("data-logo");

                // Increment badge count when highlighting (only if badge exists and logoName is valid)
                if (badge && logoName && logoName in badgeCountsRef.current) {
                    highlightTimeline.call(() => {
                        setBadgeCountsRef.current(prev => {
                            const logoKey = logoName as keyof typeof prev;
                            if (!(logoKey in prev)) return prev;
                            const currentValue = prev[logoKey];
                            const increment = Math.floor(Math.random() * 60) + 20; // Random increment 20-80
                            const newValue = currentValue + increment; // No upper limit - can grow infinitely
                            return {
                                ...prev,
                                [logoKey]: Math.max(newValue, 20) // Ensure minimum is 20
                            };
                        });
                    }, [], index * 0.9);
                }

                // Highlight animation
                highlightTimeline
                    .to(item, {
                        borderColor: "rgba(0, 0, 0, 0.2)",
                        duration: 0.3,
                        ease: "power2.out"
                    }, index * 0.9)
                    .to(image, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    }, index * 0.9)
                    .to(overlay, {
                        opacity: 0.2,
                        duration: 0.3,
                        ease: "power2.out"
                    }, index * 0.9);
                
                // Animate badge only if it exists
                if (badge) {
                    highlightTimeline.to(badge, {
                        backgroundColor: "#ef4444",
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out"
                    }, index * 0.9);
                }

                // Hold highlighted state
                highlightTimeline.to({}, { duration: 0.6 });

                // Return to normal
                highlightTimeline
                    .to(item, {
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        duration: 0.3,
                        ease: "power2.out"
                    })
                    .to(image, {
                        opacity: 0.6,
                        duration: 0.3,
                        ease: "power2.out"
                    }, "<")
                    .to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    }, "<");
                
                // Return badge to normal only if it exists
                if (badge) {
                    highlightTimeline.to(badge, {
                        backgroundColor: "#828282",
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    }, "<");
                }
            });

            // Add pause before restarting cycle
            highlightTimeline.to({}, { duration: 0.25 });
        }
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

        // Sequential Pulse Animation for Step Circles (including connector arrow)
        if (pipelineRef.current) {
            const stepCircles = Array.from(pipelineRef.current.querySelectorAll(".step-circle"));
            if (stepCircles.length > 0) {
                // Disable CSS transitions and optimize for GSAP animations
                stepCircles.forEach((circle) => {
                    gsap.set(circle, {
                        transition: "none",
                        willChange: "transform, box-shadow, border-color",
                        force3D: true
                    });
                });

                // Create a timeline that repeats infinitely
                const pulseTimeline = gsap.timeline({ 
                    repeat: -1,
                    scrollTrigger: {
                        trigger: pipelineRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
                
                stepCircles.forEach((circle, index) => {
                    // Find the icon inside this circle
                    const icon = circle.querySelector(".step-icon") as HTMLElement;
                    
                    // Disable CSS transitions for icon and optimize
                    if (icon) {
                        // Get the current color from computed style
                        const computedStyle = window.getComputedStyle(icon);
                        const originalColor = computedStyle.color;
                        
                        gsap.set(icon, {
                            transition: "none",
                            willChange: "color",
                            force3D: true
                        });

                        // Ultra-smooth pulse animation: scale up with glow
                        pulseTimeline.to(circle, {
                            scale: 1.2,
                            boxShadow: "0 0 40px rgba(255,255,255,0.4)",
                            borderColor: "rgba(255,255,255,0.6)",
                            duration: 0.7,
                            ease: "power2.inOut",
                            force3D: true,
                            immediateRender: false
                        })
                        // Animate icon color to match border color during pulse
                        .to(icon, {
                            color: "rgba(255,255,255,0.6)",
                            duration: 0.7,
                            ease: "power2.inOut",
                            immediateRender: false
                        }, "<")
                        // Ultra-smooth return to normal
                        .to(circle, {
                            scale: 1,
                            boxShadow: "0 0 0px rgba(255,255,255,0)",
                            borderColor: "rgba(255,255,255,0.1)",
                            duration: 0.7,
                            ease: "power2.inOut",
                            force3D: true,
                            immediateRender: false
                        })
                        // Return icon color to original
                        .to(icon, {
                            color: originalColor,
                            duration: 0.7,
                            ease: "power2.inOut",
                            immediateRender: false
                        }, "<");
                    } else {
                        // Fallback if no icon found
                        pulseTimeline.to(circle, {
                            scale: 1.2,
                            boxShadow: "0 0 40px rgba(255,255,255,0.4)",
                            borderColor: "rgba(255,255,255,0.6)",
                            duration: 0.7,
                            ease: "power2.inOut",
                            force3D: true,
                            immediateRender: false
                        })
                        .to(circle, {
                            scale: 1,
                            boxShadow: "0 0 0px rgba(255,255,255,0)",
                            borderColor: "rgba(255,255,255,0.1)",
                            duration: 0.7,
                            ease: "power2.inOut",
                            force3D: true,
                            immediateRender: false
                        });
                    }
                    
                    // Add smooth delay between pulses (except for the last one)
                    if (index < stepCircles.length - 1) {
                        pulseTimeline.to({}, { duration: 0.1 }); // Minimal pause for seamless flow
                    }
                });
                
                // Add a longer pause before restarting the cycle
                pulseTimeline.to({}, { duration: 0.8 });
            }
        }

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

    // Features Animation (Metrics Section)
    if (featuresRef.current) {
        const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
        });

        tl.from(featuresRef.current.querySelector("h2"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(featuresRef.current.querySelectorAll(".space-y-10 > div"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.4");
    }

    // Testimonials Animation
    if (testimonialsRef.current) {
        gsap.from(testimonialsRef.current.querySelector(".text-center"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: testimonialsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(testimonialsRef.current.querySelectorAll(".grid > div"), {
            y: 50,
            opacity: 0,
            scale: 0.9,
            rotationX: 10,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: testimonialsRef.current.querySelector(".grid"),
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    }
  }, { scope: undefined });

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-gray-200">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
            >
                <img src="/assets/logo.svg" alt="GridGPT Logo - Scroll to top" className="h-6 sm:h-8 w-auto" />
            </button>
            <div className="flex gap-2 sm:gap-4">
                <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-[#111111] text-white hover:bg-black/90 text-xs sm:text-sm px-3 sm:px-4 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-sm hover:shadow-md"
                    onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                    data-gtm="cta_waitlist"
                    data-cta-type="waitlist"
                    data-cta-placement="nav"
                >
                    Join the waitlist
                </Button>
            </div>
        </div>
      </nav>

      {/* 1. Hero / Promise */}
      <section ref={heroRef} className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative overflow-hidden" style={{ backgroundColor: 'rgba(244, 249, 253, 1)' }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero-bg-v2.png" 
            alt="Hero section background with abstract soft gradients" 
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
                <Button 
                    className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-[#111111] text-white hover:bg-black/90 rounded-md w-full sm:w-auto transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-lg hover:shadow-black/20"
                    onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                    data-gtm="cta_waitlist"
                    data-cta-type="waitlist"
                    data-cta-placement="hero"
                >
                    Join the waitlist
                </Button>
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
                        alt="GridGPT dashboard preview showing a table of verified leads and an AI agent sidebar" 
                        className="w-full h-auto rounded-xl border border-white/20 shadow-[0_20px_50px_rgba(223,246,233,0.4),0_10px_30px_rgba(244,249,253,0.3)]"
                    />
                </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* 2. Context section – Source Logos */}
      <section ref={contextRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-gray-100 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] leading-tight">
                    Billion records scanned every day to find your ideal future client
            </h2>
                <p className="text-lg sm:text-xl text-gray-500 font-light leading-relaxed max-w-lg">
                    We monitor 100+ sources to catch the earliest signs of interest you can use in your outreach.
                    </p>
                </div>

            {/* Right Column: Logo Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto lg:mx-0">
                {[
                    { name: 'LinkedIn', src: '/assets/sources/linkedin.png', hasNotifications: true, notificationCount: 85 },
                    { name: 'Email', src: '/assets/sources/mail.png', hasNotifications: false },
                    { name: 'IRS', src: '/assets/sources/irs.png', hasNotifications: false },
                    { name: 'Instagram', src: '/assets/sources/instagram.png', hasNotifications: true, notificationCount: 56 },
                    { name: 'Google', src: '/assets/sources/google.png', hasNotifications: false },
                    { name: 'Facebook', src: '/assets/sources/facebook.png', hasNotifications: true, notificationCount: 91 },
                    { name: 'X', src: '/assets/sources/x.png', hasNotifications: true, notificationCount: 95 },
                    { name: 'Custom', src: '/assets/sources/custom-logo.svg', hasNotifications: false },
                    { name: 'Database', src: '/assets/sources/database.png', hasNotifications: false }
                ].map((logo, i) => (
                    <div 
                        key={i} 
                        data-logo={logo.name}
                        className="logo-grid-item aspect-square bg-white border border-gray-100 rounded-2xl sm:rounded-3xl flex items-center justify-center p-4 sm:p-6 lg:p-8 shadow-sm relative overflow-hidden"
                    >
                        <img 
                            src={logo.src} 
                            alt={`${logo.name} data source`} 
                            className="logo-image w-full h-full object-contain opacity-60"
                        />
                        {/* Colored overlay */}
                        <div className={cn(
                            "logo-overlay absolute inset-0 opacity-0 pointer-events-none mix-blend-multiply",
                            logo.name === 'LinkedIn' && "bg-[#0077b5]",
                            logo.name === 'Instagram' && "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
                            logo.name === 'Facebook' && "bg-[#1877f2]",
                            logo.name === 'X' && "bg-black",
                            logo.name === 'Email' && "bg-blue-500",
                            logo.name === 'Google' && "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500",
                            logo.name === 'Database' && "bg-indigo-500",
                            logo.name === 'Custom' && "bg-purple-500",
                            logo.name === 'IRS' && "bg-blue-600"
                        )}></div>
                        {logo.hasNotifications && (
                            <div className="logo-badge absolute top-2 right-2 sm:top-3 sm:right-3 min-w-[20px] h-5 sm:min-w-[24px] sm:h-6 px-1.5 sm:px-2 rounded-full flex items-center justify-center shadow-sm z-10 bg-[#828282]">
                                <span className="text-white text-[9px] sm:text-[10px] font-semibold leading-none whitespace-nowrap">
                                    {badgeCounts[logo.name as keyof typeof badgeCounts] ?? logo.notificationCount}
                                </span>
                            </div>
                        )}
                </div>
                ))}
            </div>
        </div>
      </section>

        {/* --- SECTION: MEET OUR ENGINE --- */}
        <section ref={engineRef} className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Header Text */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#111111] leading-[1.1]">
                Every lead you get is triple checked for quality.
                </h2>
              <p className="text-lg sm:text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                …that delivers quality leads in minutes. We don’t just find emails - we verify fit to your criteria and add the context you need for successful outreach.
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

              <div ref={pipelineStepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
                {[
                    { step: "01", title: "Define", desc: "Set precise targeting criteria for your ideal prospect.", icon: Target },
                    { step: "02", title: "Scan", desc: "Engine pulls prospects from LinkedIn & business databases.", icon: Search },
                    { step: "03", title: "Verify", desc: "Filters out junk to ensure fresh, valid contact data.", icon: Filter },
                    { step: "04", title: "Enrich", desc: "Adds personal context for tailored outreach messages.", icon: UserCheck }
                ].map((item, i) => (
                  <div key={i} className="flex md:flex-col items-start md:items-center gap-6 md:gap-0 group">
                    
                    {/* Node (Dark Mode) */}
                    <div className="relative">
                      <div className="step-circle w-16 h-16 md:w-24 md:h-24 bg-[#111111] rounded-full border border-white/10 flex items-center justify-center z-10 transition-all duration-300 group-hover:border-white/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <item.icon className="step-icon w-6 h-6 md:w-8 md:h-8 text-gray-500 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
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
              <div className="step-circle w-8 h-8 rounded-full bg-[#111111] border border-white/10 text-gray-500 flex items-center justify-center -mt-1 z-10">
                <ArrowDown className="step-icon w-4 h-4" />
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

                  <Button 
                    variant="secondary" 
                    className="h-12 px-8 text-base bg-white text-black hover:bg-gray-100 border-0 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-sm hover:shadow-md"
                    onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                    data-gtm="cta_waitlist"
                    data-cta-type="waitlist"
                    data-cta-placement="pipeline"
                  >
                    Get Started
                  </Button>
                </div>
                      </div>
                 </div>

          </div>
        </section>

      {/* 4. Metrics / Proof Section */}
      <section ref={featuresRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="space-y-12 sm:space-y-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] leading-tight">
                    And leads get better everyday
                </h2>

                <div className="space-y-10 sm:space-y-12">
                    {/* Metric 1 */}
                    <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl sm:text-7xl font-bold tracking-tighter text-[#111111]">14</span>
                            <span className="text-2xl sm:text-3xl font-bold text-[#111111]">days</span>
                        </div>
                        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-sm">
                            is all our AI needs to learn your preferences and hand over perfect leads
                        </p>
                    </div>

                    {/* Metric 2 */}
                    <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl sm:text-7xl font-bold tracking-tighter text-[#111111]">8/10</span>
                            <span className="text-2xl sm:text-3xl font-bold text-[#111111]">leads</span>
                        </div>
                        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-sm">
                            Our target after 14 days of feedback. At least 80% of leads match your ICP. Guaranteed.
                        </p>
                    </div>

                    {/* Metric 3 */}
                    <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl sm:text-7xl font-bold tracking-tighter text-[#111111]">2</span>
                            <span className="text-2xl sm:text-3xl font-bold text-[#111111]">minutes</span>
                        </div>
                        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-sm">
                            to set your ICP criteria and generate your first lead list.
                        </p>
                      </div>
                 </div>
            </div>

            {/* Right Column: Visuals - 3 Card Carousel Swap */}
            <div className="relative flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px] mt-12 lg:mt-0">
                <button 
                    onClick={swapCards}
                    className="relative w-full h-full flex items-center justify-center cursor-pointer group outline-none"
                    aria-label="Next testimonial"
                >
                    {[0, 1, 2].map((id) => {
                        const position = cardOrder.indexOf(id); // 0 = Front, 1 = Middle, 2 = Back
                        const images = [
                            { src: "/assets/agent-interface.png", alt: "AI agent interface for lead analysis" },
                            { src: "/assets/mail-interface.png", alt: "Email personalization tool interface" },
                            { src: "/assets/dashboard-preview.png", alt: "Platform dashboard overview" }
                        ];
                        return (
                            <div 
                                key={id}
                                className={cn(
                                    "absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-3xl border flex items-center justify-center transition-all duration-500 ease-out overflow-hidden bg-white",
                                    position === 0 && "z-30 scale-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-[#111111]/10 opacity-100 lg:translate-x-28 lg:translate-y-28 md:translate-x-20 md:translate-y-20 translate-x-12 translate-y-12 rotate-2",
                                    position === 1 && "z-20 scale-95 shadow-lg border-[#111111]/5 opacity-90 lg:translate-x-0 lg:translate-y-0 md:translate-x-0 md:translate-y-0 translate-x-0 translate-y-0 rotate-[-1deg]",
                                    position === 2 && "z-10 scale-90 shadow-sm border-[#111111]/5 opacity-60 lg:-translate-x-28 lg:-translate-y-28 md:-translate-x-20 md:-translate-y-20 -translate-x-12 -translate-y-12 rotate-[-4deg]"
                                )}
                            >
                                <img 
                                    src={images[id].src} 
                                    alt={images[id].alt} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        );
                    })}
                </button>
            </div>
        </div>
      </section>

      {/* 4.5 Effective Intro / Personalised Messages Section */}
      <section ref={introRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] text-center lg:text-left">
                Effective intro to each client written for you
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Column: Image Asset */}
                <div className="order-2 lg:order-1 bg-white rounded-3xl border border-gray-100 aspect-[4/3] flex items-center justify-center shadow-sm relative overflow-hidden group">
                    <img 
                        src="/assets/mail-interface.png" 
                        alt="GridGPT email personalization interface showing an AI-generated intro for a lead" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                </div>

                {/* Right Column: Big Stat */}
                <div className="order-1 lg:order-2 space-y-4 text-center lg:text-left">
                    <div className="text-8xl sm:text-9xl md:text-[120px] font-bold tracking-tighter text-[#111111] leading-none">
                        {count}%
                    </div>
                    <p className="text-xl sm:text-2xl text-gray-500 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                        The response rate you’ll get with our personalised messages
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* 5. Testimonials section */}
      <section ref={testimonialsRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111]">Customer testimonials</h2>
              <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
                Discover how our engine transforms outreach for founders and sales teams.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                 {/* Column 1 */}
                 <div className="flex-1 space-y-6 sm:space-y-8">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className={cn(
                            "transition-all duration-500 hover:scale-[1.02]",
                            num === 2 && "md:mt-12",
                            num === 4 && "md:ml-4",
                            num === 6 && "md:-ml-2"
                        )}>
                            <Card className="bg-[#1a1c1e] border-white/5 shadow-none overflow-hidden border-0 p-0">
                                 <img 
                                    src={`/assets/testimonials/t${num}.png`} 
                                    alt={`Customer feedback from Discord and social media ${num}`} 
                                    className="w-full h-auto" 
                                 />
                            </Card>
                        </div>
                    ))}
                 </div>

                 {/* Column 2 */}
                 <div className="flex-1 space-y-6 sm:space-y-8 md:mt-12">
                    {[8, 9, 10, 11, 12].map((num) => (
                        <div key={num} className={cn(
                            "transition-all duration-500 hover:scale-[1.02]",
                            num === 9 && "md:mr-6",
                            num === 10 && "md:scale-110 md:z-10",
                            num === 11 && "md:ml-8"
                        )}>
                            <Card className="bg-[#1a1c1e] border-white/5 shadow-none overflow-hidden border-0 p-0">
                                 <img 
                                    src={`/assets/testimonials/t${num}.png`} 
                                    alt={`Customer feedback from Discord and social media ${num}`} 
                                    className="w-full h-auto" 
                                 />
                            </Card>
                            </div>
                    ))}
                             </div>

                 {/* Column 3 */}
                 <div className="flex-1 space-y-6 sm:space-y-8">
                    {[13, 14, 15, 7].map((num) => (
                        <div key={num} className={cn(
                            "transition-all duration-500 hover:scale-[1.02]",
                            num === 13 && "md:mt-4",
                            num === 15 && "md:mr-4",
                            num === 7 && "md:scale-105"
                        )}>
                            <Card className="bg-[#1a1c1e] border-white/5 shadow-none overflow-hidden border-0 p-0">
                                 <img 
                                    src={`/assets/testimonials/t${num}.png`} 
                                    alt={`Customer feedback from Discord and social media ${num}`} 
                                    className="w-full h-auto" 
                                 />
                    </Card>
                        </div>
                 ))}
                 </div>
            </div>
        </div>
      </section>

      {/* 6. Dashboard preview + CTA */}
      <section id="cta" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
         <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#F1F7FE] to-[#D9F5E6] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 text-[#111111] overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10">
                <div className="bg-white/80 border border-gray-200 rounded-lg sm:rounded-xl aspect-video flex items-center justify-center order-2 lg:order-1 overflow-hidden relative shadow-sm">
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
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#111111]">Your leads are waiting for you. Get to know them!</h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    Sign up for a waitlist. Be the first to boost your outreach game.
                    </p>
                    {formStatus === 'success' ? (
                        <div className="bg-white/90 border border-gray-200 rounded-lg p-4 text-[#111111] text-sm sm:text-base animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-sm">
                            Thanks for joining the waitlist! Keep an eye on your inbox for updates.
                        </div>
                    ) : (
                        <form 
                            onSubmit={handleWaitlistSubmit} 
                            className="space-y-4"
                            data-gtm="waitlist_form"
                            data-form-id="waitlist_cta"
                            data-form-placement="cta_section"
                        >
                    <div className="flex flex-col sm:flex-row gap-3">
                                <Input 
                                    type="email"
                                    placeholder="Enter your email" 
                                    className={cn(
                                        "bg-white border-gray-300 text-[#111111] placeholder:text-gray-500 h-11 sm:h-12 flex-1 focus-visible:ring-gray-400",
                                        formStatus === 'error' && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (formStatus === 'error') setFormStatus('idle');
                                    }}
                                    required
                                    disabled={formStatus === 'submitting'}
                                    data-gtm="waitlist_email"
                                />
                                <Button 
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="h-11 sm:h-12 px-6 sm:px-8 bg-[#111111] text-white hover:bg-black font-medium w-full sm:w-auto whitespace-nowrap transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-sm hover:shadow-md"
                                    data-gtm="waitlist_submit"
                                >
                                    {formStatus === 'submitting' ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            Joining...
                                        </div>
                                    ) : "Join the waitlist"}
                                </Button>
                    </div>
                            {formStatus === 'error' && (
                                <p className="text-red-600 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1">
                                    Something went wrong. Please try again in a moment.
                                </p>
                            )}
                        </form>
                    )}
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
            <div className="order-2 sm:order-1">© 2025 GridGPT. All rights reserved.</div>
            <div className="flex gap-4 sm:gap-6 order-1 sm:order-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/terms')}
                  className="text-gray-500 hover:text-gray-900 h-auto p-0 text-xs sm:text-sm"
                >
                  Terms
                </Button>
            </div>
        </div>
      </footer>
    </div>
  );
}
