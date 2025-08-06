"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, Ticket, Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"

interface LoginPageProps {
  onLoginSuccess: () => void
  onSwitchToRegister: () => void
}

export default function LoginPage({ onLoginSuccess, onSwitchToRegister }: LoginPageProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(email, password)
      onLoginSuccess()
    } catch (error: any) {
      setError(error.message || "Đăng nhập thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <Film
              className="w-8 h-8 text-yellow-400 animate-pulse"
              style={{
                animation: `float ${3 + i * 0.2}s ease-in-out infinite alternate`,
              }}
            />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md bg-black/70 backdrop-blur-lg border-yellow-400/30 shadow-2xl relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-8 h-8 text-yellow-400" />
            <CardTitle className="text-2xl font-bold text-white">CineBot</CardTitle>
            <Ticket className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-300">Đăng nhập để trải nghiệm</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <Button type="submit" disabled={isLoading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Chưa có tài khoản?{" "}
              <button onClick={onSwitchToRegister} className="text-yellow-400 hover:text-yellow-300 underline">
                Đăng ký ngay
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
