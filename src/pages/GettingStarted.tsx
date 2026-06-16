import React from "react";
import ManualImage from "../components/ManualImage";
import { InfoBox, WarningBox } from "../components/AlertBoxes";

export default function GettingStarted() {
  return (
    <div className="space-y-10 animate-fadeIn font-sans" id="getting-started-wrapper">
      {/* Intro Header */}
      <div className="border-b border-brand-primary/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-dark tracking-tight mb-2">
          Getting Started & <span className="gold-gradient">Account Access</span>
        </h1>
        <p className="text-sm text-text-light leading-relaxed">
          Comprehensive step-by-step documentation on account registration, authentication, and core profile customization within the S-CORE system.
        </p>
      </div>

      {/* --- SECTION 1 --- */}
      <section id="accessing-account" className="scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3 border-b border-[#1a5d1a]/10 pb-3">
          <div className="w-10 h-10 rounded-full bg-[#1a5d1a] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
            1
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a5d1a]">
            Accessing your Account
          </h2>
        </div>

        {/* 1.a */}
        <div id="account-registration" className="scroll-mt-24 space-y-6">
          <div className="pl-4 border-l-2 border-[#1a5d1a]/20 space-y-4">
            <h3 className="text-lg font-bold text-[#1a5d1a] font-serif">
              a. Account Registration and Creation
            </h3>

            {/* i */}
            <div className="space-y-4 pl-4">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
                i. For Students and Faculty/Staff (Requestors)
              </h4>

              <div className="pl-4 space-y-4 text-sm text-text-dark leading-relaxed">
                <p>
                  • <strong>Method A (Self-Registration):</strong> Users must successfully complete the self-registration process. An account must be approved by an Administrator before the user can successfully log in.
                </p>

                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-3">
                  <span className="text-xs font-bold text-[#1a5d1a] uppercase tracking-wider block">
                    Registration Method Differ by Email Domain:
                  </span>
                  
                  <div className="space-y-3 pl-2">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-700">
                        o DLSU Email (<code className="text-[#1a5d1a] font-semibold bg-[#e8f5e8] px-1 rounded">@dlsud.edu.ph</code>):
                      </p>
                      <p className="text-xs text-text-light pl-3 mb-2">
                        Simple registration form to be filled and needs admin approval to log in.
                      </p>
                      <ManualImage caption="Internal User Registration" />
                    </div>

                    <div className="space-y-1 pt-2">
                      <p className="text-xs font-bold text-gray-700">
                        o External Email (Any other Domain):
                      </p>
                      <p className="text-xs text-text-light pl-3 mb-2">
                        External users must fill in: <strong>Organization/School</strong>, <strong>Purpose of Request</strong>, <strong>Supervisor&apos;s Name</strong>, <strong>Supervisor&apos;s Email</strong>, and <strong>Additional Notes</strong>. These fields are reviewed by the Admin before approval.
                      </p>
                      <ManualImage caption="External User Registration" />
                    </div>
                  </div>
                </div>

                <p>
                  • <strong>Method B (Created by Super Admin):</strong> A Super Admin can create the account directly. In this case, the user will receive their username and a temporary password via email.
                </p>
              </div>
            </div>

            {/* ii */}
            <div className="space-y-3 pl-4 pt-2">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
                ii. For Admins
              </h4>
              <div className="pl-4 text-sm text-text-dark leading-relaxed space-y-2">
                <p>
                  • <strong>If Created by Super Admin:</strong> The Admin will receive a unique username and temporary password via email.
                </p>
                <p>
                  • <strong>If Self-Registered:</strong> To register as an Admin via self-registration, the user registers with any valid email. After approval, the Super Admin opens the Users page, clicks the user, selects Edit, and changes the Role field to &apos;Admin&apos; and assigns a Unit Team if applicable.
                </p>
              </div>
            </div>

            {/* iii */}
            <div className="space-y-3 pl-4 pt-2">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
                iii. For Super Admin
              </h4>
              <div className="pl-4 text-sm text-text-dark leading-relaxed">
                <p>
                  • The Super Admin account is pre-configured and assigned by the system; it is not created via registration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 1.b */}
        <div id="logging-into-system" className="scroll-mt-24 space-y-4 pt-2">
          <div className="pl-4 border-l-2 border-[#1a5d1a]/20 space-y-3">
            <h3 className="text-lg font-bold text-[#1a5d1a] font-serif">
              b. Logging Into the System
            </h3>
            <div className="pl-4 text-sm text-text-dark leading-relaxed">
              <p className="mb-3">
                <strong>i.</strong> Each user will log in to their account using their registered Username and password. A successful login will direct you to your respective homepage.
              </p>
              <ManualImage caption="Login Page" />
            </div>
          </div>
        </div>

        {/* 1.c */}
        <div id="forgot-password" className="scroll-mt-24 space-y-4 pt-2">
          <div className="pl-4 border-l-2 border-[#1a5d1a]/20 space-y-3">
            <h3 className="text-lg font-bold text-[#1a5d1a] font-serif">
              c. Forgot Password
            </h3>
            <div className="pl-4 text-sm text-text-dark leading-relaxed space-y-2.5">
              <p>
                <strong>i.</strong> If you forget your password, click the &ldquo;Forgot Password?&rdquo; link on the login page.
              </p>
              <p>
                <strong>ii.</strong> You will be prompted to enter the email address associated with your account for verification.
              </p>
              <p>
                <strong>iii.</strong> Only the email address associated with the account can be used. If you registered with a DLSUD email, use that email to reset. If the email address is registered in the system, further instructions will be sent to that email.
              </p>
              <p>
                <strong>iv.</strong> Within the email, click the &ldquo;Reset Password&rdquo; link to be guided through changing your password.
              </p>
              <ManualImage caption="Forgot Password Feature" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2 --- */}
      <section id="profile-management" className="scroll-mt-20 space-y-6 pt-6 border-t border-[#1a5d1a]/10">
        <div className="flex items-center gap-3 border-b border-[#1a5d1a]/10 pb-3">
          <div className="w-10 h-10 rounded-full bg-[#1a5d1a] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
            2
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a5d1a]">
            Features for All Users: Profile Management
          </h2>
        </div>

        <div className="pl-4 border-l-2 border-[#1a5d1a]/20 space-y-8 text-sm text-text-dark leading-relaxed">
          {/* a */}
          <div className="space-y-2">
            <p>
              • <strong>a. Profile Section:</strong> This navigation link takes you to your personal information page.
            </p>
            <ManualImage caption="Profile Page" />
          </div>

          {/* b */}
          <div className="space-y-2">
            <p>
              • <strong>b. Update Profile:</strong> Allows you to update or change the information in your profile, such as your name or contact details.
            </p>
            <ManualImage caption="Update Profile Section" />
          </div>

          {/* c */}
          <div className="space-y-2">
            <p>
              • <strong>c. Change Password:</strong> Provides the form to change your current password to a new one.
            </p>
            <ManualImage caption="Change Password Section" />
          </div>

          {/* d */}
          <div className="space-y-2">
            <p>
              • <strong>d. Update Profile Picture:</strong> You can upload, change, or remove the profile picture associated with your account. Accepted formats: JPG, PNG. The picture will be cropped to a circle display in the header and sidebar.
            </p>
            <ManualImage caption="Update Profile Picture Section" />
          </div>
        </div>
      </section>

      <div className="pt-6">
        <WarningBox title="Confidentiality Policy">
          All password modifications and registered contact entries are audited and validated dynamically. Ensure complete accuracy to coordinate project deliverables smoothly.
        </WarningBox>
      </div>
    </div>
  );
}
