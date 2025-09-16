# Orbit 技術棧詳解

## 狀態管理：Zustand vs Redux Toolkit

### Redux Toolkit（RTK）
**特點**：
- Facebook 開發，最成熟的狀態管理方案
- 強制單向資料流，預測性高
- DevTools 強大，時間旅行除錯
- 樣板代碼較多（即使 RTK 已簡化很多）

**使用範例**：
```javascript
// Redux Toolkit
const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', age: 0 },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name
      state.age = action.payload.age
    }
  }
})
```

### Zustand
**特點**：
- 極簡 API，學習曲線低
- 檔案小（8kb vs Redux 的 60kb+）
- TypeScript 支援極佳
- 不需要 Provider 包裹

**使用範例**：
```javascript
// Zustand
const useUserStore = create((set) => ({
  name: '',
  age: 0,
  setUser: (user) => set({ ...user })
}))

// 使用時
const { name, setUser } = useUserStore()
```

### 市場採用率
- **Redux**：老專案多，大公司愛用（約 60% 市占）
- **Zustand**：新專案趨勢，2024 年成長最快（約 25% 市占）

### 建議
**Orbit 選 Zustand** 因為：
1. 個人專案不需要 Redux 的複雜性
2. 程式碼更簡潔，開發速度快
3. 澳洲新創公司開始流行

---

## 後端框架：Express vs Fastify

### Express
**優點**：
- 最成熟（10+ 年歷史）
- 生態系統最完整
- 教學資源豐富
- 中介軟體眾多

**缺點**：
- 效能較慢（約 30k req/sec）
- 沒有內建 Schema 驗證
- 需要額外設定 TypeScript

### Fastify
**優點**：
- 效能極快（約 65k req/sec）
- 內建 Schema 驗證
- TypeScript 原生支援好
- 自動產生 OpenAPI 文檔

**程式碼比較**：
```javascript
// Express
app.post('/user', (req, res) => {
  // 需要手動驗證
  const { name, age } = req.body
  res.json({ success: true })
})

// Fastify
fastify.post('/user', {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' }
      }
    }
  }
}, async (request, reply) => {
  // 自動驗證
  return { success: true }
})
```

### 建議
**先從 Express 開始**（學習資源多），專案成熟後可遷移到 Fastify

---

## 資料庫：PostgreSQL

### 為什麼選 PostgreSQL？
1. **關聯式資料庫**：適合複雜查詢（財務、健康資料）
2. **ACID 保證**：資料一致性高
3. **JSON 支援**：彈性存儲
4. **免費開源**：無授權費用

### 基礎概念
```sql
-- 表格範例：時程管理
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  title VARCHAR(255),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 查詢範例
SELECT * FROM schedules
WHERE user_id = 1
AND start_time >= '2025-09-16';
```

### 與 Node.js 整合
使用 **Prisma ORM**（物件關係映射）：
```javascript
// 定義模型
model Schedule {
  id        Int      @id @default(autoincrement())
  userId    Int
  title     String
  startTime DateTime
  endTime   DateTime
  createdAt DateTime @default(now())
}

// 使用
const schedules = await prisma.schedule.findMany({
  where: { userId: 1 }
})
```

---

## Docker 基礎

### 什麼是 Docker？
想像成「應用程式的便當盒」：
- **容器**：裝著你的應用程式和所有依賴
- **映像**：便當盒的模板
- **Dockerfile**：製作便當的食譜

### 基本設定
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose（多服務編排）
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      DB_HOST: postgres

  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: orbit123
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 優點
1. **環境一致**：開發 = 測試 = 生產
2. **一鍵啟動**：`docker-compose up`
3. **隔離依賴**：不污染主機環境

---

## 測試策略

### Jest（單元測試）
```javascript
// 測試範例
describe('User Store', () => {
  test('should update user name', () => {
    const store = useUserStore.getState()
    store.setUser({ name: 'John', age: 30 })
    expect(store.name).toBe('John')
  })
})
```

### Playwright（E2E 測試）
**優點**：
- 跨瀏覽器測試
- 自動等待元素
- 視覺化除錯

```javascript
// E2E 測試範例
test('user can create schedule', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.fill('[name=title]', '開會')
  await page.click('button[type=submit]')
  await expect(page.locator('.schedule-item')).toContainText('開會')
})
```

### 建議
- **單元測試**：核心邏輯必測
- **E2E 測試**：關鍵使用者流程
- **覆蓋率目標**：70-80%

---

## 學習順序建議

1. **第一週**：React 基礎 + Zustand
2. **第二週**：Node.js + Express API
3. **第三週**：PostgreSQL + Prisma
4. **第四週**：Docker 設定
5. **持續**：邊做邊學測試

每個技術都從簡單範例開始，逐步深入！