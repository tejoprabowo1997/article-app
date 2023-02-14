import { connect, set } from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const uri = config.mongoDbUri
  const dbName = config.mongoDbName

  set('strictQuery', true)
  async function main() {
    await connect(uri, {
      dbName,
    })
  }

  main().catch((err) => console.log(err))
})
