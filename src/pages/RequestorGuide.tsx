import React, { useState } from "react";
import ManualImage from "../components/ManualImage";
import StatusBadge, { ProjectStatus } from "../components/StatusBadge";
import { InfoBox, WarningBox } from "../components/AlertBoxes";
import { 
  BarChart, FileText, Send, CheckSquare, ListFilter, MessageCircle, 
  HelpCircle, ClipboardList, Calendar, Paperclip, CheckSquare as CheckIcon,
  Megaphone, Search, Tag, Lightbulb
} from "lucide-react";

interface MockRequest {
  id: string;
  type: string;
  title: string;
  category: "Approval" | "Service";
  deadline: string;
  status: ProjectStatus;
  messages: { sender: string; text: string; time: string }[];
}

export default function RequestorGuide() {
  // Simulator States
  const [activeCategory, setActiveCategory] = useState<"Approval" | "Service">("Approval");
  const [requestType, setRequestType] = useState("Poster Design");
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("2026-06-30");
  const [customTypeMode, setCustomTypeMode] = useState(false);
  const [customTypeInput, setCustomTypeInput] = useState("");

  const [requestsList, setRequestsList] = useState<MockRequest[]>([
    {
      id: "REQ-2026-001",
      title: "University Foundation Day Banner",
      type: "Service Request: Backdrop",
      category: "Service",
      deadline: "2026-06-25",
      status: "In Progress",
      messages: [
        { sender: "System", text: "Request registered successfully.", time: "10:00 AM" },
        { sender: "Unit Staff (Maria)", text: "Getting started on the design sketches. Please standby.", time: "11:30 AM" }
      ]
    },
    {
      id: "REQ-2026-002",
      title: "Science Week Poster Approval",
      type: "Approval Request: Poster",
      category: "Approval",
      deadline: "2026-06-20",
      status: "For Revision",
      messages: [
        { sender: "System", text: "Request registered successfully.", time: "09:00 AM" },
        { sender: "Unit Staff (Juan)", text: "Please modify the logo scaling. It violates official DLSU-D brand sizing specs. Re-upload once updated.", time: "01:15 PM" }
      ]
    }
  ]);

  const [selectedReqId, setSelectedReqId] = useState<string>("REQ-2026-002");
  const [messageText, setMessageText] = useState("");
  const [simulatedSubmitDone, setSimulatedSubmitDone] = useState(false);

  const activeRequest = requestsList.find(r => r.id === selectedReqId);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const finalType = customTypeMode ? `Custom: ${customTypeInput}` : requestType;
    const newId = `REQ-${Date.now().toString().slice(-7)}`;
    
    const newReq: MockRequest = {
      id: newId,
      title: eventTitle || "Untitled Request",
      type: `${activeCategory} Request: ${finalType}`,
      category: activeCategory,
      deadline,
      status: "Pending",
      messages: [
        { sender: "System", text: "Request submitted and set to Pending. Awaiting Admin assignment.", time: "Just now" }
      ]
    };

    setRequestsList([newReq, ...requestsList]);
    setSelectedReqId(newId);
    setEventTitle("");
    setDescription("");
    setSimulatedSubmitDone(true);
    setTimeout(() => setSimulatedSubmitDone(false), 5000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedReqId) return;

    setRequestsList(prevList => 
      prevList.map(req => {
        if (req.id === selectedReqId) {
          const updatedMessages = [
            ...req.messages,
            { sender: "You (Requestor)", text: messageText, time: "Just now" }
          ];

          // Auto-respond simulation logic
          let autoResponse: any = null;
          let nextStatus = req.status;

          if (req.status === "For Revision" && messageText.toLowerCase().includes("upload")) {
            nextStatus = "Pending";
            autoResponse = {
              sender: "System",
              text: "System registered file modifications! Request status returned to Pending check.",
              time: "Just now"
            };
          } else {
            autoResponse = {
              sender: "Unit Staff",
              text: "Thank you for the update. Our strategic communications committee will review this short message.",
              time: "Just now"
            };
          }

          if (autoResponse) {
            updatedMessages.push(autoResponse);
          }

          return { ...req, messages: updatedMessages, status: nextStatus };
        }
        return req;
      })
    );

    setMessageText("");
  };

  // Mock Requestor Dashboard UI
  const mockDashboardUI = (
    <div className="bg-white border border-brand-primary/10 rounded-2xl p-4 text-left text-text-dark font-sans max-w-2xl mx-auto shadow-xs">
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
        <div>
          <span className="text-[10px] text-brand-primary font-bold">STUDENT PORTAL</span>
          <h4 className="text-sm font-serif font-bold text-brand-dark">Active Workspace Dashboard</h4>
        </div>
        <div className="flex gap-1">
          <span className="text-[10px] bg-brand-light text-brand-primary px-2 py-0.5 rounded-full font-semibold">
            Term 1 (2026)
          </span>
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
        {[
          { label: "Pending", val: "1", color: "border-[#f59e0b]/30 bg-[#f59e0b]/5 text-[#f59e0b]" },
          { label: "In Prog.", val: "1", color: "border-[#3b82f6]/30 bg-[#3b82f6]/5 text-[#3b82f6]" },
          { label: "Revision", val: "1", color: "border-[#ea580c]/30 bg-[#ea580c]/5 text-[#ea580c]" },
          { label: "Approved", val: "4", color: "border-[#16a34a]/30 bg-[#16a34a]/5 text-[#16a34a]" },
          { label: "Complete", val: "12", color: "border-[#0d9488]/30 bg-[#0d9488]/5 text-[#0d9488]" },
          { label: "Rejected", val: "0", color: "border-[#dc2626]/30 bg-[#dc2626]/5 text-gray-400" },
        ].map((item, id) => (
          <div key={id} className={`p-1 sm:p-1.5 border text-center rounded-lg ${item.color}`}>
            <div className="text-xs sm:text-sm font-bold leading-none">{item.val}</div>
            <div className="text-[7px] sm:text-[8px] mt-0.5 font-medium truncate uppercase">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Announcements panel mock */}
      <div className="p-3 bg-brand-light/40 border border-brand-accent/20 rounded-xl mb-4">
        <h5 className="text-[10px] font-bold text-brand-primary uppercase tracking-wide flex items-center gap-1">
          <Megaphone size={14} className="text-brand-primary shrink-0" />
          Announcements: Institutional Branding Guide v3 Released!
        </h5>
        <p className="text-[9px] text-text-light mt-0.5">Please review official DLSU-D margins before submitting approvals for layout designs.</p>
      </div>

      {/* Simulated list */}
      <div className="space-y-2">
        <h5 className="text-[10px] font-bold text-brand-dark uppercase">My Interactive Submissions Log</h5>
        <div className="space-y-1.5 max-h-24 overflow-y-auto">
          {requestsList.map((req) => (
            <div 
              key={req.id} 
              onClick={() => setSelectedReqId(req.id)}
              className={`p-2 border rounded-lg flex justify-between items-center text-[11px] cursor-pointer transition-all ${selectedReqId === req.id ? "bg-brand-light border-brand-primary" : "bg-gray-50 border-gray-100 hover:bg-gray-100"}`}
              id={`mock-req-row-${req.id}`}
            >
              <div>
                <span className="font-bold text-brand-dark block truncate max-w-[120px] sm:max-w-[240px]">{req.title}</span>
                <span className="text-[9px] text-text-light font-mono block">{req.type} | Due: {req.deadline}</span>
              </div>
              <StatusBadge status={req.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const mockSubmitForm = (
    <div className="bg-white border border-brand-primary/10 rounded-2xl p-4 text-left font-sans max-w-md mx-auto text-text-dark shadow-sm">
      <div className="flex gap-2 mb-3 border-b border-gray-100 pb-2">
        <button 
          onClick={() => { setActiveCategory("Approval"); setRequestType("Poster Design"); }} 
          className={`flex-1 py-1 px-3 text-xs font-bold rounded-lg ${activeCategory === "Approval" ? "bg-brand-primary text-white" : "bg-gray-50 text-gray-500"}`}
          id="btn-sel-category-approval"
        >
          Approval Request
        </button>
        <button 
          onClick={() => { setActiveCategory("Service"); setRequestType("Backdrop Design"); }} 
          className={`flex-1 py-1 px-3 text-xs font-bold rounded-lg ${activeCategory === "Service" ? "bg-brand-primary text-white" : "bg-gray-50 text-gray-500"}`}
          id="btn-sel-category-service"
        >
          Service Request
        </button>
      </div>

      <form onSubmit={handleCreateRequest} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-brand-dark uppercase mb-1">
              Request Type
            </label>
            {customTypeMode ? (
              <input 
                type="text" 
                placeholder="Enter custom type"
                value={customTypeInput}
                onChange={(e) => setCustomTypeInput(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs"
                id="input-custom-type"
              />
            ) : (
              <select 
                value={requestType} 
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-text-dark"
                id="select-standard-type"
              >
                {activeCategory === "Approval" ? (
                  <>
                    <option>Poster Design</option>
                    <option>Brochure Draft</option>
                    <option>Official Video Reel</option>
                    <option>Institutional Decal</option>
                  </>
                ) : (
                  <>
                    <option>Backdrop Design</option>
                    <option>Photography Coverage</option>
                    <option>Social Media Posting</option>
                    <option>PR Press Scripting</option>
                  </>
                )}
              </select>
            )}
            <button 
              type="button"
              onClick={() => setCustomTypeMode(!customTypeMode)}
              className="text-[9px] text-[#2d7a2d] font-bold hover:underline mt-0.5 block"
              id="btn-toggle-custom-type"
            >
              {customTypeMode ? "← Standard List" : "Custom Request Type"}
            </button>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-dark uppercase mb-1">
              Required Deadline
            </label>
            <input 
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs"
              id="input-req-deadline"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-brand-dark uppercase mb-1">
            Event Title / Subject
          </label>
          <input 
            type="text" 
            placeholder="e.g. DLSU-D Eco Summit 2026"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs"
            id="input-req-title-field"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-brand-dark uppercase mb-1">
            Description & Core Requirements
          </label>
          <textarea 
            rows={2}
            placeholder="Outline exact guidelines, dimensions, and color themes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-text-dark focus:outline-none"
            id="textarea-req-desc"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-brand-dark uppercase mb-1 flex items-center justify-between">
            <span>File Attachments (PDF/Zip/PNG)</span>
            <span className="text-[9px] text-text-light font-normal text-right">Max size: 40MB</span>
          </label>
          <div className="border border-dashed border-brand-accent/40 rounded-lg p-2 text-center text-[10px] text-text-light bg-brand-light/10">
            <Paperclip size={14} className="inline mr-1 text-text-light" />
            Drag and drop source files or select from local storage
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold py-2 rounded-lg"
          id="btn-req-sim-submit"
        >
          Submit as Pending Request
        </button>
      </form>

      {simulatedSubmitDone && (
        <div className="mt-2 text-center text-[10px] bg-brand-light border border-brand-accent/20 p-2 text-brand-primary font-bold rounded animate-fadeIn" id="div-req-success-alert">
          Successfully Added! S-CORE logged your request inside the simulated ledger.
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-12 animate-fadeIn" id="requestor-guide-container">
      {/* Page Header */}
      <div className="border-b border-brand-primary/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-dark tracking-tight mb-2">
          Requestor&#39;s <span className="gold-gradient">User Manual</span>
        </h1>
        <p className="text-sm text-text-light">
          An operational runbook for Students, Faculty, and Institutional Partners to map, compile, and submit strategic deliverables requests.
        </p>
      </div>

      {/* --- Section 1: Dashboard Overview --- */}
      <section id="dashboard-overview" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            1
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Dashboard Overview
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            When entering the S-CORE Requestor system, you are directed to the primary dashboard. This panel clusters key metrics and action links so you can scan current progress seamlessly:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="border border-brand-primary/10 bg-white rounded-xl p-4 shadow-sm">
              <div className="text-brand-primary mb-2">
                <BarChart size={20} />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wide mb-1">
                Announcements Board
              </h4>
              <p className="text-xs text-text-light leading-relaxed">
                Check this header regularly for immediate notifications from the Strategic Communications Office. Useful updates on design codes, branding manuals, and submission blackout frames are hosted here.
              </p>
            </div>
            <div className="border border-brand-primary/10 bg-white rounded-xl p-4 shadow-sm">
              <div className="text-brand-primary mb-2">
                <Send size={20} />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wide mb-1">
                Quick Submit Links
              </h4>
              <p className="text-xs text-text-light leading-relaxed">
                Fast-track your submissions. Launch dedicated wizard frames to compile either an <strong>Approval Request</strong> or a <strong>Service Request</strong> in under 2 minutes.
              </p>
            </div>
            <div className="border border-brand-primary/10 bg-white rounded-xl p-4 shadow-sm">
              <div className="text-brand-primary mb-2">
                <ClipboardList size={20} />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wide mb-1">
                My Requests Summary
              </h4>
              <p className="text-xs text-text-light leading-relaxed">
                Scan your global statistics immediately. Track total submissions organized by real-time status flags: <StatusBadge status="Pending" />, <StatusBadge status="In Progress" />, <StatusBadge status="Completed" />.
              </p>
            </div>
          </div>
        </div>

        <ManualImage caption="Requestor Dashboard" mockUI={mockDashboardUI} />
      </section>

      {/* --- Section 2: Submit an Approval Request --- */}
      <section id="submit-approval" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            2
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Submit an Approval Request
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-4">
          <p>
            Submit design drafts, promotional layouts, video scripts, or official publications to obtain verified certification and official stamp templates. Secure compliance by maintaining our standard validation fields:
          </p>

          <div className="bg-brand-light/30 border border-brand-primary/15 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckSquare size={14} />
              MANDATORY COMPLIANCE CHECKLIST
            </h4>
            
            {[
              { t: "Request Type Selection", d: "Indicate whether the file represents poster designs, institutional logo overlays, decals, or media streams." },
              { t: "Event Title & Scope", d: "The clear title or theme matching official university calendars (e.g., DLSU-D Tech Week 2026)." },
              { t: "Description / Creative Objective", d: "A summary explaining your specific targeted marketing outcomes, themes and required dimensions." },
              { t: "Requested Deadline Field", d: "Institutional regulations demand a strict 7-day lead boundary. Ensure selected dates respect standard processing times." },
              { t: "Draft File Attachments", d: "Upload editable PDF vectors or structural images (under 40 Megabytes per file attachment)." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="mt-0.5 shrink-0 text-brand-accent">
                  <CheckIcon size={12} className="stroke-[3]" />
                </div>
                <div>
                  <strong className="text-xs text-brand-dark font-sans">{item.t}:</strong>
                  <p className="text-xs text-text-light">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-text-light leading-relaxed">
            Upon submitting, your request takes a status of <StatusBadge status="Pending" />. If the strategic unit flags branding errors, they will select <StatusBadge status="For Revision" />. Re-upload modified files inside the same task card. This action unlocks submission and tags the handling officers immediately inside discussions!
          </p>
        </div>

        <ManualImage caption="Request for Approval Form" mockUI={mockSubmitForm} />
      </section>

      {/* --- Section 3: Submit a Service Request --- */}
      <section id="submit-service" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            3
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Submit a Service Request
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            When seeking active technical designs, media coverages, or social writing from the StratComms officers, select <strong>Submit a Service Request</strong>.
          </p>
          <p className="text-xs text-text-light leading-relaxed">
            Fill out the project scope, event duration, target location, and reference files (such as background styles or typography guidelines). The assigned Unit Staff will update progress markers directly inside your dashboard.
          </p>
        </div>

        <ManualImage caption="Service Request Form" mockUI={mockSubmitForm} />
      </section>

      {/* --- Section 4: Custom Request Type --- */}
      <section id="custom-request-type" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            4
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Custom Request Mechanism
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            If your target needs do not match existing templates, S-CORE lets you request custom services:
          </p>
          <p className="text-xs text-text-light leading-relaxed">
            Select the <strong>&quot;Custom Request Type&quot;</strong> button inside standard selectors. Enter a precise description of your custom task. S-CORE instantly forwards this to Administration for validation before routing it into active teams.
          </p>
        </div>

        <ManualImage caption="Custom Request Type Selector" mockUI={mockSubmitForm} />
      </section>

      {/* --- Section 5: All Requests Ledger --- */}
      <section id="all-requests-ledger" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            5
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Managing & Filtering Submissions
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Locate historical datasets, check status markers, or search archived tasks via the <strong>All Requests</strong> directory:
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-text-light pb-2">
            <span className="bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 font-mono flex items-center gap-1"><Search size={10} /> Target Keyword Search</span>
            <span className="bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 font-mono flex items-center gap-1"><Calendar size={10} /> Dynamic Date range filters</span>
            <span className="bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 font-mono flex items-center gap-1"><Tag size={10} /> Sort by Urgency rank</span>
          </div>
        </div>

        <ManualImage caption="All Requests Page" mockUI={mockDashboardUI} />
      </section>

      {/* --- Section 6: Conversation Tab --- */}
      <section id="conversation-tab" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            6
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Active Chat & Revisions Upload
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-4">
          <p>
            The Conversation Tab resolves collaboration delays. S-CORE coordinates all project dialogues directly inside the task card. This isolates files and links from external chat noise:
          </p>

          {activeRequest ? (
            <div className="border border-brand-primary/10 rounded-2xl bg-white p-4 max-w-lg mx-auto font-sans shadow-sm" id="interactive-chat-sim-div">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
                <div>
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider flex items-center gap-1.5">
                    <MessageCircle size={14} className="text-brand-primary" />
                    S-CORE Real-time Collaboration Engine
                  </h4>
                  <span className="text-[10px] text-text-light font-mono">Ticket: {activeRequest.id} — Status: </span>
                </div>
                <StatusBadge status={activeRequest.status} />
              </div>

              {/* Chat Thread */}
              <div className="space-y-2.5 h-48 overflow-y-auto mb-3 p-2 bg-gray-50/50 rounded-lg border border-gray-100 font-sans">
                {activeRequest.messages.map((m, id) => (
                  <div 
                    key={id} 
                    className={`p-2 rounded-xl text-[11px] max-w-[85%] leading-relaxed ${
                      m.sender.startsWith("You") 
                        ? "ml-auto bg-brand-primary text-white" 
                        : m.sender === "System" 
                          ? "mx-auto bg-gray-200 text-gray-600 font-mono text-[9px] text-center" 
                          : "bg-brand-light text-brand-dark border border-brand-accent/20"
                    }`}
                  >
                    <div className="text-[9px] font-bold opacity-80 mb-0.5">{m.sender}</div>
                    <div>{m.text}</div>
                    <div className="text-[8px] text-right mt-0.5 opacity-60 font-mono">{m.time}</div>
                  </div>
                ))}
              </div>

              {/* Hint alert */}
              {activeRequest.status === "For Revision" && (
                <div className="bg-[#ea580c]/5 border border-[#ea580c]/10 rounded-md p-2 text-[10px] text-[#ea580c] mb-2 font-medium">
                  💡 Type <em>&quot;upload&quot;</em> in your chat prompt below to simulate pushing revised drafts and returning status to Pending!
                </div>
              )}

              {/* Write Form */}
              <form onSubmit={handleSendMessage} className="flex gap-1.5">
                <input 
                  type="text" 
                  placeholder={activeRequest.status === "For Revision" ? 'Type "I will upload..." or "uploaded" to trigger revision...' : "Type your message to Unit Staff..."}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                  id="input-chat-msg"
                />
                <button 
                  type="submit" 
                  className="bg-brand-primary hover:bg-brand-secondary text-white px-3.5 rounded-lg flex items-center justify-center"
                  id="btn-chat-send"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center text-xs text-text-light italic p-4 bg-gray-50 rounded-lg">
              (No active request selected. Select a request in the simulated dashboard above to test real-time conversations.)
            </div>
          )}
        </div>

        <ManualImage caption="Active Chat Revision" mockUI={mockDashboardUI} />
      </section>
    </div>
  );
}
