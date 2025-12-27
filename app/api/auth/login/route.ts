import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Login attempt for:", body.email) // Log for debugging
    const { email, password } = body

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { name: email }
        ]
      },
      include: {
        progress: true
      }
    })

    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    if (user.password !== password) {
      console.log("Invalid password for:", email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user
    
    const progressMap = user.progress.reduce((acc: any, curr) => {
      acc[curr.unitId] = curr.score
      return acc
    }, {})

    return NextResponse.json({
      ...userWithoutPassword,
      progress: progressMap
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
}
