import { createConnection, set, Connection } from 'mongoose'

set('strictQuery', true)

const config = useRuntimeConfig()
const uri = config.mongoDbUri
const dbName = config.mongoDbName
export const defaultConnection = createConnection(uri, {
  dbName,
})

export const articleDataConnection = createConnection(
  'mongodb://tejop1997:rWF14KZ47u458wRC@ac-pwordqa-shard-00-00.ttjllsw.mongodb.net:27017,ac-pwordqa-shard-00-01.ttjllsw.mongodb.net:27017,ac-pwordqa-shard-00-02.ttjllsw.mongodb.net:27017/?ssl=true&replicaSet=atlas-sm0gjt-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    dbName: 'article_data',
  },
)

export default async function connect() {
  await Promise.all([defaultConnection, articleDataConnection])
}
