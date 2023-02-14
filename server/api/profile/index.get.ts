import jwt from 'jsonwebtoken'
import UserModel from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
  const { token }: any = event.node.req.headers
  const checkToken: any = jwt.verify(token, 'BNET.id2023')
  const profile = await UserModel.getProfile(checkToken)
  if (!profile)
    return createError({
      statusCode: 500,
      statusMessage: 'Error',
      data: 'Error',
    })

  return profile
})
