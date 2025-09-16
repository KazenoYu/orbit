# Orbit 程式碼原則詳解

## 核心理念：寫少、寫好、寫對

### 1. 乾淨 (Clean)

#### ❌ 不好的範例：過度設計
```typescript
// 太複雜了！只是要格式化日期
class DateFormatterFactory {
  private static instance: DateFormatterFactory
  private formatters: Map<string, IDateFormatter>

  static getInstance() {
    if (!this.instance) {
      this.instance = new DateFormatterFactory()
    }
    return this.instance
  }

  createFormatter(type: string): IDateFormatter {
    // ... 50 行程式碼
  }
}

interface IDateFormatter {
  format(date: Date): string
}

class StandardDateFormatter implements IDateFormatter {
  // ... 更多程式碼
}
```

#### ✅ 好的範例：簡單直接
```typescript
// 簡單、直接、夠用
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
```

---

### 2. 實用 (Practical)

#### ❌ 不好的範例：炫技但難懂
```typescript
// 這在幹嘛？需要想 5 分鐘才懂
const result = [1,2,3,4,5]
  .reduce((acc, n) => [...acc, ...(n % 2 ? [n * 2] : [])], [] as number[])
```

#### ✅ 好的範例：清楚明瞭
```typescript
// 一看就懂：取奇數並乘以 2
const result = [1,2,3,4,5]
  .filter(n => n % 2 !== 0)
  .map(n => n * 2)
```

---

### 3. 現代 (Modern)

#### ❌ 過時的寫法
```javascript
// 2015 年的寫法
function getUser(id) {
  return fetch('/api/user/' + id)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      return data
    })
}
```

#### ✅ 現代的寫法
```typescript
// 2024 年的寫法
async function getUser(id: string) {
  const res = await fetch(`/api/user/${id}`)
  return res.json()
}
```

---

### 4. 效能考量

#### ❌ 效能差
```typescript
// 每次都創建新陣列，O(n²)
let result = []
for (let i = 0; i < items.length; i++) {
  result = [...result, processItem(items[i])]
}
```

#### ✅ 效能好
```typescript
// 直接修改，O(n)
const result = items.map(processItem)
```

---

### 5. YAGNI (You Aren't Gonna Need It)

#### ❌ 預先設計太多
```typescript
interface ScheduleOptions {
  enableNotifications?: boolean      // 還沒做通知功能
  syncWithGoogle?: boolean           // 還沒做 Google 同步
  shareWithTeam?: boolean            // 還沒做團隊功能
  exportFormat?: 'pdf' | 'excel'     // 還沒做匯出功能
  // ... 20 個還沒實作的選項
}

function createSchedule(title: string, options?: ScheduleOptions) {
  // 實際上只用到 title
}
```

#### ✅ 只做需要的
```typescript
function createSchedule(title: string) {
  // 先簡單開始，需要時再加
}

// 未來真的需要時再加
function createSchedule(title: string, startTime?: Date) {
  // 漸進式增加功能
}
```

---

### 6. 適度的 DRY

#### ❌ 過度抽象
```typescript
// 為了不重複，搞得太複雜
const createValidator = <T>(field: keyof T, validator: (val: any) => boolean, error: string) => {
  return (obj: T) => {
    return validator(obj[field]) ? null : error
  }
}

const validators = [
  createValidator<User>('email', isEmail, 'Invalid email'),
  createValidator<User>('age', isPositive, 'Invalid age')
]
```

#### ✅ 適度重複沒關係
```typescript
// 清楚直接，即使有點重複
function validateEmail(email: string) {
  if (!email.includes('@')) {
    return 'Invalid email'
  }
}

function validateAge(age: number) {
  if (age < 0) {
    return 'Invalid age'
  }
}
```

---

## 實際案例：Schedule 功能

### 第一版：最簡單
```typescript
// 只做基本功能
interface Schedule {
  id: string
  title: string
  time: Date
}

function addSchedule(title: string, time: Date): Schedule {
  return {
    id: Date.now().toString(),
    title,
    time
  }
}
```

### 第二版：加入驗證
```typescript
// 需要時才加驗證
function addSchedule(title: string, time: Date): Schedule {
  if (!title.trim()) {
    throw new Error('標題不能為空')
  }

  if (time < new Date()) {
    throw new Error('時間不能是過去')
  }

  return {
    id: Date.now().toString(),
    title,
    time
  }
}
```

### 第三版：真的需要時才加複雜功能
```typescript
// 用戶反饋後才加入
interface Schedule {
  id: string
  title: string
  time: Date
  reminder?: boolean  // 用戶要求才加
}
```

---

## 檢查清單

寫程式前問自己：
1. ⬜ 這個功能現在真的需要嗎？
2. ⬜ 能用 5 行解決就不要寫 50 行
3. ⬜ 別人（包括 3 個月後的自己）能快速看懂嗎？
4. ⬜ 有更簡單的方法嗎？
5. ⬜ 這樣寫效能 OK 嗎？

## 記住

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
> — Antoine de Saint-Exupéry

**完美不是加無可加，而是減無可減。**

---

## Orbit 的實踐

1. **先讓它動** (Make it work)
2. **再讓它對** (Make it right)
3. **最後才優化** (Make it fast)

但大部分時候，停在第 2 步就夠了！