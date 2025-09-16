# 程式碼審視報告 - 2025-09-16

## 發現的問題

### 🔴 嚴重問題

#### 1. **根目錄 package.json - 測試腳本無限遞迴**
```json
// 現在（錯誤）
"test": "pnpm test"  // 會無限呼叫自己！

// 應該改為
"test": "echo 'No tests configured yet'"
// 或
"test": "pnpm --filter \"./packages/**\" test"
```

#### 2. **apps/api/server.ts - Top-level await 錯誤**
```typescript
// 現在（錯誤）
await fastify.register(cors, { ... })  // 第 9 行不能直接 await

// 應該改為（把所有邏輯放進 async 函式）
const start = async () => {
  await fastify.register(cors, { ... })
  // ... 其他邏輯
}
```

### 🟡 中度問題

#### 3. **版本不一致**
- 根目錄：TypeScript 5.3.3
- apps/web：TypeScript 5.8.3
- 建議：統一使用 5.3.3（穩定版本）

#### 4. **packages/validators - Email 驗證邏輯**
```typescript
// 現在（會產生兩個錯誤訊息）
if (!email) {
  errors.push('Email 不能為空')
}
if (!emailRegex.test(email)) {  // 空字串也會進這裡
  errors.push('Email 格式不正確')
}

// 應該改為
if (!email) {
  errors.push('Email 不能為空')
} else if (!emailRegex.test(email)) {
  errors.push('Email 格式不正確')
}
```

#### 5. **型別定義不一致**
```typescript
// packages/types/index.ts
createdAt: Date      // Date 物件
timestamp: string    // 字串

// 建議統一使用 Date 或 ISO string
```

### 🟢 小問題

#### 6. **apps/web/package.json - 違反 .npmrc 設定**
```json
// 現在（使用 ^）
"react": "^19.1.1"

// 應該改為（精確版本）
"react": "19.1.1"
```

#### 7. **日誌不一致**
```typescript
// server.ts 混用兩種 log
fastify.log.error(err)           // 第 24 行
console.log('🚀 Server...')      // 第 22 行

// 建議統一使用 fastify.log
fastify.log.info('🚀 Server running at http://localhost:4000')
```

## 優化建議

### 立即修復（影響執行）
1. ✅ 修正 test script
2. ✅ 修正 server.ts 的 top-level await
3. ✅ 修正 email 驗證邏輯

### 可以稍後處理
4. 統一 TypeScript 版本
5. 統一時間型別定義
6. 移除版本號的 ^
7. 統一日誌方式

## 正面發現 👍

1. **程式碼簡潔**：沒有過度設計
2. **註解適當**：JSDoc 完整但不囉嗦
3. **結構清晰**：monorepo 架構合理
4. **型別安全**：都有 TypeScript
5. **現代語法**：使用 ES2022+

## 總評

專案基礎架構良好，符合「乾淨、實用、現代」原則。主要問題都是小細節，容易修正。整體品質：**8/10**

---

## 修復優先順序

1. **立即**：修正無法執行的部分（test script、server.ts）
2. **今天**：修正邏輯錯誤（email 驗證）
3. **本週**：統一版本和型別
4. **有空再說**：日誌統一