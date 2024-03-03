import { adminurl } from "@/app/page";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const authOptions = {
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
      async authorize(credentials,req) {
        console.log(credentials,"credentialscredentials");
        console.log(req.body,"ewrwerwr");
      
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
        // console.log("CALLED THE POST API-=-=-=-=-=-=",resp.ok);
        const data = await resp.json()
        return data
        
      },
    }),
  ],
callbacks: {
  jwt: async ({ token, user }) => {
    console.log(user,"from JWTJWTJWTJWTJWTJWTJWTJWTJWTJWTJ");
    if (user && user.status === 200) {
      token.email = user.data.email;
      // token.username = user.data.auth.userName;
      // token.user_type = user.data.auth.userType;
      // token.accessToken = user.data.auth.token;
    }

    return token;
  },
  session: ({ session, token }) => {
    if (token) {
      session.user.email = token.email;
      session.user.username = token.userName;
      session.user.accessToken = token.accessToken;
    }
    return session;
  },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };