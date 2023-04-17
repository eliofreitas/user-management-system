import { GenericJson } from './db'

const commonCaller = async (
  method: 'DELETE' | 'PUT',
  url: string,
  id: number,
  externalToken?: string
): Promise<GenericJson> => {
  const queryString = `token=${externalToken}`
  const finalUrl = `${url}/${id}?${queryString}`
  console.log(finalUrl)
  const response = await fetch(finalUrl, { method: method })
  if (!response.ok) throw new Error('Something went wrong!')
  return { message: 'Success' }
}

export default commonCaller

export const deleteUser = (url: string, id: number, externalToken?: string): Promise<GenericJson> =>
  commonCaller('DELETE', url, id, externalToken)

export const updateUser = (url: string, id: number, externalToken?: string): Promise<GenericJson> =>
  commonCaller('PUT', url, id, externalToken)
