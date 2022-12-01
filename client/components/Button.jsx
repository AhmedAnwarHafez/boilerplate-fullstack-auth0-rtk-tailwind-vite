import React from 'react'
import Loading from './Loading'

function Button({ onClick, isLoading, children, className }) {
  return (
    <button onClick={onClick} disabled={isLoading} className={className}>
      {isLoading && <Loading />}
      {children}
    </button>
  )
}

export default Button
