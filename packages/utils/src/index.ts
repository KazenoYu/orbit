/**
 * 格式化日期為 YYYY-MM-DD HH:mm
 * @param date - 要格式化的日期
 * @returns 格式化後的字串
 * @example
 * formatDate(new Date()) // "2025-09-16 15:30"
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * 計算兩個日期之間的時間差（分鐘）
 * @param start - 開始時間
 * @param end - 結束時間
 * @returns 時間差（分鐘）
 */
export function calculateDuration(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60))
}

/**
 * 延遲執行
 * @param ms - 延遲毫秒數
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}