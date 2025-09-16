# 給 Ethan 的程式碼基礎教學

## 從 Vue 到 React：核心概念對照

### 1. 元件基礎

**Vue 3 寫法**（你熟悉的）：
```vue
<template>
  <div>{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello')
</script>
```

**React 寫法**（要學的）：
```jsx
// 這是一個 React 元件
function MyComponent() {
  const [message, setMessage] = useState('Hello')

  return <div>{message}</div>
}
```

**解釋**：
- `useState` = Vue 的 `ref`
- `{message}` = Vue 的 `{{ message }}`
- `return` 的內容 = Vue 的 `<template>`

---

### 2. Zustand 狀態管理（超簡單版）

想像 Zustand 是個「共用的變數盒子」：

```javascript
// 第一步：建立盒子
const useStore = create((set) => ({
  // 盒子裡的東西
  count: 0,

  // 改變盒子內容的方法
  addOne: () => set((state) => ({
    count: state.count + 1
  }))
}))

// 第二步：使用盒子
function Counter() {
  // 從盒子拿東西
  const count = useStore(state => state.count)
  const addOne = useStore(state => state.addOne)

  return (
    <button onClick={addOne}>
      點擊次數：{count}
    </button>
  )
}
```

---

### 3. Fastify 後端（最簡單的 API）

**什麼是 API？**
想像成餐廳點餐：
- 前端 = 顧客
- API = 服務生
- 資料庫 = 廚房

```javascript
// 建立一個服務生
const fastify = require('fastify')()

// 定義「菜單」（API 路徑）
fastify.get('/hello', async (request, reply) => {
  // 當有人點「hello」這道菜
  return { message: '您好！' }
})

// 開店營業（啟動伺服器）
fastify.listen({ port: 3000 }, () => {
  console.log('餐廳開張了！')
})
```

**測試方法**：
1. 執行程式：`node server.js`
2. 打開瀏覽器：`http://localhost:3000/hello`
3. 看到：`{"message":"您好！"}`

---

### 4. PostgreSQL 資料庫（用 Prisma）

**什麼是資料庫？**
想像成 Excel 表格，但更強大：

```prisma
// 定義表格結構（schema.prisma）
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String
}
```

**使用方式**：
```javascript
// 新增一筆資料（像在 Excel 新增一行）
const newUser = await prisma.user.create({
  data: {
    name: 'Ethan',
    email: 'ethan@example.com'
  }
})

// 查詢資料（像用 Excel 的篩選功能）
const users = await prisma.user.findMany({
  where: { name: 'Ethan' }
})
```

---

### 5. Docker（最簡單的理解）

**什麼是 Docker？**
想像成「外送餐盒」：
- 餐盒 = Container（容器）
- 菜單 = Dockerfile（製作說明）
- 整套餐 = docker-compose（組合餐）

**docker-compose.yml（組合餐菜單）**：
```yaml
version: '3.8'
services:
  # 前端餐盒
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"  # 送餐地址

  # 後端餐盒
  backend:
    build: ./backend
    ports:
      - "4000:4000"

  # 資料庫餐盒
  database:
    image: postgres:15  # 使用現成的
    environment:
      POSTGRES_PASSWORD: mypassword
```

**啟動方式**：
```bash
docker-compose up  # 送整套餐
```

---

## 實戰練習步驟

### 第一週：React 基礎
1. 建立第一個元件（Hello World）
2. 學習 useState（管理元件內的資料）
3. 學習 useEffect（處理副作用）

### 第二週：Zustand
1. 建立第一個 store
2. 在多個元件共享資料
3. 實作簡單的待辦清單

### 第三週：Fastify
1. 建立第一個 GET API
2. 建立 POST API（接收資料）
3. 連接前端與後端

### 第四週：資料庫
1. 安裝 PostgreSQL
2. 使用 Prisma 建立表格
3. 實作 CRUD 操作

---

## 常見問題

**Q：為什麼 React 要用 className 而不是 class？**
A：因為 `class` 是 JavaScript 保留字

**Q：什麼時候用 async/await？**
A：當你需要「等待」某件事完成（如：API 請求、資料庫查詢）

**Q：TypeScript 是什麼？**
A：給 JavaScript 加上「型別檢查」，像是標籤：
```typescript
let age: number = 25      // 這必須是數字
let name: string = 'Ethan' // 這必須是文字
```

---

## 小提醒

1. **不要怕錯誤訊息**：它們是朋友，告訴你哪裡要修正
2. **從簡單開始**：先讓程式能跑，再優化
3. **多練習**：寫程式像學騎腳踏車，練習最重要
4. **問 C.C**：有問題隨時問，我會用更簡單的方式解釋！

---

需要更詳細的解釋任何部分嗎？我們可以一步步來！