import fs from 'fs'
import path from 'path'
import deleteUser from '@/lib/deleteUser'
import { NextApiRequest, NextApiResponse } from 'next'
import { MockUser } from '@/lib/db'
const DELETE_API = 'https://reqres.in/api/users/'
const cacheFilePath = path.join(process.cwd(), 'cache', 'users.json')
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'DELETE') {
    res.status(400).json({ message: 'Something went wrong' })
    return
  }
  const { id } = req.query
  // Check if data is available in cache
  try {
    const response = await deleteUser(DELETE_API, Number(id))
    res.status(200).json({ response })
    if (fs.existsSync(cacheFilePath)) {
      const cacheData = fs.readFileSync(cacheFilePath, 'utf8')
      const cacheJson = JSON.parse(cacheData) as MockUser[]
      const index = cacheJson.findIndex((user: MockUser) => user.id === response.id)
      if (index !== -1) {
        cacheJson.splice(index, 1)
        fs.writeFileSync(cacheFilePath, JSON.stringify(cacheJson))
      }
    }
  } catch (error) {
    res.status(422).json({ message: 'Something went wrong' })
  }
}

export default handler
