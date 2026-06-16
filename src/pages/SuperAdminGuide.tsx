import React, { useState } from "react";
import ManualImage from "../components/ManualImage";
import { InfoBox, WarningBox } from "../components/AlertBoxes";
import { ShieldAlert, UserPlus, Key, Mail, Edit, CheckCircle, Shield, AlertTriangle } from "lucide-react";

interface SuperAdminUser {
  id: string;
  name: string;
  email: string;
  type: "Student" | "Faculty" | "Staff";
  currentRole: "Requestor" | "Unit" | "Admin" | "Super Admin";
}

export default function SuperAdminGuide() {
  // Simulator States
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Requestor" | "Unit" | "Admin">("Requestor");
  const [genToken, setGenToken] = useState("");

  const [usersList, setUsersList] = useState<SuperAdminUser[]>([
    { id: "SAD-901", name: "Rizal, Jose", email: "student.ri@dlsud.edu.ph", type: "Student", currentRole: "Requestor" },
    { id: "SAD-902", name: "Silang, Gabriela", email: "faculty.si@dlsud.edu.ph", type: "Faculty", currentRole: "Requestor" },
    { id: "SAD-903", name: "Mabini, Apolinario", email: "staff.ma@dlsud.edu.ph", type: "Staff", currentRole: "Unit" },
  ]);

  const [selectedUserId, setSelectedUserId] = useState<string>("SAD-901");
  const [newTargetRole, setNewTargetRole] = useState<"Requestor" | "Unit" | "Admin">("Unit");
  const [elevateError, setElevateError] = useState("");
  const [elevateSuccess, setElevateSuccess] = useState("");

  const handleGenInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    // Simulate token creation
    const cleanName = inviteName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const testToken = `https://s-core.dlsu-d.edu.ph/onboard?token=SCO-${cleanName}-${Math.random().toString(36).slice(-6).toUpperCase()}`;
    setGenToken(testToken);
  };

  const handleElevateRole = (e: React.FormEvent) => {
    e.preventDefault();
    setElevateError("");
    setElevateSuccess("");

    const targetUser = usersList.find(u => u.id === selectedUserId);
    if (!targetUser) return;

    // Strict Rule Check: Students can only be elevated to Unit, not Admin
    if (targetUser.type === "Student" && newTargetRole === "Admin") {
      setElevateError("Security Boundary Violation: Under S-CORE governance, Student accounts are blocked from receiving Administrator privileges. They can only be elevated to Unit Staff ranks.");
      return;
    }

    setUsersList(prev => prev.map(u => {
      if (u.id === selectedUserId) {
        return { ...u, currentRole: newTargetRole };
      }
      return u;
    }));

    setElevateSuccess(`Role Change Authorized! Jose elevated to ${newTargetRole} successfully.`);
    setTimeout(() => setElevateSuccess(""), 4500);
  };

  const selectedUser = usersList.find(u => u.id === selectedUserId);

  // Interactive Security console mock
  const mockSecurityConsole = (
    <div className="bg-white border border-brand-primary/10 rounded-2xl p-4 text-left font-sans max-w-2xl mx-auto text-text-dark shadow-sm">
      <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-100">
        <div>
          <span className="text-[9px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert size={10} />
            Elevated Security Console
          </span>
          <h4 className="text-sm font-serif font-bold text-brand-dark mt-1">S-CORE Super Admin Gateway</h4>
        </div>
        <span className="text-[10px] font-mono font-bold bg-[#fafcfa] text-brand-primary px-2.5 py-1 rounded border border-brand-accent/20">
          Global Config: Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Left: Invitation generator */}
        <div className="bg-brand-light/20 border border-brand-accent/25 rounded-xl p-2.5 sm:p-3 space-y-3">
          <h5 className="text-[10px] font-bold uppercase text-brand-primary flex gap-1 items-center">
            <UserPlus size={12} />
            Generate Sign-up Invitation
          </h5>
          <form onSubmit={handleGenInvitation} className="space-y-2">
            <div>
              <label className="block text-[8px] uppercase font-bold text-brand-dark">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Bonifacio, Andres"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="w-full text-[10.5px] p-1 border rounded bg-white"
                id="input-inv-name"
              />
            </div>
            <div>
              <label className="block text-[8px] uppercase font-bold text-brand-dark">Email Handle</label>
              <input 
                type="email" 
                placeholder="staff.bo@dlsud.edu.ph"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full text-[10.5px] p-1 border rounded bg-white"
                id="input-inv-email"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-1 bg-brand-primary hover:bg-brand-secondary text-white text-[9px] font-bold rounded"
              id="btn-inv-submit"
            >
              Generate Onboarding Invitation
            </button>
          </form>

          {genToken && (
            <div className="p-2 border rounded bg-[#fefce8] text-[9.5px] border-yellow-200 animate-fadeIn" id="div-inv-token-box">
              <span className="font-bold text-brand-dark block mb-0.5">Auto-Approval Code Generated:</span>
              <code className="text-brand-secondary font-mono break-all block text-[8px] bg-white p-1 rounded border mb-1">
                {genToken}
              </code>
              <span className="text-[8px] text-text-light">This link sent via S-CORE Mailers bypasses manual registration checks.</span>
            </div>
          )}
        </div>

        {/* Right: User Role elevation */}
        <div className="bg-brand-light/20 border border-brand-accent/25 rounded-xl p-2.5 sm:p-3 space-y-3">
          <h5 className="text-[10px] font-bold uppercase text-[#9e2a2b] flex gap-1 items-center">
            <Key size={12} />
            Role elevation matrix
          </h5>

          <form onSubmit={handleElevateRole} className="space-y-2.5">
            <div>
              <label className="block text-[8px] uppercase font-bold text-brand-dark mb-0.5">Select Enrolled User</label>
              <select
                value={selectedUserId}
                onChange={(e) => { setSelectedUserId(e.target.value); setElevateError(""); setElevateSuccess(""); }}
                className="w-full p-1 bg-white border text-xs text-text-dark font-sans rounded focus:outline-none"
                id="select-elevate-user"
              >
                {usersList.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.type} - Role: {u.currentRole})
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div className="bg-white p-1.5 border rounded text-[10px] space-y-0.5 font-sans">
                <p><strong>Standing:</strong> {selectedUser.type}</p>
                <p><strong>Role Level:</strong> {selectedUser.currentRole}</p>
              </div>
            )}

            <div>
              <label className="block text-[8px] uppercase font-bold text-brand-dark mb-0.5 font-sans">Target Role</label>
              <select
                value={newTargetRole}
                onChange={(e) => setNewTargetRole(e.target.value as any)}
                className="w-full p-1 bg-white border text-xs text-text-dark font-sans rounded focus:outline-none"
                id="select-elevate-role"
              >
                <option value="Requestor">Requestor (Submitter)</option>
                <option value="Unit">Unit Staff (Designer/Editor)</option>
                <option value="Admin">Administrator (Manager)</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full py-1.5 bg-[#9e2a2b] text-white hover:bg-[#801e20] text-[9.5px] font-bold rounded uppercase tracking-wider"
              id="btn-elevate-submit"
            >
              Authorize Role Elevation
            </button>
          </form>

          {elevateError && (
            <div className="p-2 bg-red-50 border border-red-200 text-[9px] text-[#dc2626] rounded-md font-semibold font-sans leading-relaxed animate-fadeIn" id="div-elevate-err">
              ⚠️ {elevateError}
            </div>
          )}

          {elevateSuccess && (
            <div className="p-2 bg-brand-light border border-brand-accent/20 text-[9px] text-brand-primary rounded-md font-bold font-sans animate-fadeIn" id="div-elevate-success">
              ✅ {elevateSuccess}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 animate-fadeIn" id="superadmin-guide-container">
      {/* Page Header */}
      <div className="border-b border-brand-primary/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-dark tracking-tight mb-2">
          Super Administrator <span className="gold-gradient">Security Manual</span>
        </h1>
        <p className="text-sm text-text-light">
          An interactive operational dashboard intended for the DLSU-D Management IT Engineers and authorized platform operators.
        </p>
      </div>

      {/* --- Section 1: Core Responsibilities --- */}
      <section id="super-responsibilities" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            1
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Security Core Responsibilities
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3">
          <p>
            The Super Administrator role possesses comprehensive administrative access to all S-CORE system layers. It covers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="border border-brand-primary/10 bg-white p-4 rounded-xl shadow-xs">
              <h4 className="text-xs font-bold text-brand-primary uppercase mb-1.5 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded bg-brand-accent"></span>
                Role Arbitrage
              </h4>
              <p className="text-xs text-text-light leading-relaxed">
                Approve, reject, or elevate enrolled user status records. Restructured permissions propagate within active database pipelines immediately.
              </p>
            </div>
            <div className="border border-brand-primary/10 bg-white p-4 rounded-xl shadow-xs">
              <h4 className="text-xs font-bold text-brand-primary uppercase mb-1.5 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded bg-brand-accent"></span>
                Global Settings
              </h4>
              <p className="text-xs text-text-light leading-relaxed">
                Configure back-end parameters, database backup cycles, and security limits across the institution.
              </p>
            </div>
            <div className="border border-brand-primary/10 bg-white p-4 rounded-xl shadow-xs">
              <h4 className="text-xs font-bold text-brand-primary uppercase mb-1.5 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded bg-brand-accent"></span>
                Security Isolation
              </h4>
              <p className="text-xs text-text-light leading-relaxed">
                Safeguard database Integrity. Under strict DLSU-D S-CORE rules, <strong>Student accounts can only be elevated to Unit Staff, never to Administrator levels</strong>.
              </p>
            </div>
          </div>
        </div>

        <WarningBox title="Elevation Boundaries">
          Student account records retain absolute security boundaries. Ensure Student accounts are never assigned Admin privileges, protecting confidential system configurations from unauthorized access.
        </WarningBox>

        <ManualImage caption="Create User Invitation Modal" mockUI={mockSecurityConsole} />
      </section>

      {/* --- Section 2: Create User Accounts --- */}
      <section id="super-create-users" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            2
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Create User Accounts
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3 font-sans">
          <p>
            Onboard new team members instantly:
          </p>

          <ol className="list-decimal pl-5 space-y-1.5 text-xs text-text-light leading-relaxed">
            <li>Open the S-CORE administrator registry list and click the <strong>Generate Invitation</strong> button.</li>
            <li>Submit the user&#39;s name and their institutional <code>@dlsud.edu.ph</code> coordinates.</li>
            <li>Press compile. The platform generates a secure invitation token link, bypassing standard registration queues.</li>
          </ol>
        </div>

        <ManualImage caption="Create User Invitation Modal" mockUI={mockSecurityConsole} />
      </section>

      {/* --- Section 3: Manage Roles --- */}
      <section id="super-manage-roles" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-sans font-bold text-lg shadow-sm">
            3
          </div>
          <h2 className="text-xl font-serif font-bold text-brand-primary">
            Approve & Elevate Users
          </h2>
        </div>

        <div className="prose text-sm text-text-dark space-y-3 font-sans">
          <p>
            Modify active department tag designations easily:
          </p>

          <div className="space-y-4 pt-1.5">
            {[
              { s: "Step A", t: "Open User Directory", d: "Click 'Users Registry' inside the dashboard header and locate your target account." },
              { s: "Step B", t: "Initiate Edit Frame", d: "Click 'Edit' adjacent to their registration information lines to launch role dropdown choices." },
              { s: "Step C", t: "Assign New Role Level", d: "Choose from: User / Unit / Admin designations based on team rosters or staff roles." },
              { s: "Step D", t: "Commit Security Changes", d: "Confirm the change and click Save. S-CORE re-calculates user session permissions immediately." }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4 p-3.5 bg-brand-light/10 border border-brand-accent/20 rounded-xl">
                <span className="text-xs bg-brand-primary text-white font-bold h-fit px-2 py-0.5 rounded font-mono">
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

        <ManualImage caption="Role Management Feature" mockUI={mockSecurityConsole} />
      </section>
    </div>
  );
}
