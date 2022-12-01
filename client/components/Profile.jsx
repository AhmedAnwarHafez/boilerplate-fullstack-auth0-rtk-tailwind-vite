import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUser, updateUser } from '../api'
import { setLoading, clearLoading } from '../slices/loading'

function Profile() {
  const dispatch = useDispatch()
  const { getAccessTokenSilently, user } = useAuth0()
  const [form, setForm] = useState({ color: '' })

  useEffect(() => {
    dispatch(setLoading())
    getAccessTokenSilently()
      .then(getUser)
      .then((userDetails) => {
        setForm(() => ({
          color: userDetails ? userDetails?.user_metadata?.color : '',
        }))
        dispatch(clearLoading())
      })
  }, [])

  function handleChange(e) {
    setForm(() => ({ ...form, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    dispatch(setLoading())
    getAccessTokenSilently()
      .then((token) => {
        return updateUser(form, token)
      })
      .then(() => {
        dispatch(clearLoading())
      })
  }

  return (
    <>
      <form className="flex flex-col justify-start gap-1">
        <label htmlFor="authId">
          Auth0Id
          <span className="ml-4 font-bold">{user?.sub}</span>
        </label>
        <label htmlFor="email">
          Email
          <span className="ml-4 font-bold">{user?.email}</span>
        </label>
        <label htmlFor="color">
          What's your favourite color
          <input
            type="text"
            name="color"
            value={form.color}
            onChange={handleChange}
            className="mx-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </label>
        <button
          onClick={handleSubmit}
          className="rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4 w-fit"
        >
          Update
        </button>
      </form>
    </>
  )
}

export default Profile
