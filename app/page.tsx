"use client";

import { useEffect, useState } from "react";
import { AddShiftForm } from "@/components/features/AddShiftForm";
import { BranchChart } from "@/components/features/BranchChart";
import { SalaryChart } from "@/components/features/SalaryChart";
import { ShiftList } from "@/components/features/ShiftList";
import { StreakTracker } from "@/components/features/StreakTracker";
import { SummaryCards } from "@/components/features/SummaryCards";
import { useShiftStore } from "@/lib/store";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Banknote, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Auth from "@/components/auth/Auth";
import { supabase } from "@/lib/supabase";

export default function Home() {
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-xl border border-indigo-200">
              <Banknote className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Maaş Takip
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm text-slate-700">
              <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="min-w-[140px] text-center font-bold text-lg text-slate-800">
                {monthNames[filterMonth]} {filterYear}
              </span>
              <Button variant="ghost" size="icon" onClick={handleNextMonth} className="hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" /> Çıkış
            </Button>
          </div>
        </header>

        {/* Stats Section */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-8">
            <SummaryCards />
            <StreakTracker />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content: List and Charts */}
          <div className="lg:col-span-2 space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SalaryChart />
              <BranchChart />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-200 bg-slate-900/5 px-2 py-1 rounded inline-block text-slate-700!">Mesai Geçmişi</h2>
              <ShiftList />
            </div>
          </div>

          {/* Sidebar: Add Form */}
          <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="sticky top-8">
              <AddShiftForm />

              {/* Quick Info Card */}
              <Card className="mt-6 bg-indigo-50 border-indigo-100 shadow-sm">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    Bilgi
                  </h3>
                  <div className="text-sm text-slate-600 space-y-2">
                    <p className="flex justify-between">
                      <span>Tek Eğitmen:</span>
                      <span className="font-bold text-slate-900">1.213,50 ₺</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Çift Eğitmen:</span>
                      <span className="font-bold text-slate-900">809,00 ₺</span>
                    </p>
                    <p className="mt-4 text-xs text-slate-400 border-t border-indigo-100 pt-2">
                      Veriler bulutta saklanır ve her cihazdan erişilebilir.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
