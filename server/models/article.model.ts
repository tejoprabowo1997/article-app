import { Model, Schema } from 'mongoose'
import { articleDataConnection } from '~/server/services/database'

interface IArticleModel {
  title: string
  content: string
  status: 'FREE' | 'PAID'
  price: number
  user_id: string
}
interface IDataArticle {
  title: string
  content: string
  status: 'FREE' | 'PAID'
  price: number
  user_id: string
}
interface IDataUpdateArticle {
  filter: {
    _id: string
  }
  update: {
    title: string
    content: string
    status: 'FREE' | 'PAID'
    price: number
  }
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
        user_id: {
          type: String,
        },
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
    )

    this.model = articleDataConnection.model<IArticleModel>(
      'article',
      articleSchema,
    )
  }

  public async addArticle(data: IDataArticle) {
    try {
      return await this.model.create(data)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async getArticle(user_id: string): Promise<IArticleModel[] | false> {
    try {
      return await this.model.find({ user_id })
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async updateArticle(data: IDataUpdateArticle) {
    try {
      return await this.model.findOneAndUpdate(data.filter, data.update)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async deleteArticle(idArticle: string) {
    try {
      return await this.model.findOneAndDelete({ _id: idArticle })
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async freeArticle() {
    try {
      return await this.model.find({ status: 'FREE' })
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async paidArticle() {
    try {
      return await this.model.find({ status: 'PAID' })
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export default new ArticleModel()
