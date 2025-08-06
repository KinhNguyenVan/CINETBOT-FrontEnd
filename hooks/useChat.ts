"use client"

import { useState } from "react"
import { chatApi } from "@/lib/api/chat"

export function useChat(userEmail?: string, guestSessionId?: string) {
  const [messages, setMessages] = useState<{ from: "user" | "agent"; text: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const send = async (message: string) => {
    // Thêm tin nhắn của người dùng vào trạng thái ngay lập tức
    setMessages((prev) => [...prev, { from: "user", text: message }])
    setIsLoading(true)

    try {
      // Gửi tin nhắn gốc của người dùng đến API
      const res = await chatApi.sendMessage(message, userEmail, guestSessionId)
      // Thêm phản hồi của agent vào trạng thái
      setMessages((prev) => [...prev, { from: "agent", text: res.reply }])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { from: "agent", text: "Xin lỗi, đã xảy ra lỗi: " + err.message || "Không xác định." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, send, isLoading }
}
