import Head from 'next/head'

import Navigation from './navigation'
import Page from '@/components/page'
import styles from './post.module.css'

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const Post = ({
  title,
  slug,
  html,
  hidden,
  og,
  description,
  date,
  previous,
  next
}) => {
  return (
    <Page
      slug={slug}
      title={title}
      description={description}
      image={
        og && og === true
          ? `https://res.cloudinary.com/dsdlhtnpw/image/upload/${slug}.png`
          : og
      }
    >
      <Head>
        {hidden && <meta name="robots" content="noindex" />}
        {date && <meta name="date" content={date} />}
      </Head>

      <article
        dangerouslySetInnerHTML={{
          __html: `${html}`
        }}
      />

      <Navigation previous={previous} next={next} />
    </Page>
  )
}

export default Post
