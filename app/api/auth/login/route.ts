import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Simulate API call to backend
    // Replace with actual authentication logic
    if (email && password) {
      // Mock successful login
      const userData = {
        id: 1,
        email,
        name: "Người dùng",
        gender: "Nam",
        address: "TP.HCM",
        birthDate: "1990-01-01",
      }

      return NextResponse.json(userData)
    } else {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 })
  }
}
