import { memo, useState } from 'react'
import cn from 'classnames'

import Link from '@/components/link'
import styles from './text.module.css'

const categories = {
  'computer science': '🎓',
  language: '🔭',
  tools: '🍭'
}

const request = ['🙋🏻', '🙋🏼', '🙋🏽', '🙋🏾', '🙋🏿']

const TextEntry = ({ title, type, comment, href, category, as }) => {
  const [diceRoll] = useState(Math.random())
  const emoji = category
    ? categories[category]
    : request[Math.round(diceRoll * (request.length - 1))]
  return (
    <li className={cn(styles.item, !category && styles.request)}>
      <Link
        href={href}
        as={as}
        external={!as}
        title={`${title}`}
        className={styles.link}
      >
        {emoji && (
          <span
            role="img"
            aria-label={category}
            title={category}
            className={styles.category}
          >
            {emoji}
          </span>
        )}
        <span className={cn(styles.title, 'clamp', !category && styles.new)}>
          {title}
        </span>
      </Link>
    </li>
  )
}

export default memo(TextEntry)
