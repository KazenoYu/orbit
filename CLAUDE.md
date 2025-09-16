# Orbit 專案指南

## 專案概述
**Orbit** - 個人生活管理系統
- 開發者：Ethan (Vue3 前端工程師，正在學習 React)
- 助理：C.C (Claude Code)
- 目標：建立模組化的生活管理工具，同時學習澳洲市場所需技術

## 核心理念
「在繁忙的生活中，仍能依循自己的軌道去自轉」

## 技術選擇
- **前端**：React 18 + TypeScript + Zustand + Vite
- **後端**：Node.js + Fastify + TypeScript
- **資料庫**：PostgreSQL + Prisma ORM
- **部署**：Docker + Docker Compose
- **測試**：Jest + Playwright
- **套件管理**：pnpm (Monorepo with workspaces)

## 專案結構（確定）
```
Orbit/
├── apps/                    # 應用程式
│   ├── web/                # React 前端 (Vite)
│   │   ├── src/
│   │   │   ├── components/ # 元件
│   │   │   ├── pages/      # 頁面
│   │   │   ├── stores/     # Zustand 狀態
│   │   │   └── utils/      # 工具函式
│   │   └── package.json
│   └── api/                # Fastify 後端
│       ├── src/
│       │   ├── routes/     # API 路由
│       │   ├── services/   # 商業邏輯
│       │   └── server.ts
│       └── prisma/
│           └── schema.prisma
├── packages/               # 共用套件（直接放這層）
│   ├── types/             # TypeScript 型別定義
│   ├── utils/             # 工具函式
│   └── validators/        # 驗證邏輯
├── docs/
│   ├── discussions/       # 每日討論紀錄
│   └── learning/          # 學習筆記
├── docker/                # Docker 設定
└── CLAUDE.md              # 專案指南
```

## 開發原則
1. **從簡單開始**：先實作基本功能，再優化
2. **邊做邊學**：Ethan 正在學習 React/Node.js
3. **詳細註解**：程式碼要有清楚說明
4. **循序漸進**：從基礎概念開始教學
5. **持續更新 CLAUDE.md**：每次討論都評估是否需要更新此文件
6. **記錄決策**：重要技術決策都要記錄原因
7. **小心開發，謹慎求證**：每個套件都要評估必要性
8. **保持專案乾淨**：只安裝必要套件，避免臃腫
9. **現代化實踐**：使用最新穩定版本和最佳實踐

## 開發規範

### 測試策略
- **實用主義 TDD**：核心邏輯先寫測試，UI 可後補
- **測試優先順序**：驗證邏輯 > API 路由 > UI 元件
- **不追求 100% 覆蓋率**：專注重要功能

### 文件規範
- **使用 JSDoc**：為函式加上完整註解
- **包含範例**：複雜函式要有使用範例
- **錯誤說明**：註明可能的錯誤類型

### 程式碼風格
- **函式不超過 20 行**
- **單一職責原則**
- **明確的變數命名**
- **優先使用 async/await**

### 程式碼品質原則
- **乾淨**：只寫必要的程式，避免過度設計
- **實用**：解決實際問題，不炫技
- **現代**：使用最新穩定語法（ES2022+）
- **效能**：選擇最有效率的寫法
- **可讀性**：程式碼即文件，不需過多註解也能懂
- **YAGNI**：You Aren't Gonna Need It - 不預先開發未來「可能」需要的功能
- **DRY**：Don't Repeat Yourself - 但不過度抽象

### C.C 協作流程
1. 每次開始前先讀取 CLAUDE.md
2. 檢查 packages/types 的型別定義
3. 遵循既有程式碼風格
4. 重要決策更新到 CLAUDE.md

### 套件引用規範
```typescript
import { Schedule } from '@orbit/types'
import { formatDate } from '@orbit/utils'
import { validateSchedule } from '@orbit/validators'
```

### 套件安裝原則
- **評估必要性**：每個套件都要說明用途
- **避免重複**：檢查是否已有類似功能
- **版本管理**：使用確定版本，避免 ^
- **定期審查**：移除未使用的套件

## 模組規劃
1. **時程管理**（第一階段）
   - 行事曆檢視
   - 待辦事項
   - 時間追蹤

2. **健康管理**（第二階段）
   - 運動紀錄
   - 飲食追蹤
   - 睡眠分析

3. **財務管理**（第三階段）
   - 收支記帳
   - 預算規劃
   - 投資追蹤

4. **Mind Planet 心智行星**（第四階段）
   - AI 任務排序：根據優先級智慧排序
   - 智慧建議：提供執行建議與相關資料
   - 每日規劃：輸入待辦事項，AI 協助優化時程
   - 決策支援：幫助做出更好的決定

## 目前進度
- [x] 技術棧確定
- [x] 建立討論紀錄系統
- [ ] 建立專案基礎結構
- [ ] 實作第一個 React 元件
- [ ] 建立第一個 API

## 常用指令
```bash
# 安裝所有依賴
pnpm install

# 啟動所有服務（開發模式）
pnpm dev

# 單獨啟動前端
pnpm --filter web dev

# 單獨啟動後端
pnpm --filter api dev

# 執行測試
pnpm test

# 建構所有專案
pnpm build

# Docker 啟動
docker-compose up
```

## 學習資源
- React 基礎：docs/learning/react-basics.md
- Fastify 入門：docs/learning/fastify-intro.md
- Docker 指南：docs/learning/docker-guide.md

## 注意事項
- Ethan 是程式新手，需要從基礎解釋
- 避免過於複雜的程式碼範例
- 每個技術決策都要說明原因
- 保持耐心，循序漸進

## 討論紀錄
最新紀錄：`docs/discussions/2025-09-16-orbit-initial-planning.md`

---
最後更新：2025-09-16 by C.C