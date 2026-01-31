import { NextRequest, NextResponse } from 'next/server'
import { BASE_URL } from '@/lib/url'

// ============ 安全配置 ============

// Rate limiting: 内存存储（生产环境建议使用 Redis）
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 5 // 每个 IP 最多 5 次请求
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 分钟窗口

// 允许的 origins（基于 BASE_URL 配置）
const ALLOWED_ORIGINS = [
  BASE_URL,
  BASE_URL.replace('https://', 'https://www.'),
].filter(Boolean)

// 开发环境允许 localhost
if (process.env.NODE_ENV === 'development') {
  ALLOWED_ORIGINS.push('http://localhost:3000', 'http://127.0.0.1:3000')
}

// ============ 工具函数 ============

// 获取客户端 IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0].trim() || realIp || 'unknown'
}

// Rate limit 检查
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  // 清理过期记录
  if (record && now > record.resetTime) {
    rateLimitMap.delete(ip)
  }

  const current = rateLimitMap.get(ip)
  if (!current) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  current.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX - current.count }
}

// Origin 校验
function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  // 无 origin 的请求（如 Postman 直接调用）在生产环境拒绝
  if (!origin && process.env.NODE_ENV === 'production') {
    // 检查 referer 作为备选
    if (referer) {
      return ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed as string))
    }
    return false
  }

  // 开发环境允许无 origin
  if (!origin && process.env.NODE_ENV === 'development') {
    return true
  }

  return ALLOWED_ORIGINS.includes(origin as string)
}

// 脱敏函数
function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***@***.***'
  const maskedLocal = local.length > 2
    ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
    : '*'.repeat(local.length)
  return `${maskedLocal}@${domain}`
}

function maskName(name: string): string {
  if (name.length <= 1) return '*'
  return name[0] + '*'.repeat(name.length - 1)
}

// ============ 数据验证 ============

interface ContactFormData {
  name: string
  email: string
  message: string
  website?: string // honeypot 字段
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateFormData(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['无效的请求数据'] }
  }

  const formData = data as Partial<ContactFormData>

  // Honeypot 检查：如果 website 字段有值，说明是机器人
  if (formData.website && formData.website.trim().length > 0) {
    // 静默失败，不告诉攻击者原因
    return { valid: false, errors: ['请求被拒绝'] }
  }

  // 验证姓名
  if (!formData.name || typeof formData.name !== 'string') {
    errors.push('请填写您的姓名')
  } else if (formData.name.trim().length < 2) {
    errors.push('姓名至少需要2个字符')
  } else if (formData.name.trim().length > 100) {
    errors.push('姓名不能超过100个字符')
  }

  // 验证邮箱
  if (!formData.email || typeof formData.email !== 'string') {
    errors.push('请填写您的邮箱')
  } else if (!isValidEmail(formData.email)) {
    errors.push('请填写有效的邮箱地址')
  }

  // 验证消息内容
  if (!formData.message || typeof formData.message !== 'string') {
    errors.push('请填写消息内容')
  } else if (formData.message.trim().length < 10) {
    errors.push('消息内容至少需要10个字符')
  } else if (formData.message.trim().length > 5000) {
    errors.push('消息内容不能超过5000个字符')
  }

  return { valid: errors.length === 0, errors }
}

// ============ API 路由 ============

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request)

  try {
    // 1. Origin 校验
    if (!isValidOrigin(request)) {
      console.warn(`[Contact] Origin 校验失败 - IP: ${clientIP}`)
      return NextResponse.json(
        { success: false, errors: ['请求来源不合法'] },
        { status: 403 }
      )
    }

    // 2. Rate limit 检查
    const rateLimit = checkRateLimit(clientIP)
    if (!rateLimit.allowed) {
      console.warn(`[Contact] Rate limit 触发 - IP: ${clientIP}`)
      return NextResponse.json(
        { success: false, errors: ['请求过于频繁，请稍后重试'] },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': '0',
          }
        }
      )
    }

    // 3. 解析请求体
    const body = await request.json()

    // 4. 数据验证（包含 honeypot 检查）
    const validation = validateFormData(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      )
    }

    const { name, email, message } = body as ContactFormData

    // 5. 脱敏日志记录
    console.log('[Contact] 新的联系表单提交')
    console.log(`  时间: ${new Date().toISOString()}`)
    console.log(`  IP: ${clientIP}`)
    console.log(`  姓名: ${maskName(name.trim())}`)
    console.log(`  邮箱: ${maskEmail(email.trim())}`)
    console.log(`  消息长度: ${message.trim().length} 字符`)

    // TODO: 集成邮件服务（如 Resend、SendGrid、Nodemailer）
    // 实际发送邮件时才需要使用真实的 name/email/message

    // 6. 成功响应
    return NextResponse.json(
      {
        success: true,
        message: '消息已成功发送！我们会尽快与您联系。'
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        }
      }
    )

  } catch (error) {
    console.error('[Contact] 处理错误:', error instanceof Error ? error.message : 'Unknown error')

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, errors: ['请求格式错误'] },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, errors: ['服务器处理请求时出错，请稍后重试'] },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: '此端点仅支持 POST 请求' },
    { status: 405 }
  )
}
