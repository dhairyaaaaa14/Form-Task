import React from 'react'

function ShowButton(props) {
  return (
    <div>
      <button className='btn btn-primary' onClick={props.buttonHandler}>Show Data</button>
      <div className='btn btn-primary'>eheh</div>
    </div>
    
  )
}

export default ShowButton