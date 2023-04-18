import { deleteUser, updateUser } from '@/lib/deletePutUser'
import { NextApiRequest, NextApiResponse } from 'next'
const EXTERNAL_API = 'https://reqres.in/api/users'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  /**
   * These endpoints are only for simulation purposes because the server does nothing
   */
  if (req.method === 'DELETE') {
    const externalToken = req.headers.authorization
    const token = externalToken?.trim().replace(/^Bearer\s+/i, '')
    const { id } = req.query
    try {
      const response = await deleteUser(EXTERNAL_API, Number(id), token as string)
      res.status(200).json({ ...response })
    } catch (error) {
      res.status(422).json({ message: 'Something went wrong' })
    }
    return
  }
  if (req.method === 'PUT') {
    const externalToken = req.headers.authorization
    const token = externalToken?.trim().replace(/^Bearer\s+/i, '')
    const { id } = req.query
    try {
      const response = await updateUser(EXTERNAL_API, Number(id), token as string)
      res.status(200).json({ ...response })
    } catch (error) {
      res.status(422).json({ message: 'Something went wrong' })
    }
    return
  }
}

export default handler
