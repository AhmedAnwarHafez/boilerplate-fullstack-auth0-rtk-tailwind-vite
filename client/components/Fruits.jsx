import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getFruits } from '../apis/fruits'
import { clearLoading, setLoading } from '../slices/loading'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Fruits() {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([])

  function hideError() {
    setError('')
  }

  function setSelectHandler(fruit, e) {
    e.preventDefault()
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
    <section className="grid grid-cols-2">
      <section className="flex flex-col ml-5 mt-5 border-r-2 border-r-slate-200 pr-10">
        <div onClick={hideError}>{error && `Error: ${error}`}</div>
        <Link to="/new">
          <div class="w-7 h-7 rounded-full flex justify-center items-center bg-orange-500 text-white">
            <p>+</p>
          </div>
        </Link>
        <ul className="">
          {fruits.map((fruit) => (
            <li key={fruit.id}>
              <Link
                to={`/${fruit.id}`}
                className="text-purple-700 hover:text-purple-500"
              >
                {fruit.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* {selected && (
        <SelectedFruit
          selected={selected}
          clearSelected={clearSelected}
          setError={setError}
          setFruits={setFruits}
        />
      )} */}
      </section>
      <Outlet />
    </section>
  )
}

export default Fruits
