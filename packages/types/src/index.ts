/**
 * 基礎使用者型別
 */
export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

/**
 * 時程項目型別
 */
export interface Schedule {
  id: string
  userId: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * API 回應型別
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  timestamp: string
}