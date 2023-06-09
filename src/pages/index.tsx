import { NextPageContext } from 'next'
import StartingPageContent from '../components/starting-page/starting-page'
import { getSession } from 'next-auth/react'
import { GenericJson } from '@/lib/db'

function HomePage(): JSX.Element {
  return <StartingPageContent />
}

export async function getServerSideProps(context: NextPageContext): Promise<GenericJson> {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: { destination: '/register', permanent: false }
    }
  }
  return {
    props: { session }
  }
}

export default HomePage
