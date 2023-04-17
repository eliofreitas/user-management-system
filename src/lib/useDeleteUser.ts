import { GenericJson } from './db'
import { useSession } from 'next-auth/react'
import { deleteUser } from './deletePutUser'

const DELETE_USER_API = '/api/users'
export type deleteResponse = { deleteUserCall: (id: number) => Promise<GenericJson> }

// To use the deleteUser function in a component with useSWR, you can pass it as the second parameter

const useDelete = (): deleteResponse => {
  const { data: session } = useSession()
  const deleteUserCall = async (id: number): Promise<GenericJson> => {
    // @ts-ignore external token is being piggibacked from the backend
    const response = await deleteUser(DELETE_USER_API, id, session?.externalToken as string)
    if (response.message !== 'Success') {
      const error = new Error('An error occurred while deleting the user.')
      throw error
    }
    return response
  }

  return { deleteUserCall }
}

export default useDelete
