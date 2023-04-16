import { Typography } from '@mui/material'
import { MockUser } from '@/lib/db'
import { useRouter } from 'next/router'
import createUser from '@/lib/createUser'
import UserForm from '../userForm/user-form'

const RegisterForm = (): JSX.Element => {
  const router = useRouter()
  const loginPage = '/auth'
  const submitHandler = async (values: Partial<MockUser>): Promise<void> => {
    try {
      await createUser(values)
      router.push(loginPage)
    } catch (error) {
      alert(error)
    }
  }
  return (
    <section>
      <Typography variant="h1">Register</Typography>
      <UserForm onSubmit={submitHandler} submitLabel="Register" confirmPassword />
    </section>
  )
}

export default RegisterForm
