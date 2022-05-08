import type { FastifyInstance } from "fastify"

export default function (fastify: FastifyInstance) {
    fastify.get('/test', async (_req, res) => {
        res.status(200).send({
            message: 'Hello World'
        })
    })
  }