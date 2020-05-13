import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {

  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'title for the test',
      author: 'author macAuthorface',
      url: 'www.url.com',
      likes: 10,
      user: {
        name: 'test user'
      }
    }

    const user = {
      name: 'test user'
    }

    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} addLike={mockHandler} />
    )
  })
  
  test('by default renders blog title and author, but not url and likes', () => {
    const li = component.container.querySelector('.blog')

    const blogDefaults = component.container.querySelector('.blogDefaults')
    expect(blogDefaults).not.toHaveStyle('display: none')
    expect(blogDefaults).toHaveTextContent('title for the test')
    expect(blogDefaults).toHaveTextContent('author macAuthorface')

    const togglable = component.container.querySelector('.togglableContent')

    expect(togglable).toHaveStyle('display: none')
    expect(togglable).toHaveTextContent('www.url.com')
    expect(togglable).toHaveTextContent('likes: 10')
  })

  test('when view button is clicked renders blog url and likes', () => {
    const togglable = component.container.querySelector('.togglableContent')

    expect(togglable).toHaveStyle('display: none')

    const button = component.container.querySelector('.viewButton')
    fireEvent.click(button)

    expect(togglable).not.toHaveStyle('display: none')
    expect(togglable).toHaveTextContent('www.url.com')
    expect(togglable).toHaveTextContent('likes: 10')
  })

  test('like button calls event handler as expected when clicked multiple times', () => {
    const button = component.container.querySelector('.likeButton')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

  test('like button calls event handler once when clicked once', () => {
    const button = component.container.querySelector('.likeButton')

    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
