import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { name: email } // Allow login by name as well
        ]
      },
      include: {
        progress: true
      }
    })

    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user
      
      // Transform progress array to object map for frontend compatibility
      const progressMap = user.progress.reduce((acc: any, curr) => {
        acc[curr.unitId] = curr.score
        return acc
      }, {})

      return NextResponse.json({
        ...userWithoutPassword,
        progress: progressMap
      })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
