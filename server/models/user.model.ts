import { Model, model, Schema } from 'mongoose'
import { hash } from 'bcrypt'

interface IUserModel {
  name: string
  username: string
  email: string
  password: string
  balance: number
}
interface IDataCreateUser {
  name: string
  username: string
  email: string
  password: string
}
interface IDataIsEmailRegistered {
  email: string
}
interface IDataIsUsernameRegistered {
  username: string
}
interface IDataGetPasswordHash {
  email: string
}
interface IDataGet_id {
  email: string
}

class UserModel {
  private readonly model: Model<IUserModel>
  constructor() {
    const userSchema = new Schema<IUserModel>(
      {
        name: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          unique: true,
          required: true,
        },
        email: {
          type: String,
          unique: true,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        balance: {
          type: Number,
          default: 0,
        },
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
    )

    userSchema.pre('save', async function (next) {
      const user = this
      user.password = await hash(user.password, 10)
      next()
    })

    this.model = model<IUserModel>('user', userSchema)
  }

  public async createUser(data: IDataCreateUser) {
    try {
      return await this.model.create(data)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async isEmailRegistered(data: IDataIsEmailRegistered) {
    try {
      const checkEmail = await this.model.findOne(data)
      return !!checkEmail
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async isUsernameRegistered(data: IDataIsUsernameRegistered) {
    try {
      const checkUsername = await this.model.findOne(data)
      return !!checkUsername
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async getPasswordHash(data: IDataGetPasswordHash) {
    try {
      const user = await this.model.findOne(data)
      if (!user) return false
      return user.password
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async get_id(data: IDataGet_id) {
    try {
      const user = await this.model.findOne(data)
      if (!user) return false
      return user._id
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async getProfile(id: string) {
    try {
      return await this.model.findById(id)
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export default new UserModel()
