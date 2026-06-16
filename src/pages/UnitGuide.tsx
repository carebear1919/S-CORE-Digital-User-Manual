import React, { useState } from "react";
import ManualImage from "../components/ManualImage";
import StatusBadge, { ProjectStatus } from "../components/StatusBadge";
import { InfoBox, WarningBox } from "../components/AlertBoxes";
import { 
  Calendar as CalendarIcon, Briefcase, FileCheck, CheckCircle2, 
  HelpCircle, AlertCircle, RefreshCw, Eye, Upload, Bell, ChevronRight 
} from "lucide-react";

interface UnitTask {
  id: string;
  requester: string;
  dept: string;
  title: string;
  type: "Approval" | "Service";
  deadline: string;
  status: ProjectStatus;
  urgency: "High" | "Medium" | "Regular";
  assignee: string;
  deliverable?: string;
  revisionNotes?: string;
}

export default function UnitGuide() {
  // Simulator States
  const [tasks, setTasks] = useState<UnitTask[]>([
    {
      id: "TSK-098",
      requester: "Juan de la Cruz",
      dept: "GMA Student Coalition",
      title: "Science Week Poster Draft",
      type: "Approval",
      deadline: "2026-06-18",
      status: "Pending",
      urgency: "High",
      assignee: "Me"
    },
    {
      id: "TSK-092",
      requester: "Prof. Maria Clara",
      dept: "College of Science",
      title: "Environmental Seminar Backdrop",
      type: "Service",
      deadline: "2026-06-21",
      status: "In Progress",
      urgency: "Medium",
      assignee: "Me"
    },
    {
      id: "TSK-084",
      requester: "Sec. Emilio A.",
      dept: "Central Student Council",
      title: "CSU Constitution Booklet",
      type: "Approval",
      deadline: "2026-06-25",
      status: "For Revision",
      urgency: "Regular",
      assignee: "Me"
    }
  ]);

  const [selectedTaskId, setSelectedTaskId] = useState<string>("TSK-098");
  const [activeTab, setActiveTab] = useState<"all" | "approval" | "service">("all");
  const [deliverableFile, setDeliverableFile] = useState("");
  const [revisionComments, setRevisionComments] = useState("");
  const [simActionMsg, setSimActionMsg] = useState("");

  const currentTask = tasks.find(t => t.id === selectedTaskId);

  // Task processing controllers
  const handleUpdateStatus = (newStatus: ProjectStatus) => {
    if (!currentTask) return;
    setTasks(prev => 
      prev.map(t => {
        if (t.id === selectedTaskId) {
          let updatedTask = { ...t, status: newStatus };
          if (newStatus === "For Revision") {
            updatedTask.revisionNotes = revisionComments || "Branding margins exceed limits.";
          }
          if (newStatus === "Completed") {
            updatedTask.deliverable = deliverableFile || "approved-deliverable-final.pdf";
          }
          return updatedTask;
        }
        return t;
      })
    );
    setSimActionMsg(`Task ${selectedTaskId} successfully set to: ${newStatus}`);
    setRevisionComments("");
    setDeliverableFile("");
    setTimeout(() => setSimActionMsg(""), 4500);
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab === "all") return true;
    if (activeTab === "approval") return t.type === "Approval";
    if (activeTab === "service") return t.type === "Service";
    return true;
  });

  const urgentTasks = tasks
    .filter(t => t.status !== "Completed" && t.status !== "Rejected")
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  // Mock workspace layout
  const mockUnitWorkspace = (
    <div className="bg-white border border-brand-primary/10 rounded-2xl p-4 text-left font-sans max-w-2xl mx-auto text-text-dark shadow-sm">
      <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-100">
        <div>
          <span className="text-[9px] font-bold text-[#ea580c] bg-[#ea580c]/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Unit Staff Workstation
          </span>
          <h4 className="text-sm font-serif font-bold text-brand-dark mt-1">S-CORE Task Queue Tracker</h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-light font-medium bg-brand-light/50 px-2.5 py-1 rounded-lg">
          <CalendarIcon size={13} className="text-brand-primary" />
          <span>June 2026 Grid</span>
        </div>
      </div>

      {/* Highlights Rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* Urgent Task Box */}
        <div className="md:col-span-2 border border-red-200 bg-red-50/20 rounded-xl p-2 sm:p-3">
          <h5 className="text-[10px] uppercase font-bold text-red-700 flex items-center gap-1 mb-2">
            ⚠️ URGENT TASKS (Nearest Deadlines)
          </h5>
          <div className="space-y-1.5 text-[11px]">
            {urgentTasks.map(ut => (
              <div 
                key={ut.id}
                onClick={() => setSelectedTaskId(ut.id)}
                className="flex justify-between items-center bg-white p-1.5 border border-red-100 rounded-lg cursor-pointer hover:bg-red-50 transition-colors"
                id={`btn-select-urgent-${ut.id}`}
              >
                <div>
                  <span className="font-bold text-brand-dark max-w-[170px] truncate block">{ut.title}</span>
                  <span className="text-[9px] text-text-light font-mono block">Deadline: {ut.deadline} | Requester: {ut.requester}</span>
                </div>
                <div className="flex items-center gap-1.5 font-sans font-semibold">
                  <span className="text-[8px] bg-red-600 block text-white px-1 py-0.2 rounded uppercase">Urgent</span>
                  <StatusBadge status={ut.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workload Snapshot */}
        <div className="border border-brand-primary/10 rounded-xl p-3 bg-brand-light/10">
          <h5 className="text-[10px] uppercase font-bold text-brand-dark mb-2">
            💼 Workload Stats
          </h5>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-text-light text-[10px]">Active Backlog</span>
              <span className="font-bold text-brand-dark">3 Queue</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-light text-[10px]">Assigned to Me</span>
              <span className="font-bold text-brand-primary">3 Tasks</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div className="w-[66%] h-full bg-brand-accent"></div>
            </div>
            <p className="text-[8px] text-text-light mt-1 uppercase tracking-wider text-center">66% Queue Bound</p>
          </div>
        </div>
      </div>

      {/* Task Filters and List */}
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-[10px] font-bold text-brand-dark uppercase">All Assessed Task Flow</h5>
          
          <div className="flex bg-gray-100 rounded-lg p-0.5" id="tab-nav-unit-sim">
            {["all", "approval", "service"].map((categoryTab) => (
              <button
                key={categoryTab}
                onClick={() => setActiveTab(categoryTab as any)}
                className={`text-[9px] uppercase font-bold px-2 py-1 rounded select-none ${activeTab === categoryTab ? "bg-white text-brand-primary shadow-xs" : "text-gray-500 hover:text-gray-900"}`}
                id={`btn-tab-unit-${categoryTab}`}
              >
                {categoryTab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 max-h-32 overflow-y-auto">
          {filteredTasks.map(t => (
            <div 
              key={t.id}
              onClick={() => setSelectedTaskId(t.id)}
              className={`p-2 border rounded-xl flex justify-between items-center text-[11px] cursor-pointer transition-all ${selectedTaskId === t.id ? "bg-brand-light border-brand-primary" : "bg-gray-50 border-gray-100 hover:bg-gray-200"}`}
              id={`row-unit-task-${t.id}`}
            >
              <div>
                <span className="font-bold text-brand-dark text-[11px] block">{t.title}</span>
                <span className="text-[9px] text-text-light font-mono block">Ticket ID: {t.id} | Dept: {t.dept} | Lead: {t.assignee}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[8.5px] font-bold uppercase ${t.type === "Approval" ? "text-purple-700" : "text-blue-700"}`}>{t.type}</span>
                <StatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Active Action Board */}
      {currentTask && (
        <div className="mt-4 p-3 bg-brand-light/30 border border-brand-accent/30 rounded-xl animate-fadeIn">
          <div className="flex justify-between items-start border-b border-brand-accent/20 pb-2 mb-3">
            <div>
              <span className="text-[9px] font-mono text-brand-secondary font-bold">ACTIVE TASK FRAME — ID: {currentTask.id}</span>
              <h5 className="text-xs font-bold text-brand-dark leading-snug">{currentTask.title}</h5>
            </div>
            <StatusBadge status={currentTask.status} />
          </div>

          <div className="space-y-3">
            {/* Control Dashboard Action Bar */}
            <div className="flex flex-wrap gap-1.5">
              <button 
                onClick={() => handleUpdateStatus("In Progress")}
                disabled={currentTask.status === "In Progress" || currentTask.status === "Completed"}
                className="bg-brand-secondary hover:bg-brand-primary disabled:opacity-50 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border-b-2 border-brand-dark"
                id="btn-unit-act-inprogress"
              >
                Set In Progress
              </button>

              {/* Conditional Controls based on Task Category */}
              {currentTask.type === "Approval" ? (
                <>
                  <button 
                    onClick={() => handleUpdateStatus("Approved")}
                    disabled={currentTask.status === "Approved" || currentTask.status === "Completed"}
                    className="bg-[#16a34a] hover:bg-[#11803a] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
                    id="btn-unit-act-approve"
                  >
                    Approve Release
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus("Rejected")}
                    disabled={currentTask.status === "Rejected" || currentTask.status === "Completed"}
                    className="bg-[#dc2626] hover:bg-[#aa1d1d] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
                    id="btn-unit-act-reject"
                  >
                    Reject Publication
                  </button>
                </>
              ) : (
                <>
                  {/* Service Request Upload actions */}
                  <div className="w-full space-y-2 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Filename (e.g. logo-banner-v1.png)" 
                        value={deliverableFile}
                        onChange={(e) => setDeliverableFile(e.target.value)}
                        className="p-1 px-2 border rounded text-[10px] w-full"
                        id="input-deliverable"
                      />
                      <button 
                        onClick={() => handleUpdateStatus("Completed")}
                        disabled={currentTask.status === "Completed" || !deliverableFile}
                        className="bg-[#0d9488] hover:bg-[#07685e] text-white text-[10px] font-bold px-3 py-1 rounded-lg flex items-center justify-center gap-1 disabled:opacity-50"
                        id="btn-unit-act-complete"
                      >
                        <Upload size={10} />
                        Upload & Complete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Custom revision trigger */}
            {currentTask.status !== "Completed" && (
              <div className="border-t border-brand-accent/15 pt-2.5">
                <label className="block text-[10px] font-bold text-brand-dark uppercase mb-1">
                  Trigger Revision Request (For Approvals & Custom)
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Provide revision notes here first..." 
                    value={revisionComments}
                    onChange={(e) => setRevisionComments(e.target.value)}
                    className="p-1.5 border rounded-lg text-[10px] flex-1 bg-white text-text-dark"
                    id="input-revision-notes"
                  />
                  <button 
                    onClick={() => handleUpdateStatus("For Revision")}
                    disabled={!revisionComments}
                    className="bg-[#ea580c] hover:bg-[#a03d09] text-white text-[10px] font-bold px-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                    id="btn-unit-act-revision"
                  >
                    Send Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simulation Feedback Alert */}
      {simActionMsg && (
        <div className="mt-3 text-center text-[10px] bg-brand-light border border-brand-accent/20 p-2 text-brand-primary font-bold rounded animate-slideUp" id="div-unit-feedback-alert">
          {simActionMsg}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-12 animate-fadeIn" id="unit-guide-container">
      {/* Page Header */}
      <div className="border-b border-brand-primary/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-dark tracking-tight mb-2">
          Unit Staff <span className="gold-gradient">Operations Manual</span>
        </h1>
        <p className="text-sm text-text-light">
          An interactive walkthrough for active communications designers, photographers, writers, and specialists processing received assignments.
        </p>
      </div>

      {/* --- Section 1: Unit Dashboard --- */}
      <section id="unit-dashboard" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm animate-pulse">
            1
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Unit Workload Dashboard
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Your specialized workspace houses multiple statistics to help you schedule tasks based on deadline calendars, workload metrics, and organizational requests:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-brand-primary/10 bg-white p-4 rounded-xl">
              <h4 className="text-xs font-bold text-brand-primary uppercase mb-1">Calendar & Deadlines</h4>
              <p className="text-xs text-text-light leading-relaxed">
                Renders approaching completion frames dynamically. Color-coded alarms notify you of critical dates approaching within 48 business hours.
              </p>
            </div>
            <div className="border border-brand-primary/10 bg-white p-4 rounded-xl">
              <h4 className="text-xs font-bold text-brand-primary uppercase mb-1">Urgent Task Queue</h4>
              <p className="text-xs text-text-light leading-relaxed">
                Isolates your three nearest due tickets automatically. Focuses attention and prevents deliverable slippage.
              </p>
            </div>
            <div className="border border-brand-primary/10 bg-white p-4 rounded-xl">
              <h4 className="text-xs font-bold text-brand-primary uppercase mb-1">Task Breakdown Metrics</h4>
              <p className="text-xs text-text-light leading-relaxed">
                Pushes a layout division mapping approvals versus design files, aiding personal bandwidth scheduling of team resources.
              </p>
            </div>
            <div className="border border-brand-primary/10 bg-white p-4 rounded-xl">
              <h4 className="text-xs font-bold text-brand-primary uppercase mb-1">Workload Snapshot</h4>
              <p className="text-xs text-text-light leading-relaxed">
                Keeps your currently assigned file quotas visual. Prevents bottleneck creation in active production periods.
              </p>
            </div>
          </div>
        </div>

        <ManualImage caption="Full Unit Dashboard" mockUI={mockUnitWorkspace} />
      </section>

      {/* --- Section 2: Three Task Views --- */}
      <section id="three-task-views" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            2
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Navigation — Three Task Views
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3 animate-fadeIn">
          <p>
            The interface separates workloads into three standard streams using local toggles. This prevents visual clutter:
          </p>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="min-w-[500px] sm:min-w-full text-xs text-text-dark font-sans border-collapse">
            <thead>
              <tr className="bg-brand-light text-brand-dark uppercase tracking-wide">
                <th className="p-3 text-left border border-brand-accent/20">Task Filter View</th>
                <th className="p-3 text-left border border-brand-accent/20">Content Target Scope</th>
                <th className="p-3 text-left border border-brand-accent/20">Handling Routine</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-brand-accent/15 font-bold">All Tasks</td>
                <td className="p-3 border border-brand-accent/15">Your general allocated list of active service and approval contracts.</td>
                <td className="p-3 border border-brand-accent/15 italic">Provides quick metrics checks.</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border border-brand-accent/15 font-bold">Approval Tasks</td>
                <td className="p-3 border border-brand-accent/15 text-purple-700">Dedicated file verification sheets submitted by students/faculty.</td>
                <td className="p-3 border border-brand-accent/15">Must be certified, flagged for revisions, or rejected.</td>
              </tr>
              <tr>
                <td className="p-3 border border-brand-accent/15 font-bold">Service Tasks</td>
                <td className="p-3 border border-brand-accent/15 text-blue-700">Physical deliverables requested directly from internal team.</td>
                <td className="p-3 border border-brand-accent/15">Requires uploading completed works vector logs (completed).</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <ManualImage caption="3 Action Cards" mockUI={mockUnitWorkspace} />
      </section>

      {/* --- Section 3: Processing Approval Requests --- */}
      <section id="processing-approvals" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            3
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Processing Approval Requests
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            When managing design materials for verification, complete the following validation steps:
          </p>

          <div className="space-y-3">
            {[
              { s: "Step 1", t: "Set Flag to In Progress", d: "Click 'Set In Progress' when beginning brand verification. This logs current handler timestamps in S-CORE logs." },
              { s: "Step 2", t: "Assess Layout Margins", d: "Open attachments and verify logo layouts, wordings, and font selections against DLSU-D design principles." },
              { s: "Step 3", t: "Commit Final Action", d: "Decide whether to Approve (issue digital certification stamps), Reject (with a brief block reason), or select For Revision for updates." },
              { s: "Step 4", t: "Resolve Revision Details", d: "If marking 'For Revision', type the specific details in the comments. This unlocks the user's re-upload slot instantly." }
            ].map((step, id) => (
              <div key={id} className="flex gap-4 p-3 bg-white border border-brand-primary/10 rounded-xl">
                <span className="text-xs bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-lg font-bold font-mono h-fit shrink-0">
                  {step.s}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-brand-dark mb-0.5">{step.t}</h5>
                  <p className="text-xs text-text-light leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ManualImage caption="Approval Task Modal" mockUI={mockUnitWorkspace} />
      </section>

      {/* --- Section 4: Processing Service Requests --- */}
      <section id="processing-services" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            4
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Processing Service Requests
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            When completing assigned creative design, photo capturing, or marketing scripts assignments, proceed through this pipeline:
          </p>

          <div className="space-y-3">
            {[
              { s: "Step 1", t: "Start Action", d: "Open the task layout, review the client description, and select the Set In Progress option." },
              { s: "Step 2", t: "Production Phase", d: "Produce graphics, capture physical coverages, or write media blurbs based on guidelines." },
              { s: "Step 3", t: "Upload Vector Assets", d: "Double-click the deliverables box, reference the file name, and transmit final formats." },
              { s: "Step 4", t: "Complete Ticket", d: "S-CORE notifies the Requestor of completion, logs audit timestamps, and closes the ticket." }
            ].map((step, id) => (
              <div key={id} className="flex gap-4 p-3 bg-white border border-brand-primary/10 rounded-xl">
                <span className="text-xs bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-lg font-bold font-mono h-fit shrink-0">
                  {step.s}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-brand-dark mb-0.5">{step.t}</h5>
                  <p className="text-xs text-text-light leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ManualImage caption="Service Request Task Modal" mockUI={mockUnitWorkspace} />
      </section>

      {/* --- Section 5: Communication Guidelines --- */}
      <section id="unit-comm-guidelines" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            5
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            SCO Communication Guidelines
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-4">
          <p>
            Professional institutional delivery is mandatory. S-CORE mandates exact communication timelines for all communications inside discussion forums:
          </p>

          <div className="bg-brand-light/30 border-l-4 border-brand-primary rounded-r-xl p-4 gap-4 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-brand-primary/10 text-xs">
            <div className="flex-1 pb-3 md:pb-0">
              <strong className="text-brand-primary block uppercase mb-1">Standard Message Responses</strong>
              <span>Always address client comments inside the Conversation board <strong>within 1 working day</strong> of notification.</span>
            </div>
            <div className="flex-1 pt-3 md:pt-0 md:pl-4">
              <strong className="text-brand-primary block uppercase mb-1">Initial Feedback Windows</strong>
              <span>New ticket reviews and initial technical comments must be logged <strong>within 3 working days</strong> of submission.</span>
            </div>
          </div>
        </div>

        <ManualImage caption="Conversation Tab" mockUI={mockUnitWorkspace} />
      </section>

      {/* --- Section 6: Notification System --- */}
      <section id="unit-notifications" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            6
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Unit Notifications System
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            Keep your workspace responsive. The built-in indicator logs real-time updates for key triggers so you never miss an critical deadline:
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans list-none pl-0">
            <li className="bg-white p-2.5 border border-brand-accent/20 rounded-lg flex items-center gap-2">
              <Bell size={13} className="text-[#ea580c]" />
              <span><strong>New Task Assigned:</strong> Instant routing records.</span>
            </li>
            <li className="bg-white p-2.5 border border-brand-accent/20 rounded-lg flex items-center gap-2">
              <Bell size={13} className="text-[#3b82f6]" />
              <span><strong>Requestor Message:</strong> Feedback updates are logged.</span>
            </li>
            <li className="bg-white p-2.5 border border-brand-accent/20 rounded-lg flex items-center gap-2">
              <Bell size={13} className="text-[#16a34a]" />
              <span><strong>Revisions Pushed:</strong> Prompts the Unit to review.</span>
            </li>
            <li className="bg-white p-2.5 border border-brand-accent/20 rounded-lg flex items-center gap-2">
              <Bell size={13} className="text-[#dc2626]" />
              <span><strong>Approaching Deadline:</strong> Escalates within 48h.</span>
            </li>
          </ul>
        </div>

        <ManualImage caption="Notification Panel" mockUI={mockUnitWorkspace} />
      </section>
    </div>
  );
}
