import React, { useState, useEffect, useRef } from "react";
import { 
  Home as HomeIcon, BookOpen, KeyRound, User, Users, Shield, 
  Settings, Search, ArrowUp, Menu, X, Printer, Check, Info, FileText, ChevronRight
} from "lucide-react";

import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import RequestorGuide from "./pages/RequestorGuide";
import UnitGuide from "./pages/UnitGuide";
import AdminGuide from "./pages/AdminGuide";

interface SidebarGroup {
  category: string;
  items: { id: string; label: string }[];
}

const SCOLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 shadow-sm rounded-lg">
    {/* Grid Background Box with subtle outline */}
    <rect width="100" height="100" rx="18" fill="white" stroke="rgba(26,93,26,0.12)" strokeWidth="2" />
    <line x1="50" y1="0" x2="50" y2="100" stroke="#f1f5f9" strokeWidth="2" />
    <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="2" />
    
    {/* Top Left: S */}
    <text x="26" y="38" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="34" fill="#1a2e1a" textAnchor="middle" dominantBaseline="middle">S</text>
    
    {/* Top Right: signal arches arcing out to top-right */}
    <path d="M 62 38 A 18 18 0 0 1 80 20" stroke="#1a5d1a" strokeWidth="5.5" strokeLinecap="round" fill="none" />
    <path d="M 62 29 A 9 9 0 0 1 71 20" stroke="#2d7a2d" strokeWidth="5.5" strokeLinecap="round" fill="none" />
    <circle cx="62" cy="20" r="3" fill="#4caf50" />

    {/* Bottom Left: C in cyan/teal */}
    <text x="26" y="78" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="34" fill="#14b8a6" textAnchor="middle" dominantBaseline="middle">C</text>
    
    {/* Bottom Right: O representing box with inner hole */}
    <rect x="58" y="58" width="24" height="24" rx="4" stroke="#1a2e1a" strokeWidth="6.5" fill="none" />
  </svg>
);

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Programmatic scroll state lock
  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimeout = useRef<any>(null);

  // Search Results State
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Collapsible sidebar groups based on Active Page
  const getSidebarConfig = (): SidebarGroup[] => {
    switch (activePage) {
      case "getting-started":
        return [
          {
            category: "Accessing your Account",
            items: [
              { id: "account-registration", label: "Registration & Creation" },
              { id: "logging-into-system", label: "Logging Into S-CORE" },
              { id: "forgot-password", label: "Forgot Password Feature" }
            ]
          },
          {
            category: "Profile Management",
            items: [
              { id: "profile-management", label: "Personal Profile Settings" }
            ]
          }
        ];
      case "requestor":
        return [
          {
            category: "Requestor's Guide",
            items: [
              { id: "dashboard-overview", label: "Dashboard Overview" }
            ]
          },
          {
            category: "Managing Your Requests",
            items: [
              { id: "submit-approval", label: "Request Approval" },
              { id: "submit-service", label: "Request Service" },
              { id: "custom-request-type", label: "Custom Request Type" },
              { id: "all-requests-ledger", label: "All Requests Ledger" },
              { id: "conversation-tab", label: "Conversation Chat Tab" }
            ]
          }
        ];
      case "unit":
        return [
          {
            category: "Dashboard Overview",
            items: [
              { id: "unit-dashboard", label: "Dashboard and Task Management" },
              { id: "three-task-views", label: "Three Task Views" }
            ]
          },
          {
            category: "Task Operations",
            items: [
              { id: "processing-approvals", label: "Processing Approvals" },
              { id: "processing-services", label: "Processing Services" }
            ]
          },
          {
            category: "Guidelines and Signals",
            items: [
              { id: "unit-comm-guidelines", label: "Communication Guidelines" },
              { id: "unit-notifications", label: "Notification Guidelines" }
            ]
          }
        ];
      case "admin":
        return [
          {
            category: "Getting Started",
            items: [
              { id: "admin-dashboard-guide", label: "Dashboard Overview" },
              { id: "admin-configurations", label: "Configuration" },
              { id: "admin-archiving", label: "Archiving" }
            ]
          },
          {
            category: "Requests & Monitoring",
            items: [
              { id: "admin-track-requests", label: "Monitoring All Requests" },
              { id: "admin-manage-requests", label: "Managing Requests as Admin" }
            ]
          },
          {
            category: "Data & Reports",
            items: [
              { id: "admin-reports", label: "Generating Reports" },
              { id: "admin-analytics", label: "Analytics" }
            ]
          },
          {
            category: "People & Announcements",
            items: [
              { id: "admin-user-management", label: "User Management" },
              { id: "admin-announcements", label: "Announcements" }
            ]
          }
        ];
      default:
        return [];
    }
  };

  // Scroll visibility handler
  useEffect(() => {
    const handleScroll = () => {
      // Back to top threshold
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Progress bar percentage calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer to track which section is currently viewed
  useEffect(() => {
    if (activePage === "home") {
      setActiveSection("");
      return;
    }

    const sidebarConfig = getSidebarConfig();
    const ids = sidebarConfig.flatMap(group => group.items.map(item => item.id));

    if (ids.length === 0) {
      setActiveSection("");
      return;
    }

    // Default to first item if current is empty or not in active page IDs
    if (!activeSection || !ids.includes(activeSection)) {
      setActiveSection(ids[0]);
    }

    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -65% 0px", // Trigger when header passes into top-middle of the screen
      threshold: 0
    };

    const observedElements: HTMLElement[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isProgrammaticScroll.current) return;

      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the topmost entry
        const topmost = visibleEntries.reduce((prev, curr) => {
          return curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev;
        });
        if (topmost.target.id) {
          setActiveSection(topmost.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observedElements.push(el);
      }
    });

    return () => {
      observedElements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, [activePage]);

  // Back to top execution
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cross-page anchor dynamic navigation
  const navigateToAndScroll = (pageId: string, anchorId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setShowSearchResults(false);
    setSearchQuery("");
    setActiveSection(anchorId);

    // Lock observer from overriding active section during navigation scroll
    isProgrammaticScroll.current = true;
    if (programmaticScrollTimeout.current) {
      clearTimeout(programmaticScrollTimeout.current);
    }

    // Wait for page state update and mount, then slide to anchor
    setTimeout(() => {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Briefly flash high-light borders for feedback
        element.classList.add("ring-2", "ring-brand-accent", "rounded-2xl", "p-4", "transition-all");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-brand-accent", "rounded-2xl", "p-4");
        }, 3000);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Unlock observer after smooth scroll completes
      programmaticScrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 850);
    }, 150);
  };

  // Search indexing traversal
  const searchDatabase = [
    { page: "getting-started", target: "account-registration", head: "Account Registration Onboarding", snippet: "Students, Faculty, and Admins can register with DLSU email handles." },
    { page: "getting-started", target: "logging-into-system", head: "Logging Onto the S-CORE App", snippet: "Access user portals with verified DLSU credentials and redirected role dashboards." },
    { page: "getting-started", target: "forgot-password", head: "Forgot Password Recovery", snippet: "Click Forgot Password to send Single-Use OTP access links straight to DLSU endpoints." },
    { page: "getting-started", target: "profile-management", head: "Profile management customization", snippet: "Fine tune display handles, cropped JPG images, and sync official coordinates." },
    { page: "requestor", target: "dashboard-overview", head: "Requestor Home Workspace Dashboard", snippet: "Track pending, in progress, revision counts, and check system announcements." },
    { page: "requestor", target: "submit-approval", head: "Submit Approval Request Checklist", snippet: "Provide event title, description, attachments, and deadlines conforming to standard processing lead times." },
    { page: "requestor", target: "submit-service", head: "Submit Service Request Workflow", snippet: "Request design deliverables or multimedia photos from StratComms." },
    { page: "requestor", target: "custom-request-type", head: "Custom Request selections", snippet: "Enter bespoke deliverables targets directly to bypass lists holds." },
    { page: "requestor", target: "all-requests-ledger", head: "All Requests Table & Filters", snippet: "Search historic tickets, applying sorting filters based on completion tags." },
    { page: "requestor", target: "conversation-tab", head: "Conversation discussion chat boards", snippet: "Resolve technical updates, respond to For Revision markers, and upload files instantly." },
    { page: "unit", target: "unit-dashboard", head: "Unit Staff processing dashboard metrics", snippet: "Calendar, urgent task indicators, workload snap queues." },
    { page: "unit", target: "three-task-views", head: "Three navigation workload divisions", snippet: "Filter all assignments, approvals checks, or active service deliverables." },
    { page: "unit", target: "processing-approvals", head: "Validating student designs approvals", snippet: "Set In Progress, make revision annotations, approve drawings or reject layouts." },
    { page: "unit", target: "processing-services", head: "Technical Services deliveries", snippet: "Attach final vector files and log complete state on tasks." },
    { page: "unit", target: "unit-comm-guidelines", head: "Strategic Comms response times", snippet: "Messages within 1 business day, initial reviews logged within 3 working frames." },
    { page: "unit", target: "unit-notifications", head: "Unit System Alerts alarms", snippet: "Real-time updates on assignments, deadline proximity alerts." },
    { page: "admin", target: "admin-dashboard-guide", head: "Dashboard & Getting Started", snippet: "Overview of metrics, action cards, KPI counters, charts and tables." },
    { page: "admin", target: "admin-configurations", head: "System Configuration", snippet: "Six-tab control center: system, homepage, about, archive, chatbot, maintenance." },
    { page: "admin", target: "admin-archiving", head: "Archive Manager", snippet: "Auto-archiving, day-limits, restoration requests, browse archived records." },
    { page: "admin", target: "admin-track-requests", head: "Monitoring All Requests", snippet: "Track All Requests, Manage Approvals, Manage Services with filters." },
    { page: "admin", target: "admin-manage-requests", head: "Managing Requests as Admin", snippet: "Create on behalf, assign to unit, update status, discussions." },
    { page: "admin", target: "admin-reports", head: "Generating Reports", snippet: "Filters, preview, PDF/Excel export, report history." },
    { page: "admin", target: "admin-analytics", head: "Analytics KPIs & Charts", snippet: "Status distribution, request volume, turnaround time by unit." },
    { page: "admin", target: "admin-user-management", head: "User Account Management", snippet: "Approve registrations, change roles, create invitations, restore deleted." },
    { page: "admin", target: "admin-announcements", head: "System Announcements", snippet: "Compose, schedule, target recipients, manage sent announcements." }
  ];

  const searchResults = searchQuery.trim() === "" ? [] : searchDatabase.filter(item => 
    item.head.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-light selection:text-brand-primary flex flex-col justify-between" id="app-shell-root">
      
      {/* Subtle Top Reading Progress Indicator */}
      {activePage !== "home" && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50 no-print" id="progress-bar-container">
          <div 
            className="h-full bg-brand-accent transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
            id="reading-progress-indicator"
          ></div>
        </div>
      )}

      {/* Sticky Top Navbar */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-brand-primary/10 z-40 transition-all duration-300 no-print" id="main-navigation-navbar">
        <div className="max-w-[1520px] mx-auto px-4 lg:px-6 h-[80px] flex items-center justify-between gap-4">
          
          {/* Brand Left Logo */}
          <div 
            onClick={() => { setActivePage("home"); handleScrollToTop(); }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            id="brand-logo-trigger"
          >
            <div className="w-[44px] h-[44px] rounded-[10px] bg-[#fafcfa] border border-[#1a5d1a]/20 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#1a5d1a]/40 transition-all shadow-inner">
              <img 
                src="/images/sco-logo.jpg" 
                alt="SCO Logo" 
                className="w-full h-full object-contain"
                id="brand-logo-img"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/88x88/1a5d1a/ffffff?text=SCO";
                }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col select-none max-sm:hidden">
              <span className="text-base md:text-lg font-serif font-bold text-[#1a5d1a] tracking-tight transition-colors leading-tight group-hover:text-[#2d7a2d] whitespace-nowrap">
                Strategic Communications Office
              </span>
            </div>
          </div>

          {/* Right: Desktop Links & Actions */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: "home", label: "Home" },
              { id: "getting-started", label: "Getting Started" },
              { id: "requestor", label: "Requestor Guide" },
              { id: "unit", label: "Unit Guide" },
              { id: "admin", label: "Admin & Super Admin" }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`text-[11px] xl:text-xs font-semibold px-2.5 xl:px-3.5 py-1.5 rounded-full select-none transition-all duration-300 whitespace-nowrap ${
                  activePage === link.id 
                    ? "bg-[#e8f5e8] text-[#1a5d1a] font-bold shadow-sm" 
                    : "text-[#4a5d4a] hover:bg-[#e8f5e8] hover:text-[#1a5d1a]"
                }`}
                id={`btn-nav-desktop-${link.id}`}
              >
                {link.label}
              </button>
            ))}

            {/* Quick search button in navbar - compact and hidden on smaller desktop viewports */}
            <div className="relative ml-1 w-36 xl:w-48 hidden xl:block">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search manuals..." 
                  value={searchQuery}
                  ref={searchInputRef}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
                  className="w-full text-[11px] pl-7 pr-7 py-1.5 bg-gray-50 border border-brand-primary/10 rounded-full focus:ring-1 focus:ring-brand-accent focus:bg-white text-text-dark font-sans focus:outline-none transition-all"
                  id="global-search-input"
                />
                <Search size={12} className="absolute left-2.5 top-2 text-text-light" />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(""); setShowSearchResults(false); }}
                    className="absolute right-2.5 top-1.5 text-text-light hover:text-brand-primary text-xs font-bold"
                    id="btn-clear-search"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Search overlay dropdown results */}
              {showSearchResults && searchQuery.trim() !== "" && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white border border-brand-primary/15 rounded-2xl shadow-[0_20px_50px_rgba(26,93,26,0.15)] max-h-72 overflow-y-auto p-2.5 z-50 text-left font-sans"
                  id="search-overlay-dropdown"
                >
                  <div className="flex justify-between items-center pb-1.5 mb-1.5 border-b border-gray-100 px-1.5">
                    <span className="text-[9px] uppercase font-bold text-brand-primary tracking-wider">Search Matches ({searchResults.length})</span>
                    <button onClick={() => setShowSearchResults(false)} className="text-[10px] text-gray-400 hover:text-brand-primary">Close</button>
                  </div>
                  
                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => navigateToAndScroll(item.page, item.target)}
                          className="p-2 rounded-xl hover:bg-[#e8f5e8]/40 cursor-pointer text-xs border border-transparent hover:border-brand-accent/20 transition-all font-sans"
                          id={`search-result-${idx}`}
                        >
                          <span className="font-bold text-brand-dark block text-[11px] leading-tight mb-0.5">{item.head}</span>
                          <p className="text-[10px] text-text-light line-clamp-1">{item.snippet}</p>
                          <span className="text-[8px] uppercase tracking-widest text-[#1a5d1a] font-bold block mt-1 font-mono">
                            Target: {item.page.replace("-", " ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-text-light italic text-center py-4">No matching sections found.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Far Right Call to Action & Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <a
              href="https://dlsuds-core.me"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold text-white bg-[#1a5d1a] hover:bg-[#2d7a2d] hover:shadow-brand hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-btn no-print"
              id="cta-access-score"
            >
              Access S-CORE
            </a>

            {/* Mobile Toggle burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text-dark hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
              id="btn-mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-brand-primary/10 px-4 py-4 space-y-3 font-sans animate-fadeIn" id="mobile-navigation-pane">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search manual indices..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
                className="w-full text-xs pl-8 pr-8 py-2 bg-gray-50 border border-brand-primary/15 rounded-lg text-text-dark font-sans focus:outline-none"
                id="mobile-search-input"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-text-light" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-text-light font-bold"
                  id="btn-mobile-clear-search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Mobile search results matching UI */}
            {searchQuery.trim() !== "" && (
              <div className="p-2 border border-brand-accent/25 bg-brand-light/20 rounded-xl space-y-1.5 max-h-32 overflow-y-auto">
                <span className="text-[9px] uppercase font-bold text-brand-dark block px-1.5">Matched Pages ({searchResults.length}):</span>
                {searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigateToAndScroll(item.page, item.target)}
                    className="p-1.5 rounded hover:bg-white text-xs cursor-pointer block text-left"
                    id={`mobile-search-result-${idx}`}
                  >
                    <span className="font-bold text-brand-dark block text-[10px]">{item.head}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { id: "home", label: "Home" },
                { id: "getting-started", label: "Getting Started" },
                { id: "requestor", label: "Requestor Guide" },
                { id: "unit", label: "Unit Guide" },
                { id: "admin", label: "Admin & Super Admin" }
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => { setActivePage(link.id); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`text-xs font-semibold p-2.5 rounded-lg text-left select-none transition-all ${
                    activePage === link.id 
                      ? "bg-[#e8f5e8] text-[#1a5d1a] font-bold border-l-4 border-[#1a5d1a]" 
                      : "text-text-light hover:bg-[#e8f5e8]"
                  }`}
                  id={`btn-nav-mobile-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Structural Layout Content */}
      <div 
        className={`flex-1 ${activePage === "home" ? "w-full" : "max-w-[1520px] w-full mx-auto px-4 lg:px-6 py-8 flex flex-col md:flex-row gap-8"}`}
        id="manual-layout-alignment"
      >
        
        {/* Left Sidebar Menu (Rendered exclusively for internal manual pages) */}
        {activePage !== "home" && (
          <aside 
            className="w-full md:w-[260px] shrink-0 font-sans border-r-0 md:border-r border-brand-primary/10 pr-0 md:pr-4 space-y-6 md:sticky md:top-24 h-fit max-h-[85vh] overflow-y-auto no-print"
            id="collapsible-sidebar-aside"
          >
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-brand-secondary font-bold uppercase block mb-1">
                  Table of Contents
                </span>
                <span className="text-sm font-semibold text-brand-dark block">
                  {activePage.replace("-", " ").toUpperCase()} DIRECTORY
                </span>
              </div>

              {getSidebarConfig().map((grp, groupIndex) => (
                <div key={groupIndex} className="space-y-1.5" id={`sidebar-group-${groupIndex}`}>
                  <h4 className="text-[10px] font-bold text-text-light uppercase tracking-wider border-l border-zinc-200 pl-2">
                    {grp.category}
                  </h4>
                  <div className="space-y-1">
                    {grp.items.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => navigateToAndScroll(activePage, item.id)}
                          className={`w-full text-left text-xs font-semibold transition-all duration-200 flex items-center justify-between px-3 py-2 rounded-lg border-l-3 ${
                            isActive
                              ? "text-brand-primary bg-brand-light font-bold border-brand-primary"
                              : "text-text-dark hover:text-brand-primary hover:bg-[#e8f5e8]/45 border-transparent"
                          }`}
                          id={`btn-toc-${item.id}`}
                        >
                          <span className="truncate">{item.label}</span>
                          <ChevronRight 
                            size={11} 
                            className={`transition-transform duration-200 ${isActive ? "text-brand-primary translate-x-0.5 opacity-100" : "text-brand-primary/40 opacity-60"}`} 
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Back to Home Button */}
              <button 
                onClick={() => { setActivePage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full text-center py-2 text-xs font-semibold text-brand-primary bg-brand-light rounded-xl hover:bg-brand-primary hover:text-white transition-all select-none font-sans"
                id="btn-sidebar-back-home"
              >
                ← Back to Homepage
              </button>
            </div>
          </aside>
        )}

        {/* Content Panel Area */}
        <main 
          className={`flex-1 ${activePage === "home" ? "w-full max-w-[1360px] mx-auto px-4 lg:px-6 py-8" : "max-w-[1120px] p-0 md:p-2 bg-white md:bg-transparent rounded-2xl md:shadow-none"}`}
          id="main-manual-content-view"
        >
          {activePage === "home" && <Home setActivePage={setActivePage} navigateToAndScroll={navigateToAndScroll} />}
          {activePage === "getting-started" && <GettingStarted />}
          {activePage === "requestor" && <RequestorGuide />}
          {activePage === "unit" && <UnitGuide />}
          {activePage === "admin" && <AdminGuide />}
        </main>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-br from-[#091e12] to-[#040e08] text-white pt-12 pb-10 border-t border-[#1a5d1a]/20 no-print font-sans" id="manual-global-footer">
        <div className="max-w-[1520px] mx-auto px-4 lg:px-6 space-y-8 text-left">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-8">
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[#fafcfa] border border-[#1a5d1a]/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                  <img 
                    src="/images/sco-logo.jpg" 
                    alt="SCO Logo" 
                    className="w-full h-full object-contain"
                    id="footer-brand-logo-img"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/88x88/1a5d1a/ffffff?text=SCO";
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="leading-tight">
                  <span className="text-base font-serif font-bold text-white block tracking-tight">S-CORE Management System Guide</span>
                  <span className="text-[9px] font-mono tracking-widest text-[#ffd700] font-bold uppercase block">DLSU-D SCO</span>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
                The official strategic request tracking and compliance manual developed for the Strategic Communications Office (SCO) of De La Salle University-Dasmariñas.
              </p>
              <div className="space-y-1 pt-1">
                <p className="text-xs font-semibold text-[#ffd700] tracking-wide">
                  Committed to Excellence in Communication | Building Stronger Communities
                </p>
                <p className="text-[11px] text-gray-300 leading-normal">
                  Developed by <span className="text-[#ffd700] font-semibold">John Emmanuelle Arellado</span>, <span className="text-[#ffd700] font-semibold">Caryl Joy Cabrera</span>, and <span className="text-[#ffd700] font-semibold">Jian Marie Hilario</span>
                </p>
              </div>
            </div>

            {/* Quick Links Matrix */}
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <div className="space-y-3 min-w-[140px]">
                <h5 className="text-[10px] font-bold text-[#ffd700] uppercase tracking-widest">User Guides</h5>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li>
                    <button 
                      onClick={() => { setActivePage("getting-started"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                      className="hover:text-[#ffd700] hover:underline text-left transition-colors"
                    >
                      Getting Started
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActivePage("requestor"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                      className="hover:text-[#ffd700] hover:underline text-left transition-colors"
                    >
                      Requestor Guide
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActivePage("unit"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                      className="hover:text-[#ffd700] hover:underline text-left transition-colors"
                    >
                      Unit Guide
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 min-w-[140px]">
                <h5 className="text-[10px] font-bold text-[#ffd700] uppercase tracking-widest">Systems Security</h5>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li>
                    <button 
                      onClick={() => { setActivePage("admin"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                      className="hover:text-[#ffd700] hover:underline text-left transition-colors"
                    >
                      Admin & Super Admin Summary Guide
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-sans pt-1">
            <span>© 2026 Strategic Communications Office, De La Salle University-Dasmariñas. All rights reserved.</span>
            <div className="flex gap-6">
              <a 
                href="https://www.dlsud.edu.ph" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#ffd700] transition-colors"
              >
                DLSU-D Main Site
              </a>
              <button 
                onClick={() => { setActivePage("getting-started"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                className="hover:text-[#ffd700] transition-colors"
              >
                Privacy Policy
              </button>
              <a 
                href="https://dlsuds-core.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#ffd700] transition-colors"
              >
                SCO Gallery
              </a>
            </div>
          </div>
          
          
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg hover:bg-brand-secondary transition-all transform hover:-translate-y-1 z-40 border border-brand-accent/20 no-print"
          title="Back to Top"
          id="btn-floating-back-to-top"
        >
          <ArrowUp size={16} />
        </button>
      )}

    </div>
  );
}
