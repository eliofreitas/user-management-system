import { Typography } from '@mui/material'
import { MockUserCredentials } from '@/lib/db'
import { useRouter } from 'next/router'
import createUser from '@/lib/createUser'
import UserForm from '../userForm/user-form'

const RegisterForm = (): JSX.Element => {
  const router = useRouter()
  const loginPage = '/auth'
  const REGISTER_API = '/api/auth/signup'
  const submitHandler = async (values: Partial<MockUserCredentials>): Promise<void> => {
    try {
      await createUser(values, REGISTER_API)
      router.push(loginPage)
    } catch (error) {
      alert(error)
    }
  }
  return (
    <section>
      <Typography variant="h1">Register</Typography>
      <UserForm onSubmit={submitHandler} submitLabel="Register" type="Register" />
    </section>
  )
}

export default RegisterForm
