"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Inscription réussie ! Vérifie ta boîte mail pour confirmer ton adresse."
      );
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-1 sm:px-4">
      <Image src="/assets/icons/logo.svg" alt="Logo" width={100} height={100} />

      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Afficher le formulaire ou le message de succès */}
          {!success ? (
            <form onSubmit={handleRegister} className="space-y-6">
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
              <div>
                <Label htmlFor="confirm-password" className="mb-2">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full py-5" type="submit">
                S'inscrire
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-green-500 text-sm mt-2">{success}</p>
              <p className="text-gray-500 text-sm mt-2">
                Tu recevras un email de confirmation. Vérifie ta boîte mail et clique sur le lien pour activer ton compte.
              </p>
            </div>
          )}

          {/* Erreur si l'inscription échoue */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Diviseur */}
          {
            !success && (
              <>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-gray-500">ou se connecter avec</span>
              </div>
              <div className="mt-4 space-y-4">
                <Button
                  onClick={() => handleOAuth("google")}
                variant="outline"
                className="w-full"
              >
                S'inscrire avec Google
              </Button>
              <Button
                onClick={() => handleOAuth("github")}
                variant="outline"
                className="w-full"
              >
                S'inscrire avec GitHub
              </Button>
            </div>
  
            <p className="text-sm text-center mt-4">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="underline text-primary">
                Se connecter
              </Link>
            </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
