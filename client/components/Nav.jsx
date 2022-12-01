import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Loading from './Loading'

function Nav() {
  const loading = useSelector((state) => state.loading)
  const { logout, loginWithRedirect, user, isLoading } = useAuth0()

  function handleLogoff(e) {
    e.preventDefault()
    logout()
  }

  function handleRegister(e) {
    e.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/profile`,
    })
  }

  function handleSignIn(e) {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <>
      <section className="bg-slate-600 text-white flex justify-between items-center">
        <header className="flex items-center">
          {loading ? <Loading /> : <section className="w-[24px] h-[24px]" />}
          <h1 className="font-bold text-2xl">Fruit FTW!</h1>
        </header>
        <nav className="flex justify-end  gap-4 px-4">
          <Link to="/">Home</Link>
          <IfAuthenticated>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={handleLogoff}>
              Log off
            </Link>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <Link to="/" onClick={handleSignIn}>
              Sign In
            </Link>
            <Link to="/" onClick={handleRegister}>
              Register
            </Link>
          </IfNotAuthenticated>
        </nav>
      </section>
    </>
  )
}

export default Nav
