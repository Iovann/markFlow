"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Fonction de gestion du login
  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  // Fonction pour la connexion avec Google via Supabase OAuth
  const handleOAuthLogin = async (provider: "google" | "github") => {
    setAuthLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    setAuthLoading(false);
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 justify-center">
      <div className="flex items-center justify-center">
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connexion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Formulaire de connexion avec email et mot de passe */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full py-5" type="submit" disabled={loading}>
              {
                loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Se connecter"
                )
              }
            </Button>
          </form>

          {/* Erreur si la connexion échoue */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Diviseur */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-gray-500">ou se connecter avec</span>
          </div>

          {/* Boutons de connexion OAuth */}
          <div className="mt-4 space-y-4">
            <Button
              onClick={() => handleOAuthLogin("google")}
              variant="outline"
              className="w-full"
              disabled={authLoading}
            >
              {
                authLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Se connecter avec Google"
                )
              }
            </Button>
          </div>
          <p className="text-sm text-center mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link href="/register" className="underline text-primary">
              S'inscrire
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
