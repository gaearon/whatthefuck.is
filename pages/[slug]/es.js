import Post from '@/components/post'
import getPostsMultilang from '@/lib/get-posts-multilang'
import renderMarkdown from '@/lib/render-markdown'
import { langList } from '@/lib/langList'

export default function DynamicLang (props) {
  return <Post {...props} />
}

export async function getStaticProps({ params: { slug } }) {
  const posts = getPostsMultilang('es')
  const postIndex = posts.findIndex(p => p.slug === slug)
  const post = posts[postIndex]
  const { body, ...rest } = post

  return {
    props: {
      previous: posts[postIndex - 1] || null,
      next: posts[postIndex + 1] || null,
      ...rest,
      html: renderMarkdown(body),
      lang: 'es',
      langList
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: getPostsMultilang('es').map(p => `/${p.slug}/es`),
    fallback: false
  }
}