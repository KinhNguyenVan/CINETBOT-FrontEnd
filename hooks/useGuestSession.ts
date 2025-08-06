"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export function useGuestSession() {
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    // Luôn tạo một session ID mới mỗi khi component mount (tức là mỗi khi trang tải lại)
    const newSessionId = uuidv4()
    sessionStorage.setItem("guest_session_id", newSessionId) // Lưu vào sessionStorage
    setSessionId(newSessionId)

  }, []) 

  return sessionId
}
