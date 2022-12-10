import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { updateFruit, getFruit } from '../apis/fruits'
import { clearLoading, setLoading } from '../slices/loading'
import { setError } from '../slices/error'
import { Fruit } from '../../common/fruit'

function SelectedFruit() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()
  const [fruit, setFruit] = useState<Fruit>({
    id: 0,
    name: '',
    averageGramsEach: 0,
  })

  useEffect(() => {
    dispatch(setLoading())
    id &&
      !isNaN(+id) &&
      getFruit(+id)
        .then((fruit) => {
          console.log(fruit)
          setFruit(() => fruit)
        })
        .catch((err) => dispatch(setError(err.message)))
        .finally(() => dispatch(clearLoading()))
  }, [id, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFruit((state) => ({ ...state, [e.target.name]: e.target.value }))
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // eslint-disable-next-line promise/catch-or-return
    getAccessTokenSilently()
      .then((token) => {
        updateFruit(fruit, token)
      })
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => dispatch(clearLoading()))
  }

  return (
    <>
      <main className="text-5xl">
        <form
          onSubmit={handleUpdate}
          className="flex flex-col justify-start gap-5"
        >
          {/* <label className="grid grid-cols-2 gap-2">
            Originally added by
            <p className="mx-4">{fruit?.auth0Id}</p>
          </label> */}
          <label className="flex flex-col gap-4">
            <p className="text-4xl">Name</p>
            <input
              type="text"
              name="name"
              aria-label="selected-name"
              data-testid="selected-name"
              value={fruit.name}
              onChange={handleChange}
              className="border-slate-299 rounded-md border bg-white text-5xl placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none"
            />
          </label>
          <label className="flex flex-col gap-4">
            <p className="text-4xl">Average Grams Each</p>
            <input
              type="text"
              name="averageGramsEach"
              aria-label="selected-grams"
              data-testid="selected-grams"
              value={fruit.averageGramsEach}
              onChange={handleChange}
              className="rounded-md border border-slate-300 bg-white text-5xl placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none"
            />
          </label>

          <section className="mt-10 flex justify-end gap-2">
            <button
              type="submit"
              data-testid="update-button"
              className="w-fit rounded-2xl bg-blue-800 p-4 px-10 text-white hover:bg-blue-600"
            >
              Update
            </button>
            <button
              type="button"
              data-testid="delete-button"
              // onClick={handleDelete}
              className="w-fit rounded-2xl bg-blue-800 p-4 px-10 text-white hover:bg-blue-600"
            >
              Delete
            </button>
            <Link
              to="/"
              className="w-fit rounded-2xl bg-blue-800 p-4 px-10 text-white hover:bg-blue-600"
            >
              Cancel
            </Link>
          </section>
        </form>
      </main>
    </>
  )
}

export default SelectedFruit
