"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface OtpVerificationPageProps {
  userEmail: string
  onOtpSuccess: () => void
  onBackToLogin: () => void
}

export default function OtpVerificationPage({
  userEmail,
  onOtpSuccess,
  onBackToLogin,
}: OtpVerificationPageProps) {
  const { verifyOtp } = useAuth()

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await verifyOtp({ email: userEmail, otp })
      setSuccess("Xác thực thành công!")
      setTimeout(() => onOtpSuccess(), 1500)
    } catch (err: any) {
      setError(err.message || "Xác minh OTP thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <Card className="w-full max-w-md bg-black/70 backdrop-blur-lg border-yellow-400/30 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl">Xác minh OTP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Mã OTP đã gửi đến: {userEmail}</Label>
              <Input
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                required
              />
            </div>

            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            {success && <p className="text-sm text-green-400 text-center">{success}</p>}

            <Button type="submit" disabled={isLoading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
              {isLoading ? "Đang xác minh..." : "Xác nhận"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
