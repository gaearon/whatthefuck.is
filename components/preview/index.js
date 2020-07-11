import NextLink from 'next/link'
import cn from 'classnames'

import styles from './preview.module.css'

const Preview = ({ post, active }) => {
  const { title, slug, date } = post

  const d = new Date(date)
  const displayDate = `${d.toLocaleString('default', {
    month: 'long'
  })} ${d.getDate()}`

  return (
    <NextLink href="[slug]" as={`/${slug}`}>
      <a className={cn(styles.link, { [styles.active]: active })}>
        <p className="clamp">{title}</p>
        <hr />
        <time>{displayDate}</time>
      </a>
    </NextLink>
  )
}

export default Preview
