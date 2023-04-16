import { useSession } from 'next-auth/react'

const StartingPageContent = (): JSX.Element => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <section>
      <h1>Welcome on Board!</h1>
      Access token <br />
    </section>
  )
}

export default StartingPageContent
