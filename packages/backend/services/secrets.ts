import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager'

const client = new SecretsManagerClient({ region: 'us-west-2' })

type SecretValue = {
  username: string
  password: string
  engine: string
  host: string
  port: number
  dbInstanceIdentifier: string
}

export async function getDbSecret() {
  const command = new GetSecretValueCommand({ SecretId: 'wydpassword' })
  const response = await client.send(command)
  if (!response.SecretString) {
    throw Error('Missing secret value!')
  }

  const secretVal: SecretValue = JSON.parse(response.SecretString)
  return secretVal
}
