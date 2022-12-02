import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './Nav'
import Fruits from './Fruits'
import Profile from './Profile'
import AddFruit from './AddFruit'
import SelectedFruit from './SelectedFruit'

function App() {
  return (
    <>
      <Nav />
      <main className="flex  ">
        <Routes>
          <Route path="/" element={<Fruits />}>
            <Route path="new" element={<AddFruit />} />
            <Route path=":id" element={<SelectedFruit />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
