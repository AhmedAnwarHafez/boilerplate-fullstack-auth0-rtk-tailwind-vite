import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getFruits } from '../apis/fruits'
import { clearLoading, setLoading } from '../slices/loading'
import { Outlet, Link } from 'react-router-dom'
import { Fruit } from '../../common/fruit'
import { setError } from '../slices/error'

function Fruits() {
  const dispatch = useDispatch()
  const [fruits, setFruits] = useState([])

  useEffect(() => {
    dispatch(setLoading())
    // eslint-disable-next-line promise/catch-or-return
    getFruits()
      .then((remoteFruits) => {
        setFruits(remoteFruits)
      })
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => {
        dispatch(clearLoading())
      })
  }, [dispatch])

  return (
    <section className="flex gap-2 w-screen">
      <section className="flex flex-col ml-5 mt-5 border-r-2 border-r-slate-200 p-5 pr-10 text-5xl rounded-lg bg-white">
        <Link to="/new" className="justify-self-end">
          <div className="rounded-lg p-4 bg-blue-800 text-white hover:bg-blue-500">
            <p>+ New</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-3 my-5">
          {fruits.map((fruit: Fruit) => (
            <li key={fruit.id}>
              <Link
                to={`/${fruit.id}`}
                className="text-blue-700 hover:text-blue-500"
              >
                {fruit.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <main className="bg-white rounded-lg p-10 mt-5 grow mx-5 ">
        <Outlet />
      </main>
    </section>
  )
}

export default Fruits
