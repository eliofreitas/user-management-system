import getUsers from '@/lib/getUsers'
import { NextApiRequest, NextApiResponse } from 'next'
const EXTERNAL_API = 'https://reqres.in/api/users'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(400).json({ message: 'Something went wrong' })
    return
  }
  const externalToken = req.headers.authorization
  const token = externalToken?.trim().replace(/^Bearer\s+/i, '')
  const { page, per_page } = req.query
  try {
    const response = await getUsers(EXTERNAL_API, Number(page), Number(per_page), token as string)
    res.status(200).json({ response })
  } catch (error) {
    res.status(422).json({ message: 'Something went wrong' })
  }
}

export default handler
