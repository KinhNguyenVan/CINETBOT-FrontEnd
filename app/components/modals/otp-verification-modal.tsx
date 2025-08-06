"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, Ticket, Mail, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { RegisterInput } from "@/app/components/modals/register-modal"

interface OtpVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  registerData: RegisterInput | null   
  onOtpSuccess: () => void
  onBackToLogin: () => void
}

export default function OtpVerificationModal({
  isOpen,
  onClose,
  registerData,
  email,
  onOtpSuccess,
  onBackToLogin,
}: OtpVerificationModalProps) {
  const { verifyOtp,register } = useAuth()
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isOpen) return null

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await verifyOtp({ email, otp })
      setSuccess(res.message)
    onOtpSuccess()
    } catch (error: any) {
  const detail = error.detail || error.message || "Đăng ký thất bại";
  setError(detail);
} finally {
  setIsLoading(false);
}
  }

const handleResend = async () => {
    if (!registerData) return
    try {
      // gọi lại register để gửi OTP mới
      await register(registerData)
      setSuccess("OTP đã được gửi lại thành công")
    } catch (err: any) {
      const detail = err.detail || err.message || "Không thể gửi lại OTP"
      setError(detail)
    } finally {
      setIsLoading(false)
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
            <CardTitle className="text-2xl font-bold text-white">Xác nhận OTP</CardTitle>
            <Ticket className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-300">Nhập mã OTP đã gửi đến email của bạn</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center mb-4">
            <Mail className="w-16 h-16 text-green-400 mx-auto mb-3" />
            <p className="text-white text-sm">Mã OTP đã được gửi đến:</p>
            <p className="text-yellow-400 font-medium">{email}</p>
            <p className="text-gray-400 text-xs mt-2">Vui lòng kiểm tra hộp thư và nhập mã 6 số</p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-white">
                Mã OTP
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="Nhập mã OTP 6 số"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            {success && <div className="text-green-400 text-sm text-center">{success}</div>}

            <Button type="submit" disabled={isLoading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
              {isLoading ? "Đang xác nhận..." : "Xác nhận OTP"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              Không nhận được mã? <button onClick={handleResend} className="text-yellow-400 hover:text-yellow-300 underline">Gửi lại</button>
            </p>
            <p className="text-gray-400 text-sm">
              <button onClick={onBackToLogin} className="text-blue-400 hover:text-blue-300 underline">
                Quay lại đăng nhập
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}