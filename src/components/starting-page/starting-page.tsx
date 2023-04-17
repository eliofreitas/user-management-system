import { MockUser } from '@/lib/db'
import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import UsersCard from '../users-card/usersCard'
import CUUserDialog from '../CUUserDialog/CUUserDialog'
import { FormType } from '../userForm/user-form'
import useClientCache from '@/lib/useClientCache'

const StartingPageContent = (): JSX.Element => {
  const {
    simulatedData,
    totalPages,
    isLoading,
    setPage,
    currentPage,
    deleteUser,
    createUser,
    updateUser
  } = useClientCache()
  const [currentDialog, setDialog] = useState<'Creation' | 'Update' | 'None'>('None')
  const [userIdToUpdate, setUserIdToUpdate] = useState<number | undefined>()

  const deleteHandler = (id?: number): void => {
    deleteUser(id)
  }

  const onSubmitHandler = (actionType: FormType, values: Partial<MockUser>): void => {
    if (actionType === 'Update') {
      updateUser(values, userIdToUpdate)
      setUserIdToUpdate(undefined)
    }
    if (actionType === 'Creation') {
      createUser(values)
    }
    setDialog('None')
  }
  const noData = !isLoading && simulatedData.length === 0
  const disabledNext = noData || currentPage === totalPages
  const disabledPrevious = noData || currentPage === 1
  const userToUpdate =
    currentDialog === 'Update' ? simulatedData.find((d) => d.id === userIdToUpdate) : undefined
  return (
    <section>
      <h1>Welcome on Board!</h1>
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
