import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateTestForm />', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateBlogForm createBlog={createBlog} />
  )

  test('calls the event handler with right props', () => {

    const titleInput = component.container.querySelector("input[name='Title']")
    const authorInput = component.container.querySelector("input[name='Author']")
    const urlInput = component.container.querySelector("input[name='Url']")
    const form = component.container.querySelector(".createBlogForm")
    
    fireEvent.change(titleInput, {
      target: { value: 'Bakin hot'}
    })
    fireEvent.change(authorInput, {
      target: { value: 'Sourrr doughhhh'}
    })
    fireEvent.change(urlInput, {
      target: { value: 'www.bakin.hot'}
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Bakin hot')
    expect(createBlog.mock.calls[0][0].author).toBe('Sourrr doughhhh')
    expect(createBlog.mock.calls[0][0].url).toBe('www.bakin.hot')

    //console.log(prettyDOM(titleInput), prettyDOM(authorInput), prettyDOM(urlInput))
  })
})