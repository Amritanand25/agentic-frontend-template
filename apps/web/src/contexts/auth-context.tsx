import { createContext, useContext, useState, useCallback } from "react"
import { env } from "@/config/env"
import type { User, AuthTokens } from "@/types"

interface AuthContextState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (tokens: AuthTokens, user: User) => void
  logout: () => void
  getAccessToken: () => string | null
}

const AuthContext = createContext<AuthContextState | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading] = useState(false)

  const getAccessToken = useCallback((): string | null => {
    return sessionStorage.getItem(env.AUTH_TOKEN_KEY)
  }, [])

  const login = useCallback((tokens: AuthTokens, userData: User) => {
    sessionStorage.setItem(env.AUTH_TOKEN_KEY, tokens.accessToken)
    sessionStorage.setItem(env.REFRESH_TOKEN_KEY, tokens.refreshToken)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(env.AUTH_TOKEN_KEY)
    sessionStorage.removeItem(env.REFRESH_TOKEN_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
