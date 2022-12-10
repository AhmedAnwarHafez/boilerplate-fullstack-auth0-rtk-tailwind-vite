import { Routes, Route } from 'react-router-dom'

import Nav from './Nav'
import Fruits from './Fruits'
import Profile from './Profile'
import AddFruit from './AddFruit'
import SelectedFruit from './SelectedFruit'
import Error from './Error'

function App() {
  return (
    <section>
      <Nav />
      <header>
        <Error />
      </header>
      <main className="flex h-screen bg-slate-900">
        <Routes>
          <Route path="/" element={<Fruits />}>
            <Route path="new" element={<AddFruit />} />
            <Route path=":id" element={<SelectedFruit />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </section>
  )
}

export default App
