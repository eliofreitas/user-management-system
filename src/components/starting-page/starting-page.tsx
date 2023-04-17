import { MockUser } from '@/lib/db'
import getUsers from '@/lib/getUsers'
import useGetUsers from '@/lib/useGetUsers'
import { Button, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import UsersCard from '../users-card/usersCard'
import CUUserDialog from '../CUUserDialog/CUUserDialog'
import { FormType } from '../userForm/user-form'
import { chunk, uniqueId } from 'lodash'

const simulateMutations = (
  cache: MockUser[],
  deletedIds: number[],
  extraUsers: MockUser[],
  updatedUsers: MockUser[],
  currentPage: number,
  pageSize = 6
): { simulatedData: MockUser[]; totalPages: number } => {
  const allUsers = [...cache, ...extraUsers]
  const updatedIds = updatedUsers.map((user) => user.id)
  const updatedCache = allUsers.map((user) =>
    updatedIds.includes(user.id) ? { ...user, ...updatedUsers.find((u) => u.id === user.id) } : user
  ) as MockUser[]
  const filteredCache = updatedCache.filter((user) => !deletedIds.includes(user.id))
  const pages = chunk(filteredCache, pageSize)
  const totalPages = pages.length
  const simulatedData = pages[currentPage - 1] ?? []
  return { simulatedData, totalPages }
}

const StartingPageContent = (): JSX.Element => {
  const { data: serverResponse, isLoading, setPage, currentPage } = useGetUsers()
  const [cacheUserData, setCacheUserData] = useState(serverResponse?.response.data || [])
  const [deletedIds, setDeleteIds] = useState<number[]>([])
  const [currentDialog, setDialog] = useState<'Creation' | 'Update' | 'None'>('None')
  const [updatedUsers, setUpdatedUsers] = useState<MockUser[]>([])
  const [extraUsers, setExtraUsers] = useState<MockUser[]>([])
  const [userIdToUpdate, setUserIdToUpdate] = useState<number | undefined>()
  useEffect(() => {
    setCacheUserData(serverResponse?.response.data || [])
  }, [serverResponse])
  const deleteHandler = (id?: number): void => {
    if (id === undefined) return
    const newDeletedIds = [...deletedIds, id]
    const filteredExtraUsers = extraUsers.filter((user) => !newDeletedIds.includes(user.id))
    setPage(1)
    setExtraUsers(filteredExtraUsers)
    setDeleteIds(newDeletedIds)
  }

  const onSubmitHandler = (actionType: FormType, values: Partial<MockUser>): void => {
    if (actionType === 'Update') {
      const newValues = { ...values, id: userIdToUpdate }
      const newUpdatedUsers = [...updatedUsers, newValues] as MockUser[]
      setUpdatedUsers(newUpdatedUsers)
      setUserIdToUpdate(undefined)
    }
    if (actionType === 'Creation') {
      const isEmailExists =
        cacheUserData.some((user) => user.email === values.email) ||
        extraUsers.some((user) => user.email === values.email)
      if (isEmailExists) {
        alert('Email in use')
        return
      }
      const newId = parseInt(uniqueId('12'), 10)
      const newValues = { ...values, id: newId }
      const newExtraUsers = [...extraUsers, newValues] as MockUser[]
      setExtraUsers(newExtraUsers)
    }
    setDialog('None')
  }
  const { simulatedData, totalPages } = simulateMutations(
    cacheUserData,
    deletedIds,
    extraUsers,
    updatedUsers,
    currentPage
  )
  const noData = !isLoading && simulatedData.length === 0
  const disabledNext = noData || currentPage === totalPages
  const disabledPrevious = noData || currentPage === 1
  const userToUpdate =
    currentDialog === 'Update' ? simulatedData.find((d) => d.id === userIdToUpdate) : undefined
  console.log(userToUpdate)
  return (
    <section>
      <h1>Welcome on Board!</h1>
      Access token <br />
      <Button variant="contained" onClick={(): void => setDialog('Creation')}>
        Create New User
      </Button>
      {isLoading && <Typography> Is Loading</Typography>}
      {noData && <Typography> No data</Typography>}
      {!noData && (
        <UsersCard
          userData={simulatedData}
          onDelete={deleteHandler}
          onUpdate={(v): void => {
            setUserIdToUpdate(v)
            setDialog('Update')
          }}
        />
      )}
      <CUUserDialog
        initialUser={userToUpdate}
        isOpen={currentDialog !== 'None'}
        onSubmit={onSubmitHandler}
        onClose={(): void => setDialog('None')}
      />
      <Button disabled={disabledPrevious} onClick={(): void => setPage(currentPage - 1)}>
        Previous
      </Button>
      <Button disabled={disabledNext} onClick={(): void => setPage(currentPage + 1)}>
        Next
      </Button>
    </section>
  )
}

export default StartingPageContent
