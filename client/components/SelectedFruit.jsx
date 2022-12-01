import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { updateFruit, deleteFruit } from '../apis/fruits'
import { clearLoading } from '../slices/loading'

function SelectedFruit({ selected, clearSelected, setError, setFruits }) {
  const { getAccessTokenSilently } = useAuth0()
  const [editing, setEditing] = useState(selected)

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditing({
      ...editing,
      [name]: value,
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    getAccessTokenSilently()
      .then((token) => updateFruit(editing, token))
      .then((remoteFruits) => setFruits(remoteFruits))
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
  }

  const handleDelete = (e) => {
    e.preventDefault()
    getAccessTokenSilently()
      .then((token) => deleteFruit(editing.id, token))

      .then(setFruits)
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
      .finally(() => {
        dispatch(clearLoading())
      })
  }

  useEffect(() => {
    setEditing(selected)
  }, [selected])

  const { name: editingName, averageGramsEach: editingGrams } = editing
  const { name: currentName, username: user } = selected

  return (
    <>
      <main className="shadow-lg rounded-lg p-4">
        <h2 className="text-2xl my-4">Selected: {currentName}</h2>
        <p>Originally added by {user}</p>
        <form
          onSubmit={handleUpdate}
          className="flex flex-col justify-start gap-1"
        >
          <label className="grid grid-cols-2 gap-2">
            Name:
            <input
              type="text"
              name="name"
              aria-label="selected-name"
              data-testid="selected-name"
              value={editingName || ''}
              onChange={handleEditChange}
              className="mx-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </label>
          <label className="grid grid-cols-2 gap-2">
            Average Grams Each:
            <input
              type="text"
              name="averageGramsEach"
              aria-label="selected-grams"
              data-testid="selected-grams"
              value={editingGrams || ''}
              onChange={handleEditChange}
              className="mx-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </label>

          <section className="my-2 grid gap-2">
            <button
              type="submit"
              data-testid="update-button"
              className="rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4 w-fit"
            >
              Update
            </button>
            <button
              type="button"
              data-testid="delete-button"
              onClick={handleDelete}
              className="rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4 w-fit"
            >
              Delete
            </button>
            <button
              type="button"
              data-testid="clear-button"
              onClick={clearSelected}
              className="rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4 w-fit"
            >
              Clear selection
            </button>
          </section>
        </form>
      </main>
    </>
  )
}

export default SelectedFruit
