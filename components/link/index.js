import NextLink from 'next/link'
import cn from 'classnames'

import styles from './link.module.css'

const canPrefetch = href => {
  if (!href || !href.startsWith('/')) {
    return false
  }

  return true
}

const Link = ({
  external,
  href,
  as,
  passHref,
  children,
  className,

  // Styling
  underline,
  gray,
  ...props
}) => {
  const c = cn(className, styles.reset, {
    [styles.gray]: gray,
    [styles.underline]: underline
  })

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={c}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <NextLink
        href={href}
        as={as}
        prefetch={canPrefetch(href) ? undefined : false}
        passHref={passHref}
      >
        {passHref ? (
          children
        ) : (
          <a className={c} {...props}>
            {children}
          </a>
        )}
      </NextLink>
    </>
  )
}

export default Link
