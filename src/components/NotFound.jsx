import React from 'react'
import {Link} from 'react-router-dom'

// qq How to handle errors with react?
function NotFound() {
  return (
    <div>
        <div>NotFound</div>
        <p>Sorry</p>
        <Link to='/react-deployment/'>Back to home...</Link>
    </div>
  )
}

export default NotFound