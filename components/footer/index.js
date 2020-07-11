import Link from '@components/link'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Link href="https://justjavascript.com" external gray>
          justjavascript
        </Link>
        <Link href="https://overreacted.io" external gray>
          overreacted
        </Link>
      </div>
      <Link href="/feed.xml" external gray>
        rss
      </Link>
    </footer>
  )
}

export default Footer
