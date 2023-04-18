import { GenericJson } from './db'

const commonCaller = async (
  method: 'DELETE' | 'PUT',
  url: string,
  id: number,
  externalToken?: string
): Promise<GenericJson> => {
  const headers = new Headers()
  if (externalToken) {
    headers.set('Authorization', `Bearer ${externalToken}`)
  }
  const finalUrl = `${url}/${id}`
  const response = await fetch(finalUrl, { method: method, headers: headers })
  if (!response.ok) throw new Error('Something went wrong!')
  return { message: 'Success' }
}

export default commonCaller

export const deleteUser = (url: string, id: number, externalToken?: string): Promise<GenericJson> =>
  commonCaller('DELETE', url, id, externalToken)

export const updateUser = (url: string, id: number, externalToken?: string): Promise<GenericJson> =>
  commonCaller('PUT', url, id, externalToken)
