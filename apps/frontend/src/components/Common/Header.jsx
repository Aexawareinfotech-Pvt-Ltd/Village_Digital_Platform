import { useState } from 'react';
import {
  Home, Newspaper, Building2, Sprout, Briefcase, MessageSquare,
  ShoppingBag, Calendar, FileText, Images, Phone, Menu, X
} from 'lucide-react';

const translations = {
  en: {
    title: 'Village Management',
    dashboard: 'Dashboard',
    news: 'News',
    services: 'Services',
    agriculture: 'Agriculture',
    jobs: 'Jobs',
    grievance: 'Grievances',
    marketplace: 'Marketplace',
    events: 'Events',
    certificates: 'Certificates',
    gallery: 'Gallery',
    emergency: 'Emergency',
    police: 'Police',
    ambulance: 'Ambulance',
    fire: 'Fire',
  },
  hi: {
    title: 'ग्राम प्रबंधन',
    dashboard: 'डैशबोर्ड',
    news: 'समाचार',
    services: 'सेवाएं',
    agriculture: 'कृषि',
    jobs: 'रोजगार',
    grievance: 'शिकायतें',
    marketplace: 'बाज़ार',
    events: 'कार्यक्रम',
    certificates: 'प्रमाणपत्र',
    gallery: 'गैलरी',
    emergency: 'आपातकाल',
    police: 'पुलिस',
    ambulance: 'एम्बुलेंस',
    fire: 'दमकल',
  },
  gu: {
    title: 'ગ્રામ્ય વ્યવસ્થાપન',
    dashboard: 'ડેશબોર્ડ',
    news: 'સમાચાર',
    services: 'સેવાઓ',
    agriculture: 'કૃષિ',
    jobs: 'નોકરી',
    grievance: 'ફરિયાદો',
    marketplace: 'બજાર',
    events: 'ઇવેન્ટ્સ',
    certificates: 'પ્રમાણપત્રો',
    gallery: 'ગેલેરી',
    emergency: 'કટોકટી',
    police: 'પોલીસ',
    ambulance: 'એમ્બ્યુલન્સ',
    fire: 'ફાયર',
  },
};

export default function Header({ currentModule, onNavigate, language, onLanguageChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  // FIX — Prevent undefined language crash
  const t = translations[language] || translations.en;

  // IMPORTANT FIX — Home is NOT a module anymore
  const menuItems = [
    { id: 'dashboard', icon: Newspaper, label: t.dashboard },
    { id: 'news', icon: Newspaper, label: t.news },
    { id: 'services', icon: Building2, label: t.services },
    { id: 'agriculture', icon: Sprout, label: t.agriculture },
    { id: 'jobs', icon: Briefcase, label: t.jobs },
    { id: 'grievance', icon: MessageSquare, label: t.grievance },
    { id: 'marketplace', icon: ShoppingBag, label: t.marketplace },
    { id: 'events', icon: Calendar, label: t.events },
    { id: 'certificates', icon: FileText, label: t.certificates },
    { id: 'gallery', icon: Images, label: t.gallery },
  ];

  const handleNavigate = (module) => {
    onNavigate(module);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-latte-surface0 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LEFT — Static Home Icon + Title */}
            <div className="flex items-center gap-3">
              <div className="bg-latte-peach p-2 rounded-2xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-latte-text hidden sm:block">{t.title}</h1>
            </div>

            {/* DESKTOP MENU */}
            <nav className="hidden xl:flex items-center gap-1">
              {menuItems.slice(0, 6).map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all text-sm ${
                      isActive ? 'bg-latte-peach text-white' : 'text-latte-text hover:bg-latte-peach hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* LANGUAGE BUTTONS */}
              <div className="flex gap-1 bg-latte-surface0 rounded-2xl p-1">
                {['en', 'hi', 'gu'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className={`px-2 sm:px-3 py-1 rounded-2xl text-xs sm:text-sm transition-colors ${
                      language === lang
                        ? 'bg-latte-peach text-white'
                        : 'text-latte-text hover:bg-latte-peach hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'ગુ'}
                  </button>
                ))}
              </div>

              {/* EMERGENCY BUTTON */}
              <button
                onClick={() => setEmergencyOpen(!emergencyOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-latte-red text-white rounded-2xl hover:bg-latte-maroon transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{t.emergency}</span>
              </button>

              {/* MOBILE TOGGLE */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-latte-text hover:bg-latte-surface0 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-latte-surface0 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-latte-peach text-white'
                        : 'text-latte-text bg-latte-surface0 hover:bg-latte-surface1'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* EMERGENCY MODAL */}
      {emergencyOpen && (
        <div
          className="fixed inset-0 bg-latte-crust bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setEmergencyOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-latte-red p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-latte-text">{t.emergency}</h2>
              </div>
              <button className="p-1 hover:bg-latte-surface0 rounded transition-colors">
                <X className="w-5 h-5 text-latte-text" onClick={() => setEmergencyOpen(false)} />
              </button>
            </div>

            <div className="space-y-3">
              <a href="tel:100" className="flex items-center justify-between p-4 bg-latte-red bg-opacity-10 rounded-lg border border-latte-red hover:bg-latte-red hover:bg-opacity-20 transition-colors">
                <span className="text-latte-text">{t.police}</span>
                <span className="text-latte-red">100</span>
              </a>

              <a href="tel:108" className="flex items-center justify-between p-4 bg-latte-red bg-opacity-10 rounded-lg border border-latte-red hover:bg-latte-red hover:bg-opacity-20 transition-colors">
                <span className="text-latte-text">{t.ambulance}</span>
                <span className="text-latte-red">108</span>
              </a>

              <a href="tel:101" className="flex items-center justify-between p-4 bg-latte-red bg-opacity-10 rounded-lg border border-latte-red hover:bg-latte-red hover:bg-opacity-20 transition-colors">
                <span className="text-latte-text">{t.fire}</span>
                <span className="text-latte-red">101</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
