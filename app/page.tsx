"use client"
import { useAuth } from "@/hooks/useAuth"
import MainInterfaceComponent from "./components/main-interface"

export default function App() {
  const { isAuthenticated, user, isLoading, logout } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Luôn hiển thị MainInterfaceComponent.
  // Logic hiển thị modal đăng nhập/đăng ký sẽ nằm trong MainInterfaceComponent.
  return <MainInterfaceComponent user={user} isAuthenticated={isAuthenticated} onLogout={logout} />
}
