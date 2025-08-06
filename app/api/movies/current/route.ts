import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API call to backend
    // Replace with actual API call
    const currentMovies = [
      {
        id: 4,
        title: "The Batman",
        image: "/placeholder.svg?height=200&width=150",
        rating: "8.7",
        genre: "Action",
        duration: "176 phút",
        showtimes: [
          { time: "16:00", room: "Phòng 9", seats: "67/120", price: "100.000đ" },
          { time: "19:00", room: "Phòng 10", seats: "45/120", price: "120.000đ" },
          { time: "22:30", room: "Phòng 9", seats: "78/120", price: "120.000đ" },
        ],
      },
      {
        id: 5,
        title: "Dune",
        image: "/placeholder.svg?height=200&width=150",
        rating: "8.4",
        genre: "Sci-Fi",
        duration: "155 phút",
        showtimes: [
          { time: "14:00", room: "Phòng 11", seats: "34/100", price: "100.000đ" },
          { time: "18:30", room: "Phòng 12", seats: "67/100", price: "120.000đ" },
          { time: "21:00", room: "Phòng 11", seats: "23/100", price: "120.000đ" },
        ],
      },
      {
        id: 6,
        title: "No Time to Die",
        image: "/placeholder.svg?height=200&width=150",
        rating: "8.1",
        genre: "Action",
        duration: "163 phút",
        showtimes: [
          { time: "15:30", room: "Phòng 13", seats: "56/140", price: "100.000đ" },
          { time: "19:15", room: "Phòng 14", seats: "78/140", price: "120.000đ" },
          { time: "22:15", room: "Phòng 13", seats: "45/140", price: "120.000đ" },
        ],
      },
    ]

    return NextResponse.json(currentMovies)
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi tải dữ liệu phim" }, { status: 500 })
  }
}
