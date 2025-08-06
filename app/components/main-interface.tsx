"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useChat } from "@/hooks/useChat"
import { useMovies } from "@/hooks/useMovies"
import { useTickets } from "@/hooks/useTickets"
import { useGuestSession } from "@/hooks/useGuestSession" 
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Film,
  Ticket,
  Calendar,
  TrendingUp,
  PlayCircle,
  User,
  LogOut,
  TicketCheck,
  ChevronDown,
  Clock,
  Users,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import LoginModal from "./modals/login-modal"
import RegisterModal from "./modals/register-modal"
import OtpVerificationModal from "./modals/otp-verification-modal"
import type { RegisterInput } from "./modals/register-modal"

interface MainInterfaceProps {
  user: any | null 
  isAuthenticated: boolean 
  onLogout: () => void
}


export default function MainInterface({ user, isAuthenticated, onLogout }: MainInterfaceProps) {
  const { logout } = useAuth()
  const guestSessionId = useGuestSession() 
  const { messages, send, isLoading: chatLoading } = useChat(user?.email, guestSessionId || undefined) 
  const { nowShowing, topWatched, loading: moviesLoading } = useMovies()
  const { tickets, loading: ticketsLoading } = useTickets(user?.email) 

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [showProfile, setShowProfile] = useState(false) 
  const [showTickets, setShowTickets] = useState(false) 

  // Trạng thái quản lý modal
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [pendingEmailForOtp, setPendingEmailForOtp] = useState("") // Lưu email để truyền vào OTP modal
  const [emailAfterOtp, setEmailAfterOtp] = useState("") // Lưu email để điền sẵn vào Login modal sau OTP
  const [pendingRegisterData, setPendingRegisterData] = useState<RegisterInput | null>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    await send(input)
    setInput("")
  }

  // Callbacks cho các modal
  const handleLoginSuccess = () => {
    window.location.reload()
    console.log("HELLO WORLD")
  }

  const handleRegisterSuccess = (data : RegisterInput) => {
    setShowRegisterModal(false)
    setPendingEmailForOtp(data.email)
    setPendingRegisterData(data)
    setShowOtpModal(true)
    console.log("handleRegisterSuccess called. Setting activeModal to 'otp' for email:", data.email)
  }

  const handleOtpSuccess = () => {
    setShowOtpModal(false)
    setEmailAfterOtp(pendingEmailForOtp) // Lưu email để điền sẵn vào Login modal
    setShowLoginModal(true) // Mở lại Login modal sau khi OTP thành công
  }

  const handleSwitchToRegister = () => {
    setShowLoginModal(false)
    setShowRegisterModal(true)
  }

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false)
    setShowOtpModal(false)
    setShowLoginModal(true)
  }

  const handleCloseAllModals = () => {
    setShowLoginModal(false)
    setShowRegisterModal(false)
    setShowOtpModal(false)
    setShowProfile(false) 
    setShowTickets(false) 
    setPendingEmailForOtp("")
    setEmailAfterOtp("")
  }

  const handleUserLogout = () => {
    logout()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex">
      {/* Left Sidebar - Top Watched Movies */}
      <div className="w-90 bg-black/30 backdrop-blur-sm border-r border-yellow-400/20 relative">
        <div className="p-4 border-b border-yellow-400/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            Phim Chiếu Nhiều Nhất
          </h2>
          <p className="text-gray-300 text-sm mt-1">Được xem nhiều nhất tuần này</p>
        </div>

        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="p-4 space-y-4 pb-48">
            {moviesLoading ? (
              <div className="text-center text-gray-400 py-8">Đang tải...</div>
            ) : (
              topWatched.map((movie: any, index) => (
                <Card
                  key={movie.id}
                  className="bg-gray-900/50 border-yellow-400/30 hover:border-yellow-400/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="relative">
                        <img
                          src={movie.image || "/placeholder.svg"}
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded-lg"
                        />
                        {/* Nhãn phim: Thứ hạng */}
                        <div className="absolute -top-2 -left-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          {/* Nhãn phim: Độ tuổi */}
                          {movie.ageRating && (
                            <Badge
                              variant="outline"
                              className="text-xs border-blue-400 text-blue-400 flex items-center gap-1"
                            >
                              {movie.ageRating}
                            </Badge>
                          )}
                          {/* Nhãn phim: Thể loại */}
                          <Badge variant="secondary" className="text-xs">
                            {movie.genre}
                          </Badge>
                        </div>
                        {/* Số lượt xem */}
                        {movie.viewCount && (
                          <div className="flex items-center gap-1">
                            <PlayCircle className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-xs">{movie.viewCount.toLocaleString()} lượt xem</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Bottom Effects for Left Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-yellow-600/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/30">
              <div className="text-center">
                <div className="text-2xl mb-2">🍿</div>
                <h3 className="text-yellow-400 font-bold text-sm mb-1">Combo Bắp Nước</h3>
                <p className="text-gray-300 text-xs mb-2">Giảm 20% khi mua vé online</p>
                <div className="flex justify-center">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs animate-pulse">Chỉ 89.000đ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Area - Chat Only */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`ticket-${i}`}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <Ticket
                className="w-8 h-8 text-yellow-400 animate-pulse"
                style={{
                  animation: `float ${3 + i * 0.2}s ease-in-out infinite alternate`,
                }}
              />
            </div>
          ))}

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`film-${i}`}
              className="absolute opacity-10"
              style={{
                right: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            >
              <Film
                className="w-6 h-6 text-blue-400 animate-spin"
                style={{
                  animation: `spin ${4 + i * 0.3}s linear infinite`,
                }}
              />
            </div>
          ))}
        </div>

        {/* User Header / Login Button */}
        <div className="absolute top-4 right-4 z-20">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-yellow-400/30 hover:border-yellow-400/50 text-white"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-yellow-600 text-white text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700">
                <DropdownMenuItem
                  onClick={() => setShowProfile(true)}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  Thông tin cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowTickets(true)}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                >
                  <TicketCheck className="w-4 h-4 mr-2" />
                  Vé đã đặt
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={handleUserLogout} className="text-red-400 hover:bg-gray-800 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-yellow-400/30 hover:border-yellow-400/50 text-white"
              onClick={() => setShowLoginModal(true)}
            >
              <LogIn className="w-5 h-5" />
              Đăng nhập
            </Button>
          )}
        </div>

        {/* Chat Interface */}
        <Card className="w-full max-w-4xl bg-black/70 backdrop-blur-lg border-yellow-400/30 shadow-2xl relative z-10">
          <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Film className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">CineBot Assistant</CardTitle>
                <p className="text-yellow-100 text-sm">Xin chào {user?.name || "khách"}! Sẵn sàng hỗ trợ bạn</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">Online</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[550px] p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Film className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-2">Chào mừng {user?.name || "bạn"}!</h3>
                    <p className="text-gray-300 mb-4">Tôi có thể giúp bạn:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-yellow-600/20 p-3 rounded-lg text-yellow-200">🎬 Tư vấn phim hay</div>
                      <div className="bg-blue-600/20 p-3 rounded-lg text-blue-200">🎫 Đặt vé xem phim</div>
                      <div className="bg-green-600/20 p-3 rounded-lg text-green-200">⏰ Xem lịch chiếu</div>
                      <div className="bg-purple-600/20 p-3 rounded-lg text-purple-200">📍 Thông tin rạp</div>
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.from === "user" ? "bg-yellow-600 text-white" : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p className="mb-2 text-white" {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc ml-5" {...props} />,
                          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>

                    </div>
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-gray-600">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hỏi tôi về phim, lịch chiếu, hoặc đặt vé..."
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                  disabled={chatLoading}
                />
                <Button
                  type="submit"
                  disabled={chatLoading || !input.trim()}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar - Now Showing Movies */}
      <div className="w-90 bg-black/30 backdrop-blur-sm border-l border-yellow-400/20 relative">
        <div className="p-4 border-b border-yellow-400/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-400" />
            Phim Hiện Đang Chiếu
          </h2>
          <p className="text-gray-300 text-sm mt-1">Đang chiếu tại rạp</p>
        </div>

        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="p-4 space-y-4 pb-48">
            {moviesLoading ? (
              <div className="text-center text-gray-400 py-8">Đang tải...</div>
            ) : (
              nowShowing.map((movie: any) => (
                <Card
                  key={movie.id}
                  className="bg-gray-900/50 border-yellow-400/30 hover:border-yellow-400/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <img
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          {/* Nhãn phim: Độ tuổi */}
                          {movie.ageRating && (
                            <Badge
                              variant="outline"
                              className="text-xs border-blue-400 text-blue-400 flex items-center gap-1"
                            >
                              {movie.ageRating}
                            </Badge>
                          )}
                          {/* Nhãn phim: Thể loại */}
                          <Badge variant="secondary" className="text-xs">
                            {movie.genre}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Thêm thông tin lịch chiếu */}
                    <div className="space-y-2 mt-3">
                      {movie.showtimes?.map((showtime: any, idx: number) => (
                        <div key={idx} className="bg-gray-800/50 p-2 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-blue-400" />
                              <span className="text-white font-medium text-sm">{showtime.time}</span>

                              {showtime.date && (
                                <span className="text-gray-400 text-xs">
                                  {new Date(showtime.date).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                  })}
                                </span>
                              )}
                              <span className="text-gray-400 text-xs">{showtime.room}</span>
                            </div>
                            <span className="text-yellow-400 text-xs font-medium">{showtime.price}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {/* <Users className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-xs">
                              Còn {showtime.seats.split("/")[1] - showtime.seats.split("/")[0]} ghế
                            </span> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Bottom Effects for Right Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30">
              <div className="text-center">
                <div className="text-2xl mb-2">🎁</div>
                <h3 className="text-purple-400 font-bold text-sm mb-1">Galaxy Rewards</h3>
                <p className="text-gray-300 text-xs mb-2">Tích điểm - Đổi quà hấp dẫn</p>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs animate-pulse">
                    Đăng ký ngay
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {/* Giữ nguyên modal profile và tickets */}
      {showProfile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseAllModals}
        >
          <Card className="w-full max-w-md bg-gray-900 border-yellow-400/30" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-400" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <Avatar className="w-20 h-20 mx-auto mb-3">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="bg-yellow-600 text-white text-2xl">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>   
                </Avatar>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm">Họ và tên</label>
                  <p className="text-white font-medium">{user?.name}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Giới tính</label>
                  <p className="text-white font-medium">{user?.gender}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Địa chỉ</label>
                  <p className="text-white font-medium">{user?.address}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Năm sinh</label>
                  <p className="text-white font-medium">
                    {user?.birthDate || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setShowProfile(false)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Đóng
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showTickets && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseAllModals}
        >
          <Card
            className="w-full max-w-2xl bg-gray-900 border-yellow-400/30 max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TicketCheck className="w-5 h-5 text-yellow-400" />
                Vé đã đặt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {ticketsLoading ? (
                  <div className="text-center text-gray-400 py-8">Đang tải...</div>
                ) : tickets.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <Ticket className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Bạn chưa đặt vé nào</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tickets.map((ticket: any) => (
                      <Card key={ticket.ticket_id} className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-white font-semibold">{ticket.movie_name}</h3>
                              <p className="text-gray-400 text-sm">
                                {ticket.date} - {ticket.time}
                              </p>
                            </div>
                            <Badge variant="default" className="bg-green-600">
                              Đã xác nhận
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Phòng chiếu:</span>
                              <span className="text-white ml-2">{ticket.room_name}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Ghế:</span>
                              <span className="text-white ml-2">{ticket.seat_name}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Tổng tiền:</span>
                              <span className="text-yellow-400 ml-2 font-medium">{ticket.price}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Mã vé:</span>
                              <span className="text-white ml-2">
                                {ticket.ticket_id.toString().padStart(6, "0")}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                )}
              </ScrollArea>

              <div className="flex gap-2 pt-4 border-t border-gray-700 mt-4">
                <Button
                  onClick={() => setShowTickets(false)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Đóng
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseAllModals}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={handleSwitchToRegister}
        initialEmail={emailAfterOtp}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={handleCloseAllModals}
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <OtpVerificationModal
        isOpen={showOtpModal}
        onClose={handleCloseAllModals}
        email={pendingEmailForOtp}
        onOtpSuccess={handleOtpSuccess}
        onBackToLogin={handleSwitchToLogin}
        registerData={pendingRegisterData}
      />
    </div>
  )
}
