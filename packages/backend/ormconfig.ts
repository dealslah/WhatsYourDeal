import { ConnectionOptions } from 'typeorm'
import { Deal } from './db/entities/deal'
import { Merchant } from './db/entities/merchant'
import { MerchantOutlet } from './db/entities/merchantOutlet'

function getConfig(): ConnectionOptions {
  const baseConfig: ConnectionOptions = {
    type: 'mysql',
    logging: false,
    entities: [Deal, Merchant, MerchantOutlet],
    migrations: ['db/migrations/**/*.js'],
    migrationsTableName: 'migrations',
    legacySpatialSupport: false,
  }

  if (process.env['NODE_ENV'] == 'development') {
    return {
      ...baseConfig,
      host: '',
      port: 3306,
      username: '',
      password: '',
      database: '',
    }
  } else if (process.env['NODE_ENV'] == 'production') {
    return {
      ...baseConfig,
      host: '',
      port: 3306,
      username: '',
      password: '',
      database: '',
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
