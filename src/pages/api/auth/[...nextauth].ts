import loginUser from '@/lib/loginUser'
import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

/**
 * The auth is implemented by next and it generates its own token for auth
 * however we require the auth service to provide it, couldn't find a way to override
 * the token from next to use the server one so i am just passing it to the frontend when needed as part of the session payload
 * to be included in future request
 */
let externalToken = ''

export default NextAuth({
  /** For this use case we could have use an strategy: database which would interact better with reqres.in, but it requires defining a custom adapter */
  session: { strategy: 'jwt', maxAge: 60 * 60 },
  callbacks: {
    async session(values) {
      /* 
      https://stackoverflow.com/questions/69068495/how-to-get-the-provider-access-token-in-next-auth
      Next auth v4 changed the way it passes data to the client
      in here we would query the database to get the token again
      however https://reqres.in/api-docs/#/ doesn't expose any other way of returning the token so we did this hackish solution 
      to pass it to the front end
      */
      //@ts-ignore attaching external token through hacky methods
      values.session.externalToken = values.token.accessToken
      return values.session
    },
    async jwt(values) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (values.account) {
        values.token.accessToken = externalToken
        //@ts-ignore the result does not return the email
        values.token.id = values?.profile?.id
      }
      return values.token
    }
  },
  providers: [
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        const result = await loginUser({ ...credentials })
        externalToken = result.token
        /* according to https://next-auth.js.org/providers/credentials
         https://stackoverflow.com/questions/69566225/nextauth-credentials-adding-more-to-the-user-scheme
            "Any object returned will be saved in `user` property of the JWT"
            However, in practice this doesn't seem to be working the user property doesnt contain any other value
            apart from email, username and image which correspond to the default user
        */
        const user = {
          //@ts-ignore the result does not return the email
          email: credentials?.email,
          token: result.token
        } as unknown as User
        return {
          ...user
        }
      }
    })
  ]
})
