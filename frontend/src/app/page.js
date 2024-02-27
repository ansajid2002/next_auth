import Image from "next/image";
export const adminurl = "http://192.168.1.100:3001"

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

  const responseData = await sampledata()

  
  
  return (
    <div>
      <h1 className="text-white">{responseData?.data[0]?.first_name} {responseData?.data[0]?.last_name}</h1>
 

      <h1>frontend website</h1>
    </div>
  );
}