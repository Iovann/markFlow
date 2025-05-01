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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Fonction de gestion du login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, tu pourras appeler Supabase Auth
    console.log("Login avec", email, password);
  };

  // Fonction pour la connexion avec Google via Supabase OAuth
  const handleOAuthLogin = async (provider: string) => {
    // const { error } = await supabase.auth.signInWithOAuth({ provider });
    // if (error) {
    //   setError(error.message);
    // }
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
            <Button className="w-full" type="submit">
              Se connecter
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
            >
              Se connecter avec Google
            </Button>
            {/* Tu peux ajouter d'autres boutons pour GitHub, Facebook, etc. */}
            <Button
              onClick={() => handleOAuthLogin("github")}
              variant="outline"
              className="w-full"
            >
              Se connecter avec GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
