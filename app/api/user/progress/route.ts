import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, unitId, score, gemsEarned } = body

    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_unitId: {
          userId,
          unitId
        }
      },
      update: {
        score: score,
        completed: score >= 3 // Assuming 3 is passing score
      },
      create: {
        userId,
        unitId,
        score,
        completed: score >= 3
      }
    })

    // Update user gems
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        gems: {
          increment: gemsEarned
        }
      }
    })

    return NextResponse.json({ progress, gems: user.gems })
  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
