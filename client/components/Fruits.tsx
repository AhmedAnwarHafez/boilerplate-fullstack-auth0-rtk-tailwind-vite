import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getFruits } from '../apis/fruits'
import { clearLoading, setLoading } from '../slices/loading'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Fruit } from '../../common/fruit'
import { setError } from '../slices/error'

function Fruits() {
  const dispatch = useDispatch()
  const [fruits, setFruits] = useState([])

  useEffect(() => {
    dispatch(setLoading())
    getFruits()
      .then((remoteFruits) => {
        setFruits(remoteFruits)
      })
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => {
        dispatch(clearLoading())
      })
  }, [])

  return (
    <section className="flex gap-4">
      <section className="flex flex-col ml-5 mt-5 border-r-2 border-r-slate-200 pr-10 text-5xl">
        <Link to="/new" className="justify-self-end">
          <div className="rounded-lg p-1 bg-blue-800 text-white hover:bg-blue-500">
            <p>+ New</p>
          </div>
        </Link>
        <ul className="">
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
      <Outlet />
    </section>
  )
}

export default Fruits
