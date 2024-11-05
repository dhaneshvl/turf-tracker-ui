import React from 'react'
import TurfList from './TurfList'

const TurfPage = () => {
  return (
    <>
    <div className='main-container'>
    <h1 className="text-3xl font-bold underline"> Turf Tracker</h1>
        <div className='sub-main'>
            <TurfList/>
        </div>
    </div>
    </>
  )
}

export default TurfPage