// src/App.jsx
import React, { useEffect, useState, useRef } from 'react';
import {
    motion,
    useAnimation,
    useScroll,
    useMotionValueEvent,
} from 'framer-motion';
import {
    Sun,
    Moon,
    Github,
    Linkedin,
    Mail,
    Download,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Code,
    Database,
    Cpu,
    Settings,
    Trophy,
    GraduationCap,
    Phone,
    Video,
    Shield,
    Zap,
    Server,
    User,
    Briefcase,
    Award,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

import { ScrollToTop } from './components/ScrollToTop';
import { ThemeToggle } from './components/ThemeToggle';

// Project Data Structure
const projects = [
    {
        id: 1,
        title: 'MON AMI',
        subtitle: 'Real-time Social & Video Calling Platform',
        description:
            'A full-featured communication platform with WebRTC video calls, screen sharing, and persistent chat. Solved complex state synchronization challenges using Zustand and optimized real-time data flow with TanStack Query.',
        tech: [
            'React',
            'Node.js',
            'WebRTC',
            'Socket.io',
            'Zustand',
            'Stream API',
            'MongoDB',
            'Redis',
        ],
        features: [
            'End-to-end encrypted video/audio calls with adaptive bitrate',
            'Real-time chat with message persistence and read receipts',
            'Screen sharing with annotation capabilities',
            'Presence indicators and typing notifications',
            'Rate-limited API endpoints using Redis',
        ],
        challenges: [
            'Solved WebRTC connection stability across NATs using TURN servers',
            'Reduced state reconciliation latency by 65% with Zustand middleware',
            'Implemented connection fallback strategies for low-bandwidth scenarios',
        ],
        liveUrl: 'https://mon-1-mft4.onrender.com',
        githubUrl: 'https://github.com/dark-sriram/mon-ami',
        image: 'https://images.unsplash.com/photo-1552581234-4439142e9c0b?auto=format&fit=crop&w=600&h=400&q=80',
    },
    {
        id: 2,
        title: 'Facial Recognition To-Do App',
        subtitle: 'Biometric Task Management System',
        description:
            'Secure task management application using facial recognition for authentication. Implemented Redis rate limiting to prevent brute-force attacks and designed secure API architecture with JWT validation.',
        tech: [
            'React',
            'Node.js',
            'TensorFlow.js',
            'Redis',
            'MySQL',
            'Express.js',
            'bcrypt',
        ],
        features: [
            'Face authentication using TensorFlow.js models',
            'Secure CRUD operations with role-based access control',
            'Redis-powered rate limiting on authentication endpoints',
            'Encrypted data storage with AES-256',
            'Real-time task synchronization across devices',
        ],
        challenges: [
            'Optimized face recognition model size by 78% for browser deployment',
            'Designed secure token rotation strategy preventing session hijacking',
            'Implemented fallback authentication for low-light environments',
        ],
        liveUrl: '#',
        githubUrl: 'https://github.com/dark-sriram/facial-reco-to-do',
        image: 'https://images.unsplash.com/photo-1551650975-87de45978306?auto=format&fit=crop&w=600&h=400&q=80',
    },
];

// Skills Categorized
const skills = {
    frontend: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Zustand', level: 90 },
        { name: 'TanStack Query', level: 85 },
        { name: 'Framer Motion', level: 85 },
    ],
    backend: [
        { name: 'Node.js', level: 95 },
        { name: 'Express.js', level: 90 },
        { name: 'REST APIs', level: 95 },
        { name: 'WebSockets', level: 85 },
        { name: 'Authentication', level: 90 },
        { name: 'Microservices', level: 80 },
    ],
    databases: [
        { name: 'MongoDB', level: 90 },
        { name: 'MySQL', level: 85 },
        { name: 'Redis', level: 85 },
        { name: 'Mongoose', level: 85 },
        { name: 'Prisma', level: 80 },
    ],
    tools: [
        { name: 'Git/GitHub', level: 95 },
        { name: 'Postman', level: 90 },
        { name: 'Figma', level: 85 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Jest', level: 80 },
    ],
};

// Custom Hook: Navbar Scroll Behavior
const useNavbarScroll = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                setIsVisible(
                    currentScrollY < lastScrollY || currentScrollY < 50,
                );
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return isVisible;
};

