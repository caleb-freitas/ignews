import { query as q } from 'faunadb'
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { faunadb } from '../../../services/faunadb'

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  secret: process.env.SIGNING_KEY,
  callbacks: {
    async signIn(user) {
      const { email } = user.user
      try {
        await faunadb.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email as string)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email as string)
              )
            )
          )
        )
      } catch (error) {
        return false
      }
      return true
    }
  }
})
