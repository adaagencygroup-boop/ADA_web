import React from 'react';
import Link from 'next/link';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title: string;
  description: string;
  onClose?: () => void;
  actionText?: string;
  actionLink?: string;
}

const icons = {
  success: (
    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6 shrink-0">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  ),
  error: (
    <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6 shrink-0">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  ),
  warning: (
    <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-6 shrink-0">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
  ),
  info: (
    <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mb-6 shrink-0">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )
};

export default function Alert({ type, title, description, onClose, actionText = "Về trang chủ", actionLink = "/" }: AlertProps) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-105 bg-white rounded-3xl p-8 md:p-10 flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {icons[type]}
        
        <h3 className="text-[22px] font-bold text-[#002A64] mb-3 leading-tight">{title}</h3>
        <p className="text-[14.5px] text-zinc-500 leading-relaxed mb-8">{description}</p>
        
        {actionLink ? (
          <Link href={actionLink} className="w-full py-3.5 bg-[#1a56db] hover:bg-[#1e40af] text-white font-semibold rounded-xl transition-colors text-[15px] shadow-sm">
            {actionText}
          </Link>
        ) : (
          <button onClick={onClose} className="w-full py-3.5 bg-[#1a56db] hover:bg-[#1e40af] text-white font-semibold rounded-xl transition-colors text-[15px] shadow-sm">
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
