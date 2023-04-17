import { useState } from 'react'
import { GenericJson, ServerResponse } from './db'
import useSWR, { SWRResponse } from 'swr'
const fetcher = (url: string): Promise<ServerResponse> => fetch(url).then((res) => res.json())
const GET_USERS_API = '/api/getusers'
export interface userResponse extends SWRResponse<ServerResponse, GenericJson, GenericJson> {
  currentPage: number
  currentPageSize: number
  setPage: (v: number) => void
  setPageSize: (v: number) => void
}
const useGetUsers = (url: string = GET_USERS_API, page = 1, perPage = 12): userResponse => {
  /**
   * Disclaimer while the API is capable of handling pagination by itself
   * is not capable of making mutations
   * so we are asking for the whole 12 data points and handling the mutations on the front-end
   */
  const [currentPage, setPage] = useState(page)
  const [currentPageSize, setPageSize] = useState(perPage)
  //BeCareful perPage is different in the backend it is per_page
  const queryString = `page=${1}&perPage=${12}`
  const finalUrl = `${url}?${queryString}`
  const result = useSWR<ServerResponse>(finalUrl, fetcher)
  return { ...result, setPage, setPageSize, currentPage, currentPageSize }
}

export default useGetUsers
