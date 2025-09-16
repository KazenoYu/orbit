import Fastify from 'fastify'
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})

// 啟動伺服器
const start = async () => {
  try {
    // 註冊 CORS
    await fastify.register(cors, {
      origin: 'http://localhost:7777' // Orbit 前端 port
    })

    // 健康檢查路由
    fastify.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() }
    })

    // 啟動監聽
    await fastify.listen({ port: 9876, host: '0.0.0.0' })
    fastify.log.info('🚀 Server running at http://localhost:9876')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()