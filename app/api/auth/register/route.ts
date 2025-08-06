import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, gender, address, birthDate } = await request.json()

    // Simulate API call to backend
    // Replace with actual registration logic
    if (email && password && name && gender && address && birthDate) {
      // Mock successful registration
      const userData = {
        id: Date.now(), // Mock ID
        email,
        name,
        gender,
        address,
        birthDate,
      }

      return NextResponse.json(userData)
    } else {
      return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 })
  }
}
