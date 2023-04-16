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
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session }) {
      // Persist the OAuth access_token to the token right after signin
      //@ts-ignore attaching external token through hacky methods
      session.externalToken = externalToken
      return session
    }
  },
  providers: [
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        const result = await loginUser({ ...credentials })
        externalToken = result.token
        /* according to https://next-auth.js.org/providers/credentials 
            "Any object returned will be saved in `user` property of the JWT"
            However, in practice this doesn't seem to be working the user property doesnt contain any other value
            apart from email, username and image which correspond to the default user
        */
        const user = {
          //@ts-ignore the result does not return the email
          email: credentials?.email,
          token: result.token
        } as unknown as User
        return user
      }
    })
  ]
})
