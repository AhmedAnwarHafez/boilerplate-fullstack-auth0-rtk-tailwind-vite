import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Loading from './Loading'
import { RootState } from '../slices'

function Nav() {
  const loading = useSelector<RootState>((state) => state.loading)
  const { logout, loginWithRedirect } = useAuth0()

  function handleLogoff() {
    logout()
  }

  function handleRegister() {
    loginWithRedirect({
      redirectUri: `${window.location.origin}/profile`,
    })
  }

  function handleSignIn() {
    loginWithRedirect()
  }

  return (
    <>
      <section className="flex items-center justify-between bg-blue-900 p-4 text-5xl text-white">
        <header className="flex items-center">
          {loading ? <Loading /> : <section className="h-[24px] w-[24px]" />}
          <h1 className="font-bold">Fruit FTW!</h1>
        </header>
        <nav className="flex justify-end gap-4 px-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <IfAuthenticated>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button onClick={handleLogoff} className="hover:underline">
              Log off
            </button>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <button onClick={handleSignIn} className="hover:underline">
              Sign In
            </button>
            <button onClick={handleRegister} className="hover:underline">
              Register
            </button>
          </IfNotAuthenticated>
        </nav>
      </section>
    </>
  )
}

export default Nav
