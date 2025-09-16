# Orbit 開發理念討論 - 2025-09-16

## 1. 專案結構調整

### Ethan 的決定
```
Orbit/
├── apps/
│   ├── web/            # React + Vite
│   └── api/            # Fastify
├── packages/           # 直接放共用內容（不需要 shared/）
│   ├── types/          # TypeScript 型別定義
│   ├── utils/          # 工具函式
│   └── validators/     # 共用驗證邏輯
```

---

## 2. 開發理念選擇

### 2.1 測試策略：實用主義 TDD

**為什麼不是純 TDD？**
- Ethan 正在學習新技術（React/Node.js）
- 個人專案需要快速迭代
- 純 TDD 學習曲線太陡

**Orbit 的測試策略：**
```typescript
// 1. 核心邏輯：先寫測試
// packages/validators/schedule.test.ts
test('時程不能結束時間早於開始時間', () => {
  const result = validateSchedule({
    start: '2025-09-16 14:00',
    end: '2025-09-16 13:00'
  })
  expect(result.valid).toBe(false)
})

// 2. UI 元件：後寫測試（當穩定後）
// 3. API 路由：整合測試優先
```

### 2.2 文件策略：JSDoc + TypeScript

**為什麼用 JSDoc？**
- AI 工具（如 C.C）能更好理解程式碼
- 產生文件網站
- IDE 自動提示更完整

**Orbit 文件規範：**
```typescript
/**
 * 建立新的時程項目
 * @param data - 時程資料
 * @param userId - 使用者 ID
 * @returns 建立的時程物件
 * @throws {ValidationError} 當資料驗證失敗時
 * @example
 * const schedule = await createSchedule({
 *   title: '團隊會議',
 *   start: new Date()
 * }, userId)
 */
export async function createSchedule(
  data: ScheduleInput,
  userId: string
): Promise<Schedule> {
  // 實作
}
```

### 2.3 程式碼風格：Clean Code 原則

**核心原則：**
1. **單一職責**：每個函式只做一件事
2. **明確命名**：變數名稱要說明用途
3. **小函式**：不超過 20 行
4. **DRY**：不重複程式碼

---

## 3. 與 C.C (Claude Code) 的協作模式

### 3.1 讓 C.C 更有效的檔案結構

**專案根目錄檔案：**
```
CLAUDE.md          # C.C 的專案指南
.copilot-instructions.md  # AI 開發規範
```

**.copilot-instructions.md 範例：**
```markdown
# Orbit AI 開發規範

## 專案結構
- apps/web: React 前端
- apps/api: Fastify 後端
- packages/: 共用程式碼

## 程式碼規範
- 使用 JSDoc 註解
- 函式不超過 20 行
- 優先使用 async/await
- 錯誤處理要明確

## 引用規範
- 共用套件：@orbit/types, @orbit/utils
- 相對路徑：使用 '@/' alias
```

### 3.2 開發流程

**每次新功能的步驟：**
```
1. 討論需求 → 更新 CLAUDE.md
2. C.C 先讀取：
   - CLAUDE.md（專案脈絡）
   - packages/types（型別定義）
   - 相關既有程式碼
3. 實作順序：
   - 定義型別（packages/types）
   - 寫核心邏輯測試（如果是重要功能）
   - 實作功能
   - 整合測試
```

---

## 4. 實用開發模式

### 4.1 漸進式開發

**第一版：能動就好**
```typescript
// v1: 簡單實作
function addSchedule(title: string) {
  // 基本功能
}
```

**第二版：加入驗證**
```typescript
// v2: 加入驗證
function addSchedule(data: ScheduleInput) {
  validateSchedule(data)
  // ...
}
```

**第三版：完整功能**
```typescript
// v3: 完整實作
async function addSchedule(
  data: ScheduleInput,
  options?: ScheduleOptions
): Promise<Schedule> {
  // 完整功能
}
```

### 4.2 共用引用最佳實踐

**package.json 設定：**
```json
{
  "name": "@orbit/types",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./src/index.ts",  // 開發時直接用 TS
      "default": "./dist/index.js"
    }
  }
}
```

**使用方式：**
```typescript
// apps/web/src/pages/Calendar.tsx
import { Schedule, User } from '@orbit/types'
import { formatDate } from '@orbit/utils'
import { validateSchedule } from '@orbit/validators'
```

---

## 5. 具體開發規範

### 5.1 註解規範

```typescript
// ❌ 不要這樣
// 增加一
function add(x: number) {
  return x + 1
}

// ✅ 要這樣（只在需要說明時）
/**
 * 計算複利
 * 使用年化利率計算 n 年後的總額
 */
function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number
): number {
  // A = P(1 + r)^n
  return principal * Math.pow(1 + rate, years)
}
```

### 5.2 錯誤處理

```typescript
// 定義清楚的錯誤類型
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

// 使用時
try {
  await createSchedule(data)
} catch (error) {
  if (error instanceof ValidationError) {
    // 處理驗證錯誤
  }
  throw error
}
```

---

## 6. 開發工具設定

### 6.1 VS Code 設定

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

### 6.2 Git Hooks（使用 husky）

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

---

## 總結：Orbit 開發哲學

1. **實用優先**：不追求完美，追求能用
2. **漸進改善**：先動起來，再優化
3. **文件友善**：為未來的自己和 C.C 寫註解
4. **測試平衡**：核心邏輯必測，UI 可後補
5. **清晰結構**：讓 C.C 容易理解和協作

---

## Ethan 的決策清單

- [x] 不要 packages/shared，直接用 packages/
- [ ] 採用實用主義 TDD（核心邏輯先測試）
- [ ] 使用 JSDoc + TypeScript
- [ ] 建立 .copilot-instructions.md
- [ ] 設定開發工具（ESLint, Prettier）
- [ ] 制定 Git commit 規範

---

最後更新：2025-09-16 16:30