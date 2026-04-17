/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import * as React from "react";
import { useRef, useState, useEffect, useMemo } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, X, ArrowLeft } from "lucide-react";
import { HashRouter as Router, Routes, Route, Link, useParams, useLocation } from "react-router-dom";

// --- Types ---

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  color: string;
  description?: string;
  gallery?: string[];
  year?: string;
  skills?: string[];
  company?: string;
}

// --- Mock Data ---

const PROJECTS: Project[] = [
  {
    id: "sahara-branding",
    title: "Sahara Branding 2.0",
    category: "Branding",
    image: "https://image2url.com/r2/default/images/1774839894625-652f1464-c01e-4fe8-8f3d-45f06a940fb1.png",
    color: "#E2725B",
    description: "A comprehensive visual identity for a high-end desert resort, blending organic textures with modern minimalist typography. The project focuses on the tactile experience of the desert, translated into a digital and physical brand ecosystem.",
    year: "2025",
    skills: ["Visual Identity", "Typography", "Art Direction", "Packaging"],
    company: "Sahara Resorts & Spa",
    gallery: [
      "https://image2url.com/r2/default/images/1774839894625-652f1464-c01e-4fe8-8f3d-45f06a940fb1.png",
      "/sahara-2.png",
      "/sahara-3.png",
    ]
  },
  {
    id: "neon-chaos",
    title: "NEON CHAOS",
    category: "Branding",
    image: "https://picsum.photos/seed/neon/800/1000",
    color: "#00ff00",
  },
  {
    id: "virtual-void",
    title: "VIRTUAL VOID",
    category: "UI/UX",
    image: "https://picsum.photos/seed/void/800/600",
    color: "#ff00ff",
  },
  {
    id: "kinetic-type",
    title: "KINETIC TYPE",
    category: "Motion",
    image: "https://picsum.photos/seed/type/800/1200",
    color: "#ffff00",
  },
  {
    id: "cyber-soul",
    title: "CYBER SOUL",
    category: "Digital Art",
    image: "https://picsum.photos/seed/cyber/800/1000",
    color: "#00ffff",
  },
  {
    id: "mono-logue",
    title: "MONO LOGUE",
    category: "Editorial",
    image: "https://picsum.photos/seed/mono/800/1200",
    color: "#ffffff",
  },
];

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 2.5 : 1,
      }}
      style={{
        translateX: "-50%",
        translateY: "-50%",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
    >
      <div className={`w-5 h-5 border-2 border-white rounded-full ${isHovering ? 'bg-white' : ''}`} />
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
      <Link to="/" className="interactive flex items-center">
        <img 
          src="https://www.image2url.com/r2/default/images/1776232106408-037715a6-6790-4175-8fe8-64fa11bfa0b1.png" 
          alt="Logo" 
          className="h-[40px] w-auto object-contain invert"
          referrerPolicy="no-referrer"
        />
      </Link>

      <div className="absolute left-1/2 -translate-x-1/2 top-6 flex items-center">
        <img 
          src="https://www.image2url.com/r2/default/images/1776232065262-ef969056-1d5b-484b-ac35-393b8adfb052.png" 
          alt="Head" 
          className="h-[40px] w-auto object-contain invert"
          referrerPolicy="no-referrer"
        />
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:bg-white hover:text-black transition-colors rounded-full interactive"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-6 bg-white text-black p-8 mt-2 border-2 border-black flex flex-col gap-4 min-w-[200px]"
        >
          <a href="#work" onClick={() => setIsOpen(false)} className="font-display text-3xl hover:skew-x-12 transition-transform">WORK</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="font-display text-3xl hover:skew-x-12 transition-transform">ABOUT</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="font-display text-3xl hover:skew-x-12 transition-transform">CONTACT</a>
        </motion.div>
      )}
    </nav>
  );
};

const TypingText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isHovered) {
      setDisplayedText("");
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [text, isHovered]);

  return (
    <div className="font-sans text-2xl font-light text-black flex items-center gap-4">
      {displayedText}
      {isHovered && displayedText.length < text.length && <span className="w-1 h-8 bg-accent-blue animate-pulse" />}
    </div>
  );
};

