import { useState } from 'react'
import { GenericJson, ServerResponse } from './db'
import useSWR, { SWRResponse } from 'swr'
import { useSession } from 'next-auth/react'

const GET_USERS_API = '/api/users'
export interface userResponse extends SWRResponse<ServerResponse, GenericJson, GenericJson> {
  currentPage: number
  currentPageSize: number
  setPage: (v: number) => void
  setPageSize: (v: number) => void
}
const useGetUsers = (url: string = GET_USERS_API, page = 1, perPage = 12): userResponse => {
  const { data: session } = useSession()
  /**
   * Disclaimer while the API is capable of handling pagination by itself
   * is not capable of making mutations
   * so we are asking for the whole 12 data points and handling the mutations on the front-end
   */
  const [currentPage, setPage] = useState(page)
  const [currentPageSize, setPageSize] = useState(perPage)
  const headers = new Headers()
  // @ts-ignore external token is being piggibacked from the backend
  const token = session?.externalToken
  // @ts-ignore external token is being piggibacked from the backend
  if (token) {
    // @ts-ignore external token is being piggibacked from the backend
    headers.set('Authorization', `Bearer ${token}`)
  }
  const fetcher = (url: string): Promise<ServerResponse> =>
    fetch(url, { headers }).then((res) => res.json())
  const queryString = `page=${1}&per_page=${12}`
  const finalUrl = `${url}?${queryString}`
  const result = useSWR<ServerResponse>(finalUrl, fetcher)
  return { ...result, setPage, setPageSize, currentPage, currentPageSize }
}

export default useGetUsers
