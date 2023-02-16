import jwt from 'jsonwebtoken'
import UserModel from '~/server/models/user.model'
import ArticleModel from '~/server/models/article.model'

export default defineEventHandler(async (event) => {
  interface IArticleModel {
    title: string
    content: string
    status: 'FREE' | 'PAID'
    price: number
    user_id: string
  }

  const { token }: any = event.node.req.headers
  const checkToken: any = jwt.verify(token, 'BNET.id2023')
  const article: IArticleModel[] | false = await ArticleModel.getArticle(
    checkToken,
  )
  return article
})
