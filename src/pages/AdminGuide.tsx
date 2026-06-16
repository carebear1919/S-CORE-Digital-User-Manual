import React, { useState } from "react";
import ManualImage from "../components/ManualImage";
import StatusBadge, { ProjectStatus } from "../components/StatusBadge";
import { InfoBox, WarningBox } from "../components/AlertBoxes";
import { 
  Sliders, Search, ShieldCheck, Mail, Users, FileSpreadsheet, 
  Settings, Megaphone, BarChart3, Clock, AlertTriangle, PlusCircle, CheckCircle, ArrowDownToLine 
} from "lucide-react";
import SuperAdminGuide from "./SuperAdminGuide";

interface AdminRequest {
  id: string;
  title: string;
  requester: string;
  dept: string;
  type: "Approval" | "Service";
  status: ProjectStatus;
  assignedUnit: string;
  submittedAt: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Requestor" | "Unit" | "Admin";
  status: "Active" | "Pending Approval" | "Inactive";
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole: string;
  date: string;
}

export default function AdminGuide() {
  // Simulator states
  const [activeAdminTab, setActiveAdminTab] = useState<"requests" | "users" | "announcements" | "reports" | "analytics" | "settings">("requests");
  const [requestFilter, setRequestFilter] = useState<"all" | "approvals" | "services">("all");
  const [selectedReqId, setSelectedReqId] = useState<string>("REQ-401");
  const [assignedUnitState, setAssignedUnitState] = useState("Unassigned");
  const [reqStatusState, setReqStatusState] = useState<ProjectStatus>("Pending");
  
  // Requests data
  const [requests, setRequests] = useState<AdminRequest[]>([
    { id: "REQ-401", title: "DLSU-D Sports Uniform Design", requester: "Emilio Aguinaldo", dept: "Athletics Office", type: "Approval", status: "Pending", assignedUnit: "Unassigned", submittedAt: "2026-06-15" },
    { id: "REQ-402", title: "Eco-Summit Promo Videoclips", requester: "Gregoria de Jesus", dept: "Green Youth Council", type: "Service", status: "In Progress", assignedUnit: "Maria (Graphics Team)", submittedAt: "2026-06-14" },
    { id: "REQ-403", title: "DLSU-D Mascot Flat Sticker", requester: "Jose Rizal", dept: "Art Club Alliance", type: "Approval", status: "For Revision", assignedUnit: "Juan (Media Team)", submittedAt: "2026-06-12" },
    { id: "REQ-404", title: "Annual Research booklet review", requester: "Apolinario Mabini", dept: "Graduate Studies Dept", type: "Approval", status: "Approved", assignedUnit: "Juan (Media Team)", submittedAt: "2026-06-11" }
  ]);

  // Users log
  const [users, setUsers] = useState<AdminUser[]>([
    { id: "USR-001", name: "Rizal, Jose", email: "student.ri@dlsud.edu.ph", role: "Requestor", status: "Active" },
    { id: "USR-002", name: "Bonifacio, Andres", email: "staff.bo@dlsud.edu.ph", role: "Unit", status: "Active" },
    { id: "USR-003", name: "Mabini, Apolinario", email: "faculty.ma@dlsud.edu.ph", role: "Requestor", status: "Pending Approval" },
    { id: "USR-004", name: "Aguinaldo, Emilio", email: "student.ag@dlsud.edu.ph", role: "Requestor", status: "Active" }
  ]);

  const [selectedUserId, setSelectedUserId] = useState<string>("USR-003");

  // Announcements lists
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: "ANN-101", title: "Official DLSU-D Logo Release", content: "All requestors must implement version 3.4 vector guides on newly submitted merchandise items.", targetRole: "All", date: "2026-06-14" },
    { id: "ANN-102", title: "Strategic Comms System Maintenance", content: "Platform database optimization will trigger on June 20 at midnight. Upload capabilities locked.", targetRole: "All", date: "2026-06-12" }
  ]);

  // Announcement creator variables
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annTarget, setAnnTarget] = useState("All");
  const [annSuccess, setAnnSuccess] = useState(false);

  // Reports generator settings
  const [reportScope, setReportScope] = useState("Requests Record");
  const [reportFormat, setReportFormat] = useState("CSV Spreadsheet");
  const [reportSuccess, setReportSuccess] = useState(false);

  const activeRequest = requests.find(r => r.id === selectedReqId);
  const activeUser = users.find(u => u.id === selectedUserId);

  // Handlers
  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReqId) return;
    setRequests(prev => prev.map(r => {
      if (r.id === selectedReqId) {
        return { ...r, assignedUnit: assignedUnitState, status: reqStatusState };
      }
      return r;
    }));
    alert(`Success! Handled assigning ${assignedUnitState} to request ${selectedReqId}.`);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    const newAnn: Announcement = {
      id: `ANN-${Date.now().toString().slice(-4)}`,
      title: annTitle,
      content: annContent,
      targetRole: annTarget,
      date: new Date().toISOString().split("T")[0]
    };

    setAnnouncements([newAnn, ...announcements]);
    setAnnTitle("");
    setAnnContent("");
    setAnnSuccess(true);
    setTimeout(() => setAnnSuccess(false), 4500);
  };

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 5000);
  };

  const handleAuditUserStatus = (newStatus: "Active" | "Inactive" | "Pending Approval") => {
    if (!selectedUserId) return;
    setUsers(prev => prev.map(u => {
      if (u.id === selectedUserId) {
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const filteredRequests = requests.filter(r => {
    if (requestFilter === "all") return true;
    if (requestFilter === "approvals") return r.type === "Approval";
    if (requestFilter === "services") return r.type === "Service";
    return true;
  });

  // Compiled Admin Mock Panel
  const mockAdminControlCenter = (
    <div className="bg-white border border-brand-primary/10 rounded-2xl p-4 text-left font-sans max-w-3xl mx-auto text-text-dark shadow-sm">
      {/* Navigation Headers inside simulator */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded bg-brand-primary text-white flex items-center justify-center font-bold font-serif text-[11px]">
            AD
          </div>
          <div>
            <h4 className="text-xs font-bold text-brand-dark leading-none">S-CORE ADMIN PANEL</h4>
            <span className="text-[10px] text-text-light font-mono">SCO Command Desk</span>
          </div>
        </div>

        <nav className="flex flex-wrap gap-1" id="nav-admin-simulator">
          {[
            { id: "requests", label: "Requests View" },
            { id: "users", label: "Users Registry" },
            { id: "announcements", label: "Announcements" },
            { id: "reports", label: "Reports Center" },
            { id: "analytics", label: "Analytics" }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`text-[9px] uppercase font-bold px-2 py-1.5 rounded-lg transition-colors select-none ${activeAdminTab === tab.id ? "bg-brand-primary text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              id={`btn-admin-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* --- Tab Content 1: Requests View --- */}
      {activeAdminTab === "requests" && (
        <div className="space-y-4 animate-fadeIn" id="admin-simp-requests-tab">
          <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
            <span className="text-[10px] text-brand-primary font-bold">WORKFLOW ROUTING ENGINE</span>
            <div className="flex gap-1" id="btn-group-admin-req-filter">
              {["all", "approvals", "services"].map(filter => (
                <button
                  key={filter}
                  onClick={() => setRequestFilter(filter as any)}
                  className={`text-[8.5px] font-bold px-2 py-0.5 rounded uppercase ${requestFilter === filter ? "bg-brand-primary text-white" : "bg-white border text-gray-500"}`}
                  id={`btn-admin-filter-${filter}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grid left: Ledger */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-bold uppercase text-brand-dark">Direct Submissions list</h5>
              <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                {filteredRequests.map(r => (
                  <div
                    key={r.id}
                    onClick={() => { setSelectedReqId(r.id); setReqStatusState(r.status); setAssignedUnitState(r.assignedUnit); }}
                    className={`p-2 border rounded-xl cursor-pointer transition-all ${selectedReqId === r.id ? "bg-brand-light border-brand-primary font-semibold" : "bg-gray-50/50 hover:bg-gray-100 border-gray-100"}`}
                    id={`row-admin-req-${r.id}`}
                  >
                    <div className="flex justify-between items-start mb-0.5">
                      <span className="max-w-[150px] truncate block text-[11px] text-brand-dark">{r.title}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-[8.5px] text-text-light font-mono">ID: {r.id} | Handled: {r.assignedUnit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid right: Routing Actions */}
            {activeRequest ? (
              <form onSubmit={handleAssignSubmit} className="bg-brand-light/30 border border-brand-accent/25 rounded-xl p-3 space-y-2.5">
                <h5 className="text-[10px] font-bold uppercase text-brand-primary tracking-wide">
                  Assign Unit Team & Status Grid (ID: {activeRequest.id})
                </h5>
                <p className="text-[10px] text-text-light">{activeRequest.title} submitted by {activeRequest.requester} ({activeRequest.dept})</p>

                <div>
                  <label className="block text-[8.5px] uppercase font-bold text-brand-dark mb-0.5">Assigned Communications Resource</label>
                  <select
                    value={assignedUnitState}
                    onChange={(e) => setAssignedUnitState(e.target.value)}
                    className="w-full p-1 bg-white border border-gray-200 text-xs text-text-dark font-sans rounded focus:outline-none"
                    id="select-assignee-unit-sim"
                  >
                    <option value="Unassigned">Unassigned (Admin Hold)</option>
                    <option value="Maria (Graphics Team)">Maria (Graphics Team)</option>
                    <option value="Juan (Media Team)">Juan (Media Team)</option>
                    <option value="Emilio (PR & Communications Team)">Emilio (PR Team)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[8.5px] uppercase font-bold text-brand-dark mb-0.5">Change Global Workflow Status</label>
                  <select
                    value={reqStatusState}
                    onChange={(e) => setReqStatusState(e.target.value as any)}
                    className="w-full p-1 bg-white border border-gray-200 text-xs text-text-dark font-sans rounded focus:outline-none"
                    id="select-req-status-sim"
                  >
                    <option value="Pending">Pending Assignment Check</option>
                    <option value="In Progress">Allocated In Progress</option>
                    <option value="For Revision">Returned For Revision</option>
                    <option value="Approved">Approved Publication Release</option>
                    <option value="Completed">Completed Deliverable Archive</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-1.5 bg-brand-primary hover:bg-brand-secondary text-white text-[10px] font-bold rounded-lg border-b shadow-xs uppercase tracking-wider"
                  id="btn-admin-act-assign"
                >
                  Save Assignment Coordinates
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center p-6 text-xs text-text-light italic">
                Select a ticket on the left to process routing.
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Tab Content 2: Users Registry --- */}
      {activeAdminTab === "users" && (
        <div className="space-y-4 animate-fadeIn" id="admin-simp-users-tab">
          <h5 className="text-[10px] font-bold uppercase text-brand-dark">Active S-CORE Registrations Matrix</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {users.map(u => (
                <div
                  key={u.id}
                  onClick={() => setSelectedUserId(u.id)}
                  className={`p-2 border rounded-lg text-xs cursor-pointer transition-all ${selectedUserId === u.id ? "bg-brand-light border-brand-primary" : "bg-gray-50 hover:bg-gray-100 border-gray-100"}`}
                  id={`row-admin-user-${u.id}`}
                >
                  <div className="flex justify-between">
                    <span className="font-bold text-brand-dark">{u.name}</span>
                    <span className={`text-[9px] font-semibold px-2 py-0.2 rounded-full ${
                      u.status === "Active" 
                        ? "bg-green-100 text-green-700" 
                        : u.status === "Pending Approval" 
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}>{u.status}</span>
                  </div>
                  <p className="text-[9px] text-text-light font-mono">{u.email} | Role: <strong>{u.role}</strong></p>
                </div>
              ))}
            </div>

            {activeUser ? (
              <div className="bg-brand-light/30 border border-brand-accent/20 rounded-xl p-3 space-y-3">
                <h5 className="text-[10px] font-bold uppercase text-brand-primary">User Audit Controls: {activeUser.name}</h5>
                <div className="text-[11px] space-y-1.5">
                  <p><strong>Database ID:</strong> <code className="bg-white px-1 py-0.2 rounded border">{activeUser.id}</code></p>
                  <p><strong>Credentials:</strong> {activeUser.email}</p>
                  <p><strong>Assigned Role Level:</strong> {activeUser.role}</p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-2">
                  <button 
                    onClick={() => handleAuditUserStatus("Active")}
                    disabled={activeUser.status === "Active"}
                    className="p-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-[9px] font-bold rounded uppercase"
                    id="btn-admin-act-user-activate"
                  >
                    Activate
                  </button>
                  <button 
                    onClick={() => handleAuditUserStatus("Pending Approval")}
                    disabled={activeUser.status === "Pending Approval"}
                    className="p-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-[9px] font-bold rounded uppercase"
                    id="btn-admin-act-user-hold"
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => handleAuditUserStatus("Inactive")}
                    disabled={activeUser.status === "Inactive"}
                    className="p-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-[9px] font-bold rounded uppercase"
                    id="btn-admin-act-user-deactivate"
                  >
                    Disable
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-xs text-text-light italic p-4">
                Select a user from the registry.
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Tab Content 3: Announcements Creator --- */}
      {activeAdminTab === "announcements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn" id="admin-simp-ann-tab">
          <form onSubmit={handleCreateAnnouncement} className="bg-gray-50/50 p-3 rounded-xl border border-gray-150 space-y-3">
            <h5 className="text-[10px] font-bold uppercase text-brand-dark flex items-center gap-1">
              <Megaphone size={12} className="text-brand-primary" />
              CREATE SYSTEM ANNOUNCEMENT
            </h5>

            <div>
              <label className="block text-[8.5px] uppercase font-bold text-brand-dark mb-1">Announcement Title Header</label>
              <input 
                type="text"
                placeholder="e.g. Mandatory Branding Guidelines"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                className="w-full p-1.5 bg-white border rounded text-xs text-text-dark font-sans focus:outline-none"
                id="input-ann-title"
              />
            </div>

            <div>
              <label className="block text-[8.5px] uppercase font-bold text-brand-dark mb-1">Select Target Audience Visibility</label>
              <select
                value={annTarget}
                onChange={(e) => setAnnTarget(e.target.value)}
                className="w-full p-1 bg-white border text-xs text-text-dark font-sans rounded focus:outline-none"
                id="select-ann-target"
              >
                <option value="All">All Users (Global Feed)</option>
                <option value="Requestor">Requestors Only (Students/Faculty)</option>
                <option value="Unit">Unit Staff Only (Internal Graphic Officers)</option>
              </select>
            </div>

            <div>
              <label className="block text-[8.5px] uppercase font-bold text-brand-dark mb-1">Announcement Body Description</label>
              <textarea
                rows={2}
                placeholder="Submit information payload here..."
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                className="w-full p-1.5 bg-white border rounded text-xs text-text-dark font-sans focus:outline-none"
                id="textarea-ann-body"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white text-[10px] py-1.5 rounded-lg font-bold"
              id="btn-admin-submit-ann"
            >
              Broadcast System Announcement
            </button>

            {annSuccess && (
              <div className="p-2 bg-brand-light text-brand-primary font-bold text-[9px] text-center border rounded-lg">
                📢 Announcement issued to S-CORE active routers!
              </div>
            )}
          </form>

          {/* Announcements list */}
          <div className="space-y-1.5">
            <h5 className="text-[10px] font-bold uppercase text-brand-dark">Active Broadcast Feed ({announcements.length} Live)</h5>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {announcements.map(ann => (
                <div key={ann.id} className="p-2 border rounded-xl bg-white space-y-1 border-brand-accent/20">
                  <div className="flex justify-between items-center bg-brand-light/30 px-1.5 py-0.5 rounded">
                    <span className="font-bold text-[10px] text-brand-dark truncate pr-1">{ann.title}</span>
                    <span className="text-[8px] bg-brand-accent text-white px-1.5 py-0.2 rounded uppercase shrink-0 font-bold">To: {ann.targetRole}</span>
                  </div>
                  <p className="text-[10.5px] text-text-light leading-relaxed">{ann.content}</p>
                  <p className="text-[8px] text-gray-400 text-right font-mono">ID: {ann.id} | Printed: {ann.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- Tab Content 4: Reports Center --- */}
      {activeAdminTab === "reports" && (
        <div className="space-y-3 max-w-sm mx-auto animate-fadeIn" id="admin-simp-reports-tab">
          <form onSubmit={handleGenerateReport} className="bg-brand-light/20 border border-brand-accent/25 rounded-2xl p-4 space-y-3">
            <h5 className="text-[10px] font-bold uppercase text-brand-primary flex gap-1 items-center">
              <FileSpreadsheet size={13} />
              COMPILE COMPLIANCE & ACTIVITY REPORT
            </h5>

            <div>
              <label className="block text-[8.5px] uppercase font-bold text-brand-dark mb-1 font-sans">Report Target Focus</label>
              <select
                value={reportScope}
                onChange={(e) => setReportScope(e.target.value)}
                className="w-full p-1 bg-white border text-xs text-text-dark font-sans rounded focus:outline-none"
                id="select-report-focus"
              >
                <option value="Requests Record">Requests Volumes & Timelines Audit</option>
                <option value="S-CORE User Activity">S-CORE Registrations Log</option>
                <option value="Unit Staff Performance">Staff Processing Turnaround Times</option>
              </select>
            </div>

            <div>
              <label className="block text-[8.5px] uppercase font-bold text-brand-dark mb-1 font-sans">Export Data Blueprint</label>
              <select
                value={reportFormat}
                onChange={(e) => setReportFormat(e.target.value)}
                className="w-full p-1 bg-white border text-xs text-text-dark font-sans rounded focus:outline-none"
                id="select-report-format"
              >
                <option value="CSV Spreadsheet">Commas Separated spreadsheet (.csv)</option>
                <option value="PDF Document">Document Print PDF Layout (.pdf)</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full py-1.5 bg-brand-primary hover:bg-brand-secondary text-white text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 shadow"
              id="btn-admin-generate-report"
            >
              <ArrowDownToLine size={12} />
              Simulate Report Compilation
            </button>
          </form>

          {reportSuccess && (
            <div className="p-3 bg-brand-light text-brand-primary rounded-xl border border-brand-accent/30 flex gap-2 text-[10px] font-semibold items-center animate-fadeIn" id="div-report-success-msg">
              <CheckCircle size={14} className="text-[#1a5d1a]" />
              <div>
                <strong>Generated Successfully!</strong> Compiled {reportScope} into {reportFormat}. System file logs synced.
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- Tab Content 5: Analytics Charts --- */}
      {activeAdminTab === "analytics" && (
        <div className="grid grid-cols-2 gap-3 text-center text-xs animate-fadeIn" id="admin-simp-analytics-tab">
          <div className="p-3 border border-brand-accent/15 rounded-xl bg-white">
            <h6 className="font-bold text-brand-primary uppercase text-[9px] tracking-wider mb-2">Request distribution by Status</h6>
            <div className="flex items-end justify-center gap-1.5 h-24 pt-4 border-b border-gray-155">
              {[
                { h: "12%", c: "bg-[#f59e0b]", l: "Pend" },
                { h: "44%", c: "bg-[#3b82f6]", l: "InP" },
                { h: "8%", c: "bg-[#ea580c]", l: "Rev" },
                { h: "30%", c: "bg-[#16a34a]", l: "App" },
                { h: "66%", c: "bg-[#0d9488]", l: "Comp" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className={`w-full rounded-t-sm ${b.c}`} style={{ height: b.h }}></div>
                  <span className="text-[8px] text-text-light font-mono mt-1 font-bold">{b.l}</span>
                </div>
              ))}
            </div>
            <p className="text-[8px] text-text-light uppercase tracking-wider mt-1.5">Ratio Check: Highest index in Completed tasks</p>
          </div>

          <div className="p-3 border border-brand-accent/15 rounded-xl bg-white">
            <h6 className="font-bold text-brand-primary uppercase text-[9px] tracking-wider mb-2">Requests Volume Over time (Monthly)</h6>
            <div className="flex items-end justify-center gap-1.5 h-24 pt-4 border-b border-gray-155">
              {[
                { h: "20%", c: "bg-brand-primary", l: "Jan" },
                { h: "40%", c: "bg-brand-primary", l: "Feb" },
                { h: "35%", c: "bg-brand-primary", l: "Mar" },
                { h: "65%", c: "bg-brand-primary", l: "Apr" },
                { h: "90%", c: "bg-brand-primary", l: "May" },
                { h: "75%", c: "bg-brand-secondary animate-pulse", l: "Jun" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center flex-1 font-sans">
                  <div className={`w-full rounded-t-sm ${b.c}`} style={{ height: b.h }}></div>
                  <span className="text-[8.5px] font-mono text-text-light mt-1">{b.l}</span>
                </div>
              ))}
            </div>
            <p className="text-[8px] text-text-light uppercase tracking-wider mt-1.5">Ratio Check: Rapid May peak observed</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-12 animate-fadeIn" id="admin-guide-container">
      {/* Page Header */}
      <div className="border-b border-brand-primary/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-dark tracking-tight mb-2">
          Administrator <span className="gold-gradient">Operations Desk</span>
        </h1>
        <p className="text-sm text-text-light">
          An interactive walkthrough designed for De La Salle University-Dasmariñas&#39; Strategic Communications Directors and assigned Office Managers.
        </p>
      </div>

      {/* --- Section 1: Dashboard Overviews --- */}
      <section id="admin-dashboard-guide" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            1
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Admin Dashboard Summary
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            The administrative home dashboard centers multi-office workload trackers, recent system-wide actions logs, announcement configurations panels, and easy-access action controls:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-text-light font-sans">
            <li>Summary statistics cards displaying active, overdue and completed ticket indices.</li>
            <li>Comprehensive system announcements creator and role filter mechanisms.</li>
            <li>Download links to generate on-demand, filtered reports sheets (.csv/PDF).</li>
          </ul>
        </div>

        <ManualImage caption="Admin Dashboard" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 2: Ledger tracking All requests --- */}
      <section id="admin-track-requests" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            2
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Direct Tracking Ledger
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Administrative operators track, filter, and audit all submitted files inside single interfaces. Toggle directories dynamically:
          </p>

          <ol className="list-decimal pl-5 space-y-2 text-xs text-text-light font-sans">
            <li><strong>All Submissions:</strong> Comprehensive logs of both Approval and Technical Service requests.</li>
            <li><strong>Approvals Ledger:</strong> Exclusively isolates verification documents submitted for SCO validation stamps.</li>
            <li><strong>Services Ledger:</strong> Identifies active technical creative jobs routed across team squads.</li>
          </ol>
        </div>

        <ManualImage caption="All Requests Overview" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 3: Approvals Assignments --- */}
      <section id="admin-approvals-assign" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            3
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Routing Approvals Contracts
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-2">
          <p>
            Administrators hold routing permissions. To assign, select any pending request, review the files submitted, specify the handling Unit Team member, and modify status targets as required.
          </p>
        </div>

        <ManualImage caption="Approval Request Details" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 4: Services Assignments --- */}
      <section id="admin-services-assign" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            4
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Routing Technical Services
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-2">
          <p>
            Determine which unit team possesses the necessary bandwidth. Select the <strong>Service Request</strong>, assign the graphic designer or photographer, and review conversations in the discussions board to verify progress.
          </p>
        </div>

        <ManualImage caption="Service Request Details" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 5: User management --- */}
      <section id="admin-user-management" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1a5d1a] text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            5
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            User Account Auditing
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Administrators manage logins. Open the Users Registry, filter users by status tags, and toggle their account states between <strong>Active</strong>, <strong>Pending Approval</strong>, or <strong>Inactive</strong> to manage institutional workspace boundaries.
          </p>
        </div>

        <ManualImage caption="User Management Page" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 6: Analytics --- */}
      <section id="admin-analytics" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            6
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Comprehensive System Analytics
          </h2>
        </div>

        <p className="text-sm text-text-dark">
          Track institution-wide communication trends in real-time. Look over visual analytics parameters representing monthly volumes, status splits, request category ratios, user enrollment patterns, and design turnaround times.
        </p>

        <ManualImage caption="Analytics Page" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 7: Announcements --- */}
      <section id="admin-announcements" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            7
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Announcements & Audience Filters
          </h2>
        </div>

        <p className="text-sm text-text-dark">
          Announcements propagate instantly across active user gateways inside S-CORE. Apply specific audience visibilities (Global Feed, Requestor View, or Unit Staff) to deliver important brand guides to the right users.
        </p>

        <ManualImage caption="Announcement Creation Interface" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 8: Report generation --- */}
      <section id="admin-reports" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            8
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            On-Demand Report Compilation
          </h2>
        </div>

        <p className="text-sm text-text-dark">
          Compile operational statistics instantly for executive committee audits. Select your target area (Requests, Users, or Staff performance), choose your data blueprint (.csv spreadsheet / document PDF), and compile dynamic logs on demand.
        </p>

        <ManualImage caption="Report Generation Page" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 9: Configurations --- */}
      <section id="admin-configurations" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            9
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Settings & System Configurations
          </h2>
        </div>

        <p className="text-sm text-text-dark">
          Manage system-level requirements: adjust metadata parameters, specify maximum upload file size boundaries, establish archives cycles, and modify branding elements inside the portal homepage.
        </p>

        <ManualImage caption="Configuration Page" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 10: Notifications --- */}
      <section id="admin-notifications" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            10
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Administrative Alert Routers
          </h2>
        </div>

        <p className="text-sm text-text-dark">
          Stay on top of system-wide changes. Built-in alerts inform you of new user account registrations requiring verification, newly logged request packages, and critical, approaching deadlines.
        </p>
      </section>

      {/* Embedded Super Administrator Manual */}
      <div className="border-t border-brand-primary/10 pt-12 mt-12" id="super-admin-desk-merged font-sans">
        <SuperAdminGuide />
      </div>
    </div>
  );
}
