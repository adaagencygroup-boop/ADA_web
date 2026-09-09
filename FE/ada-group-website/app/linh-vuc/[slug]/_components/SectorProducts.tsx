"use client";

import Image from "next/image";
import { useState } from "react";

export interface SectorProductMockup {
  appName: string;
  userName: string;
  stats: { label: string; value: string }[];
  suggestion?: { label: string; value: string };
}

export interface SectorProduct {
  badge: string;
  title: string;
  description: string;
  features: string[];
  imageSrc?: string;
  mockup?: SectorProductMockup;
}

interface SectorProductsProps {
  products?: SectorProduct[];
}

export default function SectorProducts({ products = [] }: SectorProductsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!products || products.length === 0) return null;

  const product = products[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section-y bg-white overflow-hidden">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col items-center gap-4 mb-12 lg:mb-(--inner-space)">
          <h2 className="text-center text-[28px] leading-10 font-bold text-[#000000] lg:text-[36px]">
            Sản phẩm trong lĩnh vực
          </h2>
          <span className="h-1 w-16 bg-[#2563EB]" />
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          {products.length > 1 && (
            <button 
              onClick={handlePrev}
              className="hidden lg:flex absolute left-0 -ml-16 w-12 h-12 items-center justify-center rounded-full text-slate-400 hover:text-[#002A64] hover:bg-slate-100 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}

          {/* Main Card */}
          <div className="w-full bg-white rounded-4xl p-6 sm:p-8 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Left Content */}
              <div>
                <span className="inline-block bg-[#002A64] text-white text-[12px] font-semibold px-3 py-1.5 rounded uppercase tracking-wider mb-6">
                  {product.badge}
                </span>
                
                <h3 className="text-[28px] lg:text-[36px] font-semibold leading-[1.2] lg:leading-[1.1] text-[#0F172A] mb-4">
                  {product.title}
                </h3>
                
                <p className="text-[14px] lg:text-[16px] leading-relaxed text-[#475569] whitespace-pre-line mb-8">
                  {product.description}
                </p>

                <ul className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-blue-50 text-[#002A64] flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[14px] lg:text-[16px] font-medium text-[#374151]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>


                {/* Mobile/Tablet Controls */}
                {products.length > 1 && (
                  <div className="flex lg:hidden items-center gap-4 mt-8">
                    <button onClick={handlePrev} className="p-2 rounded-full bg-slate-50 text-slate-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-slate-400">{activeIndex + 1} / {products.length}</span>
                    <button onClick={handleNext} className="p-2 rounded-full bg-slate-50 text-slate-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Visual */}
              <div className="relative w-full pb-4 lg:pb-0 h-full flex items-center justify-center">
                {product.mockup ? (
                  /* Render Fancy Dashboard Mockup */
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 w-full">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-[#002A64]" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{product.mockup.appName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-slate-500">{product.mockup.userName}</span>
                        <div className="w-5 h-5 rounded-full bg-slate-200" />
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-16 sm:w-20 flex flex-col gap-2 shrink-0">
                        <div className="h-5 rounded-sm bg-blue-50 border border-blue-100" />
                        <div className="h-5 rounded-sm bg-slate-50 border border-slate-100" />
                        <div className="h-5 rounded-sm bg-slate-50 border border-slate-100" />
                        <div className="h-5 rounded-sm bg-slate-50 border border-slate-100" />
                      </div>
                      
                      <div className="relative w-full aspect-4/3 sm:aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                        <Image 
                          src={product.imageSrc || "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/y-te.jpg"} 
                          alt={product.title}
                          fill 
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4 relative">
                      {product.mockup.stats.map((stat, idx) => (
                        <div key={idx} className="flex-1 min-w-25 bg-white rounded-lg border border-slate-100 shadow-sm p-3">
                          <div className="text-[8px] sm:text-[9px] text-slate-400 font-semibold mb-1 tracking-wide uppercase">{stat.label}</div>
                          <div className={`text-sm sm:text-lg font-bold ${idx === 0 ? 'text-[#002A64]' : 'text-slate-800'}`}>{stat.value}</div>
                        </div>
                      ))}
                      
                      {product.mockup.suggestion && (
                        <div className="absolute right-0 sm:-right-8 -bottom-6 sm:-bottom-8 bg-white rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-4 w-40 sm:w-48 z-10">
                          <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mb-1.5 uppercase">{product.mockup.suggestion.label}</div>
                          <div className="text-[13px] sm:text-sm font-semibold text-slate-800">{product.mockup.suggestion.value}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Render Standard Image */
                  <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                    <Image 
                      src={product.imageSrc || "https://picsum.photos/seed/product/800/800"} 
                      alt={product.title}
                      fill 
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover" 
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Arrow */}
          {products.length > 1 && (
            <button 
              onClick={handleNext}
              className="hidden lg:flex absolute right-0 -mr-16 w-12 h-12 items-center justify-center rounded-full text-slate-400 hover:text-[#002A64] hover:bg-slate-100 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

        </div>
      </div>
    </section>
  );
}
