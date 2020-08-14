import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default (lang) => {
  let dir
  try {
    dir = fs.readdirSync(`./posts/${lang}/`)
  } catch (err) {
    // No posts yet
    return []
  }
  const posts = dir
    .filter(file => path.extname(file) === '.md')
    .map(file => {
      const postContent = fs.readFileSync(`./posts/${lang}/${file}`, 'utf8')
      const { data, content } = matter(postContent)

      if (data.published === false) {
        return null
      }

      return { ...data, body: content, title: data.title.replace(' ', ' ') }
    })
    .filter(Boolean)
    .sort((a, b) => a.slug.localeCompare(b.slug))

  return posts
}
