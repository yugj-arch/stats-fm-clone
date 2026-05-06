"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { supabase } from "@/lib/supabase/client"
import type { User, Session } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Safety timeout - ensure loading state doesn't hang forever
    const timeout = setTimeout(() => {
      console.warn('[AuthContext] Loading timeout - forcing isLoading to false')
      setIsLoading(false)
    }, 10000) // 10 second timeout

    // Get initial user
    const init = async () => {
      try {
        console.log('[AuthContext] Initializing...')

        // Check if we are returning from Spotify OAuth (Implicit Grant Flow)
        if (typeof window !== 'undefined' && window.location.hash) {
          const hash = window.location.hash.substring(1)
          const params = new URLSearchParams(hash)
          const accessToken = params.get('access_token')
          
          if (accessToken) {
            // Save token and clear hash to clean up the URL
            localStorage.setItem('spotify_token', accessToken)
            window.history.replaceState(null, '', window.location.pathname)
            
            setUser({ id: 'spotify-user' } as User)
            setSession({ provider_token: accessToken } as Session)
            setIsLoading(false)
            return
          }
        }

        // Check local storage for existing Spotify token
        const savedToken = typeof window !== 'undefined' ? localStorage.getItem('spotify_token') : null
        if (savedToken) {
          setUser({ id: 'spotify-user' } as User)
          setSession({ provider_token: savedToken } as Session)
          setIsLoading(false)
          return
        }

        // Fallback to Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('[AuthContext] Error getting session:', sessionError)
          setUser(null)
          setIsLoading(false)
          return
        }

        if (session) {
          setSession(session)
          const { data: { user }, error: userError } = await supabase.auth.getUser()

          if (userError) {
            console.error('[AuthContext] Error getting user:', userError)
            setUser(null)
          } else {
            console.log('[AuthContext] User:', user ? user.id : 'none')
            setUser(user)
          }
        } else {
          console.log('[AuthContext] No session found')
          setUser(null)
          setSession(null)
        }

        setIsLoading(false)
      } catch (error) {
        console.error('[AuthContext] Init error:', error)
        setUser(null)
        setIsLoading(false)
      }
    }

    init()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (localStorage.getItem('spotify_token')) return; // Ignore Supabase state if using Spotify implicit token
      console.log('[AuthContext] Auth state changed:', session?.user ? session.user.id : 'logged out')
      setUser(session?.user ?? null)
      setSession(session ?? null)
      setIsLoading(false)
    })

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  const signOut = useCallback(async () => {
    localStorage.removeItem('spotify_token')
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Sign out error:", error)
    }
    setUser(null)
    setSession(null)
  }, [])


  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
