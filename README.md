# 🌍 Orbit - 個人生活管理系統

<div align="center">
  <p>
    <strong>在繁忙的生活中，仍能依循自己的軌道去自轉</strong>
  </p>
</div>

## 📋 關於 Orbit

Orbit 是一款專注於「生活管理」的個人系統，旨在幫助您在繁忙的生活中保持自己的節奏。

## 🚀 功能模組

### 📅 時程管理（開發中）
- 行事曆檢視
- 待辦事項
- 時間追蹤

### 🏃 健康管理（規劃中）
- 運動紀錄
- 飲食追蹤
- 睡眠分析

### 💰 財務管理（規劃中）
- 收支記帳
- 預算規劃
- 投資追蹤

### 🧠 Mind Planet 心智行星（規劃中）
- AI 任務排序
- 智慧建議
- 每日規劃

## 🛠 技術棧

- **前端**：React 18 + TypeScript + Zustand + Vite
- **後端**：Node.js + Fastify + TypeScript
- **資料庫**：PostgreSQL + Prisma ORM
- **部署**：Docker + Docker Compose
- **套件管理**：pnpm (Monorepo)

## 📦 專案結構

```
Orbit/
├── apps/
│   ├── web/        # React 前端應用 (port: 7777)
│   └── api/        # Fastify 後端服務 (port: 9876)
├── packages/
│   ├── types/      # 共用 TypeScript 型別
│   ├── utils/      # 工具函式
│   └── validators/ # 驗證邏輯
└── docs/           # 專案文件
```

## 🚀 快速開始

### 環境需求
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安裝依賴
```bash
pnpm install
```

### 啟動開發環境
```bash
# 同時啟動前後端
pnpm dev

# 單獨啟動前端
pnpm --filter web dev

# 單獨啟動後端
pnpm --filter api dev
```

### 訪問應用
- 前端：http://localhost:7777
- 後端 API：http://localhost:9876
- 健康檢查：http://localhost:9876/health

## 📝 開發原則

1. **簡潔優先**：避免過度設計
2. **漸進式開發**：從基本功能開始
3. **現代化實踐**：使用最新穩定技術
4. **清晰文件**：保持程式碼可讀性

## 👤 作者

**Ethan** - Vue3 前端工程師，正在學習 React 生態系

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提出 Issue 或 Pull Request！

---

<div align="center">
  <p>
    <em>Built with ❤️ and Claude Code (C.C)</em>
  </p>
</div>