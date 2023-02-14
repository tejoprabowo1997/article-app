import UserModel from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
  interface IDataIsEmailRegistered {
    email: string
  }
  interface IDataIsUsernameRegistered {
    username: string
  }
  interface IDataCreateUser {
    name: string
    username: string
    email: string
    password: string
  }

  const dataCreateUser: IDataCreateUser = await readBody(event)
  const dataIsEmailRegistered: IDataIsEmailRegistered = {
    email: dataCreateUser.email,
  }
  const dataIsUsernameRegistered: IDataIsUsernameRegistered = {
    username: dataCreateUser.username,
  }

  const isEmailRegistered = await UserModel.isEmailRegistered(
    dataIsEmailRegistered,
  )
  if (isEmailRegistered)
    return createError({
      statusCode: 400,
      statusMessage: 'Email already taken. Please use another email',
    })

  const isUsernameRegistered = await UserModel.isUsernameRegistered(
    dataIsUsernameRegistered,
  )
  if (isUsernameRegistered)
    return createError({
      statusCode: 400,
      statusMessage: 'Username already taken, Please use another username',
    })

  const createUser = await UserModel.createUser(dataCreateUser)
  if (!createUser)
    return createError({
      statusCode: 500,
      statusMessage: 'Something wrong please try again later',
    })

  return createUser
})
