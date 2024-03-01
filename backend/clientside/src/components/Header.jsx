import React from 'react'
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]";
const Header = async() => {

    const session = await getServerSession(options);
    console.log(session,"sessionsessionsession");
    return (
    <div className='bg-white text-red-500 text-center py-3'>
<h1>HEADER</h1>
{
    session ? <p>THE USER IS LOGGED IN</p> : <p className='bg-red-200'>Please sign in</p>
}

    </div>
  )
}

export default Header