import { getDbSecret } from 'services/secrets'
import { ConnectionOptions } from 'typeorm'
import { Deal } from './db/entities/deal'
import { Merchant } from './db/entities/merchant'
import { MerchantOutlet } from './db/entities/merchantOutlet'

async function getConfig(): Promise<ConnectionOptions> {
  const baseConfig: ConnectionOptions = {
    type: 'mysql',
    logging: false,
    entities: [Deal, Merchant, MerchantOutlet],
    migrations: ['db/migrations/**/*.js'],
    migrationsTableName: 'migrations',
    legacySpatialSupport: false,
  }

  if (process.env['NODE_ENV'] == 'production') {
    const secret = await getDbSecret()
    console.log('secret', secret)
    return {
      ...baseConfig,
      host: secret.host,
      port: secret.port,
      username: secret.username,
      password: secret.password,
      database: 'wyd',
    }
  }

  return {
    ...baseConfig,
    host: 'localhost',
    port: 3306,
    username: 'wydu',
    password: 'wydpassword',
    database: 'wyd',
  }
}

export default getConfig()
