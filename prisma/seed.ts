import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin', // In a real app, hash this!
      role: 'admin',
    },
  })

  // Create Student
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      name: 'Student User',
      email: 'student@example.com',
      password: 'user', // In a real app, hash this!
      role: 'student',
      progress: {
        create: [
          { unitId: 'unit-1', score: 100, completed: true },
          { unitId: 'unit-2', score: 60, completed: true },
        ]
      }
    },
  })

  console.log({ admin, student })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
