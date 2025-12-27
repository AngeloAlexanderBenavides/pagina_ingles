import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Register attempt for:", body.email)
    const { name, email, password } = body

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: 'student'
      }
    })

    console.log("User created successfully:", user.id)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
}
