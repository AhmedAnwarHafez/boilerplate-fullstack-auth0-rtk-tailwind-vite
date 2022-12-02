import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError } from '../slices/error'

function Error() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.error)

  return (
    <section>
      {!!error && (
        <p className="text-sm">
          {error}{' '}
          <span
            className="cursor-pointer font-mono font-bold rounded-lg bg-slate-400 px-1"
            onClick={() => dispatch(clearError())}
          >
            X
          </span>
        </p>
      )}
    </section>
  )
}

export default Error
