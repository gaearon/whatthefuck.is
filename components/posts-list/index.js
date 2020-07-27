import { useState } from 'react'

import TextEntry from '@/components/entry/text'
import styles from './posts-list.module.css'

const Posts = ({ slug, posts, paginate }) => {
  const [showMore, setShowMore] = useState(3)

  return (
    <>
      <ul className={styles.container}>
        {posts.slice(0, paginate ? showMore : undefined).map(post => {
          return (
            <TextEntry
              key={`post-item-${post.slug}`}
              href="/[slug]"
              as={`/${post.slug}`}
              title={`${post.title}`}
              category={post.category}
            />
          )
        })}
        {paginate && showMore < posts.length && (
          <button
            onClick={() => {
              setShowMore(showMore + 3)
            }}
            className={styles.button}
          >
            Show More
          </button>
        )}
        <TextEntry
          key={`new`}
          href="https://github.com/gaearon/whatthefuck.is/issues/"
          title={'request a definition'}
          category={null}
        />
      </ul>
    </>
  )
}

export default Posts
