import { model, Model, Schema } from 'mongoose'

interface ITransactionModel {
  article_id: string
  total_price: number
  status: 'PENDING' | 'CANCEL' | 'PAID'
}

class TransactionModel {
  private readonly model: Model<ITransactionModel>

  constructor() {
    const transactionSchema = new Schema<ITransactionModel>(
      {
        article_id: {
          type: String,
          required: true,
        },
        total_price: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          default: 'PENDING',
        },
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
    )

    this.model = model<ITransactionModel>('transaction', transactionSchema)
  }
}

export default new TransactionModel()
