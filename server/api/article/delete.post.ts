import ArticleModel from '~/server/models/article.model'

export default defineEventHandler(async (event) => {
  const idArticle = await readBody(event)
  return await ArticleModel.deleteArticle(idArticle)
})
