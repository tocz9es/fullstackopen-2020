import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const blog = {
    title: 'Overreacted',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/'
  }

  test('using create blog and all props works', () => {
    const mockHandler = jest.fn()

    const component = render(
      <BlogForm createBlog={mockHandler} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: blog.title } })
    fireEvent.change(author, { target: { value: blog.author } })
    fireEvent.change(url, { target: { value: blog.url } })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Overreacted')
    expect(mockHandler.mock.calls[0][0].author).toBe('Dan Abramov')
    expect(mockHandler.mock.calls[0][0].url).toBe('https://overreacted.io/')
  })
})