import React, { useState } from 'react'

import { addFruit } from '../apis/fruits'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { clearLoading, setLoading } from '../slices/loading'
import { useNavigate } from 'react-router-dom'
import { setError } from '../slices/error'

function AddFruit() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()
  const [newFruit, setNewFruit] = useState(false)
  const { name: addingName, averageGramsEach: addingGrams } = newFruit

  const handleAddChange = (e) => {
    const { name, value } = e.target
    setNewFruit({
      ...newFruit,
      [name]: value,
    })
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const fruit = { ...newFruit }
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
      <main className="shadow-lg rounded-lg p-4">
        <h2 className="text-2xl my-4 uppercase">Add new fruit</h2>
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
              value={addingName || ''}
              onChange={handleAddChange}
              className="mx-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
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
              value={addingGrams || ''}
              onChange={handleAddChange}
              className="mx-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4 w-fit"
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
