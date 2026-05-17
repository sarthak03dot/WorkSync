import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { KeyboardArrowUp as ScrollTopIcon } from '@mui/icons-material';
import PublicNavbar from '../components/PublicNavbar';
import QuoteBanner from '../components/landing/QuoteBanner';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AboutSection from '../components/landing/AboutSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import TerminalShowcaseSection from '../components/landing/TerminalShowcaseSection';
import ResumeShowcaseSection from '../components/landing/ResumeShowcaseSection';
import SupportSection from '../components/landing/SupportSection';
import CTASection from '../components/landing/CTASection';
import LandingFooter from '../components/landing/LandingFooter';
import PlatformShowcase from '../components/landing/PlatformShowcase';
import ProjectVision from '../components/landing/ProjectVision';
import DevCardHighlight from '../components/landing/DevCardHighlight';

const LandingPage: React.FC = () => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? '#000' : '#ffffff', position: 'relative' }}>
            <PublicNavbar />
            <QuoteBanner />
            <HeroSection />
            <FeaturesSection />
            <PlatformShowcase />
            <TerminalShowcaseSection />
            <ProjectVision />
            <DevCardHighlight />
            <ResumeShowcaseSection />
            <HowItWorksSection />
            <AboutSection />
            <SupportSection />
            <CTASection />
            <LandingFooter />

            <Box
                component="button"
                onClick={scrollToTop}
                aria-label="scroll back to top"
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    zIndex: 1200,
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    color: '#ffffff',
                    boxShadow: '4px 4px 16px rgba(99, 102, 241, 0.5)',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    outline: 'none',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.6)',
                    pointerEvents: isVisible ? 'auto' : 'none',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                        transform: 'translateY(-4px) scale(1.05)',
                        boxShadow: '6px 6px 24px rgba(99, 102, 241, 0.7)',
                    },
                    transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                }}
            >
                <ScrollTopIcon sx={{ fontSize: '1.5rem' }} />
            </Box>
        </Box>
    );
};

export default LandingPage;
