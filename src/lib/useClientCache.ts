import { useEffect, useState } from 'react'
import { MockUser } from './db'
import useGetUsers from './useGetUsers'
import { chunk, uniqueId } from 'lodash'
import useDelete from './useDeleteUser'
import useUpdateUser from './useUpdateUser'

const simulateMutations = (
  cache: MockUser[],
  deletedIds: number[],
  extraUsers: MockUser[],
  updatedUsers: MockUser[],
  currentPage: number,
  pageSize = 6
): { simulatedData: MockUser[]; totalPages: number } => {
  const allUsers = [...cache, ...extraUsers] //create
  const updatedIds = updatedUsers.map((user) => user.id)
  const updatedCache = allUsers.map((user) =>
    updatedIds.includes(user.id) ? { ...user, ...updatedUsers.find((u) => u.id === user.id) } : user
  ) as MockUser[] //Update
  const filteredCache = updatedCache.filter((user) => !deletedIds.includes(user.id)) // Delete
  const pages = chunk(filteredCache, pageSize) //Paginate
  const totalPages = pages.length
  const simulatedData = pages[currentPage - 1] ?? []
  return { simulatedData, totalPages }
}

export interface ClienCacheApi {
  simulatedData: MockUser[]
  totalPages: number
  isLoading: boolean
  setPage: (v: number) => void
  currentPage: number
  deleteUser: (id?: number) => void
  createUser: (values: Partial<MockUser>) => void
  updateUser: (values: Partial<MockUser>, id?: number) => void
}

const useClientCache = (): ClienCacheApi => {
  const { data: serverResponse, isLoading, setPage, currentPage } = useGetUsers()
  const { deleteUserCall } = useDelete()
  const { updateUserCall } = useUpdateUser()
  const [cacheUserData, setCacheUserData] = useState(serverResponse?.response.data || [])
  const [deletedIds, setDeleteIds] = useState<number[]>([])
  const [updatedUsers, setUpdatedUsers] = useState<MockUser[]>([])
  const [extraUsers, setExtraUsers] = useState<MockUser[]>([])
  const deleteUser = async (id?: number): Promise<void> => {
    if (id === undefined) return
    try {
      // We are doing this call just for simulation purposes because the server does not do any mutation
      if (id < 120) await deleteUserCall(id) //id is official and not client side
      const newDeletedIds = [...deletedIds, id]
      const filteredExtraUsers = extraUsers.filter((user) => !newDeletedIds.includes(user.id))
      setPage(1)
      setExtraUsers(filteredExtraUsers)
      setDeleteIds(newDeletedIds)
    } catch (error) {
      alert(error)
      return
    }
  }
  const updateUser = async (values: Partial<MockUser>, id?: number): Promise<void> => {
    if (id === undefined) return
    // We are doing this call just for simulation purposes because the server does not do any mutation
    if (id < 120) await updateUserCall(id) //id is official and not client side
    const newValues = { ...values, id: id }
    const newUpdatedUsers = [...updatedUsers, newValues] as MockUser[]
    setUpdatedUsers(newUpdatedUsers)
  }
  const createUser = (values: Partial<MockUser>): void => {
    /*
       DISCLAIMER the create user endpoint that is available is actually the register endpoint
       which is already used before login, however the API itself only allows passing email and password
       which is quite different from the PUT endpoint, so we are ignoring the simulated server call for the creation
    */
    const isEmailExists =
      cacheUserData.some((user) => user.email === values.email) ||
      extraUsers.some((user) => user.email === values.email)
    if (isEmailExists) {
      alert('Email in use')
      return
    }
    const newId = parseInt(uniqueId('12'), 10) //client side ids will start from 12
    const newValues = { ...values, id: newId }
    const newExtraUsers = [...extraUsers, newValues] as MockUser[]
    setExtraUsers(newExtraUsers)
  }
  useEffect(() => {
    setCacheUserData(serverResponse?.response.data || [])
  }, [serverResponse])
  const { simulatedData, totalPages } = simulateMutations(
    cacheUserData,
    deletedIds,
    extraUsers,
    updatedUsers,
    currentPage
  )
  return {
    simulatedData,
    totalPages,
    isLoading,
    setPage,
    currentPage,
    deleteUser,
    createUser,
    updateUser
  }
}

export default useClientCache
