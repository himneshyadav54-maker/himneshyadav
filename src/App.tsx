import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BrandSection } from './components/BrandSection';
import { InfluencerSection } from './components/InfluencerSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyMeSection } from './components/WhyMeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPinModal } from './components/AdminPinModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { PORTFOLIO_CONFIG, PortfolioProject } from './config/portfolioData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('hy_is_admin') === 'true';
  });
  const [isAdminPinOpen, setIsAdminPinOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);

  // Projects state
  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('hy_custom_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fall back to initial projects
      }
    }
    return PORTFOLIO_CONFIG.initialProjects;
  });

  const handleSaveProjects = (newProjects: PortfolioProject[]) => {
    setProjects(newProjects);
    localStorage.setItem('hy_custom_projects', JSON.stringify(newProjects));
  };

  const handleSecretTrigger = () => {
    if (isAdmin) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminPinOpen(true);
    }
  };

  const handlePinSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem('hy_is_admin', 'true');
    setIsAdminPanelOpen(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('hy_is_admin');
    setIsAdminPanelOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#FF6B2C] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Desktop Custom Cursor with orange glow */}
      <CustomCursor />

      {/* Loading Animation Screen */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Navigation Bar */}
      <Navbar
        onContactClick={() => scrollToSection('contact')}
        isAdmin={isAdmin}
        onSecretAdminTrigger={handleSecretTrigger}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with 3D Abstract Kinetic Sculpture */}
        <HeroSection
          onExploreWork={() => scrollToSection('portfolio')}
          onWorkTogether={() => scrollToSection('contact')}
        />

        {/* 2. About Me Section with 3D Portrait Frame */}
        <AboutSection />

        {/* 3. Services Section: 6 Premium 3D Service Cards */}
        <ServicesSection />

        {/* 4. Dedicated Section for Brands */}
        <BrandSection />

        {/* 5. Dedicated Section for Influencers & Commission Model */}
        <InfluencerSection />

        {/* 6. Selected Work & Portfolio Gallery (Add button is Admin Only) */}
        <PortfolioSection
          isAdmin={isAdmin}
          onOpenAdmin={() => setIsAdminPanelOpen(true)}
          projects={projects}
          onSaveProjects={handleSaveProjects}
        />

        {/* 7. Working Process: 5-Phase 3D Timeline */}
        <ProcessSection />

        {/* 8. Why Work With Me */}
        <WhyMeSection />

        {/* 9. Contact Section with 3D Glowing Sphere & 3 Pathways */}
        <ContactSection isAdmin={isAdmin} />
      </main>

      {/* Footer */}
      <Footer onSecretAdminTrigger={handleSecretTrigger} />

      {/* Secret Admin PIN Modal (PIN: 152011) */}
      <AdminPinModal
        isOpen={isAdminPinOpen}
        onClose={() => setIsAdminPinOpen(false)}
        onSuccess={handlePinSuccess}
      />

      {/* Full Admin Control Panel */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        projects={projects}
        onSaveProjects={handleSaveProjects}
        onClose={() => setIsAdminPanelOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}
