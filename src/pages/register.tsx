import RegisterForm from '../components/register/register-form'
import { getSession } from 'next-auth/react'
import { GenericJson } from '@/lib/db'
import { NextPageContext } from 'next'

function ProfilePage(): JSX.Element {
  return <RegisterForm />
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

export default ProfilePage
