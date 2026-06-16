import React from "react";

export type ProjectStatus = 
  | "Pending" 
  | "In Progress" 
  | "Approved" 
  | "For Revision" 
  | "Completed" 
  | "Rejected";

interface StatusBadgeProps {
  status: ProjectStatus | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let bgStyles = "";
  
  switch (status) {
    case "Pending":
      bgStyles = "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20";
      break;
    case "In Progress":
      bgStyles = "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20";
      break;
    case "Approved":
      bgStyles = "bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20";
      break;
    case "For Revision":
      bgStyles = "bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/20";
      break;
    case "Completed":
      bgStyles = "bg-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/20";
      break;
    case "Rejected":
      bgStyles = "bg-[#dc2626]/10 text-[#dc2626] border border-[#dc2626]/20";
      break;
    default:
      bgStyles = "bg-gray-100 text-gray-700 border border-gray-200";
  }

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${bgStyles}`}
      id={`badge-${status.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75"></span>
      {status}
    </span>
  );
}
