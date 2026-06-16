import React from "react";
import { Info, AlertTriangle } from "lucide-react";

interface BoxProps {
  children: React.ReactNode;
  title?: string;
}

export function InfoBox({ children, title = "Tip / Note" }: BoxProps) {
  return (
    <div 
      className="my-5 p-5 bg-[#e8f5e8] border-l-4 border-[#1a5d1a] rounded-r-xl shadow-sm text-text-dark flex items-start gap-3.5"
      id="info-box-component"
    >
      <div className="text-[#1a5d1a] mt-0.5 shrink-0">
        <Info size={18} />
      </div>
      <div>
        <h4 className="font-semibold text-brand-primary text-sm tracking-wide mb-1 uppercase font-sans">
          {title}
        </h4>
        <div className="text-sm leading-relaxed text-text-dark font-sans">
          {children}
        </div>
      </div>
    </div>
  );
}

export function WarningBox({ children, title = "Important Notice" }: BoxProps) {
  return (
    <div 
      className="my-5 p-5 bg-[#fefce8] border-l-4 border-[#ffd700] rounded-r-xl shadow-sm text-text-dark flex items-start gap-3.5"
      id="warning-box-component"
    >
      <div className="text-[#b7860b] mt-0.5 shrink-0">
        <AlertTriangle size={18} />
      </div>
      <div>
        <h4 className="font-semibold text-[#856404] text-sm tracking-wide mb-1 uppercase font-sans">
          {title}
        </h4>
        <div className="text-sm leading-relaxed text-[#533f03] font-sans">
          {children}
        </div>
      </div>
    </div>
  );
}
