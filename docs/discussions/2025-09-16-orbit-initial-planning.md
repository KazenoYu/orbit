# Orbit 專案討論紀錄 - 2025-09-16

## 參與者
- **Ethan**（Vue3 前端工程師，正在學習 React/Node.js）
- **C.C** (Claude Code，技術指導)

## 討論主題
1. Claude Code 使用方法
2. Orbit 專案規劃
3. 技術棧選擇

## 專案概述
**Orbit** - 生活管理系統
- 理念：在繁忙生活中，依循自己的軌道自轉
- 模組規劃：
  1. 時程管理
  2. 健康管理
  3. 財務管理
  4. Mind Planet 心智行星（AI 協助規劃）

## 技術棧決定

### 前端
- **React 18 + TypeScript**
- **狀態管理**：Zustand ✅（已決定）
- **測試**：Jest + React Testing Library

### 後端
- **Node.js + Fastify** ✅（已決定）
- **TypeScript**

### 資料庫
- **PostgreSQL**（關聯資料）
- **Redis**（快取）

### 部署
- **Docker + Docker Compose**

### 測試
- **單元測試**：Jest
- **E2E 測試**：Playwright（待討論）

## 澳洲市場技術需求
- React + Node.js ✅（需求量大）
- TypeScript（幾乎必備）
- 薪資範圍：$100-160K+ AUD

## 待討論項目
- [x] Zustand vs Redux 詳細比較（選擇 Zustand）
- [x] Express vs Fastify 選擇（選擇 Fastify）
- [ ] Docker 基礎設定
- [ ] PostgreSQL 設計
- [ ] Playwright 整合
- [ ] 基礎程式碼教學（Ethan 需要）

## Ethan 的想法
- 選擇最新技術（Zustand + Fastify）
- 需要從基礎開始學習
- 希望保留 C.C 的記憶和討論脈絡
- 目標：學習澳洲市場需求技術

## 下一步行動
1. 建立專案基礎結構
2. 撰寫 CLAUDE.md ✅
3. 設定開發環境
4. 建立基礎程式碼教學文件

## 專案結構決策（16:00）

### 研究結果
1. **大公司實踐**：
   - Google/Meta：Service-Oriented（每個服務獨立）
   - Airbnb/現代：Apps/Packages 分離
   - 都使用專門工具（Bazel, Buck）

2. **技術相容性**：
   - pnpm + Vite ✅ 完美相容
   - Monorepo 型別共用 ✅ 解決同步問題
   - React Native 整合 ✅ 可共用商業邏輯

3. **Ethan 的決定**：
   - Monorepo 架構
   - Apps/Packages 結構（packages 直接放內容，無 shared 層）
   - pnpm + Vite 組合
   - 建立共用套件：types, utils, validators
   - 預留 React Native 擴展空間

## Mind Planet 模組規劃（16:30）

**新增第四個模組**：Mind Planet 心智行星
- 使用者輸入今日待辦事項
- AI 協助排序（依優先級、時間、相依性）
- 提供執行建議與相關資料
- 智慧決策支援

**技術考量**：
- 可能需要整合 OpenAI API 或類似服務
- 前端需要聊天介面元件
- 後端需要 AI 服務整合層

---
最後更新：2025-09-16 16:30