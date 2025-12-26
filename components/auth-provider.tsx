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

  const updateProgress = (unitId: string, score: number) => {
    if (!user) return

    // Calculate gems earned (e.g., 10 gems per perfect score, 5 for pass)
    const gemsEarned = score >= 3 ? 10 : 5;

    // Update local state
    const updatedUser = { 
      ...user, 
      // @ts-ignore
      progress: { ...user.progress, [unitId]: score },
      // @ts-ignore
      gems: (user.gems || 0) + gemsEarned
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Update "database" (localStorage users array)
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = allUsers.map((u: any) => 
      u.id === user.id ? { ...u, progress: { ...u.progress, [unitId]: score }, gems: (u.gems || 0) + gemsEarned } : u
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    let allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    
    // Fallback: If localStorage is empty, use mockUsers directly
    if (allUsers.length === 0) {
      allUsers = mockUsers;
      localStorage.setItem("users", JSON.stringify(mockUsers));
    }

    const foundUser = allUsers.find(
      (u: any) => (u.email === email || u.name === email) && u.password === password
    )

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const register = async (name: string, email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    
    if (allUsers.find((u: any) => u.email === email)) {
      return false // User already exists
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role: "student", // Default role
      progress: {},
      lives: 5,
      gems: 100
    }

    allUsers.push(newUser)
    localStorage.setItem("users", JSON.stringify(allUsers))
    
    // Auto login after register
    const { password: _, ...userWithoutPassword } = newUser
    // @ts-ignore
    setUser(userWithoutPassword)
    // @ts-ignore
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    
    return true
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
