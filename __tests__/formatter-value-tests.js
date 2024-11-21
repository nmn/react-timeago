import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import TimeAgo from '../src'

it('should handle null formatter gracefully', () => {
  render(<TimeAgo date={Date.now() - 1000 * 60} formatter={null} />)
  expect(screen.getByText('1 minute ago')).toBeInTheDocument()
})

it('should handle empty function formatter', () => {
  render(<TimeAgo date={Date.now() - 2000 * 60 * 60} formatter={() => {}} />)
  expect(screen.getByText('2 hours ago')).toBeInTheDocument()
})

it('should handle formatter throwing an error', () => {
  render(
    <TimeAgo
      date={Date.now() - 2000 * 60}
      formatter={() => {
        throw new Error('Faulty formatter')
      }}
    />,
  )
  expect(screen.getByText('2 minutes ago')).toBeInTheDocument()
})
