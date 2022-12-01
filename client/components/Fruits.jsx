import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import { getFruits } from '../apis/fruits'
import { clearLoading, setLoading } from '../slices/loading'

function Fruits() {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([])
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState(null)

  function hideError() {
    setError('')
  }

  function openAddForm(e) {
    e.preventDefault()
    setAdding(true)
  }

  function closeAddForm() {
    setAdding(false)
  }

  function setSelectHandler(fruit, e) {
    e.preventDefault()
    setSelected(fruit)
  }

  function clearSelected() {
    setSelected(null)
  }

  useEffect(() => {
    dispatch(setLoading())
    getFruits()
      .then((remoteFruits) => {
        setFruits(remoteFruits)
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        dispatch(clearLoading())
      })
  }, [])

  return (
    <section className="flex flex-col gap-4 items-center justify-center h-screen">
      <div onClick={hideError}>{error && `Error: ${error}`}</div>

      <ul className="p-4 shadow-2xl rounded-xl">
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <button
              href="#"
              onClick={(e) => setSelectHandler(fruit, e)}
              className="text-purple-700 hover:text-purple-500"
            >
              {fruit.name}
            </button>
          </li>
        ))}
      </ul>

      {adding ? (
        <AddFruit
          setError={setError}
          setFruits={setFruits}
          closeAddForm={closeAddForm}
        />
      ) : (
        <button
          href="#"
          onClick={openAddForm}
          className="rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4"
        >
          Add a Fruit
        </button>
      )}

      {selected && (
        <SelectedFruit
          selected={selected}
          clearSelected={clearSelected}
          setError={setError}
          setFruits={setFruits}
        />
      )}
    </section>
  )
}

export default Fruits
