import { getUserByEmail } from "@/data/user";
import UserType from "@/types/user";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers: [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHub({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          credentials: {
            email: {},
            password: {},
          },
          authorize: async (credentials) => {
            let user = null
            // logic to verify if user exists
            const {email, password} = credentials
            
            user = await getUserByEmail(email as string) as UserType

            if (user){
              return {...user, accessToken: "", refreshToken: ""}
            }

            // return user object with the their profile data
            return user
          },
        }),
         
      ],
} satisfies NextAuthConfig
