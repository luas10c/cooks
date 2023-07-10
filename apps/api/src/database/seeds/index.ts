import { randomUUID } from 'node:crypto'
import { hash } from 'argon2'
import slugify from 'slugify'

import { prisma } from '#/database/connection'

async function bootstrap() {
  const username = slugify('Luciano alves', {
    replacement: '_',
    remove: undefined,
    trim: true,
    lower: true
  })

  await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'John Joe',
      email: 'johnjoe@gmail.com',
      username,
      avatarURL: 'https://avatars.githubusercontent.com/u/66514698?v=4',
      birthday: new Date(),
      password: await hash('123456'),
      createdAt: new Date()
    }
  })
}

bootstrap()
