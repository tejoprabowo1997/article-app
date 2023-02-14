import { model, Model, Schema } from 'mongoose'

interface IArticleModel {
  title: string
  content: string
  status: 'FREE' | 'PAID'
  price: number
  author: string
}

class ArticleModel {
  private readonly model: Model<IArticleModel>
  constructor() {
    const articleSchema = new Schema<IArticleModel>(
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          default: 'FREE',
        },
        price: {
          type: Number,
          required: true,
        },
        author: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
    )

    this.model = model<IArticleModel>('article', articleSchema)
  }
}

export default new ArticleModel()
