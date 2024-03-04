import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import Link from 'next/link';
const Header = async() => {
// console.log("INHEADER");
    const session = await getServerSession(authOptions);
   console.log(session,"HEADER me hai ");
    return (
    <div className='bg-white text-red-500 text-center py-3'>
<h1>HEADER</h1>
<Link href="/login">Go To Login</Link>
    </div>
  )
}

export default Header