import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export function IfAuthenticated({ children }: Props) {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }: Props) {
  const { isAuthenticated } = useAuth0()
  return !isAuthenticated ? <>{children}</> : null
}
