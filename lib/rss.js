const fs = require('fs')
const RSS = require('rss')
const path = require('path')
const marked = require('marked')
const getPosts = require('./get-posts')

const renderer = new marked.Renderer()

renderer.link = (href, _, text) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  renderer
})

const renderPost = md => marked(md)

const main = () => {
  const feed = new RSS({
    title: 'whatthefuck.is',
    site_url: 'https://whatthefuck.is',
    feed_url: 'https://whatthefuck.is/feed.xml',
    language: 'en'
  })

  const isRss = true;
  const posts = getPosts(isRss)
  posts.forEach(post => {
    const url = `https://whatthefuck.is/${post.slug}`

    feed.item({
      title: post.title,
      description: renderPost(post.body),
      date: new Date(post.date),
      author: 'Dan Abramov',
      url,
      guid: url
    })
  })

  const rss = feed.xml({ indent: true })
  fs.writeFileSync(path.join(__dirname, '../public/feed.xml'), rss)
}

main()
