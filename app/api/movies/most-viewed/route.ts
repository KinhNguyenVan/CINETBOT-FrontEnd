import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API call to backend
    // Replace with actual API call
    const mostViewedMovies = [
      {
        id: 1,
        title: "Spider-Man: No Way Home",
        image: "/placeholder.svg?height=200&width=150",
        rating: "9.2",
        genre: "Action",
        duration: "148 phút",
        viewCount: 15420,
        showtimes: [
          { time: "13:45", room: "Phòng 6", seats: "12/180", price: "100.000đ" },
          { time: "17:15", room: "Phòng 7", seats: "56/180", price: "120.000đ" },
          { time: "20:45", room: "Phòng 8", seats: "89/180", price: "120.000đ" },
        ],
      },
      {
        id: 2,
        title: "Avatar: The Way of Water",
        image: "/placeholder.svg?height=200&width=150",
        rating: "8.5",
        genre: "Sci-Fi",
        duration: "192 phút",
        viewCount: 12350,
        showtimes: [
          { time: "14:30", room: "Phòng 1", seats: "45/120", price: "100.000đ" },
          { time: "18:00", room: "Phòng 2", seats: "67/120", price: "120.000đ" },
          { time: "21:30", room: "Phòng 3", seats: "23/120", price: "120.000đ" },
        ],
      },
      {
        id: 3,
        title: "Top Gun: Maverick",
        image: "/placeholder.svg?height=200&width=150",
        rating: "8.8",
        genre: "Action",
        duration: "131 phút",
        viewCount: 11200,
        showtimes: [
          { time: "15:00", room: "Phòng 4", seats: "89/150", price: "100.000đ" },
          { time: "19:30", room: "Phòng 5", seats: "34/150", price: "120.000đ" },
          { time: "22:00", room: "Phòng 4", seats: "78/150", price: "120.000đ" },
        ],
      },
    ]

    return NextResponse.json(mostViewedMovies)
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi tải dữ liệu phim" }, { status: 500 })
  }
}
