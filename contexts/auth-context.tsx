"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { supabase } from "@/lib/supabase/client"
import type { User, Session } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  skipLogin: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
  skipLogin: () => {},
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

        // First check if there's a session (won't throw if no session exists)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('[AuthContext] Error getting session:', sessionError)
          setUser(null)
          setIsLoading(false)
          return
        }

        // Only try to get user if we have a session
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
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Sign out error:", error)
    }
    setUser(null)
    setSession(null)
  }, [])

  const skipLogin = useCallback(() => {
    setUser({ id: 'mock-user' } as User)
    setSession({ provider_token: 'mock_token' } as Session)
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut, skipLogin }}>
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
