import Link from '@/components/link'

import styles from './navigation.module.css'

const Previous = ({ previous, next }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.previous}>
        {previous && (
          <Link href="/[slug]" gray as={`/${previous.slug}`}>
            <div className={styles.title}>← {previous.title}</div>
          </Link>
        )}
      </div>

      <div className={styles.next}>
        {next && (
          <Link href="/[slug]" gray as={`/${next.slug}`}>
            <div className={styles.title}>{next.title} →</div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Previous
