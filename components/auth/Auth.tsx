"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
                },
            });

            if (error) throw error;

            setMessage({
                type: 'success',
                text: 'Giriş linki mail adresine gönderildi! Lütfen kontrol et.',
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

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg border-slate-200">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-indigo-100 rounded-full">
                            <Lock className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Giriş Yap</CardTitle>
                    <CardDescription className="text-slate-500">
                        Verilerine erişmek için mail adresini gir.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ornek@email.com"
                                    className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {loading ? 'Gönderiliyor...' : 'Sihirli Link Gönder'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
