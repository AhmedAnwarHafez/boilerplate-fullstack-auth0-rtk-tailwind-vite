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
      <section className="bg-blue-900 text-white flex justify-between items-center">
        <header className="flex items-center">
          {loading ? <Loading /> : <section className="w-[24px] h-[24px]" />}
          <h1 className="font-bold text-2xl">Fruit FTW!</h1>
        </header>
        <nav className="flex justify-end  gap-4 px-4">
          <Link to="/" className="hover:font-semibold">
            Home
          </Link>
          <IfAuthenticated>
            <Link to="/profile" className="hover:font-semibold">
              Profile
            </Link>
            <button onClick={handleLogoff} className="hover:font-semibold">
              Log off
            </button>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <button onClick={handleSignIn} className="hover:font-semibold">
              Sign In
            </button>
            <button onClick={handleRegister} className="hover:font-semibold">
              Register
            </button>
          </IfNotAuthenticated>
        </nav>
      </section>
    </>
  )
}

export default Nav
