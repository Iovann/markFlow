import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser()

  // Vérifier si c'est une requête OAuth (contient un code d'authentification)
  const isOAuthRequest = request.nextUrl.searchParams.has('code')

  // Si c'est une requête OAuth, ne pas rediriger
  if (isOAuthRequest) {
    return supabaseResponse
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à /dashboard
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si l'utilisateur est connecté et essaie d'accéder à login/register
  if (user && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Personnalisez ici selon vos besoins
  // const protectedRoutes = ['/dashboard', '/profile', '/settings'] // Ajoutez vos routes protégées
  // const isProtectedRoute = protectedRoutes.some(route => 
  //   request.nextUrl.pathname.startsWith(route)
  // )
  
  // // Si c'est une route protégée et l'utilisateur n'est pas connecté, redirigez vers la page de connexion
  // if (isProtectedRoute && !user) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // // Si l'utilisateur est connecté et essaie d'accéder à login/register, redirigez vers le dashboard
  // if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }

  return supabaseResponse
}