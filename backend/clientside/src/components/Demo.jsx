import React from 'react'

const Demo = ({data}) => {
   
  return (
    <div>{data?.data[0]?.email}</div>
  )
}

export default Demo