import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const isAuthenticated = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
}

type Props = {
  children: React.ReactNode
}

export function IfAuthenticated({ children }: Props) {
  return isAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }: Props) {
  return !isAuthenticated() ? <>{children}</> : null
}
