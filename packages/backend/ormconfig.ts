import { ConnectionOptions } from 'typeorm'

function getConfig(): ConnectionOptions {
  return {
    type: 'mysql',
    host: process.env['DB_HOST'] ?? 'localhost',
    port: Number(process.env['DB_PORT'] ?? 3306),
    username: process.env['DB_USER'] ?? 'wydu',
    password: process.env['DB_PASSWORD'] ?? 'wydpassword',
    database: 'wyd',
    synchronize: true,
    logging: false,
    entities: ['db/entities/**/*.ts'],
    migrations: ['db/migrations/**/*.ts'],
  }
}

export default getConfig()
