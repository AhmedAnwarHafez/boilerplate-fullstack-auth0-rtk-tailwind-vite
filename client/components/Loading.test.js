import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Loading from './Loading'

describe('Loading', () => {
  it('renders without crashing', () => {
    render(<Loading />)
    const loading = screen.getByRole('figure')
    expect(loading).toBeInTheDocument()
  })
})
