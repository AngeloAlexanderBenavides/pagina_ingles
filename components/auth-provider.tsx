"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { mockUsers } from "@/lib/data"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "student"
  progress?: Record<string, number>
  lives?: number
  gems?: number
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProgress: (unitId: string, score: number) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize users in localStorage if not present
  useEffect(() => {
    const storedUsers = localStorage.getItem("users")
    if (!storedUsers) {
      localStorage.setItem("users", JSON.stringify(mockUsers))
    }
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && !user && pathname?.startsWith("/dashboard")) {
      router.push("/login")
    }
  }, [user, isLoading, pathname, router])

  const updateProgress = async (unitId: string, score: number) => {
    if (!user) return

    // Calculate gems earned (e.g., 10 gems per perfect score, 5 for pass)
    const gemsEarned = score >= 3 ? 10 : 5;

    // Optimistic update
    const updatedUser = { 
      ...user, 
      // @ts-ignore
      progress: { ...user.progress, [unitId]: score },
      // @ts-ignore
      gems: (user.gems || 0) + gemsEarned
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    try {
      await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          unitId,
          score,
          gemsEarned
        })
      })
    } catch (error) {
      console.error("Failed to sync progress", error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        const user = await res.json()
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      if (res.ok) {
        const user = await res.json()
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
      }
      return false
    } catch (error) {
      console.error("Register error", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProgress, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
