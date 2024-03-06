import Demo from "@/components/Demo";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const adminurl="http://localhost:3001"


export async function sampledata()  {
  try {
    const response = await fetch(`${adminurl}/api/users`,{ next: { revalidate: 0 } })
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json()
    return data
  
  } catch (error) {
    console.log(error,"error in catch block");
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const responseData = await sampledata()
console.log(session ,"FROM HOME PAGE");
  
  
  return (
    <div>
      <h1 className="text-white">{responseData?.data[0]?.first_name} {responseData?.data[0]?.last_name}</h1>
    <h1 className="text-3xl text-center my-10"> welcome  {session?.user.email}</h1>
    <h1>{session?.user.username} </h1>
    <h1>{session?.user.accessToken}</h1>

    </div>
  );
}
