"use client";
import Link from "next/link";
import React from "react";

export default function FloatingContact() {
  return (
    <Link 
      href="/lien-he" 
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-999 group flex items-center justify-end"
    >
      {/* Tooltip (Liên hệ ngay!) - appears on hover */}
      <div className="absolute -top-14 right-1 bg-[#0A58CA] text-white text-[13.5px] font-semibold px-4 py-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">
        Liên hệ ngay!
        {/* Triangle pointer */}
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0A58CA] rotate-45 rounded-sm"></div>
      </div>

      {/* Expanded card - appears on hover */}
      <div className="absolute right-8 bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] py-4 pl-7 pr-12 w-max opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 overflow-hidden flex flex-col justify-center border border-slate-50">
        {/* Faint circle decoration inside the card */}
        <div className="absolute -right-11.25 top-1/2 -translate-y-1/2 w-37.5 h-37.5 rounded-full border-[1.5px] border-slate-100/70 pointer-events-none"></div>
        
        <h3 className="text-[#0A58CA] font-bold text-[17px] mb-1 relative z-10">Liên hệ với ADA Group</h3>
        <p className="text-gray-500 text-[14.5px] font-medium relative z-10">Chúng tôi luôn sẵn sàng hỗ trợ!</p>
      </div>

      {/* The circular button */}
      <div className="relative flex items-center justify-center w-16 h-16 bg-[#0A58CA] rounded-full shadow-[0_8px_25px_rgba(10,88,202,0.35)] border-[3.5px] border-white transition-transform duration-300 group-hover:scale-105 z-10">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
          <rect x="6.5" y="7.5" width="11" height="2.5" fill="#0A58CA"/>
          <rect x="6.5" y="12" width="11" height="2.5" fill="#0A58CA"/>
        </svg>
      </div>
    </Link>
  );
}
