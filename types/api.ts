// 🔧 TẠO FILE NÀY ĐỂ ĐỊNH NGHĨA TYPES CHO API RESPONSES

// Auth Types
export interface LoginResponse {
  access_token: string
  user: User
}

export interface User {
  id: number
  email: string
  name: string
  gender: string
  address: string
  year_of_birth: string
}

export interface RegisterResponse {
  message: string
  requiresOtp: boolean
  email: string
}

// Movie Types
export interface Movie {
  id: number
  title: string
  image: string
  rating: string
  genre: string
  duration: string
  showtimes: Showtime[]
  viewCount?: number
}

export interface Showtime {
  time: string
  room: string
  seats: string
  price: string
}

// Ticket Types
export interface Ticket {
  id: number
  movieTitle: string
  showtime: string
  date: string
  room: string
  seats: string[]
  price: string
  status: "confirmed" | "used"
}

// Chat Types
export interface ChatResponse {
  reply: string
}
export interface RegisterFormData {
  email: string
  password: string
  name: string
  gender: string
  address: string
  birthDate: string
  confirmPassword: string
}