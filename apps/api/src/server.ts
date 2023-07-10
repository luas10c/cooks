import { server as app } from './app.js'

import * as env from '#/config/env.js'

app.listen({ port: env.PORT, host: '0.0.0.0' })
console.log(`🔥 \x1b[33mServer is ready on \x1b[1m${env.PORT}\x1b[0m`)
