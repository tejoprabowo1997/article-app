import UserModel from '~/server/models/user.model'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  interface IDataLogin {
    email: string
    password: string
  }
  const dataLogin: IDataLogin = await readBody(event)

  const dataCheckEmail = { email: dataLogin.email }
  const isEmailRegistered = await UserModel.isEmailRegistered(dataCheckEmail)
  if (!isEmailRegistered)
    return createError({
      statusCode: 401,
      statusMessage: "Login failed. Email doesn't exists",
      data: "Login failed. Email doesn't exists",
    })

  const dataGetPassword = { email: dataLogin.email }
  const passwordHash = await UserModel.getPasswordHash(dataGetPassword)
  if (!passwordHash)
    return createError({
      statusCode: 500,
      statusMessage: 'Something wrong with our system. Please try again later',
      data: 'Something wrong with our system. Please try again later',
    })

  const comparePassword = await compare(dataLogin.password, passwordHash)
  if (!comparePassword)
    return createError({
      statusCode: 401,
      statusMessage: 'Your password is incorrect',
      data: 'Your password is incorrect',
    })

  const dataGet_id = { email: dataLogin.email }
  const get_id = await UserModel.get_id(dataGet_id)
  if (!get_id)
    createError({
      statusCode: 500,
      statusMessage: 'Something wrong with our system. Please try again later',
      data: 'Something wrong with our system. Please try again later',
    })

  return jwt.sign(get_id.toString(), 'BNET.id2023')
})
