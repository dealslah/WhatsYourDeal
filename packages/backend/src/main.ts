import { NestFactory } from '@nestjs/core'
import ormconfig from 'ormconfig'
import { createConnection } from 'typeorm'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // App initialisation.
  // const connection = await createConnection(ormconfig)
  // console.log(`Database connection established: ${connection.name}`)

  await app.listen(8080)
}
bootstrap()
