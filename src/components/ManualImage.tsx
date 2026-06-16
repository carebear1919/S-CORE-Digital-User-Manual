import React, { useState } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";

interface ManualImageProps {
  caption: string;
  mockUI?: React.ReactNode; // Kept for backwards compatibility but not rendered
}

export default function ManualImage({ caption }: ManualImageProps) {
  const [imgError, setImgError] = useState(false);
  const slug = caption.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  
  const imagePath = `/images/${slug}.png`;

  return (
    <div className="my-6 no-print" id={`screenshot-container-${slug}`}>
      {/* Mock browser window container */}
      <div className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-md">
        {/* Browser Top Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 inline-block"></span>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-lg text-[10px] text-gray-500 font-mono px-3 py-1 w-2/3 md:w-1/2 text-center truncate select-none shadow-xs">
            https://s-core-system.dlsu-d.edu.ph/{slug}
          </div>
          <div className="w-12"></div> {/* Spacer balance */}
        </div>

        {/* Content Image Area */}
        <div className="bg-gray-50 p-1 md:p-2 max-h-[550px] overflow-y-auto flex flex-col items-center justify-start scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {!imgError ? (
            <img 
              src={imagePath} 
              alt={caption} 
              className="w-full h-auto object-contain rounded-lg border border-gray-100"
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full py-16 px-6 bg-white rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shadow-xs">
                <Camera size={26} />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-gray-800 font-sans uppercase tracking-wider">
                  [ {caption} ]
                </h4>
                <p className="text-xs text-gray-500 max-w-md font-sans leading-relaxed">
                  Screenshot placeholder for {caption}. Replace this with a high-resolution image of the S-CORE system interface.
                </p>
              </div>

              {/* Developer notice detailing image paths */}
              <div className="bg-emerald-50/50 border border-emerald-800/10 rounded-xl px-4 py-2.5 max-w-md text-left font-sans">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">Integration Asset Info</span>
                <code className="text-[11px] font-mono text-emerald-900 block break-all bg-white px-2 py-1 rounded border border-emerald-800/5 shadow-xs">
                  {imagePath}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-center text-gray-500 mt-2 font-medium italic">
        Figure: S-CORE {caption} Screen Interface Layout
      </p>
    </div>
  );
}
