import { adminurl } from "@/app/page";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
      
        else {
          console.log(user,"user ress");
          // return user
          throw new Error(user.message);
        }

      },
    }),
    GoogleProvider({
      clientId:"216641462687-o228gdks8ucroh05mi1m76nrot0ivm80.apps.googleusercontent.com",
      clientSecret: "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",
      authorization:
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      new URLSearchParams({
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
      })
    })
  ],
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account.provider === "google") {
    //     return profile.email_verified && profile.email.endsWith("@example.com")
    //   }
    //   return true // Do different verification for other providers that don't have `email_verified`
    // },
    async session({ session, token }) {
      if (token && token.sub) {
        console.log(token,"google token");
          const response = await fetch(`${adminurl}/api/getGoogleuserByid`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: token.sub, email: token.email, given_name: token.name, picture: token.picture }),
          });
          const data = await response.json();
          console.log(data,"data in callback");

          const user = { user: { name: data } };
          return user
      }

      return session
  },

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
    signOut:'/'
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };