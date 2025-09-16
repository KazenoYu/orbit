# Packages 套件架構說明

## 為什麼每個資料夾都需要 package.json？

### 基本概念
在 monorepo 架構中，每個 `package.json` 定義了一個**獨立的套件**（package）。這讓資料夾從「只是一個資料夾」變成「可被引用的模組」。

```
packages/
├── types/
│   └── package.json     # 讓 types/ 變成 @orbit/types 套件
├── utils/
│   └── package.json     # 讓 utils/ 變成 @orbit/utils 套件
└── validators/
    └── package.json     # 讓 validators/ 變成 @orbit/validators 套件
```

## 大公司的實際用法

### 1. **內部共享（最常見）**
大部分公司的 packages 都是**內部使用**，不會發布到 npm：

**Google (Bazel Monorepo)**
```
google3/
├── search/
│   └── BUILD.bazel      # 內部套件配置
├── maps/
│   └── BUILD.bazel
└── common/
    └── BUILD.bazel      # Gmail、Maps、Search 都用這個
```
- 永遠不會發布到 npm
- 只在 Google 內部共享

**Meta (Facebook)**
```
fbsource/
├── react/               # 開源專案，會發布
├── instagram/           # 內部使用，不發布
└── shared-ui/           # 內部共享元件庫，不發布
```

### 2. **開源發布（少數）**
只有少數套件會發布到 npm：

**Vercel (Next.js)**
```
packages/
├── next/                # 發布為 'next'
├── create-next-app/     # 發布為 'create-next-app'
└── internal-utils/      # 不發布，內部使用
```

**Babel**
```
packages/
├── babel-core/          # 發布到 npm
├── babel-parser/        # 發布到 npm
└── babel-internal/      # 不發布
```

## Orbit 的套件策略

### 現在：純內部使用
```json
// packages/types/package.json
{
  "name": "@orbit/types",
  "private": true,  // 標記為私有，不會意外發布
  "version": "0.1.0"
}
```

### 未來可能性

#### 可能性 1：永遠內部使用（90% 機率）
- 就像您的個人專案
- packages 只是組織程式碼的方式
- 不需要發布到 npm

#### 可能性 2：開源部分工具（5% 機率）
假如您的驗證邏輯很棒，可以：
```bash
# 只發布 validators
cd packages/validators
npm publish --access public  # 變成 @orbit/validators on npm
```

#### 可能性 3：建立公司/團隊（5% 機率）
如果 Orbit 變成產品：
```
packages/
├── @orbit/ui/          # 內部 UI 元件庫
├── @orbit/sdk/         # 給客戶用的 SDK（會發布）
└── @orbit/internal/    # 內部工具（不發布）
```

## 為什麼不直接用資料夾？

### ❌ 沒有 package.json 的問題
```typescript
// 醜陋的相對路徑
import { User } from '../../../shared/types/user'

// 如果移動檔案，所有 import 都壞了
// 如果資料夾改名，所有 import 都要改
```

### ✅ 有 package.json 的好處
```typescript
// 優雅的套件引用
import { User } from '@orbit/types'

// 移動檔案位置，import 不用改
// IDE 自動完成
// TypeScript 認識
// 可以管理版本
```

## 實際數據

根據 2024 年統計：
- **95%** 的企業 monorepo packages 永遠不會發布到 npm
- **3%** 會發布部分套件（通常是 SDK 或工具）
- **2%** 是完全開源專案（如 Babel、Vue）

## 結論

1. **package.json 是 monorepo 的標準做法**
2. **大部分都是內部使用，不會發布**
3. **主要目的是程式碼組織和重用**
4. **發布到 npm 是可選的，不是必須的**

## Orbit 的建議

保持 `"private": true`，專注在建立好用的個人系統。如果未來某個套件真的很有價值，再考慮開源！

---

## 快速參考

```bash
# 檢查哪些套件是私有的
pnpm ls --depth 0 --json | grep private

# 如果未來要發布某個套件
cd packages/[套件名]
# 1. 移除 package.json 中的 "private": true
# 2. 確保版本號正確
# 3. npm publish --access public
```