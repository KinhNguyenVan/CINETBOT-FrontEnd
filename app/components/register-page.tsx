"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"


interface RegisterPageProps {
  onRegisterSuccess: (email: string) => void
  onSwitchToLogin: () => void
}

export default function RegisterPage({ onRegisterSuccess, onSwitchToLogin }: RegisterPageProps) {
  const router = useRouter()
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      setIsLoading(false)
      return
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        year_of_birth: parseInt(formData.birthDate),
        sex: formData.gender,
        address: formData.address,
      })
      onRegisterSuccess(formData.email)
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Card className="w-full max-w-md bg-black/70 backdrop-blur-lg border-yellow-400/30 shadow-2xl relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Đăng ký CineBot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[85vh] overflow-y-auto">
          <form onSubmit={handleRegister} className="space-y-4">
            <InputWithLabel id="name" label="Họ và tên" value={formData.name} onChange={handleInputChange} />
            <InputWithLabel id="email" label="Email" type="email" value={formData.email} onChange={handleInputChange} />

            <PasswordInput
              id="password"
              label="Mật khẩu"
              value={formData.password}
              onChange={(val:string) => handleInputChange("password", val)}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
            />

            <PasswordInput
              id="confirmPassword"
              label="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={(val:string) => handleInputChange("confirmPassword", val)}
              show={showConfirmPassword}
              toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <div className="space-y-2">
              <Label className="text-white">Giới tính</Label>
              <Select value={formData.gender} onValueChange={(val) => handleInputChange("gender", val)}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-yellow-400">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                  <SelectItem value="Nam">Nam</SelectItem>
                  <SelectItem value="Nữ">Nữ</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <InputWithLabel id="birthDate" label="Năm sinh" type="number" value={formData.birthDate} onChange={handleInputChange} />
            <InputWithLabel id="address" label="Địa chỉ" value={formData.address} onChange={handleInputChange} />

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <Button type="submit" disabled={isLoading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
              {isLoading ? "Đang gửi OTP..." : "Gửi OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function InputWithLabel({ id, label, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
        required
      />
    </div>
  )
}

function PasswordInput({ id, label, value, onChange, show, toggleShow }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-800 border-gray-600 text-white pr-10 placeholder-gray-400 focus:border-yellow-400"
          required
        />
        <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white" onClick={toggleShow}>
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
