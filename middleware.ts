import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
      const redirectUrl = new URL("/login", req.url);
      return NextResponse.redirect(redirectUrl);
    }

    if (session && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
      const redirectUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (error) {
    console.error("Erreur middleware auth:", error);
    return res;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/dashboard",
  ],
};