import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material'
import React from 'react'
import { TransitionProps } from '@mui/material/transitions'
import { MockUser } from '@/lib/db'
import UserForm, { FormType } from '../userForm/user-form'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    //@ts-ignore this is following the slide definition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface UserFormProps {
  onSubmit?: (actionType: FormType, values: Partial<MockUser>) => void
  isOpen: boolean
  onClose: () => void
  initialUser?: MockUser
  confirmPassword?: boolean
  className?: string
}

const CUUserDialog = (props: UserFormProps): JSX.Element => {
  const { className, isOpen, onClose, onSubmit, initialUser } = props
  const dialogType = initialUser ? 'Update' : 'Creation'
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={'xs'}
        className={className}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogType}</DialogTitle>
        <DialogContent>
          <UserForm
            type={dialogType}
            initialUser={initialUser}
            submitLabel={initialUser ? 'Update' : 'Create'}
            onSubmit={(v): void => onSubmit?.(dialogType, v)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CUUserDialog
