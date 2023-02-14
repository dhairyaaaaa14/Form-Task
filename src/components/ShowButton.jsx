import React from 'react'

function ShowButton(props) {
  return (
    <button onClick={props.buttonHandler}>Show Data</button>
  )
}

export default ShowButton