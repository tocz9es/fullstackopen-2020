import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const compareLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'BLOG_INIT':
    return action.data.sort(compareLikes)
  case 'BLOG_CREATE':
    return [...state, action.data].sort(compareLikes)
  case 'BLOG_REMOVE':
    return [...state.filter(blog => blog.id !== action.data.id)].sort(compareLikes)
  case 'BLOG_LIKE':
    return [...state.filter(blog => blog.id !== action.data.id), action.data].sort(compareLikes)
  case 'BLOG_COMMENT':
    return [...state.filter(blog => blog.id !== action.data.id), action.data].sort(compareLikes)

  default:
    return state.sort(compareLikes)
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOG_INIT',
      data: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create({ ...blogObject, likes: 0 })
      dispatch({
        type: 'BLOG_CREATE',
        data: createdBlog,
      })
      dispatch(
        setNotification(
          'success',
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          5
        )
      )
    } catch (e) {
      dispatch(setNotification('error', 'create blog failed', 5))
    }
  }
}

export const removeBlog = (blogObject) => {
  return async dispatch => {
    try {
      await blogService.remove(blogObject)
      dispatch({
        type: 'BLOG_REMOVE',
        data: {
          id: blogObject.id
        },
      })
      dispatch(setNotification('success', `deleted blog: ${blogObject.title}`, 5))
    } catch (e) {
      dispatch(setNotification('error', 'delete blog failed', 5))
    }
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.update(blogObject)
      dispatch({
        type: 'BLOG_LIKE',
        data: { ...likedBlog },
      })
      dispatch(setNotification('success', `You 👍 blog: ${likedBlog.title}`, 5))
    } catch (e) {
      dispatch(setNotification('error', 'like blog failed', 5))
    }
  }
}

export const commentBlog = ({ blog, comment }) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.comment({ blog, comment })
      dispatch({
        type: 'BLOG_COMMENT',
        data: { ...commentedBlog },
      })
      dispatch(setNotification('success', `You comment blog: ${commentedBlog.title}`, 5))
    } catch (e) {
      console.log(e)
      dispatch(setNotification('error', 'comment blog failed', 5))
    }
  }
}

export default reducer