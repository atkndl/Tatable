"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Mail, Loader2, ArrowLeft, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

// Hardcoded Profiles
const PROFILES = [
    { name: "Atakan Dal", email: "atakandal@hotmail.com", color: "bg-indigo-500" },
    { name: "Ahmet Emre Demir", email: "ahmetemre.demir@outlook.com", color: "bg-orange-500" },
    { name: "Furkan Payer", email: "furkanpayer.35@outlook.com", color: "bg-emerald-500" },
    { name: "Elif Görkem Güler", email: "elif.gorkeguler@gmail.com", color: "bg-pink-500" },
];

export default function Auth() {
    const [selectedProfile, setSelectedProfile] = useState<typeof PROFILES[0] | null>(null);
    const [password, setPassword] = useState('');
    const [customEmail, setCustomEmail] = useState(''); // For the "Magic Link" fallback
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [mode, setMode] = useState<'profiles' | 'password' | 'magic'>('profiles');

    // Handle Profile Click
    const handleProfileClick = async (profile: typeof PROFILES[0]) => {
        setSelectedProfile(profile);
        setMessage(null);
        setPassword('');

        // Attempt Auto-Login with default password "123456"
        // If it works, user gets in. If not, we show password screen.
        setLoading(true);
        try {
            // First try to sign in
            const { error } = await supabase.auth.signInWithPassword({
                email: profile.email,
                password: "123456"
            });

            if (!error) {
                // Success!
                return;
            }

            // If login failed, maybe user doesn't exist? Try to sign up if needed.
            if (error.message.includes("Invalid login credentials") || error.message.includes("Email not confirmed")) {
                // Try to sign up silently?? 
                // If invalid credentials, it means user exists but pass is wrong (or different).
                // So we just show password screen.
                setMode('password');
            } else {
                setMode('password');
            }

        } catch (err) {
            setMode('password');
        } finally {
            setLoading(false);
        }
    };

    // Login with Password
    const handlePasswordLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProfile) return;

        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: selectedProfile.email,
                password: password,
            });

            if (error) throw error;
            // Success handles automatically by onAuthStateChange in page.tsx
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: 'Hatalı şifre. Eğer şifre belirlemediysen "Sihirli Link" ile giriş yap.',
            });
        } finally {
            setLoading(false);
        }
    };

    // Login with Magic Link
    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailToUse = selectedProfile ? selectedProfile.email : customEmail;

        if (!emailToUse) return;

        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: emailToUse,
                options: {
                    emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
                },
            });

            if (error) throw error;

            setMessage({
                type: 'success',
                text: `Giriş linki ${emailToUse} adresine gönderildi!`,
            });
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'Bir hata oluştu.',
            });
        } finally {
            setLoading(false);
        }
    };

    if (mode === 'profiles') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4 animate-fade-in">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">Kim giriş yapıyor?</h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl w-full px-4">
                    {PROFILES.map((profile) => (
                        <button
                            key={profile.email}
                            onClick={() => handleProfileClick(profile)}
                            className="group flex flex-col items-center gap-4 transition-transform hover:scale-105 outline-none"
                        >
                            <div className={cn(
                                "w-24 h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center text-4xl font-bold text-white shadow-lg transition-all",
                                profile.color,
                                "group-hover:ring-4 group-hover:ring-white/20"
                            )}>
                                {profile.name.charAt(0)}
                            </div>
                            <span className="text-slate-400 group-hover:text-white text-lg font-medium transition-colors text-center">
                                {profile.name}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-16">
                    <Button
                        variant="outline"
                        className="bg-transparent border-slate-700 text-slate-400 hover:text-white hover:border-white transition-colors"
                        onClick={() => setMode('magic')}
                    >
                        Farklı bir hesapla gir
                    </Button>
                </div>
            </div>
        );
    }

    if (mode === 'password') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <Card className="w-full max-w-md shadow-xl border-slate-200">
                    <CardHeader className="text-center relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-4 text-slate-400 hover:text-slate-900"
                            onClick={() => { setMode('profiles'); setSelectedProfile(null); }}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex justify-center mb-4">
                            <div className={cn(
                                "w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold text-white shadow-md",
                                selectedProfile?.color
                            )}>
                                {selectedProfile?.name.charAt(0)}
                            </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900">
                            Merhaba, {selectedProfile?.name.split(' ')[0]}
                        </CardTitle>
                        <CardDescription>
                            Devam etmek için şifreni gir.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="password"
                                    placeholder="Şifre"
                                    className="bg-white border-slate-200 text-slate-900 h-11"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            {message && (
                                <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                    {message.text}
                                </div>
                            )}

                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Giriş Yap"}
                            </Button>

                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={handleMagicLink}
                                    className="text-sm text-slate-500 hover:text-indigo-600 hover:underline"
                                >
                                    Şifremi unuttum / İlk defa giriyorum
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Magic Link Fallback Mode
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg border-slate-200">
                <CardHeader>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 -ml-2 mb-2 text-slate-400"
                        onClick={() => setMode('profiles')}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <CardTitle className="text-2xl font-bold text-slate-900">Giriş Yap</CardTitle>
                    <CardDescription>Email adresine sihirli link gönderilecek.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleMagicLink} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="ornek@email.com"
                                className="bg-white border-slate-200 text-slate-900"
                                value={customEmail}
                                onChange={(e) => setCustomEmail(e.target.value)}
                                required
                            />
                        </div>

                        {message && (
                            <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Link Gönder"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

