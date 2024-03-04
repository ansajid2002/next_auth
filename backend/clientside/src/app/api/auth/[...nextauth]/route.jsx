import { adminurl } from "@/app/page";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: 'SahiHaiDost',
  NEXTAUTH_SECRET: "SahiHaiDost",

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // console.log(credentials,"credentialscredentials");
        // console.log(req.body,"data coming from login form");///both are same

        const { email, password } = req.body;

        const requestBody = {
          email,
          password,
        };

        const resp = await fetch(`${adminurl}/api/auth/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const user = await resp.json()
        // console.log("CALLED THE POST API-=-=-=-=-=-=",user);
        if (user.status === 200) {
          console.log(user, "userz");
          return  { ...user.data,name:user}

        }
        return null

      },
    }),
  ],
  callbacks: {
    // jwt: async ({ token, user }) => {
    //   // console.log(user,"from JWTJWTJWTJWTJWTJWTJWTJWTJWTJWTJ");
    //   if (user && user.status === 200) {
    //     token.email = user.data.email;
    //     token.username = user.data.email;
    //     // token.user_type = user.data.auth.userType;
    //     token.accessToken = user.data.token;
    //   }

    //   return token;
    // },
    // session: ({ session, token }) => {
    //   // console.log(token,session,"token-token");
    //   if (token) {
    //     session.user.email = token.email;
    //     session.user.username = token.username;
    //     session.user.accessToken = token.iat;
    //   }
    //   return session;
    // },
  },
  pages: {
    signIn: '/', // Redirect to home page after successful login
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };