const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

module.exports = (isRss) => {
  let dir
  try {
    dir = (!isRss)
      ? fs.readdirSync('./posts/')
      : fs.readdirSync(path.resolve(__dirname, '../posts/'))
  } catch (err) {
    // No posts.
    return []
  }

  return dir
    .filter(file => path.extname(file) === '.md')
    .map(file => {
      const postContent = fs.readFileSync(`./posts/${file}`, 'utf8')
      const { data, content } = matter(postContent)
      if (data.published === false) {
        return null
      }
      return { ...data, body: content, title: data.title.replace(' ', ' ') }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}