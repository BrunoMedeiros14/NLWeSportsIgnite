import cors from 'cors'
import express from 'express'

import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutestoHourString } from './utils/convert-minutes-to-hour-string'

const port = 3333
const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  })
  return response.json(games)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    orderBy: {
      CreatedAt: 'desc',
    },
    where: {
      gameId,
    },
  })
  return response.json(
    ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutestoHourString(ad.hourStart),
        hourEnd: convertMinutestoHourString(ad.hourEnd),
      }
    })
  )
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  })
  return response.json({
    discord: ad.discord,
  })
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const body: any = request.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  })

  return response.status(201).json(ad)
})

app.post('/games', async (request, response) => {
  const { title, bannerUrl } = request.body

  const add = await prisma.game.create({
    data: { title, bannerUrl },
  })

  return response.status(201).json(add)
})

app.delete('/games/:id', async (request, response) => {
  const id = request.params.id

  const removedGame = await prisma.game.delete({
    where: {
      id,
    },
  })

  return response.status(201).json({ status: 'Game deleted', ...removedGame })
})

app.listen(port, () => {
  console.log(`servidor inicializado em http://localhost:${port}`)
})
