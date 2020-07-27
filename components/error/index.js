import Head from 'next/head'

import Page from '@/components/page'
import Link from '@/components/link'
import styles from './error.module.css'

const Error = ({ missingTerm, status }) => {
  return (
    <Page title={status || 'Error'} showSlug={false}>
      <Head>
        <title>{[status]}</title>
      </Head>

      {status === 404 ? (
        <>
          <h1>404</h1>
          <p>
            The term <strong>{missingTerm}</strong> doesn’t exist yet. You can{' '}
            <Link
              underline
              href={`https://github.com/gaearon/whatthefuck.is/issues/new?template=what-the-fuck-is-_____-.md&title=WTF is ${missingTerm}?`}
            >
              suggest this term
            </Link>
            .
          </p>

          <Link underline href="/">
            Go Home
          </Link>
        </>
      ) : (
        <section className={styles.section}>
          <span>{status || 'пиздец'}</span>
          <p>For fuck’s sake.</p>
        </section>
      )}
    </Page>
  )
}

export default Error
