import { ServerResponse } from './db'

const getUsers = async (url: string, id: number): Promise<ServerResponse> => {
  const finalUrl = `${url}${id}`
  const response = await fetch(finalUrl, { method: 'DELETE' })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Something went wrong!')
  return data
}

export default getUsers
