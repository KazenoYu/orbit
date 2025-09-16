import type { Schedule } from '@orbit/types'

/**
 * 驗證結果型別
 */
export interface ValidationResult {
  valid: boolean
  errors?: string[]
}

/**
 * 驗證 Email 格式
 * @param email - 要驗證的 email
 * @returns 驗證結果
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []

  if (!email) {
    errors.push('Email 不能為空')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email 格式不正確')
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  }
}

/**
 * 驗證時程資料
 * @param schedule - 時程資料
 * @returns 驗證結果
 */
export function validateSchedule(schedule: Partial<Schedule>): ValidationResult {
  const errors: string[] = []

  if (!schedule.title) {
    errors.push('標題不能為空')
  }

  if (!schedule.startTime) {
    errors.push('開始時間不能為空')
  }

  if (!schedule.endTime) {
    errors.push('結束時間不能為空')
  }

  if (schedule.startTime && schedule.endTime) {
    const start = new Date(schedule.startTime).getTime()
    const end = new Date(schedule.endTime).getTime()

    if (end <= start) {
      errors.push('結束時間必須晚於開始時間')
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  }
}