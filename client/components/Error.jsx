import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Error() {
  const error = useSelector((state) => state.error)
  const [visible, setVisible] = useState(!error)
  return (
    <section>
      {visible && (
        <p className="text-sm">
          {error}{' '}
          <span className="cursor-pointer" onClick={() => setVisible(false)}>
            X
          </span>
        </p>
      )}
    </section>
  )
}

export default Error
