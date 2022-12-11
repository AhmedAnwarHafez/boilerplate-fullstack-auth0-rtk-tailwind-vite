import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'

import store from '../slices/index'
import Nav from './Nav'
import { useAuth0 } from '@auth0/auth0-react'

jest.mock('@auth0/auth0-react')

const auth0Config = {
  isAuthenticated: true,
  logout: jest.fn(),
  loginWithRedirect: jest.fn(),
  getAccessTokenWithPopup: jest.fn(),
  getAccessTokenSilently: jest.fn(),
  getIdTokenClaims: jest.fn(),
  loginWithPopup: jest.fn(),
  isLoading: false,
  buildAuthorizeUrl: jest.fn(),
  buildLogoutUrl: jest.fn(),
  handleRedirectCallback: jest.fn(),
}
const mockedUseAuth0 = jest.mocked(useAuth0)

describe('Sign in button should be displayed when user is not signed in', () => {
  test('Sign in button should be displayed when user is not signed in', () => {
    mockedUseAuth0.mockReturnValue({ ...auth0Config, isAuthenticated: false })
    render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    )

    const signInButton = screen.getByText('Sign In')
    expect(signInButton).toBeInTheDocument()
  })
})

test('Log off button should be displayed when the user is signed in', async () => {
  mockedUseAuth0.mockReturnValue({ ...auth0Config, isAuthenticated: true })
  render(
    <Provider store={store}>
      <Router>
        <Nav />
      </Router>
    </Provider>
  )

  const logOffButton = await screen.findByText('Log off')
  expect(logOffButton).toBeInTheDocument()
})
