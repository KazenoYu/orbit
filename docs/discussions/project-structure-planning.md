# Orbit 專案結構規劃

## 建議結構

```
Orbit/
├── apps/                    # 應用程式
│   ├── web/                # React 前端
│   │   ├── src/
│   │   │   ├── components/ # 元件
│   │   │   ├── pages/      # 頁面
│   │   │   ├── stores/     # Zustand 狀態
│   │   │   ├── hooks/      # 自訂 Hooks
│   │   │   ├── utils/      # 工具函式
│   │   │   └── App.tsx
│   │   ├── package.json
│   │   └── vite.config.ts  # Vite 建構工具
│   │
│   └── api/                # Fastify 後端
│       ├── src/
│       │   ├── routes/     # API 路由
│       │   ├── services/   # 商業邏輯
│       │   ├── db/         # 資料庫設定
│       │   ├── utils/      # 工具函式
│       │   └── server.ts
│       ├── prisma/         # Prisma ORM
│       │   └── schema.prisma
│       └── package.json
│
├── packages/               # 共用套件
│   └── shared/            # 前後端共用
│       ├── types/         # TypeScript 型別
│       └── constants/     # 常數定義
│
├── docs/                  # 文件
│   ├── discussions/       # 討論紀錄
│   ├── learning/          # 學習筆記
│   └── api/              # API 文件
│
├── docker/                # Docker 設定
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   └── docker-compose.yml
│
├── scripts/               # 輔助腳本
│   ├── setup.sh          # 初始化設定
│   └── deploy.sh         # 部署腳本
│
├── .github/              # GitHub 設定
│   └── workflows/        # CI/CD
│
├── CLAUDE.md             # 專案指南
├── .commands             # Claude Code 指令
├── README.md             # 專案說明
└── package.json          # Monorepo 根設定
```

## 為什麼這樣設計？

### 1. Monorepo 架構
- 使用 **pnpm workspaces** 管理多個套件
- 前後端程式碼在同一個 repo，方便開發
- 共用程式碼放在 `packages/shared`

### 2. apps/ 資料夾
- **web/**：React 前端應用
- **api/**：Fastify 後端服務
- 未來可加入 **mobile/**（React Native）

### 3. 技術選擇
- **Vite**：比 Create React App 快很多
- **pnpm**：比 npm 省空間、更快
- **Prisma**：最好用的 TypeScript ORM

## 初始化指令

```bash
# 1. 初始化 monorepo
pnpm init

# 2. 建立前端專案
cd apps/web
pnpm create vite . --template react-ts

# 3. 建立後端專案
cd ../api
pnpm init
pnpm add fastify @fastify/cors
pnpm add -D typescript @types/node tsx

# 4. 設定 Prisma
pnpm add prisma @prisma/client
pnpm prisma init
```

## 模組規劃

### 第一階段：時程管理
```
web/src/
├── pages/
│   ├── Calendar.tsx      # 行事曆頁面
│   ├── TodoList.tsx      # 待辦事項
│   └── TimeTracker.tsx   # 時間追蹤
└── stores/
    └── scheduleStore.ts   # 時程狀態管理
```

### 第二階段：健康管理
```
web/src/
├── pages/
│   ├── Exercise.tsx      # 運動紀錄
│   ├── Diet.tsx         # 飲食追蹤
│   └── Sleep.tsx        # 睡眠分析
└── stores/
    └── healthStore.ts    # 健康狀態管理
```

### 第三階段：財務管理
```
web/src/
├── pages/
│   ├── Expenses.tsx     # 收支記帳
│   ├── Budget.tsx       # 預算規劃
│   └── Investment.tsx   # 投資追蹤
└── stores/
    └── financeStore.ts  # 財務狀態管理
```

## 開發流程

1. **本地開發**
   ```bash
   # 啟動所有服務
   pnpm dev

   # 或個別啟動
   pnpm --filter web dev
   pnpm --filter api dev
   ```

2. **測試**
   ```bash
   pnpm test
   ```

3. **建構**
   ```bash
   pnpm build
   ```

4. **Docker 部署**
   ```bash
   docker-compose up
   ```

## 討論要點

1. **要不要用 Monorepo？**
   - 優點：程式碼共用、統一管理
   - 缺點：初期設定較複雜

2. **要用 Vite 還是 Next.js？**
   - Vite：單純的 SPA，適合初學
   - Next.js：SSR/SSG，較複雜但功能強

3. **資料庫放哪？**
   - 本地開發：Docker PostgreSQL
   - 生產環境：Supabase（免費）

4. **需要 CI/CD 嗎？**
   - GitHub Actions 自動測試
   - Vercel 部署前端
   - Railway 部署後端

---
最後更新：2025-09-16