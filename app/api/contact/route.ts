import { NextRequest, NextResponse } from 'next/server'

// 定义表单数据接口
interface ContactFormData {
  name: string
  email: string
  message: string
}

// 验证邮箱格式
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 验证表单数据
function validateFormData(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['无效的请求数据'] }
  }

  const formData = data as Partial<ContactFormData>

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

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json()

    // 验证数据
    const validation = validateFormData(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      )
    }

    const { name, email, message } = body as ContactFormData

    // 日志记录（生产环境中可替换为数据库存储或邮件发送）
    console.log('=== 新的联系表单提交 ===')
    console.log(`时间: ${new Date().toISOString()}`)
    console.log(`姓名: ${name.trim()}`)
    console.log(`邮箱: ${email.trim()}`)
    console.log(`消息: ${message.trim().substring(0, 100)}...`)
    console.log('========================')

    // TODO: 集成邮件服务（如 Resend、SendGrid、Nodemailer）
    // 示例代码（需要安装和配置相应的包）：
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@yoursite.com',
    //   to: 'anxforever@qq.com',
    //   subject: `新的联系表单: ${name}`,
    //   html: `<p><strong>姓名:</strong> ${name}</p>
    //          <p><strong>邮箱:</strong> ${email}</p>
    //          <p><strong>消息:</strong></p>
    //          <p>${message}</p>`,
    // })

    // 成功响应
    return NextResponse.json(
      {
        success: true,
        message: '消息已成功发送！我们会尽快与您联系。'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('联系表单处理错误:', error)

    // 判断是否为 JSON 解析错误
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, errors: ['请求格式错误'] },
        { status: 400 }
      )
    }

    // 其他服务器错误
    return NextResponse.json(
      { success: false, errors: ['服务器处理请求时出错，请稍后重试'] },
      { status: 500 }
    )
  }
}

// 处理不支持的方法
export async function GET() {
  return NextResponse.json(
    { error: '此端点仅支持 POST 请求' },
    { status: 405 }
  )
}
