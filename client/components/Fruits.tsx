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
    console.log('Fruits useEffect')

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
    <section className="flex w-screen gap-2">
      <section className="ml-5 mt-5 flex flex-col rounded-lg border-r-2 border-r-slate-200 bg-white p-5 pr-10 text-5xl">
        <Link to="/new" className="justify-self-end">
          <div className="rounded-lg bg-blue-800 p-4 text-white hover:bg-blue-500">
            <p>+ New</p>
          </div>
        </Link>
        <ul className="my-5 flex flex-col gap-3">
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
      <main className="mx-5 mt-5 grow rounded-lg bg-white p-10 ">
        <Outlet />
      </main>
    </section>
  )
}

export default Fruits
