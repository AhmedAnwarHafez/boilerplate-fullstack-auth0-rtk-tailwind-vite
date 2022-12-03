import React from 'react'
import Loading from './Loading'

type Props = {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
  className: string
}

function Button({ onClick, isLoading, children, className }: Props) {
  return (
    <button onClick={onClick} disabled={isLoading} className={className}>
      {isLoading && <Loading />}
      {children}
    </button>
  )
}

export default Button
