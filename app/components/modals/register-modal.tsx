"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, Ticket, Eye, EyeOff, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface RegisterInput {
  email: string
  password: string
  name: string
  year_of_birth: number
  sex: string
  address: string
}

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onRegisterSuccess: (data: RegisterInput) => void
  onSwitchToLogin: () => void
}

export default function RegisterModal({ isOpen, onClose, onRegisterSuccess, onSwitchToLogin }: RegisterModalProps) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    address: "",
    birthDate: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")

  if (formData.password !== formData.confirmPassword) {
    setError("Mật khẩu xác nhận không khớp")
    setIsLoading(false)
    return
  }

  try {
    const res = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      year_of_birth: parseInt(formData.birthDate),
      sex: formData.gender,
      address: formData.address,
    })
    console.log("📝 Register payload:", res)

    onRegisterSuccess({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      year_of_birth: parseInt(formData.birthDate),
      sex: formData.gender,
      address: formData.address,
    })

  } catch (error: any) {
  console.error("Registration error:", error);
  // LẤY DETAIL TỪ THẲNG OBJECT ERROR
  const detail = error.detail || error.message || "Đăng ký thất bại";
  setError(detail);
} finally {
  setIsLoading(false);
}
}
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md bg-black/70 backdrop-blur-lg border-yellow-400/30 shadow-2xl relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-8 h-8 text-yellow-400" />
            <CardTitle className="text-2xl font-bold text-white">Đăng ký CineBot</CardTitle>
            <Ticket className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-300">Tạo tài khoản để bắt đầu</p>
        </CardHeader>

        <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Họ và tên
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Xác nhận mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-white">
                Giới tính
              </Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-yellow-400">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="Nam" className="text-white">
                    Nam
                  </SelectItem>
                  <SelectItem value="Nữ" className="text-white">
                    Nữ
                  </SelectItem>
                  <SelectItem value="Khác" className="text-white">
                    Khác
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-white">
                Ngày sinh
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="bg-gray-800 border-gray-600 text-white focus:border-yellow-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">
                Địa chỉ
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                required
              />
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <Button type="submit" disabled={isLoading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Đã có tài khoản?{" "}
              <button onClick={onSwitchToLogin} className="text-yellow-400 hover:text-yellow-300 underline">
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}