import React from 'react'
import './Error.css'

const Error = ({error}) => {
    console.log(error)
  return (
    <div>
        <h1 className='error'>{error.status}! {error.body}</h1>
      
    </div>
  )
}

export default Error
