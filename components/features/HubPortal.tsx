"use client";

import { BookOpen, Clock, ArrowRight, Sparkles, Calendar, Layers, ShieldCheck } from "lucide-react";

interface HubPortalProps {
    onSelectModule: (module: 'lesson-plans' | 'mesai') => void;
}

export function HubPortal({ onSelectModule }: HubPortalProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-indigo-50/30 text-slate-900 flex flex-col justify-center items-center p-6 md:p-12 font-sans animate-fade-in">
            {/* Header / Intro */}
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Eğitmen Portalı</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                    Lütfen bir modül seçin
                </h1>
                <p className="text-sm md:text-base text-slate-600">
                    Ders planları ve müfredat içeriklerine göz atabilir veya aylık mesai ve puantaj işlemlerinizi takip edebilirsiniz.
                </p>
            </div>

            {/* 2-Grid Square Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl w-full">
                
                {/* 1. Ders Planları Card */}
                <button
                    type="button"
                    onClick={() => onSelectModule('lesson-plans')}
                    className="group relative bg-white border border-slate-200/90 rounded-3xl p-8 md:p-10 text-left transition-all duration-300 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[380px] focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                >
                    {/* Background Glow on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50/60 to-violet-50/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10 space-y-6">
                        {/* Icon */}
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                            <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
                        </div>

                        {/* Text */}
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                                <Layers className="w-3.5 h-3.5" />
                                <span>Müfredat & İçerik</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                Ders Planları
                            </h2>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Seviyelere göre haftalık ders kazanımları, konu anlatımları ve eğitim planları.
                            </p>
                        </div>
                    </div>

                    {/* Bottom badges & Action */}
                    <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                Seviye 1-3
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-100">
                                Unity & Python
                            </span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-xs">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </button>

                {/* 2. Mesai Takip Card */}
                <button
                    type="button"
                    onClick={() => onSelectModule('mesai')}
                    className="group relative bg-white border border-slate-200/90 rounded-3xl p-8 md:p-10 text-left transition-all duration-300 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[380px] focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                >
                    {/* Background Glow on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/60 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10 space-y-6">
                        {/* Icon */}
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                            <Clock className="w-8 h-8 md:w-10 md:h-10" />
                        </div>

                        {/* Text */}
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Puantaj & Bordro</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                Mesai Takip
                            </h2>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Aylık çalışma saatleri, şube dağılımı, net maaş hesaplayıcı ve puantaj yönetimi.
                            </p>
                        </div>
                    </div>

                    {/* Bottom badges & Action */}
                    <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                Profil Girişi
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-100">
                                809₺ / Saat
                            </span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-xs">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </button>

            </div>

            {/* Footer note */}
            <div className="mt-12 text-center text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Güvenli Bulut Tabanlı Eğitmen Yönetim Sistemi</span>
            </div>
        </div>
    );
}
