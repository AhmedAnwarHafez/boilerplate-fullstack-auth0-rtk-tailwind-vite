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
        <h2 className="my-4 uppercase">Add new fruit</h2>
        <form
          onSubmit={handleAdd}
          className="flex flex-col justify-start gap-1"
        >
          <label className="grid grid-cols-2 gap-2">
            Name:
            <input
              type="text"
              name="name"
              aria-label="adding-name"
              value={fruit.name}
              onChange={handleAddChange}
              className="mx-4 bg-white border border-slate-300 rounded-md text-5xl shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
            />
          </label>
          <label className="grid grid-cols-2 gap-2">
            Average Grams Each:
            <input
              type="text"
              name="averageGramsEach"
              aria-label="adding-grams"
              value={fruit.averageGramsEach}
              onChange={handleAddChange}
              className="mx-4 bg-white border border-slate-300 rounded-md text-5xl shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </label>
          <button
            type="submit"
            className={`rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4 w-fit ${
              !isAuthenticated &&
              'bg-slate-300 text-slate-800 cursor-not-allowed hover:bg-slate-400'
            }`}
            disabled={!isAuthenticated}
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4 w-fit"
          >
            Cancel
          </button>
        </form>
      </main>
    </>
  )
}

export default AddFruit
