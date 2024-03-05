import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/Authprovider";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  console.log(session,"SESSION FROM LAYOUT");
  return (
    <html lang="en">
      <AuthProvider>

      <body className={inter.className}>
        <Header session = {session} />
        <div>{children}</div>
        
        
        </body>
      </AuthProvider>
    </html>
  );
}