const FloatingImage = ({ 
  id,
  src, 
  title, 
  x, 
  y, 
  z, 
  rotate,
  width,
  color,
  scale = 1,
  markerPos = "bottom-right",
  delay = 0,
  shouldAnimate = true
}: { 
  id: string;
  src: string; 
  title: string; 
  x: string; 
  y: string; 
  z: number;
  rotate: number;
  width: number;
  color: string;
  scale?: number;
  markerPos?: "top-right" | "bottom-right" | "center-right";
  delay?: number;
  shouldAnimate?: boolean;
  key?: string | number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer interactive pointer-events-auto"
      initial={shouldAnimate ? { 
        scale: 0, 
        opacity: 0, 
        z: z - 1000,
        rotateZ: rotate + 45 
      } : { scale }}
      animate={{
        scale: isHovered ? scale * 1.05 : scale,
        opacity: 1,
        z: isHovered ? z + 200 : z,
        rotateZ: isHovered ? rotate + (rotate > 0 ? 5 : -5) : rotate,
        rotateX: isHovered ? -5 : 0,
        rotateY: isHovered ? 5 : 0,
        zIndex: isHovered ? 50 : 0
      }}
      style={{
        left: x,
        top: y,
        x: "-50%",
        y: "-50%",
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      transition={isHovered ? { 
        type: "spring", 
        damping: 20, 
        stiffness: 150 
      } : {
        type: "spring",
        damping: 25,
        stiffness: 100,
        delay: shouldAnimate ? delay : 0,
        opacity: { duration: 0.5, delay: shouldAnimate ? delay : 0 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/project/${id}`} className="block relative group" style={{ transformStyle: "preserve-3d" }}>
        <img
          src={src}
          alt={title}
          style={{ width: `${width}px`, height: "auto" }}
          className="shadow-2xl transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Dynamic Marker Square */}
        <div 
          className={`absolute w-4 h-4 z-10 ${
            markerPos === "top-right" ? "top-4 right-4" : 
            markerPos === "bottom-right" ? "bottom-4 right-4" : 
            "top-1/2 right-4 -translate-y-1/2"
          }`}
          style={{ backgroundColor: color }}
        />

        {/* Connecting Line and Label */}
        <div className={`absolute left-full flex items-center pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        } ${
          markerPos === "top-right" ? "top-6" : 
          markerPos === "bottom-right" ? "bottom-6" : 
          "top-1/2 -translate-y-1/2"
        }`}>
          <div className="w-20 h-[1px] bg-accent-blue mr-4" />
          <TypingText text={title} isHovered={isHovered} />
        </div>
      </Link>
    </motion.div>
  );
};

const Hero = ({ bgColor, textColor }: { bgColor: any; textColor: any }) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoverRotation, setHoverRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll resistance effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Slow down the scroll of the hero content to create "resistance"
  // Holds for roughly 50vh (1/3 of the 150vh container scroll)
  const heroContentY = useTransform(scrollYProgress, [0, 0.33, 1], [0, 0, -500]);

  // Dynamic grid background
  const gridImage = useTransform(textColor, (val) => 
    val === "#ffffff" 
      ? "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)" 
      : "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)"
  );

  // Auto-rotation effect
  const [autoRotate, setAutoRotate] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoRotate(prev => ({
        x: Math.sin(Date.now() / 3000) * 1.5,
        y: Math.cos(Date.now() / 3000) * 1.5,
      }));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Mouse position slightly rotates the perspective
    setHoverRotation({ x: -y * 12, y: x * 12 });
  };

  // Distribute ALL projects with random positions and scales on load
  const distributedProjects = useMemo(() => {
    // Check if we've already shown the entrance animation in this session
    const hasAnimated = sessionStorage.getItem('hero_animated') === 'true';
    if (!hasAnimated) {
      sessionStorage.setItem('hero_animated', 'true');
    }

    // Shuffle projects to ensure variety on every load
    const shuffled = [...PROJECTS].sort(() => Math.random() - 0.5);

    return shuffled.map((project, i) => {
      // Structured quadrant distribution around the center title
      // Zones: 0: Top-Left, 1: Top-Right, 2: Bottom-Left, 3: Bottom-Right, 4: Top-Center, 5: Bottom-Center
      const zone = i % 6;
      let xPos, yPos;
      
      const jitter = () => (Math.random() - 0.5) * 15.6; // Increased jitter by another 25% for more organic variation

      switch(zone) {
        case 0: // Top Left
          xPos = 10 + jitter();
          yPos = 15 + jitter();
          break;
        case 1: // Top Right
          xPos = 90 + jitter();
          yPos = 10 + jitter();
          break;
        case 2: // Bottom Left
          xPos = 15 + jitter();
          yPos = 90 + jitter();
          break;
        case 3: // Bottom Right
          xPos = 85 + jitter();
          yPos = 85 + jitter();
          break;
        case 4: // Top Center
          xPos = 47 + jitter();
          yPos = 5 + jitter();
          break;
        case 5: // Bottom Center
          xPos = 56 + jitter();
          yPos = 95 + jitter();
          break;
        default:
          xPos = 50;
          yPos = 50;
      }
      
      // Calculate width based on original ratio
      let ratio = 3/4; // Default fallback ratio
      
      const parts = project.image.split('/');
      const lastPart = parts[parts.length - 1];
      const secondLastPart = parts[parts.length - 2];
      
      if (project.image.includes('picsum.photos')) {
        const h = parseInt(lastPart);
        const w = parseInt(secondLastPart);
        if (!isNaN(w) && !isNaN(h) && h !== 0) {
          ratio = w / h;
        }
      } else if (project.image.includes('image2url.com')) {
        ratio = 1.5; 
      }

      // Capped size for all projects (max 320px)
      const targetLongSide = 280 + Math.random() * 40; 

      const calculatedWidth = ratio > 1 ? targetLongSide : targetLongSide * ratio;

      return {
        id: project.id,
        src: project.image,
        title: project.title,
        // Balanced coordinates
        x: `${xPos}%`,
        y: `${yPos}%`,
        // Controlled depth and rotation
        z: (i % 2 === 0 ? 1 : -1) * (20 + i * 12) + (Math.random() * 10 - 5),
        rotate: (i % 2 === 0 ? 1 : -1) * (0.5 + i * 0.1) + (Math.random() * 1 - 0.5),
        scale: 0.95 + Math.random() * 0.05, 
        width: isNaN(calculatedWidth) ? 300 : calculatedWidth,
        color: project.color,
        markerPos: (i % 3 === 0 ? "top-right" : i % 3 === 1 ? "bottom-right" : "center-right") as any,
        delay: 0.5 + (i * 0.15), // Staggered delay
        shouldAnimate: !hasAnimated
      };
    });
  }, []);

  const handlePan = (_: any, info: { delta: { x: number; y: number } }) => {
    // Invert delta for a more natural "dragging the world" feel
    setDragOffset(prev => {
      const newX = prev.x + info.delta.x;
      const newY = prev.y + info.delta.y;
      
      // Set boundary of the 3D space (clamping to +/- 800px)
      const boundary = 800;
      return {
        x: Math.max(-boundary, Math.min(boundary, newX)),
        y: Math.max(-boundary, Math.min(boundary, newY)),
      };
    });
  };

  const handleReset = () => {
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <div className="relative h-[150vh]">
      <motion.section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onPan={handlePan}
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-start cursor-grab active:cursor-grabbing"
      >
        {/* Background Grid - Very Subtle */}
        <motion.div className="absolute inset-0 pointer-events-none" 
          style={{ 
            backgroundImage: gridImage, 
            backgroundSize: "100px 100px" 
          }} 
        />

        {/* Interaction Indicator (Left) */}
        <div className="absolute bottom-10 left-10 z-50 font-mono text-[10px] uppercase tracking-widest opacity-30 pointer-events-none">
          Drag to explore
        </div>

        {/* Reset Button (Right) */}
        <div className="absolute bottom-10 right-10 z-[100]">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            whileHover={{ backgroundColor: textColor.get(), color: bgColor.get() }}
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            style={{ borderColor: textColor, color: textColor }}
            className="font-mono text-[10px] uppercase tracking-widest border px-4 py-2 bg-transparent backdrop-blur-sm transition-colors duration-300 pointer-events-auto shadow-sm"
          >
            Reset View
          </motion.button>
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
            y: heroContentY // Apply scroll resistance/hold
          }}
        >
          <motion.div
            className="relative w-full h-full pointer-events-none"
            animate={{
              // Mouse position rotates the perspective
              rotateX: autoRotate.x + hoverRotation.x,
              rotateY: autoRotate.y + hoverRotation.y,
              // Panning moves the section
              x: dragOffset.x,
              y: dragOffset.y,
            }}
            transition={{ type: "spring", damping: 35, stiffness: 65 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Reference Squares floating in space - Modern Playful Palette */}
            <div className="absolute top-1/2 left-[30%] w-4 h-4 opacity-30" style={{ backgroundColor: "#FF3366", transform: "translateZ(400px)" }} />
            <div className="absolute top-[30%] left-[70%] w-4 h-4 opacity-30" style={{ backgroundColor: "#33FFCC", transform: "translateZ(-500px)" }} />
            <div className="absolute top-[60%] left-[20%] w-4 h-4 opacity-30" style={{ backgroundColor: "#6633FF", transform: "translateZ(600px)" }} />

            {distributedProjects.map((img) => (
              <FloatingImage key={img.id} {...img} />
            ))}
          </motion.div>
        </motion.div>

        {/* Static Header Text - Minimal & Sharp - Now ABOVE the 3D layer */}
        <motion.div 
          style={{ y: heroContentY }} // Apply same scroll resistance/hold
          className="absolute inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.h1 style={{ color: textColor }} className="flex flex-col items-center justify-center tracking-[-0.08em]">
            <span className="text-[10vw] md:text-[7vw] font-display font-normal uppercase leading-[1.1]">Design</span>
            <span className="text-[3vw] md:text-[2vw] font-jacquarda lowercase opacity-80 my-2">(for)</span>
            <span className="text-[10vw] md:text-[7vw] font-display font-normal uppercase leading-[1.1]">Matters</span>
          </motion.h1>
        </motion.div>
      </motion.section>
    </div>
  );
};

const ProjectCard = ({ project, index, borderColor }: { project: Project; index: number; borderColor?: any; key?: string }) => {
  return (
    <Link to={`/project/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`relative group cursor-pointer interactive ${index % 2 === 0 ? 'md:mt-20' : ''}`}
      >
        <motion.div 
          style={{ borderColor: borderColor || "rgba(0,0,0,0.1)" }}
          className="relative overflow-hidden aspect-[3/4] border"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ArrowUpRight size={48} className="text-accent-blue" />
          </div>
        </motion.div>
        <div className="mt-6 flex justify-between items-start">
          <div>
            <h3 className="text-3xl font-light tracking-tight">{project.title}</h3>
            <p className="font-mono text-xs uppercase tracking-widest opacity-40 mt-1">{project.category}</p>
          </div>
          <div className="font-mono text-sm opacity-20">0{index + 1}</div>
        </div>
      </motion.div>
    </Link>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);
  const { pathname } = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!project) return <div className="h-screen flex items-center justify-center">Project not found</div>;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white pt-32 pb-20"
      >
        <div className="px-6 md:px-20 mb-20">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-accent-blue transition-colors">
            <ArrowLeft size={16} /> Back to work
          </Link>
        </div>

        {/* Hero Section with Grid Layout */}
        <div className="border-y border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Side: Info Grid */}
            <div className="md:col-span-5 border-r border-black/10 p-6 md:p-20 space-y-8">
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.85] uppercase"
              >
                {project.title}
              </motion.h1>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">Year</p>
                  <p className="text-xl font-light">{project.year || "2024"}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">Company</p>
                  <p className="text-xl font-light">{project.company || "Independent"}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">Relative Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.skills || [project.category]).map(skill => (
                      <span key={skill} className="px-3 py-1 border border-black/10 rounded-full text-xs font-mono uppercase tracking-tighter">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Description */}
            <div className="md:col-span-7 p-6 md:p-20 flex flex-col justify-between">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-6">Project Description</p>
                <p className="text-2xl md:text-3xl font-light leading-snug opacity-80">
                  {project.description || "Experimental visual design exploring the intersection of technology and minimalist aesthetics."}
                </p>
              </div>
              
              <div className="mt-20 flex items-end justify-between">
                <div className="font-display text-8xl opacity-[0.03] select-none">0{PROJECTS.indexOf(project) + 1}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-accent-blue animate-pulse">Scroll to explore</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="px-6 md:px-20 mt-20 space-y-20 md:space-y-40">
          {project.gallery ? project.gallery.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-10%" }}
              className={`w-full overflow-hidden border border-black/5 cursor-zoom-in ${
                i % 2 === 0 ? 'md:w-4/5' : 'md:w-4/5 md:ml-auto'
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img} 
                alt={`${project.title} gallery ${i}`} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )) : (
            <div 
              className="w-full aspect-video overflow-hidden border border-black/5 cursor-zoom-in"
              onClick={() => setSelectedImage(project.image)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Next Project Navigation */}
        <div className="mt-40 border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-20 border-r border-black/10 flex flex-col justify-center">
              <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-30 mb-4">
                Next Project
              </div>
              <Link 
                to={`/project/${PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].id}`}
                className="text-4xl md:text-7xl font-light tracking-tighter hover:text-accent-blue transition-colors uppercase leading-none"
              >
                {PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].title}
              </Link>
            </div>
            <div className="hidden md:block overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src={PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].image} 
                className="w-full h-full object-cover"
                alt="Next project preview"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.button
              className="absolute top-10 right-10 text-white hover:text-accent-blue transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={48} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Work = ({ textColor, borderColor }: { textColor: any; borderColor: any }) => {
  return (
    <motion.section id="work" style={{ color: textColor }} className="py-32 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
        <h2 className="text-[8vw] leading-[0.8] font-light tracking-tighter">SELECTED<br />WORKS</h2>
        <p className="max-w-xs font-sans text-sm opacity-50 mb-4 leading-relaxed">
          A collection of visual experiments and commercial projects that push the boundaries of traditional graphic design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} borderColor={borderColor} />
        ))}
      </div>
    </motion.section>
  );
};

const About = ({ textColor, borderColor }: { textColor: any; borderColor: any }) => {
  return (
    <motion.section id="about" style={{ color: textColor, borderTopColor: borderColor }} className="py-32 px-6 md:px-20 border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="absolute -top-20 -left-10 text-[15vw] opacity-[0.03] font-sans font-bold pointer-events-none">BIO</div>
          <h2 className="text-6xl md:text-7xl mb-12 font-light leading-[0.9] tracking-tighter">NOT YOUR<br />AVERAGE<br />DESIGNER</h2>
          <p className="text-lg leading-relaxed mb-12 opacity-70 max-w-lg">
            I believe that design should be more than just "pretty". It should be a conversation, a provocation, and sometimes, a little bit weird. 
            My approach combines minimal scientific aesthetics with high-end editorial precision.
          </p>
          <div className="flex gap-6">
            <motion.button style={{ borderColor: textColor, color: textColor }} className="px-10 py-4 border font-sans text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
              READ MANIFESTO
            </motion.button>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
          <img 
            src="https://picsum.photos/seed/designer/800/1000" 
            alt="Designer Portrait" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-8 right-8 w-4 h-4 bg-accent-blue" />
        </div>
      </div>
    </motion.section>
  );
};

const Footer = ({ textColor, borderColor }: { textColor: any; borderColor: any }) => {
  return (
    <motion.footer id="contact" style={{ color: textColor, borderTopColor: borderColor }} className="py-32 px-6 md:px-20 border-t">
      <div className="text-center mb-32">
        <h2 className="text-[10vw] mb-8 font-light tracking-tighter">LET'S TALK</h2>
        <a href="mailto:hello@designer.exe" className="text-2xl md:text-4xl font-light hover:text-accent-blue transition-colors tracking-tight">
          HELLO@DESIGNER.EXE
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-8 border-t" style={{ borderTopColor: borderColor }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30">
          © 2026 DESIGNER.EXE • ALL RIGHTS RESERVED
        </div>
        <div className="flex gap-10">
          <a href="#" className="opacity-40 hover:opacity-100 hover:text-accent-blue transition-all"><Instagram size={20} /></a>
          <a href="#" className="opacity-40 hover:opacity-100 hover:text-accent-blue transition-all"><Linkedin size={20} /></a>
          <a href="#" className="opacity-40 hover:opacity-100 hover:text-accent-blue transition-all"><Github size={20} /></a>
          <a href="#" className="opacity-40 hover:opacity-100 hover:text-accent-blue transition-all"><Mail size={20} /></a>
        </div>
      </div>
    </motion.footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  
  // Transition from white to black background
  // Transition from black to white text
  const bgColor = useTransform(scrollYProgress, [0, 0.2], ["#ffffff", "#000000"]);
  const textColor = useTransform(scrollYProgress, [0, 0.2], ["#000000", "#ffffff"]);
  const borderColor = useTransform(scrollYProgress, [0, 0.2], ["rgba(0,0,0,0.05)", "rgba(255,255,255,0.1)"]);

  return (
    <Router>
      <motion.div style={{ backgroundColor: bgColor, color: textColor }} className="relative min-h-screen transition-colors duration-500">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero bgColor={bgColor} textColor={textColor} />
              <Work textColor={textColor} borderColor={borderColor} />
              <About textColor={textColor} borderColor={borderColor} />
              <Footer textColor={textColor} borderColor={borderColor} />
            </main>
          } />
          <Route path="/project/:id" element={
            <div className="bg-white text-black">
              <ProjectDetail />
              <Footer textColor="#000000" borderColor="rgba(0,0,0,0.05)" />
            </div>
          } />
        </Routes>
      </motion.div>
    </Router>
  );
}
