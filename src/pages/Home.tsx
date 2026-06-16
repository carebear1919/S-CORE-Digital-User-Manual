import React from "react";
import { BookOpen, User, Users, Shield, Award, ArrowRight, HelpCircle, Activity } from "lucide-react";
import { InfoBox } from "../components/AlertBoxes";

interface HomeProps {
  setActivePage: (pageId: string) => void;
  navigateToAndScroll?: (pageId: string, anchorId: string) => void;
}

export default function Home({ setActivePage, navigateToAndScroll }: HomeProps) {
  const roles = [
    {
      id: "requestor",
      icon: "🧑‍🎓",
      title: "Requestor",
      desc: "Students and Faculty/Staff who submit approval and service requests.",
      targetPage: "requestor",
      badge: "Institutional Users",
      details: ["Submit Approval Requests", "Request Services (Design, Video, etc.)", "Real-time Collaboration inside S-CORE"]
    },
    {
      id: "unit",
      icon: "🏢",
      title: "Unit Staff",
      desc: "Strategic Communications staff responsible for processing and working on assigned requests.",
      targetPage: "unit",
      badge: "SCO Internal Staff",
      details: ["Dashboard & Urgent Task View", "Process Approval workflows", "Deliver design & communications services"]
    },
    {
      id: "admin",
      icon: "🛡️",
      title: "Admin",
      desc: "Managers responsible for assigning tasks, tracking institution-wide metrics, and managing users.",
      targetPage: "admin",
      targetAnchor: "admin-dashboard-guide",
      badge: "SCO Management",
      details: ["Assign Unit Teams", "Create system-wide Announcements", "Generate performance & request reports"]
    },
    {
      id: "superadmin",
      icon: "⚙️",
      title: "Super Admin",
      desc: "Highest-level security authority for global configuration and system auditing.",
      targetPage: "admin",
      targetAnchor: "super-responsibilities",
      badge: "IT & System Owners",
      details: ["Create user accounts", "Elevate roles (User to Admin/Unit)", "Manage institutional departments"]
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn" id="home-page-container">
      {/* Hero Section */}
      <div className="text-center md:text-left py-8 md:py-12 border-b border-brand-primary/10 relative">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-y-4">
          <BookOpen size={240} className="text-brand-primary" />
        </div>
        
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold uppercase tracking-widest shadow-sm mb-4">
          De La Salle University - Dasmariñas
        </span>
        
        <h1 className="text-4xl md:text-5xl font-serif text-brand-dark tracking-tight leading-tight mb-6">
          S-CORE System <span className="gold-gradient">Digital Users’ Manual</span>
        </h1>

        <div className="max-w-3xl space-y-3 text-sm md:text-base text-text-light leading-relaxed font-sans mb-8 text-left">
          <h3 className="text-lg font-bold text-[#1a5d1a] font-serif mb-1">Introduction to the S-CORE System</h3>
          <p>
            Welcome to the S-CORE System. This management system is designed to streamline and manage requests for approvals and services within the institution, ensuring a clear and efficient workflow. It connects Requestors (Students and Faculty) with the internal Units responsible for fulfillment and provides powerful administrative tools for Oversight and Management.
          </p>
          <p className="font-semibold text-[#1a5d1a]">
            This manual will guide you through the system’s features based on your specific Role:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm text-gray-600">
            <li><strong>Requestors (Students and Faculty/Staff):</strong> Users who submit requests.</li>
            <li><strong>Unit:</strong> Staff responsible for processing assigned requests.</li>
            <li><strong>Admin:</strong> Managers of users, requests, and system settings.</li>
            <li><strong>Super Admin:</strong> The highest-level authority for system configuration.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => setActivePage("getting-started")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-btn active:scale-98 shadow-btn transition-all duration-300 transform hover:-translate-y-0.5"
            id="btn-get-started-home"
          >
            Get Started Onboarding
            <ArrowRight size={16} />
          </button>
          <a
            href="https://s-core-system.dlsu-d.edu.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-brand-primary bg-brand-light hover:bg-brand-primary hover:text-white hover:shadow-md transition-all duration-300 border border-brand-accent/20"
            id="btn-access-score-home"
          >
            Access Live S-CORE System
            <Activity size={16} />
          </a>
        </div>
      </div>

      {/* Intro Quote / Highlight */}
      <InfoBox title="S-CORE Vision">
        S-CORE establishes a unified, modern interface for request tracking, conversation logging, role-based workflows, and detailed analytics for the Strategic Communications Office. It ensures all department deliverables are standardized and delivered in a trackable fashion.
      </InfoBox>

      {/* Role-Based Cards Section */}
      <div className="space-y-6" id="roles-manual-directory">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif text-brand-primary tracking-tight">
            Who Are You in the S-CORE Ecosystem?
          </h2>
          <p className="text-sm text-text-light mt-1">
            Select your user role below to explore the detailed, tailored operational guide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {roles.map((role) => (
            <div 
              key={role.id}
              className="bg-white border border-brand-primary/10 rounded-[24px] p-6 hover:shadow-[0_20px_60px_rgba(26,93,26,0.1)] hover:border-brand-accent transition-all duration-300 flex flex-col justify-between"
              id={`role-card-${role.id}`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center shadow-inner">
                    {role.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-wider font-semibold text-brand-primary bg-brand-light px-2.5 py-1 rounded-full uppercase border border-brand-accent/10">
                    {role.badge}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-brand-dark mb-2">
                  {role.title} Guide
                </h3>
                
                <p className="text-sm text-text-light leading-relaxed mb-4">
                  {role.desc}
                </p>

                <div className="space-y-1.5 mb-6">
                  {role.details.map((detail, index) => (
                    <div key={index} className="flex items-center text-xs text-text-dark gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (role.targetAnchor && navigateToAndScroll) {
                    navigateToAndScroll(role.targetPage, role.targetAnchor);
                  } else {
                    setActivePage(role.targetPage);
                  }
                }}
                className="w-full flex items-center justify-between px-5 py-2.5 rounded-xl border border-brand-primary/10 text-xs font-semibold text-brand-primary bg-brand-light/30 hover:bg-brand-primary hover:text-white transition-all group/btn"
                id={`btn-explore-${role.id}`}
              >
                <span>Read the {role.title} Manual</span>
                <ArrowRight size={13} className="transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Integration Highlights */}
      <div className="bg-gradient-to-br from-brand-dark to-[#091b10] rounded-[24px] p-8 text-white relative overflow-hidden" id="system-highlights">
        <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-10 translate-y-10 scale-125">
          <Users size={320} />
        </div>
        <div className="max-w-xl space-y-4">
          <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Institutional Productivity
          </span>
          <h3 className="text-2xl font-serif font-bold">
            Key Operational Pillars of S-CORE
          </h3>
          <p className="text-sm text-brand-light/80 leading-relaxed mb-4">
            The S-CORE platform binds user permissions, custom revision cycles, live conversation tools, workload management dashboards, and report generations in a single secured intranet ecosystem.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-xl">⚡</span>
              <h4 className="text-xs font-bold text-brand-gold mt-1.5">No-Lag Collaboration</h4>
              <p className="text-[10px] text-brand-light/70 mt-0.5">Instant conversations with SCO and dynamic file locks avoid revisions overlaps.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-xl">🛡️</span>
              <h4 className="text-xs font-bold text-brand-gold mt-1.5">Strict Role Isolation</h4>
              <p className="text-[10px] text-brand-light/70 mt-0.5">Secure boundaries guarantee students can only access assigned requestor and workspace flows.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
