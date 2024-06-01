import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import envConfig from "@/config";
import authService from "@/services/authService";


export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  callbacks: {
    async session({ session, token, user }) {
      console.log("Session Callback: ",  {
        ...session,
        user: {
          ...session.user,
          ...token.user
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      });
      return {
        ...session,
        user: {
          ...session.user,
          ...token.user
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      }
    },
    async jwt({ token, user, session, trigger }) { // only return user signIn
      console.log("Token: ", token);
      
      // if (token["accessToken"] !== undefined) {
      //   if(Date.now() > JSON.parse(Buffer.from(token["accessToken"].split('.')[1], 'base64').toString())["exp"] * 1000 ){
      //     const refreshUser = await authService.refresh(token["refreshToken"])          
      //     return {
      //       ...token,
      //       user: {
      //         id: refreshUser.user.id,
      //         email: refreshUser.user.email,
      //         role: refreshUser.user.role,
      //         name: refreshUser.user.name,
      //         phone: refreshUser.user.phone
      //       },
      //       accessToken: refreshUser.accessToken,
      //       refreshToken: refreshUser.refreshToken
      //     }
      //   }
      // }
      if (trigger === "update" && session) {
        return {
          ...token,
          ...session,
          user: {
            ...token.user,
            ...session.user
          },
          name: (session.user?.name ? session.user?.name : token.name),
          email: (session.user?.email ? session.user?.email : token.email)
        }
      }
      if (user) {
        return {
          ...token,
          user: {
            id: user.id,
            email: user.email,
            image: user.image,
            name: user.name,
            phone: user.phone,
            role: user.role
          },
          accessToken: user.accessToken,
          refreshToken: user.refreshToken
        }
      }
      return token
    }
  },
  session: { strategy: "jwt" },
  ...authConfig
})