import React from 'react'
import './header.css'

const PageHeader = () => {
  const handleClick = () => {
    console.log("test")
  }

  return (
    <div className='header'>
      <h1 className='title'>Dotillism.io</h1>
      <button className='save' onClick={handleClick}>Export svg</button>
    </div>
  )
}

export default PageHeader
