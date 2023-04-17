import { ServerResponse } from './db'

const getUsers = async (url: string, page: number, perPage: number): Promise<ServerResponse> => {
  const queryString = `page=${page}&per_page=${perPage}`
  const finalUrl = `${url}?${queryString}`
  console.log(finalUrl)
  const response = await fetch(finalUrl)
  const data = await response.json()
  console.log(data)
  if (!response.ok) throw new Error(data.message || 'Something went wrong!')
  return data
}

export default getUsers
