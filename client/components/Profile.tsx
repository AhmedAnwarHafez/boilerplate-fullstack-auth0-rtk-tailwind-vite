import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getUser, updateUser } from '../apis/users'
import { RootState } from '../slices'
import { setError } from '../slices/error'
import { setLoading, clearLoading } from '../slices/loading'
import Button from './Button'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector<RootState>((state) => state.loading) as boolean
  const { getAccessTokenSilently, user } = useAuth0()
  const [form, setForm] = useState({ color: '' })

  useEffect(() => {
    dispatch(setLoading())
    // eslint-disable-next-line promise/catch-or-return
    getAccessTokenSilently()
      .then(getUser)
      .then((userDetails) => {
        setForm(() => ({
          color: userDetails ? userDetails?.color : '',
        }))
      })
      .catch((err) => dispatch(setError(err)))
      .finally(() => dispatch(clearLoading()))
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(() => ({ ...form, [e.target.name]: e.target.value }))
  }

  function handleSubmit() {
    dispatch(setLoading())
    // eslint-disable-next-line promise/catch-or-return
    getAccessTokenSilently()
      .then((token) => {
        updateUser(form, token)
        navigate('/')
      })
      .catch((err) => dispatch(setError(err)))
      .finally(() => dispatch(clearLoading()))
  }

  return (
    <>
      <form className="flex flex-col justify-start gap-2 text-5xl p-5">
        <label htmlFor="authId" className="grid grid-cols-2 gap-2">
          Auth0Id
          <span className="ml-4 font-bold">{user?.sub}</span>
        </label>
        <label htmlFor="email" className="grid grid-cols-2 gap-2">
          Email
          <span className="ml-4 font-bold">{user?.email}</span>
        </label>
        <label htmlFor="color" className="grid grid-cols-2 gap-2">
          What&apos;s your favourite color
          <input
            type="text"
            name="color"
            value={form.color}
            onChange={handleChange}
            className="mx-4 bg-white border border-slate-300 rounded-md text-5xl shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </label>
        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          className="flex justify-evenly rounded-2xl bg-blue-800 hover:bg-blue-600 text-white p-2 px-4 my-5 w-fit"
        >
          Update
        </Button>
      </form>
    </>
  )
}

export default Profile
