import { GenericJson } from './db'
import { useSession } from 'next-auth/react'
import { updateUser } from './deletePutUser'

const PUT_USER_API = '/api/users'
export type deleteResponse = { updateUserCall: (id: number) => Promise<GenericJson> }

// To use the deleteUser function in a component with useSWR, you can pass it as the second parameter

const usePutUser = (): deleteResponse => {
  const { data: session } = useSession()
  const updateUserCall = async (id: number): Promise<GenericJson> => {
    // @ts-ignore external token is being piggibacked from the backend
    const response = await updateUser(PUT_USER_API, id, session?.externalToken as string)
    if (response.message !== 'Success') {
      const error = new Error('An error occurred while deleting the user.')
      throw error
    }
    return response
  }

  return { updateUserCall }
}

export default usePutUser
