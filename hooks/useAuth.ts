"use client"

import { useState, useEffect } from "react"
import { authApi } from "@/lib/api/auth"

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load auth info on first load
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token")
    if (!savedToken) {
      setIsLoading(false)
      return
    }

    authApi.getProfile(savedToken)
      .then((userData) => {
        setToken(savedToken)
        setUser(userData)
      })
      .catch(() => {
        localStorage.removeItem("access_token")
        setToken(null)
        setUser(null)
      })
      .finally(() => setIsLoading(false))
  }, [])

  // Login handler
  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password })
    const userData = await authApi.getProfile(res.access_token)

    localStorage.setItem("access_token", res.access_token)
    setToken(res.access_token)
    setUser(userData)

    return { access_token: res.access_token, user: userData }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("access_token")
    setToken(null)
    setUser(null)
  }

  // Shortcuts to auth API
  const register = authApi.register
  const verifyOtp = authApi.verifyOTP

  return {
    token,
    user,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    register,
    verifyOtp,
  }
}
