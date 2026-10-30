"use client";

import { useEffect, useState } from "react";
import { AddShiftForm } from "@/components/features/AddShiftForm";
import { BranchChart } from "@/components/features/BranchChart";
import { SalaryChart } from "@/components/features/SalaryChart";
import { ShiftList } from "@/components/features/ShiftList";
import { SummaryCards } from "@/components/features/SummaryCards";
import { HubPortal } from "@/components/features/HubPortal";
import { LessonPlans } from "@/components/features/LessonPlans";
import { useShiftStore } from "@/lib/store";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Banknote, ChevronLeft, ChevronRight, LogOut, Calculator, ArrowLeft, BookOpen, BarChart3, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Auth from "@/components/auth/Auth";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

import { CalendarView } from "@/components/features/CalendarView";
import { ProfileSettings } from "@/components/features/ProfileSettings";
import { AnalyticsDashboard } from "@/components/features/AnalyticsDashboard";
import { SalaryCalculatorView } from "@/components/features/SalaryCalculatorView";

export default function Home() {
  const [activeModule, setActiveModule] = useState<'hub' | 'mesai' | 'lesson-plans'>('hub');
  const [mesaiTab, setMesaiTab] = useState<'monthly' | 'analytics' | 'calculator'>('monthly');

  const {
    filterYear,
    filterMonth,
    setFilterYear,
    setFilterMonth,
    user,
    setUser,
    fetchData,
    initialized
  } = useShiftStore();

  const [loading, setLoading] = useState(true);

  // Auth & Data Fetching Effect
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        fetchData();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchData();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, fetchData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handlePrevMonth = () => {
    if (filterMonth === 0) {
      setFilterMonth(11);
      setFilterYear(filterYear - 1);
    } else {
      setFilterMonth(filterMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (filterMonth === 11) {
      setFilterMonth(0);
      setFilterYear(filterYear + 1);
    } else {
      setFilterMonth(filterMonth + 1);
    }
  };

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  // 1. Hub Portal (Landing Screen)
  if (activeModule === 'hub') {
    return <HubPortal onSelectModule={(mod) => setActiveModule(mod)} />;
  }

  // 2. Lesson Plans Screen
  if (activeModule === 'lesson-plans') {
    return (
      <LessonPlans
        onBackToHub={() => setActiveModule('hub')}
        onSwitchToMesai={() => setActiveModule('mesai')}
      />
    );
  }

  // 3. Mesai Takip Module
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth onBack={() => setActiveModule('hub')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. ÜST HEADER: En soldan en sağa uzanan şerit */}
      <header className="border-b sticky top-0 z-40 px-4 py-2.5 shrink-0 bg-white/95 backdrop-blur-md border-slate-200">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-3">
          
          {/* Sol: Ana Menü Butonu + Maaş Takip Başlığı */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveModule('hub')}
              className="h-8 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Ana Menü
            </Button>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Banknote className="w-4 h-4" />
              </div>
              <h1 className="text-sm md:text-base font-extrabold tracking-tight text-slate-900">
                Maaş Takip
              </h1>
            </div>
          </div>

          {/* Sağ: Ders Planları + Ayarlar + Çıkış */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveModule('lesson-plans')}
              className="h-8 px-2.5 text-xs font-semibold text-indigo-600 border-indigo-200 hover:bg-indigo-50 transition-colors hidden sm:inline-flex"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-indigo-500" />
              Ders Planları
            </Button>

            <ProfileSettings />

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-8 px-2.5 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Oturumu Kapat"
            >
              <LogOut className="w-4 h-4 sm:mr-1.5 text-slate-400 group-hover:text-rose-500" />
              <span className="hidden sm:inline">Çıkış</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. SUBHEADER: 3'lü Sekme (Aylık Takip, Analitikler, Maaş Hesaplayıcı) ve Ay Seçici */}
      <div className="border-b px-4 py-2 shrink-0 bg-white/80 border-slate-200">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-3 flex-wrap">
          
          {/* 3'lü Sekme Grubu */}
          <div className="inline-flex items-center p-0.5 rounded-lg border bg-slate-100 border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setMesaiTab('monthly')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                mesaiTab === 'monthly'
                  ? "bg-white text-indigo-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Aylık Takip</span>
            </button>
            <button
              type="button"
              onClick={() => setMesaiTab('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                mesaiTab === 'analytics'
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analitikler</span>
            </button>
            <button
              type="button"
              onClick={() => setMesaiTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                mesaiTab === 'calculator'
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Maaş Hesaplayıcı</span>
            </button>
          </div>

          {/* Yalnızca Aylık Takip Seçiliyse: Ay Seçici ("Ekim 2026" ve sağ/sol butonları) */}
          {mesaiTab === 'monthly' && (
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-2xs ml-auto">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrevMonth} 
                className="h-7 w-7 text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                title="Önceki Ay"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="min-w-[120px] text-center font-bold text-xs sm:text-sm text-slate-800 px-1">
                {monthNames[filterMonth]} {filterYear}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNextMonth} 
                className="h-7 w-7 text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                title="Sonraki Ay"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

        </div>
      </div>

      {/* 3. ANA İÇERİK ALANI */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto space-y-6">
        {mesaiTab === 'analytics' ? (
          <AnalyticsDashboard />
        ) : mesaiTab === 'calculator' ? (
          <SalaryCalculatorView />
        ) : (
          <>
            {/* Stats Section: SummaryCards + CalendarView (Devamlılık Takibi kaldırıldı) */}
            <section className="animate-slide-up space-y-6" style={{ animationDelay: '0.1s' }}>
              <SummaryCards />
              <CalendarView />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content: List and Charts */}
              <div className="lg:col-span-2 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SalaryChart />
                  <BranchChart />
                </div>
                <div className="space-y-3">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    Mesai Geçmişi
                  </h2>
                  <ShiftList />
                </div>
              </div>

              {/* Sidebar: Add Form */}
              <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="sticky top-20">
                  <AddShiftForm />

                  {/* Quick Info Card */}
                  <Card className="mt-4 bg-indigo-50/70 border-indigo-100 shadow-2xs">
                    <CardContent className="pt-4 pb-4">
                      <h3 className="font-bold text-xs text-indigo-800 mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        Sistem Bilgisi
                      </h3>
                      <div className="text-xs text-slate-600 space-y-1.5">
                        <p className="flex justify-between">
                          <span>Saatlik Ücret:</span>
                          <span className="font-bold text-slate-900">Brüt 809,00 ₺</span>
                        </p>
                        <p className="text-[10px] text-slate-400 border-t border-indigo-100 pt-1.5">
                          Veriler bulutta saklanır ve profiller arasında izoledir.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

    </div>
  );
}
