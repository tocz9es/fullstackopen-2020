import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Overreacted',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/',
    likes: 17
  }

  test('default render blog title and author', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} />
    )

    expect(component.container).toHaveTextContent('Overreacted')
    expect(component.container).toHaveTextContent('Dan Abramov')
  })

  test('default render without url and likes', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} />
    )

    expect(component.container).not.toHaveTextContent('https://overreacted.io/')
    expect(component.container).not.toHaveTextContent('17')
  })

  test('click \'Show\' to display url and likes', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} />
    )

    const showButton = component.getByText('Show')
    fireEvent.click(showButton)

    expect(component.container).toHaveTextContent('https://overreacted.io/')
    expect(component.container).toHaveTextContent('17')
  })

  test('props will create twice then click \'Like\' button 2 times', () => {
    const mockHandler = jest.fn()
    const mockUpdate = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockUpdate} handleRemove={mockHandler} />
    )

    const showButton = component.getByText('Show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})