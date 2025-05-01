import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Créer une réponse par défaut
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Initialiser le client Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          // Définir le cookie dans la demande et la réponse
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          // Supprimer le cookie de la demande et de la réponse
          request.cookies.delete({
            name,
            ...options,
          })
          response.cookies.delete({
            name,
            ...options,
          })
        },
      },
    }
  )

  // Actualiser la session
  const { data: { session } } = await supabase.auth.getSession()
  
  // // Vérifier si c'est une requête OAuth (contient un code d'authentification)
  // const isOAuthRequest = request.nextUrl.searchParams.has('code')

  // // Si c'est une requête OAuth, ne pas rediriger
  // if (isOAuthRequest) {
  //   return response
  // }

  // // Si l'utilisateur n'est pas connecté et essaie d'accéder à /dashboard
  // if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // // Si l'utilisateur est connecté et essaie d'accéder à login/register
  // if (session && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  
  return response
}