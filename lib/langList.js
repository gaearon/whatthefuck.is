import getPostsMultilang from '@/lib/get-posts-multilang'

export const langList = [
  {
    lang: 'es',
    name: 'Spanish',
    posts: getPostsMultilang('es')
  },
  {
    lang: 'pt',
    name: 'Portugués',
    posts: getPostsMultilang('pt')
  }
]