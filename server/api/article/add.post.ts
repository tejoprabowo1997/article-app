import ArticleModel from '~/server/models/article.model'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  interface IDataAddArticle {
    title: string
    content: string
    status: 'FREE' | 'PAID'
    price: number
    user_id: string
  }

  const { token }: any = event.node.req.headers
  const checkToken: any = jwt.verify(token, 'BNET.id2023')

  const dataArticle = await readBody(event)
  const dataAddArticle: IDataAddArticle = {
    title: dataArticle.title,
    content: dataArticle.content,
    status: dataArticle.status,
    price: dataArticle.price,
    user_id: checkToken,
  }
  return await ArticleModel.addArticle(dataAddArticle)
})
