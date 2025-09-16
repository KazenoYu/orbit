# Orbit Monorepo 詳細指南

## 1. 型別共用問題解釋

### 分離式架構的問題
當前後端分開時，共用 TypeScript 型別會很麻煩：

**問題範例**：
```typescript
// 後端定義了 User 型別
interface User {
  id: number
  name: string
  email: string
}

// 前端也需要同樣的型別
// 選項1：複製貼上（容易不同步）
// 選項2：發布 npm 套件（每次改都要重新發布）
// 選項3：Git submodule（管理複雜）
```

### Monorepo 解決方案
```typescript
// packages/shared/types/user.ts
export interface User {
  id: number
  name: string
  email: string
}

// apps/web/src/api.ts
import { User } from '@orbit/shared/types'

// apps/api/src/routes.ts
import { User } from '@orbit/shared/types'
// 前後端用同一份！改一次，兩邊都更新
```

---

## 2. 大公司資料夾風格分析

### Google/Meta 風格：Service-Oriented
```
monorepo/
├── service-calendar/    # 每個功能是獨立服務
├── service-health/
├── service-finance/
├── commons/             # 共用程式碼
└── infrastructure/
```
**特點**：每個服務完全獨立，有自己的 BUILD 檔案

### Airbnb/Modern 風格：Apps/Packages
```
monorepo/
├── apps/               # 應用程式
│   ├── web/           # React 網頁
│   ├── mobile/        # React Native
│   └── api/           # 後端 API
├── packages/          # 共用套件
│   ├── ui/            # UI 元件庫
│   ├── utils/         # 工具函式
│   └── types/         # TypeScript 型別
└── tools/             # 開發工具
```
**特點**：清楚分離「應用」和「共用程式碼」

### 傳統風格：Frontend/Backend
```
monorepo/
├── frontend/
├── backend/
└── shared/
```
**特點**：簡單直觀，但擴展性較差

**建議**：Orbit 用 **Apps/Packages 風格**，因為：
1. 未來要加 React Native 很容易
2. 共用程式碼結構清楚
3. 現代工具都支援這種結構

---

## 3. pnpm 詳細介紹

### 什麼是 pnpm？
**Performance npm**（高效能 npm）的縮寫

### 核心優勢：硬連結儲存
```
傳統 npm：
project1/node_modules/react (10MB)
project2/node_modules/react (10MB)
project3/node_modules/react (10MB)
= 30MB 硬碟空間

pnpm：
~/.pnpm-store/react (10MB) ← 只存一份
project1/node_modules/react → 連結
project2/node_modules/react → 連結
project3/node_modules/react → 連結
= 10MB 硬碟空間
```

### pnpm + Vite 完美相容！
```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

```bash
# 安裝 pnpm
npm install -g pnpm

# 用 pnpm 建立 Vite 專案
pnpm create vite@latest

# 安裝依賴
pnpm install

# 啟動 Vite
pnpm dev
```

### pnpm Workspace 設定
```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

## 4. 共用層（Shared Packages）實戰案例

### Airbnb 的共用結構
```
packages/
├── @airbnb/ui/           # UI 元件庫
│   ├── Button/
│   └── Modal/
├── @airbnb/utils/        # 工具函式
│   ├── formatDate.ts
│   └── validation.ts
└── @airbnb/types/        # TypeScript 型別
    ├── user.ts
    └── booking.ts
```

### Uber 的共用邏輯
```typescript
// packages/shared/validators/user.ts
export const validateEmail = (email: string) => {
  // 前後端都用同一個驗證邏輯
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// apps/web 和 apps/api 都可以用
import { validateEmail } from '@orbit/validators'
```

### Orbit 建議的共用層
```
packages/
├── shared/
│   ├── types/         # 型別定義
│   │   ├── models.ts  # 資料模型
│   │   └── api.ts     # API 介面
│   ├── utils/         # 工具函式
│   │   ├── date.ts    # 日期處理
│   │   └── format.ts  # 格式化
│   └── constants/     # 常數
│       └── config.ts  # 設定值
└── ui/                # 未來可以加 UI 元件庫
```

---

## 5. React Native 考量

### 程式碼共用策略
```
apps/
├── web/          # React Web (Vite)
├── mobile/       # React Native
└── api/          # Fastify

packages/
├── business-logic/  # 商業邏輯（三方共用）
├── types/          # TypeScript 型別（三方共用）
└── ui-mobile/      # React Native 專用元件
```

### 為什麼 Vite 適合 Orbit？
1. **不需要 SEO**：個人管理系統不用搜尋引擎優化
2. **開發速度快**：Vite 熱更新極快
3. **簡單易學**：比 Next.js 簡單很多
4. **React Native 相容**：商業邏輯可以共用

### 共用程式碼範例
```typescript
// packages/business-logic/schedule.ts
export class ScheduleManager {
  // Web 和 Mobile 都可以用
  calculateDuration(start: Date, end: Date) {
    return end.getTime() - start.getTime()
  }
}

// apps/web/src/pages/Calendar.tsx
import { ScheduleManager } from '@orbit/business-logic'

// apps/mobile/src/screens/Calendar.tsx
import { ScheduleManager } from '@orbit/business-logic'
```

---

## 總結建議

### Orbit 最佳選擇
1. **Monorepo**：方便共用程式碼 ✅
2. **資料夾結構**：apps/ + packages/ ✅
3. **套件管理**：pnpm（省空間、快速）✅
4. **前端工具**：Vite（簡單、快速）✅
5. **共用層**：先建立 types 和 utils ✅

### 初期架構（簡化版）
```
Orbit/
├── apps/
│   ├── web/         # React + Vite
│   └── api/         # Fastify
├── packages/
│   └── shared/      # 共用型別和工具
├── pnpm-workspace.yaml
└── CLAUDE.md
```

### 未來擴展
```
Orbit/
├── apps/
│   ├── web/         # 網頁版
│   ├── mobile/      # 手機版（React Native）
│   ├── desktop/     # 桌面版（Electron）
│   └── api/         # 後端
└── packages/
    ├── shared/      # 通用共用
    ├── ui-web/      # 網頁 UI 元件
    └── ui-mobile/   # 手機 UI 元件
```

這樣的架構可以從簡單開始，隨著專案成長逐步擴展！