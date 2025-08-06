import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId

    // Simulate API call to backend
    // Replace with actual API call to get user tickets
    const userTickets = [
      {
        id: 1,
        movieTitle: "Spider-Man: No Way Home",
        showtime: "17:15",
        date: "2024-01-15",
        room: "Phòng 7",
        seats: ["A1", "A2"],
        price: "240.000đ",
        status: "confirmed",
        userId: Number.parseInt(userId),
      },
      {
        id: 2,
        movieTitle: "Avatar: The Way of Water",
        showtime: "21:30",
        date: "2024-01-10",
        room: "Phòng 3",
        seats: ["B5"],
        price: "120.000đ",
        status: "used",
        userId: Number.parseInt(userId),
      },
      {
        id: 3,
        movieTitle: "Top Gun: Maverick",
        showtime: "19:30",
        date: "2024-01-20",
        room: "Phòng 5",
        seats: ["C3", "C4"],
        price: "240.000đ",
        status: "confirmed",
        userId: Number.parseInt(userId),
      },
    ]

    // Filter tickets by userId (in real app, this would be done in database query)
    const filteredTickets = userTickets.filter((ticket) => ticket.userId === Number.parseInt(userId))

    return NextResponse.json(filteredTickets)
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi tải dữ liệu vé" }, { status: 500 })
  }
}
