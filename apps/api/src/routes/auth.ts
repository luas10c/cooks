import { z } from 'zod'
import dayjs from 'dayjs'
import slugify from 'slugify'
import { hash, verify } from 'argon2'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import type { Express } from "express"

import { prisma } from '#/database/connection'

import { User } from '#/domain/entities/user'

export const auth = (app: Express) => {
  app.post('/auth/register', async (request, response) => {
    const schema = z.object({
      name: z.string().nonempty(),
      email: z.string().nonempty().email(),
      password: z.string().nonempty().min(8).max(30),
      birthday: z.coerce.date().superRefine((date, ctx) => {
        const value = dayjs(date).get('year')
        if (value < 1900) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_date,
            message: 'year not permited'
          })
        }

        const year = dayjs().get('year')
        if (value > year) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_date,
            message: 'year not permited'
          })
        }
      })
    })

    const data = await schema.parseAsync(request.body)

    const username = slugify(data.name, {
      lower: true,
      strict: true
    })

    const user = new User({...data, id: randomUUID(), password: await hash(data.password), username, createdAt: new Date() })

    await prisma.user.create({
      data: user
    })

    return response.status(201).send()
  })

  app.post('/auth/login', async (request, response) => {

    const schema = z.object({
      email: z.string().nonempty().email(),
      password: z.string()
    })

    const data = await schema.parseAsync(request.body)

    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
    if (!user) {
      return response.status(401).json({
        message: 'password mismatch'
      })
    }

    const passwordMatch = await verify(user.password, data.password)
    if (!passwordMatch) {
      return response.status(401).json({
        message: 'password mismatch'
      })
    }

    const token = jwt.sign({ id: user.id }, '123456789', { expiresIn: '7d' })

    return response.status(200).json({token})
  })
}