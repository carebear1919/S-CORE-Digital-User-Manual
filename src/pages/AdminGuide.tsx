import React, { useState } from "react";
import ManualImage from "../components/ManualImage";
import StatusBadge, { ProjectStatus } from "../components/StatusBadge";
import { InfoBox, WarningBox } from "../components/AlertBoxes";
import { 
  Sliders, Search, ShieldCheck, Mail, Users, FileSpreadsheet, 
  Settings, Megaphone, BarChart3, Clock, AlertTriangle, PlusCircle, CheckCircle, ArrowDownToLine 
} from "lucide-react";

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

  const activeRequest = requests.find((r: AdminRequest) => r.id === selectedReqId);
  const activeUser = users.find((u: AdminUser) => u.id === selectedUserId);

  // Handlers
  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReqId) return;
    setRequests((prev: AdminRequest[]) => prev.map((r: AdminRequest) => {
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
    setUsers((prev: AdminUser[]) => prev.map((u: AdminUser) => {
      if (u.id === selectedUserId) {
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const filteredRequests = requests.filter((r: AdminRequest) => {
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
                {filteredRequests.map((r: AdminRequest) => (
                  <div
                    key={r.id}
                    onClick={() => { setSelectedReqId(r.id); setReqStatusState(r.status); setAssignedUnitState(r.assignedUnit); }}
                    className={`p-2 border rounded-xl cursor-pointer transition-all ${selectedReqId === r.id ? "bg-brand-light border-brand-primary font-semibold" : "bg-gray-50/50 hover:bg-gray-100 border-gray-100"}`}
                    id={`row-admin-req-${r.id}`}
                  >
                    <div className="flex justify-between items-start mb-0.5">
                      <span className="max-w-37.5 truncate block text-[11px] text-brand-dark">{r.title}</span>
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAssignedUnitState(e.target.value)}
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReqStatusState(e.target.value as any)}
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
              {users.map((u: AdminUser) => (
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnnTitle(e.target.value)}
                className="w-full p-1.5 bg-white border rounded text-xs text-text-dark font-sans focus:outline-none"
                id="input-ann-title"
              />
            </div>

            <div>
              <label className="block text-[8.5px] uppercase font-bold text-brand-dark mb-1">Select Target Audience Visibility</label>
              <select
                value={annTarget}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAnnTarget(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnnContent(e.target.value)}
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
                Announcement issued to S-CORE active routers!
              </div>
            )}
          </form>

          {/* Announcements list */}
          <div className="space-y-1.5">
            <h5 className="text-[10px] font-bold uppercase text-brand-dark">Active Broadcast Feed ({announcements.length} Live)</h5>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {announcements.map((ann: Announcement) => (
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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReportScope(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReportFormat(e.target.value)}
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
              <CheckCircle size={14} className="text-brand-primary" />
              <div>
                <strong>Generated Successfully!</strong> Compiled {reportScope} into {reportFormat}. System file logs synced.
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- Tab Content 5: Analytics Charts --- */}
      {activeAdminTab === "analytics" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center text-xs animate-fadeIn" id="admin-simp-analytics-tab">
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
          Welcome to the S-CORE Admin panel. As an Admin (Director or Secretary), you have full oversight of the platform: you configure the system, oversee every request across all units, manage user accounts, publish announcements, and control the public-facing website content. This guide covers everything available to you.
        </p>
      </div>

      {/* --- Section 1: Getting Started & Your Dashboard --- */}
      <section id="admin-dashboard-guide" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            1
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Getting Started & Your Dashboard
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Your dashboard (Dashboard in the sidebar) gives you an at-a-glance view of the whole system:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-text-light font-sans">
            <li>Action cards for quick navigation to All Requests, Approvals, Services, and Users</li>
            <li>A calendar of upcoming deadlines across all units</li>
            <li>KPI counters: Pending Assignment, Awaiting Approval, In Revision, Unassigned Tasks</li>
            <li>Charts: Current Request Status, Active Tasks by Unit, Request Volume Over Time</li>
            <li>Tables: Very Recent Requests, Urgent &amp; Overdue Tasks, Top Requests by Revision Count</li>
          </ul>
        </div>

        <ManualImage caption="Admin Dashboard Overview" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 2: Configuration --- */}
      <section id="admin-configurations" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            2
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Configuration
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            The Configuration page is the control center for the entire platform, organised into six tabs across the top of the page. Any changes you make are tracked &mdash; a sticky bar appears at the bottom showing "You have unsaved changes" when something is modified. Click <strong>Save Changes</strong> to persist all settings at once.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">1. System Configuration</h4>
          <p className="text-xs text-text-light">
            Define master lists used as dropdown options everywhere: Organizations, Offices/Departments, Units &amp; Request Types, and Request Statuses. Below these, configure User Roles &amp; Permissions, Announcement Priority Levels, and Announcement Types. Further down you will find site title, timezone, notification preferences, file upload limits, and Automated Workflow &amp; Archiving day-limit settings.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">2. Homepage Configuration</h4>
          <p className="text-xs text-text-light">
            Changes are visible to every visitor of the public website. Each collapsible section corresponds to a part of the homepage: Hero, SCO Pledge, About, Services, Team, Contact, Social Media links, and Footer.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">3. About S-CORE Page Configuration</h4>
          <p className="text-xs text-text-light">
            Edit the public /about-s-core page: Header, System Overview, Platform Features, and Call-to-Action buttons &mdash; same collapsible layout.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">4. Archive Manager</h4>
          <p className="text-xs text-text-light">
            Configure auto-archive day-limits, trigger immediate archiving, review pending restoration requests, and browse archived records.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">5. Q&amp;A Chatbot</h4>
          <p className="text-xs text-text-light">
            Manage the chatbot visible on every page. Toggle visibility per page, edit greeting message and manual-reference links, and configure role-based Q&amp;A content for requestors, unit members, and admins.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">6. Maintenance</h4>
          <p className="text-xs text-text-light">
            Control system downtime. Set <strong>Schedule Type</strong> to Instant (activates immediately), Scheduled (set start/end date-time), or Disabled. Choose <strong>Target Audience</strong>: All Users, Unit Members Only, or Requestors Only. Write a custom message &mdash; any email address automatically becomes a clickable mailto link. Set a <strong>Contact Email</strong> for the maintenance notice page. Admins always bypass maintenance.
          </p>
        </div>

        <ManualImage caption="Configuration Page — System Tab" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 3: Archiving --- */}
      <section id="admin-archiving" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            3
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Archiving
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Archiving is managed from Configuration → Archive Manager. A background job runs nightly and archives requests automatically &mdash; Completed/Approved requests past their day-limit, and stale For Revision requests with no activity.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-text-light font-sans">
            <li><strong>Day-limit settings:</strong> Configure per-status wait times before auto-archiving (defaults: 30 days Completed, 30 Approved, 14 For Revision).</li>
            <li><strong>Run Archiving Now:</strong> Trigger the same logic immediately instead of waiting for the nightly job.</li>
            <li><strong>Pending Restoration Requests:</strong> Requestors and units can ask for an archived request to be restored &mdash; review and approve/dismiss.</li>
            <li><strong>Browse Archived Records:</strong> Search, filter, restore, or permanently delete archived requests.</li>
          </ul>
          <InfoBox title="User Restoration Setting">
            Both requestors and units can ask for an archived request to be reactivated &mdash; the "Allow Users to Restore Their Own Archived Requests" setting governs this.
          </InfoBox>
        </div>

        <ManualImage caption="Archive Manager" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 4: Monitoring All Requests --- */}
      <section id="admin-track-requests" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            4
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Monitoring All Requests
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Three pages give you full visibility into requests across every unit:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-text-light font-sans">
            <li><strong>Track All Requests:</strong> Every request, both types, in one table.</li>
            <li><strong>Manage Approvals:</strong> Only Request Approvals.</li>
            <li><strong>Manage Services:</strong> Only Service Requests.</li>
          </ul>
          <p className="text-xs text-text-light">
            On any of these pages you can filter by Request ID, requestor name, status, assigned unit, organization, office/department, and date range. Open a request's details, edit it, or update its status or deadline directly. Click <strong>Open Request Discussion</strong> to join the same Conversation thread used by the requestor and the assigned unit. View a <strong>Deleted Requests</strong> list, and restore or permanently delete from there.
          </p>
        </div>

        <ManualImage caption="Track All Requests — Submissions Ledger" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 5: Managing Requests as Admin --- */}
      <section id="admin-manage-requests" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            5
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Managing Requests as Admin
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">Creating Requests On Behalf of Users</h4>
          <p className="text-xs text-text-light">
            From the Manage Approvals and Manage Services pages, click the <strong>+ Create</strong> button. At the top you see a "Create Request For User" field: leave it empty to create under your own name, or search and select a user to create on their behalf. The requestor receives a notification and it appears in their personal dashboard.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">Assigning Requests to a Unit</h4>
          <p className="text-xs text-text-light">
            Below request type selection, the "Assign to Unit" dropdown gives <strong>Auto-assign</strong> (system picks the recommended unit) or <strong>Choose a specific unit</strong> to override. You can also set a deadline while creating service requests.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">Updating Status, Reassigning, and Editing</h4>
          <p className="text-xs text-text-light">
            From any requests page, click a request row to open its detail view. There you can update request status (Queued, In Progress, Approved, Rejected, Completed, For Revision, or Archived), reassign to a different unit, edit deadline, modify title/description/organization, join the discussion, or delete/restore. Whenever you update a request, the requestor and assigned unit receive automatic notifications.
          </p>

          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">Managing Request Discussions</h4>
          <p className="text-xs text-text-light">
            Every request has a built-in Conversation thread visible to the requestor, the assigned unit, and all admins. Use it to clarify requirements, provide guidance to the unit, or intervene when there is a dispute or delay. Since conversations are visible to the requestor, prefer private messages or settings changes for sensitive internal coordination.
          </p>
        </div>

        <ManualImage caption="Request Detail — Assign Unit & Status" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 6: Generating Reports --- */}
      <section id="admin-reports" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            6
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Generating Reports
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Go to <strong>Generate Reports</strong> in the sidebar. Set your filters: a date-range preset or custom range, request type (all/approval/service), one or more units, one or more statuses, and a sort order.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-text-light font-sans">
            <li>Generate a preview, customize the export (file name, report title, colors, paper size, orientation).</li>
            <li>Download as PDF or Excel.</li>
            <li>Every report you generate is saved to <strong>Generated Reports History</strong>, where you can view, edit, duplicate, delete, restore, or re-download it later.</li>
          </ul>
        </div>

        <ManualImage caption="Report Generation Interface" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 7: Analytics --- */}
      <section id="admin-analytics" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            7
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Analytics
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            The Analytics page gives deeper performance insight, filterable by date range, unit, request type, and status:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-text-light font-sans">
            <li>At-a-glance KPIs</li>
            <li>Request Status and Request Type distribution</li>
            <li>Top Requestors and Request Volume Over Time</li>
            <li>Active Workload, Average Turnaround Time, Total Workload, and Average Response Time &mdash; all broken down by unit</li>
          </ul>
          <p className="text-xs text-text-light">
            Analytics data can also be exported to PDF, with its own history of past exports.
          </p>
        </div>

        <ManualImage caption="Analytics Dashboard" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 8: User Management --- */}
      <section id="admin-user-management" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            8
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            User Management
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            The User Accounts page manages every account in the system, split into All / Approved / Pending / Denied tabs.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-text-light font-sans">
            <li><strong>New registrations:</strong> Approve (grants default Requestor role), Deny (with a reason), or Reset back to pending.</li>
            <li><strong>Change Role:</strong> Promote or change a user between Requestor, Unit, and Admin. When setting to Unit, you must also assign which unit team they belong to (e.g., Graphics, Multimedia).</li>
            <li><strong>Create User Invitation:</strong> Generate a direct onboarding link to invite a new account without manual approval.</li>
            <li><strong>Deleted Users:</strong> Restore or permanently delete removed accounts.</li>
          </ul>

          <WarningBox title="Role Elevation Restriction">
            Student accounts can only be elevated to Unit Staff, never to Administrator level. This protects confidential system configurations from unauthorized access.
          </WarningBox>
        </div>

        <ManualImage caption="User Accounts Management" mockUI={mockAdminControlCenter} />
      </section>

      {/* --- Section 9: Announcements --- */}
      <section id="admin-announcements" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            9
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Announcements
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Go to <strong>Announcements</strong> to broadcast messages to your users:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-text-light font-sans">
            <li>Compose a title, rich-text message, priority level, and announcement type (configurable in System Configuration).</li>
            <li>Choose recipients: All Users, By Organization, By Office/Department, or Specific Users.</li>
            <li>Optionally set a future <strong>Schedule Send Date &amp; Time</strong> &mdash; scheduled announcements are sent automatically by a background job at the scheduled time.</li>
            <li>Manage sent announcements: view, edit, delete, and restore from the Trash.</li>
          </ul>
        </div>

        <ManualImage caption="Announcement Interface" mockUI={mockAdminControlCenter} />
      </section>
    </div>
  );
}
