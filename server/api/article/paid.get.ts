import ArticleModel from '~/server/models/article.model'

export default defineEventHandler(async () => {
  return await ArticleModel.paidArticle()
})
