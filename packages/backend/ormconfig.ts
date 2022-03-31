import { ConnectionOptions } from 'typeorm'

function getConfig(): ConnectionOptions {
  const baseConfig: ConnectionOptions = {
    type: 'mysql',
    logging: false,
    entities: [__dirname + 'db/entities/**/*.ts'],
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
