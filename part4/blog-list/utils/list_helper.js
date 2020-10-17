const { countBy, toPairs, maxBy, groupBy, sumBy } = require('lodash')
const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((i, j) => i + j.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length !== 0
    // ? Math.max.apply(Math, blogs.map(blog => blog.likes))
    ? blogs.reduce((i, j) => (i.likes > j.likes) ? i : j)
    : undefined
}

const mostBlogs = (blogs) => {
  let countByAuthor = countBy(blogs, 'author')
  let maxAuthor = maxBy(toPairs(countByAuthor))[0]

  return {
    author: maxAuthor,
    blogs: countByAuthor[maxAuthor],
  }
}

const mostLikes = (blogs) => {
  let countByAuthor = groupBy(blogs, 'author')
  let likeSums = []

  for (let author in countByAuthor) {
    likeSums.push({
      'author': author,
      'likes': sumBy(countByAuthor[author], 'likes')
    })
  }

  return maxBy(likeSums, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}