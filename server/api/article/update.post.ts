import ArticleModel from '~/server/models/article.model'

export default defineEventHandler(async (event) => {
  const dataArticle = await readBody(event)
  return ArticleModel.updateArticle(dataArticle)
})
