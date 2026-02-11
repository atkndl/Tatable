
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Settings, Check, Loader2, AlertCircle } from "lucide-react";

export function ProfileSettings() {
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;
            setStatus('success');
            setPassword("");
            setTimeout(() => setIsOpen(false), 2000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                    <Settings className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Profil Ayarları</DialogTitle>
                    <DialogDescription>
                        Hızlı giriş yapmak için bir şifre belirle.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleUpdatePassword} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-password">Yeni Şifre</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                id="new-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-9"
                                placeholder="******"
                                minLength={6}
                                required
                            />
                        </div>
                    </div>

                    {status === 'success' && (
                        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-md">
                            <Check className="w-4 h-4" /> Şifre başarıyla güncellendi.
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            <AlertCircle className="w-4 h-4" /> Bir hata oluştu.
                        </div>
                    )}

                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Şifreyi Kaydet"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