// Custom Hook: Section Tracking
const useSectionTracking = (sectionIds) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);
    const { scrollY } = useScroll();
    const sectionsRef = useRef([]);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const sectionPositions = sectionIds.map((id, index) => {
            const element = sectionsRef.current[index];
            return {
                id,
                top: element ? element.offsetTop - 100 : 0,
                bottom: element ? element.offsetTop + element.offsetHeight : 0,
            };
        });

        const currentSection = sectionPositions.find(
            (section) => latest >= section.top && latest < section.bottom,
        );

        if (currentSection && currentSection.id !== activeSection) {
            setActiveSection(currentSection.id);
        }
    });

    return { activeSection, sectionsRef };
};

const App = () => {
    
    const navbarVisible = true;
    const controls = useAnimation();
    const [expandedProject, setExpandedProject] = useState(null);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const sectionIds = [
        'hero',
        'about',
        'skills',
        'projects',
        'resume',
        'experience',
        'contact',
    ];
    const { activeSection, sectionsRef } = useSectionTracking(sectionIds);

    // Carousel navigation functions
    const goToPrevProject = () => {
        setCurrentProjectIndex((prevIndex) =>
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const goToNextProject = () => {
        setCurrentProjectIndex((prevIndex) =>
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Navbar animation
    useEffect(() => {
        controls.start({
            y: 0,
            transition: { duration: 0.35, ease: 'easeInOut' },
        });
    }, [controls]);

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProjectIndex((prevIndex) =>
                prevIndex === projects.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Project expansion handler
    const toggleProject = (id) => {
        setExpandedProject(expandedProject === id ? null : id);
    };

    // Smooth scroll to section
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] dark:from-[#0f0f0f] dark:to-[#1a1a1a] text-gray-200 transition-colors duration-300">
            {/* Navbar */}
            <motion.nav
                animate={controls}
                initial={{ y: -100 }}
                className={`fixed w-full z-50 px-4 md:px-8 py-4 transition-all duration-300 ${
                    navbarVisible
                        ? 'bg-black/80 backdrop-blur-sm border-b border-gray-800/50'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer"
                        onClick={() => scrollToSection('hero')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && scrollToSection('hero')
                        }
                    >
                        Sriram<span className="text-gray-300">.</span>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-1">
                        {[
                            'about',
                            'skills',
                            'projects',
                            'resume',
                            'experience',
                            'contact',
                        ].map((section) => (
                            <motion.button
                                key={section}
                                whileHover={{ y: -2 }}
                                onClick={() => scrollToSection(section)}
                                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                                    activeSection === section
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                        : 'text-gray-300 hover:bg-gray-800/50'
                                }`}
                                aria-current={
                                    activeSection === section
                                        ? 'page'
                                        : undefined
                                }
                            >
                                {section.charAt(0).toUpperCase() +
                                    section.slice(1)}
                            </motion.button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-3">


                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://github.com/dark-sriram"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/70 transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <Github size={20} />
                        </motion.a>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/20"
                            onClick={() => scrollToSection('projects')}
                            aria-label="View Projects"
                        >
                            View Projects
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section
                id="hero"
                ref={(el) => (sectionsRef.current[0] = el)}
                className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.3,
                                type: 'spring',
                                damping: 15,
                            }}
                            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 font-medium"
                        >
                            Full Stack Developer
                        </motion.div>

                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                Building{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                    scalable
                                </span>{' '}
                                real-time applications
                            </h1>
                            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                                MERN stack specialist focused on robust backend
                                systems, real-time architectures, and performant
                                user experiences. Passionate about solving
                                complex engineering challenges with clean,
                                maintainable code.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/30 flex items-center"
                                onClick={() => scrollToSection('projects')}
                                aria-label="View Featured Projects"
                            >
                                View Projects{' '}
                                <ChevronDown className="ml-2" size={18} />
                            </motion.button>

                            <motion.div className="flex space-x-3">
                                <motion.a
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://github.com/dark-sriram"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/70 transition-colors"
                                    aria-label="GitHub"
                                >
                                    <Github size={24} />
                                </motion.a>
                                <motion.a
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://www.linkedin.com/in/sriram-p-992248264/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/70 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={24} />
                                </motion.a>
                                <motion.button
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/70 transition-colors flex items-center"
                                    aria-label="Download Resume"
                                >
                                    <Download size={24} />
                                </motion.button>
                            </motion.div>
                        </div>

                        <div className="pt-6 border-t border-gray-800/50 mt-6">
                            <div className="flex flex-wrap items-center gap-4 text-gray-400">
                                <div className="flex items-center">
                                    <Code
                                        className="mr-2 text-cyan-400"
                                        size={20}
                                    />
                                    <span>MERN Stack Specialist</span>
                                </div>
                                <div className="flex items-center">
                                    <Zap
                                        className="mr-2 text-cyan-400"
                                        size={20}
                                    />
                                    <span>Real-time Systems</span>
                                </div>
                                <div className="flex items-center">
                                    <Cpu
                                        className="mr-2 text-cyan-400"
                                        size={20}
                                    />
                                    <span>AI Integration</span>
                                </div>
                            </div>
                            
                            {/* Resume Section */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/resume.pdf"
                                    download
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-emerald-500/20 flex items-center"
                                    aria-label="Download Resume"
                                >
                                    <Download size={18} className="mr-2" />
                                    Download Resume
                                </motion.a>
                                
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#resume"
                                    className="border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg font-medium transition-all flex items-center"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection('resume');
                                    }}
                                    aria-label="View Resume Online"
                                >
                                    <Video size={18} className="mr-2" />
                                    View Resume
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative"
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl shadow-cyan-500/10">
                            <div className="p-6 border-b border-gray-800/50 flex justify-between items-center">
                                <div className="flex space-x-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-sm text-gray-400">
                                    developer-portfolio.js
                                </div>
                            </div>
                            <div className="p-6 font-mono text-sm text-gray-300">
                                <p>
                                    <span className="text-cyan-400">const</span>{' '}
                                    developer = {'{'}
                                </p>
                                <p className="ml-4 mt-1">
                                    <span className="text-cyan-300">name:</span>{' '}
                                    <span className="text-green-400">
                                        "Sriram P"
                                    </span>
                                    ,
                                </p>
                                <p className="ml-4">
                                    <span className="text-cyan-300">
                                        specialization:
                                    </span>{' '}
                                    <span className="text-green-400">
                                        "Full Stack Engineering"
                                    </span>
                                    ,
                                </p>
                                <p className="ml-4">
                                    <span className="text-cyan-300">
                                        stack:
                                    </span>{' '}
                                    <span className="text-blue-300">
                                        ["React", "Node.js", "MongoDB", "Redis"]
                                    </span>
                                    ,
                                </p>
                                <p className="ml-4">
                                    <span className="text-cyan-300">
                                        focus:
                                    </span>{' '}
                                    <span className="text-green-400">
                                        "Scalable Real-time Systems"
                                    </span>
                                    ,
                                </p>
                                <p className="ml-4">
                                    <span className="text-cyan-300">
                                        approach:
                                    </span>{' '}
                                    <span className="text-yellow-300">
                                        (problem) =&gt;
                                    </span>{' '}
                                    {'{'}
                                </p>
                                <p className="ml-8 mt-1">
                                    <span className="text-purple-400">
                                        return
                                    </span>{' '}
                                    architectSolution(problem)
                                </p>
                                <p className="ml-8">.optimizeForScale()</p>
                                <p className="ml-8">.ensureMaintainability()</p>
                                <p className="ml-8">.deliverValue();</p>
                                <p className="ml-4">{'}'}</p>
                                <p>{'};'}</p>
                            </div>
                        </div>

                        <motion.div
                            className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full filter blur-3xl opacity-20"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                ref={(el) => (sectionsRef.current[1] = el)}
                className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
            >
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold"
                    >
                        About{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Me
                        </span>
                    </motion.h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Engineering robust solutions with clean architecture and
                        thoughtful implementation
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-gray-300 leading-relaxed">
                            I'm a Full Stack Developer specializing in the MERN
                            stack with a strong focus on backend engineering and
                            real-time system architecture. My approach centers
                            on building scalable applications that solve genuine
                            user problems while maintaining exceptional code
                            quality and performance.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            With experience developing complex real-time
                            applications and participating in competitive
                            hackathons, I thrive in environments that demand
                            rapid problem-solving and technical innovation. My
                            work integrates modern patterns like state
                            management with Zustand, efficient data fetching
                            with TanStack Query, and robust API design
                            principles.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Beyond core web technologies, I've explored AI
                            integration in applications and understand how to
                            leverage emerging technologies responsibly. I
                            believe the best engineering happens at the
                            intersection of technical excellence and
                            human-centered design.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                                <Trophy className="w-8 h-8 text-cyan-400 mb-3" />
                                <h3 className="font-bold mb-1">
                                    Hackathon Proven
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Smart India Hackathon 2024 Shortlist
                                </p>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                                <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
                                <h3 className="font-bold mb-1">
                                    AI Integration
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Practical AI implementation experience
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <Settings
                                    className="mr-2 text-cyan-400"
                                    size={24}
                                />
                                Technical Philosophy
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Prioritize maintainable architecture over quick fixes',
                                    'Design systems with scalability as a core requirement',
                                    'Implement comprehensive testing at all layers',
                                    'Balance innovation with practical business constraints',
                                    'Document decisions and share knowledge proactively',
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <div className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                        <span className="text-gray-300">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <GraduationCap
                                    className="mr-2 text-cyan-400"
                                    size={24}
                                />
                                Continuous Learning
                            </h3>
                            <p className="text-gray-300 mb-3">
                                I actively contribute to open source projects,
                                participate in technical communities, and
                                continuously expand my expertise in distributed
                                systems and cloud architecture. Recent focus
                                areas include:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'WebRTC Optimization',
                                    'Redis Caching Strategies',
                                    'TypeScript Advanced Patterns',
                                    'Cloud Deployment (AWS)',
                                    'Performance Monitoring',
                                ].map((area) => (
                                    <span
                                        key={area}
                                        className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-cyan-300"
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section
                id="skills"
                ref={(el) => (sectionsRef.current[2] = el)}
                className="py-20 px-4 md:px-8 bg-gray-900/30 border-y border-gray-800/50"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-4xl font-bold"
                        >
                            Technical{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                Expertise
                            </span>
                        </motion.h2>
                        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                            Comprehensive skill set across the full development
                            lifecycle
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(skills).map(
                            ([category, items], index) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.6,
                                    }}
                                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300"
                                >
                                    <div className="flex items-center mb-5">
                                        {category === 'frontend' && (
                                            <Code className="w-6 h-6 text-cyan-400 mr-2" />
                                        )}
                                        {category === 'backend' && (
                                            <Server className="w-6 h-6 text-cyan-400 mr-2" />
                                        )}
                                        {category === 'databases' && (
                                            <Database className="w-6 h-6 text-cyan-400 mr-2" />
                                        )}
                                        {category === 'tools' && (
                                            <Settings className="w-6 h-6 text-cyan-400 mr-2" />
                                        )}
                                        <h3 className="text-xl font-bold capitalize">
                                            {category}
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        {items.map((skill, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-medium">
                                                        {skill.name}
                                                    </span>
                                                    <span className="text-gray-400 text-sm">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-800 rounded-full h-2">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{
                                                            width: `${skill.level}%`,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        transition={{
                                                            delay: 0.3,
                                                            duration: 1,
                                                            ease: 'easeOut',
                                                        }}
                                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* Projects Section - Carousel */}
            <section
                id="projects"
                ref={(el) => (sectionsRef.current[3] = el)}
                className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
            >
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold"
                    >
                        Featured{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Projects
                        </span>
                    </motion.h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Engineering complex applications with robust
                        architecture and thoughtful implementation
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    <div 
                        className="overflow-hidden"
                        style={{ 
                            perspective: '1000px',
                            height: '500px'
                        }}
                    >
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ 
                                transform: `rotateY(${currentProjectIndex * -360 / projects.length}deg)`,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="min-w-full flex-shrink-0"
                                    style={{ 
                                        position: 'absolute',
                                        width: '100%',
                                        transform: `rotateY(${index * 360 / projects.length}deg) translateZ(300px)`
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div
                                        className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500"
                                    >
                                        <div className="lg:flex">
                                            <div className="lg:w-1/2 p-6 md:p-8">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-2xl md:text-3xl font-bold">
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-cyan-400 font-medium mt-1">
                                                            {project.subtitle}
                                                        </p>
                                                    </div>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() =>
                                                            toggleProject(project.id)
                                                        }
                                                        className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                                                        aria-label={
                                                            expandedProject ===
                                                            project.id
                                                                ? 'Collapse project'
                                                                : 'Expand project'
                                                        }
                                                    >
                                                        {expandedProject ===
                                                        project.id ? (
                                                            <ChevronUp size={24} />
                                                        ) : (
                                                            <ChevronDown size={24} />
                                                        )}
                                                    </motion.button>
                                                </div>

                                                <p className="mt-6 text-gray-300 leading-relaxed">
                                                    {project.description}
                                                </p>

                                                {expandedProject === project.id && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            height: 0,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            height: 'auto',
                                                        }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.4 }}
                                                        className="mt-8"
                                                    >
                                                        <div className="mb-6">
                                                            <h4 className="font-bold text-lg mb-3 flex items-center">
                                                                <Zap
                                                                    className="mr-2 text-cyan-400"
                                                                    size={20}
                                                                />
                                                                Key Features
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {project.features.map(
                                                                    (feature, i) => (
                                                                        <li
                                                                            key={i}
                                                                            className="flex items-start text-gray-300"
                                                                        >
                                                                            <div className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                                                            {feature}
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>

                                                        <div className="mb-6">
                                                            <h4 className="font-bold text-lg mb-3 flex items-center">
                                                                <Shield
                                                                    className="mr-2 text-cyan-400"
                                                                    size={20}
                                                                />
                                                                Engineering Challenges
                                                                Solved
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {project.challenges.map(
                                                                    (challenge, i) => (
                                                                        <li
                                                                            key={i}
                                                                            className="flex items-start text-gray-300"
                                                                        >
                                                                            <div className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                                            {challenge}
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>

                                                        <div className="mb-6">
                                                            <h4 className="font-bold text-lg mb-3 flex items-center">
                                                                <Code
                                                                    className="mr-2 text-cyan-400"
                                                                    size={20}
                                                                />
                                                                Tech Stack
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {project.tech.map(
                                                                    (tech, i) => (
                                                                        <span
                                                                            key={i}
                                                                            className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm"
                                                                        >
                                                                            {tech}
                                                                        </span>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                <div className="mt-8 flex flex-wrap gap-3">
                                                    <motion.a
                                                        whileHover={{ y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/20"
                                                        aria-label={`View live demo of ${project.title}`}
                                                    >
                                                        Live Demo{' '}
                                                        <ExternalLink
                                                            className="ml-2"
                                                            size={18}
                                                        />
                                                    </motion.a>
                                                    <motion.a
                                                        whileHover={{ y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center px-5 py-3 bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                                                        aria-label={`View GitHub repository for ${project.title}`}
                                                    >
                                                        GitHub Repository{' '}
                                                        <Github
                                                            className="ml-2"
                                                            size={18}
                                                        />
                                                    </motion.a>
                                                </div>
                                            </div>

                                            <div className="lg:w-1/2 bg-gray-800/30 border-t lg:border-t-0 lg:border-l border-gray-800 flex items-center justify-center p-4">
                                                <div className="relative w-full h-64 md:h-80 lg:h-full">
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center rounded-xl shadow-2xl"
                                                        style={{
                                                            backgroundImage: `url(${project.image})`,
                                                        }}
                                                    ></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-xl"></div>
                                                    <div className="absolute bottom-4 left-4 text-white">
                                                        <p className="font-bold text-xl md:text-2xl">
                                                            {project.title}
                                                        </p>
                                                        <p className="text-cyan-300">
                                                            {project.subtitle}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute top-1/2 left-4 right-4 flex justify-between -translate-y-1/2 pointer-events-none">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => goToPrevProject()}
                            className="pointer-events-auto bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-gray-200 p-3 rounded-full hover:bg-gray-700 transition-colors"
                            aria-label="Previous project"
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => goToNextProject()}
                            className="pointer-events-auto bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-gray-200 p-3 rounded-full hover:bg-gray-700 transition-colors"
                            aria-label="Next project"
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentProjectIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    currentProjectIndex === index
                                        ? 'bg-cyan-500'
                                        : 'bg-gray-700'
                                }`}
                                aria-label={`Go to project ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Resume Section */}
            <section
                id="resume"
                ref={(el) => (sectionsRef.current[4] = el)}
                className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
            >
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold"
                    >
                        My{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Resume
                        </span>
                    </motion.h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Detailed overview of my skills, experience, and qualifications
                    </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold">Resume Preview</h3>
                        <div className="flex space-x-3">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/resume.pdf"
                                download
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-emerald-500/20 flex items-center"
                                aria-label="Download Resume PDF"
                            >
                                <Download size={18} className="mr-2" />
                                Download PDF
                            </motion.a>
                        </div>
                    </div>
                    
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Personal Info, Skills */}
                            <div className="space-y-8">
                                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <User className="mr-2 text-cyan-400" size={20} />
                                        Personal Information
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-400">Name</p>
                                            <p className="text-gray-200">Sriram P</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Email</p>
                                            <p className="text-gray-200">2k22csbs49@kiot.ac.in</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Location</p>
                                            <p className="text-gray-200">Coimbatore, Tamil Nadu, India</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Availability</p>
                                            <p className="text-gray-200">Open to Full-time Opportunities</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <Code className="mr-2 text-cyan-400" size={20} />
                                        Core Skills
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-gray-300 mb-2">Frontend</h5>
                                            <ul className="space-y-1">
                                                <li className="text-gray-200">React</li>
                                                <li className="text-gray-200">TypeScript</li>
                                                <li className="text-gray-200">Tailwind CSS</li>
                                                <li className="text-gray-200">Redux/Zustand</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-gray-300 mb-2">Backend</h5>
                                            <ul className="space-y-1">
                                                <li className="text-gray-200">Node.js</li>
                                                <li className="text-gray-200">Express.js</li>
                                                <li className="text-gray-200">MongoDB</li>
                                                <li className="text-gray-200">Redis</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <Zap className="mr-2 text-cyan-400" size={20} />
                                        Professional Summary
                                    </h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        Full Stack Developer with expertise in the MERN stack and a focus on building 
                                        scalable, real-time applications. Proven track record in developing complex 
                                        systems with robust architecture and performance optimization. 
                                        Experienced in AI integration and modern development practices.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column - Experience, Education */}
                            <div className="space-y-8">
                                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <Briefcase className="mr-2 text-cyan-400" size={20} />
                                        Work Experience
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h5 className="font-bold text-gray-200">AI Internship</h5>
                                                <span className="text-sm text-cyan-400">Summer 2023</span>
                                            </div>
                                            <p className="text-cyan-300 text-sm mb-2">Corizo</p>
                                            <ul className="text-gray-300 text-sm space-y-1">
                                                <li>• Developed AI-powered document processing pipeline using TensorFlow.js</li>
                                                <li>• Optimized model inference time by 40% through quantization techniques</li>
                                                <li>• Implemented secure API endpoints with Redis rate limiting</li>
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h5 className="font-bold text-gray-200">Technical Lead</h5>
                                                <span className="text-sm text-cyan-400">2022-2024</span>
                                            </div>
                                            <p className="text-cyan-300 text-sm mb-2">College of Engineering</p>
                                            <ul className="text-gray-300 text-sm space-y-1">
                                                <li>• Organized technical workshops for 200+ students</li>
                                                <li>• Mentored 15+ project teams in scalable application designs</li>
                                                <li>• Led development of internal college systems</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <GraduationCap className="mr-2 text-cyan-400" size={20} />
                                        Education
                                    </h4>
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h5 className="font-bold text-gray-200">B.Tech Computer Science</h5>
                                                <p className="text-cyan-300 text-sm">Anna University</p>
                                            </div>
                                            <span className="text-sm text-cyan-400">2020-2024</span>
                                        </div>
                                        <div className="mt-3">
                                            <span className="text-2xl font-bold text-cyan-400">8.7/10</span>
                                            <span className="text-gray-400 ml-2">CGPA</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <Award className="mr-2 text-cyan-400" size={20} />
                                        Achievements
                                    </h4>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                        <li className="flex items-start">
                                            <div className="mt-1 mr-2 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                            Smart India Hackathon 2024 - National Finalist
                                        </li>
                                        <li className="flex items-start">
                                            <div className="mt-1 mr-2 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                            Developed MON AMI - Real-time communication platform
                                        </li>
                                        <li className="flex items-start">
                                            <div className="mt-1 mr-2 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                            Led technical symposium for engineering students
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience & Education Section */}
            <section
                id="experience"
                ref={(el) => (sectionsRef.current[5] = el)}
                className="py-20 px-4 md:px-8 bg-gray-900/30 border-y border-gray-800/50"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-4xl font-bold"
                        >
                            Professional{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                Journey
                            </span>
                        </motion.h2>
                        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                            Key milestones and achievements in my engineering
                            career
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Experience */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold mb-8 flex items-center">
                                <Trophy
                                    className="mr-3 text-cyan-400"
                                    size={28}
                                />
                                Experience & Achievements
                            </h3>

                            <div className="space-y-6">
                                <div className="border-l-2 border-cyan-500 pl-6 py-2 relative">
                                    <div className="absolute -left-3 top-2 w-6 h-6 bg-cyan-500 rounded-full border-4 border-gray-900"></div>
                                    <h4 className="font-bold text-xl">
                                        AI Internship @ Corizo
                                    </h4>
                                    <p className="text-cyan-400">Summer 2023</p>
                                    <p className="mt-2 text-gray-300">
                                        Developed AI-powered document processing
                                        pipeline using TensorFlow.js and
                                        Node.js. Optimized model inference time
                                        by 40% through quantization techniques
                                        and implemented secure API endpoints
                                        with Redis rate limiting.
                                    </p>
                                </div>

                                <div className="border-l-2 border-cyan-500 pl-6 py-2 relative">
                                    <div className="absolute -left-3 top-2 w-6 h-6 bg-cyan-500 rounded-full border-4 border-gray-900"></div>
                                    <h4 className="font-bold text-xl">
                                        Smart India Hackathon 2024
                                    </h4>
                                    <p className="text-cyan-400">
                                        National Finalist
                                    </p>
                                    <p className="mt-2 text-gray-300">
                                        Led a team of 4 developers to create a
                                        real-time disaster response coordination
                                        platform. Implemented WebSocket
                                        architecture for live resource tracking
                                        and won recognition for innovative use
                                        of geospatial data visualization.
                                    </p>
                                </div>

                                <div className="border-l-2 border-cyan-500 pl-6 py-2 relative">
                                    <div className="absolute -left-3 top-2 w-6 h-6 bg-cyan-500 rounded-full border-4 border-gray-900"></div>
                                    <h4 className="font-bold text-xl">
                                        Technical Symposium Lead
                                    </h4>
                                    <p className="text-cyan-400">
                                        College of Engineering
                                    </p>
                                    <p className="mt-2 text-gray-300">
                                        Organized and led technical workshops on
                                        MERN stack development and real-time
                                        systems architecture for 200+ students.
                                        Mentored 15+ project teams in
                                        implementing scalable application
                                        designs.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Education */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold mb-8 flex items-center">
                                <GraduationCap
                                    className="mr-3 text-cyan-400"
                                    size={28}
                                />
                                Education
                            </h3>

                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
                                <div className="flex items-start">
                                    <div className="bg-cyan-500/10 p-3 rounded-xl mr-4 mt-1">
                                        <GraduationCap className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">
                                            B.Tech in Computer Science and
                                            Business Systems
                                        </h4>
                                        <p className="text-cyan-400 mt-1">
                                            College of Engineering, Anna
                                            University
                                        </p>
                                        <p className="text-gray-400 mt-1">
                                            2020 - 2024
                                        </p>
                                        <div className="mt-4 flex items-center">
                                            <span className="text-2xl font-bold text-cyan-400">
                                                8.7/10
                                            </span>
                                            <span className="ml-3 text-gray-400">
                                                CGPA
                                            </span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-800">
                                            <p className="font-medium mb-2">
                                                Relevant Coursework:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {[
                                                    'Data Structures & Algorithms',
                                                    'Database Management Systems',
                                                    'Computer Networks',
                                                    'Cloud Computing',
                                                    'Machine Learning Fundamentals',
                                                ].map((course) => (
                                                    <span
                                                        key={course}
                                                        className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm"
                                                    >
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                                <h4 className="font-bold text-lg mb-3 flex items-center">
                                    <Zap
                                        className="mr-2 text-cyan-400"
                                        size={20}
                                    />
                                    Technical Certifications
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        'AWS Certified Cloud Practitioner',
                                        'MongoDB Certified Developer',
                                        'Advanced React & TypeScript (Frontend Masters)',
                                    ].map((cert, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start text-gray-300"
                                        >
                                            <div className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                ref={(el) => (sectionsRef.current[5] = el)}
                className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
            >
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold"
                    >
                        Let's{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Connect
                        </span>
                    </motion.h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Open to challenging full-stack roles at product-focused
                        companies and innovative startups
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8">
                            <h3 className="text-2xl font-bold mb-6">
                                Get in Touch
                            </h3>
                            <p className="text-gray-300 mb-6">
                                I'm currently exploring new opportunities for
                                full-stack engineering roles where I can
                                contribute to building impactful products. Feel
                                free to reach out about potential collaborations
                                or interesting challenges!
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Mail
                                        className="mt-1 mr-3 text-cyan-400 flex-shrink-0"
                                        size={20}
                                    />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <a
                                            href="mailto:2k22csbs49@kiot.ac.in?subject=Portfolio Inquiry&body=Hello Sriram,%0D%0A%0D%0AI'm reaching out regarding..."
                                            className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
                                            onClick={(e) => {
                                                // Fallback if mailto fails
                                                const email =
                                                    '2k22csbs49@kiot.ac.in';
                                                navigator.clipboard
                                                    .writeText(email)
                                                    .then(() => {
                                                        alert(
                                                            'Email copied to clipboard! You can paste it into your email client.',
                                                        );
                                                    })
                                                    .catch(() => {
                                                        window.location.href = `mailto:${email}?subject=Portfolio Inquiry`;
                                                    });
                                                e.preventDefault();
                                            }}
                                        >
                                            2k22csbs49@kiot.ac.in
                                        </a>
                                        <p className="text-xs text-gray-500 mt-1">
                                            (Click to copy or open email client)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Github
                                        className="mt-1 mr-3 text-cyan-400 flex-shrink-0"
                                        size={20}
                                    />
                                    <div>
                                        <p className="font-medium">GitHub</p>
                                        <a
                                            href="https://github.com/dark-sriram"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
                                        >
                                            github.com/dark-sriram{' '}
                                            <ExternalLink
                                                className="ml-1"
                                                size={14}
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Linkedin
                                        className="mt-1 mr-3 text-cyan-400 flex-shrink-0"
                                        size={20}
                                    />
                                    <div>
                                        <p className="font-medium">LinkedIn</p>
                                        <a
                                            href="https://www.linkedin.com/in/sriram-p-992248264/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
                                        >
                                            linkedin.com/in/sriramp{' '}
                                            <ExternalLink
                                                className="ml-1"
                                                size={14}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-800">
                                <p className="font-medium mb-3">
                                    Preferred Contact Method:
                                </p>
                                <p className="text-gray-300">
                                    For professional inquiries, email is the
                                    best way to reach me. I typically respond
                                    within 24 hours.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">
                                Technical Blog
                            </h3>
                            <p className="text-gray-300 mb-4">
                                I share insights on full-stack development,
                                system design patterns, and real-time
                                application architecture.
                            </p>
                            <motion.button
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
                            >
                                Read latest article{' '}
                                <ChevronDown className="ml-1" size={18} />
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8"
                    >
                        <h3 className="text-2xl font-bold mb-6">
                            Contact Form
                        </h3>
                        <form
                            action="https://formspree.io/f/xjgopgjg"
                            method="POST"
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-1 text-gray-300"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-gray-200"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-1 text-gray-300"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-gray-200"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-1 text-gray-300"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-gray-200"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg shadow-cyan-500/20"
                            >
                                Send Message
                            </motion.button>
                        </form>
                        <p className="mt-4 text-center text-gray-500 text-sm">
                            I respect your privacy. All information submitted
                            will be handled confidentially.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-4 md:px-8 border-t border-gray-800/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Sriram<span className="text-gray-300">.</span>
                        </div>
                        <span className="ml-2 text-gray-500 text-sm">
                            © {new Date().getFullYear()}
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
                        {[
                            'About',
                            'Skills',
                            'Projects',
                            'Experience',
                            'Contact',
                        ].map((item) => (
                            <button
                                key={item}
                                onClick={() =>
                                    scrollToSection(item.toLowerCase())
                                }
                                className="text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                                aria-label={`Scroll to ${item} section`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <motion.a
                            whileHover={{ y: -3 }}
                            href="https://github.com/dark-sriram"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <Github size={24} />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -3 }}
                            href="https://www.linkedin.com/in/sriram-p-992248264/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin size={24} />
                        </motion.a>
                        <ThemeToggle className="p-2" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800/50 text-center text-gray-500 text-sm">
                    <p>
                        Crafted with React, Tailwind CSS, and Framer Motion •
                        Deployed on Vercel • Source code available on GitHub
                    </p>
                </div>
                
            </footer>

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
};

export default App;
