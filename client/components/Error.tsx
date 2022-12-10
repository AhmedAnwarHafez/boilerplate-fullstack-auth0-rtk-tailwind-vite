import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../slices/index'
import { clearError } from '../slices/error'

function Error() {
  const dispatch = useDispatch()
  const error = useSelector<RootState>((state) => state.error)

  return (
    <section>
      {!!error && (
        <div className="text-sm">
          <span>{error + ' '}</span>
          <span
            className="cursor-pointer rounded-lg bg-slate-400 px-1 font-mono font-bold"
            onClick={() => dispatch(clearError())}
          >
            X
          </span>
        </div>
      )}
    </section>
  )
}

export default Error
