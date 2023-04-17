import createUser from '@/lib/createUser'
import { NextApiRequest, NextApiResponse } from 'next'
const EXTERNAL_API = 'https://reqres.in/api/register'
const isDataInvalid = (email?: string, password?: string): boolean =>
  !email || !email.includes('@') || !password || password.trim().length < 5

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') return
  const data = req.body
  if (isDataInvalid(data.email, data.password)) {
    res.status(422).json({ message: 'Invalid data your email or password are incorrect' })
    return
  }
  try {
    await createUser(data, EXTERNAL_API)
  } catch (error) {
    res.status(422).json({ message: 'Something went wrong' })
  }

  res.status(201).json({ message: 'User created successfully' })
}

export default handler
