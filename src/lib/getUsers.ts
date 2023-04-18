import { ServerResponse } from './db'

const getUsers = async (
  url: string,
  page: number,
  perPage: number,
  externalToken?: string
): Promise<ServerResponse> => {
  const headers = new Headers()
  if (externalToken) {
    headers.set('Authorization', `Bearer ${externalToken}`)
  }
  const queryString = `page=${page}&per_page=${perPage}`
  const finalUrl = `${url}?${queryString}`
  const response = await fetch(finalUrl, { headers })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Something went wrong!')
  return data
}

export default getUsers
