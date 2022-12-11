import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addFruit } from '../apis/fruits'
import { clearLoading, setLoading } from '../slices/loading'
import { setError } from '../slices/error'
import { Fruit } from '../../common/fruit'

function AddFruit() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [fruit, setFruit] = useState<Fruit>({
    id: 0,
    name: '',
    averageGramsEach: 0,
  })

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFruit({
      ...fruit,
      [name]: value,
    })
  }

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setLoading())
    // eslint-disable-next-line promise/catch-or-return
    getAccessTokenSilently()
      .then((token) => addFruit(fruit, token))
      .then(() => navigate('/'))
      .catch((err) => {
        dispatch(setError(err.message))
      })
      .finally(() => {
        dispatch(clearLoading())
      })
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <>
      <main className="text-5xl">
        <h2 className="my-4 uppercase text-blue-900">Add new fruit</h2>
        <form
          onSubmit={handleAdd}
          className="flex flex-col justify-start gap-1"
        >
          <label className="flex flex-col gap-4">
            <p className="text-4xl">Name</p>
            <input
              type="text"
              name="name"
              aria-label="adding-name"
              value={fruit.name}
              onChange={handleAddChange}
              className="rounded-md border border-slate-300 bg-white text-5xl placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none
      "
            />
          </label>
          <label className="flex flex-col gap-4">
            <p className="text-4xl">Average Grams Each</p>
            <input
              type="text"
              name="averageGramsEach"
              aria-label="adding-grams"
              value={fruit.averageGramsEach}
              onChange={handleAddChange}
              className="rounded-md border border-slate-300 bg-white text-5xl placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none"
            />
          </label>

          <section className="my-10 flex justify-end gap-4">
            <button
              type="submit"
              className={`w-fit rounded-2xl bg-blue-800 p-4 px-10 text-white hover:bg-blue-600 ${
                !isAuthenticated &&
                'cursor-not-allowed bg-slate-300 text-slate-800 hover:bg-slate-400'
              }`}
              disabled={!isAuthenticated}
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-fit rounded-2xl bg-blue-800 p-4 px-10 text-white hover:bg-blue-600"
            >
              Cancel
            </button>
          </section>
        </form>
      </main>
    </>
  )
}

export default AddFruit
