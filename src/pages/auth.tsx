import AuthForm from '../components/auth/auth-form'
import { getSession } from 'next-auth/react'
import { GenericJson } from '@/lib/db'
import { NextPageContext } from 'next'

function AuthPage(): JSX.Element {
  return <AuthForm />
}

export async function getServerSideProps(context: NextPageContext): Promise<GenericJson> {
  const session = await getSession({ req: context.req })
  if (session) {
    return {
      redirect: { destination: '/', permanent: false }
    }
  }
  return {
    props: { session }
  }
}

export default AuthPage
