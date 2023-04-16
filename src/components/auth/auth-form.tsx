import { Typography } from '@mui/material'
import { MockUser } from '@/lib/db'
import UserForm from '../userForm/user-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const RegisterForm = (): JSX.Element => {
  const router = useRouter()
  const submitHandler = async (values: Partial<MockUser>): Promise<void> => {
    const home = '/'
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password
    })
    console.log(result)
    if (!result?.ok) {
      alert(result?.error)
      return
    } else {
      router.push(home)
    }
  }
  return (
    <section>
      <Typography variant="h1">Login</Typography>
      <UserForm onSubmit={submitHandler} submitLabel="Login" />
    </section>
  )
}

export default RegisterForm
