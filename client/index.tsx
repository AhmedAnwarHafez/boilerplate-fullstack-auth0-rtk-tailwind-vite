import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './components/App'
import { Provider } from 'react-redux'

import store from './slices'
import { StrictMode } from 'react'

const container = document.getElementById('app')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-l15ujwk4.au.auth0.com"
      clientId="W1zHcnGihSz4yraMmDFQ8NNrOQsOjFEW"
      redirectUri={window.location.origin}
      audience="https://fruits/api"
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Auth0Provider>
  </StrictMode>
)
