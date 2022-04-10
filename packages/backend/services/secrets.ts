import fs from 'fs/promises'

type SecretData = {
  ARN?: string
  Name?: string
  VersionId?: string
  SecretString?: string
  VersionStages?: string[]
  CreatedDate?: string
}

type SecretValue = {
  username: string
  password: string
  engine: string
  host: string
  port: number
  dbInstanceIdentifier: string
}

export async function getDbSecret() {
  const secretsBuffer = await fs.readFile('.creds/db.json')
  const secretsData: SecretData = JSON.parse(secretsBuffer.toString())
  if (!secretsData.SecretString) {
    throw Error('Missing secret value!')
  }
  const secretVal: SecretValue = JSON.parse(secretsData.SecretString)
  return secretVal
}
