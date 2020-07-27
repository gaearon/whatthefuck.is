import { withRouter } from 'next/router'

import Error from '@/components/error'

// Included just to prevent Automatic Static Optimization
export async function getStaticProps(context) {
  return {
    props: {}
  }
}

// Strips potential `/term?something=else` into `term`
const extractTerm = path =>
  path.substring(
    path.indexOf('/') + 1,
    Math.max(path.indexOf('?'), path.length)
  )

function E({ router }) {
  return <Error missingTerm={extractTerm(router.asPath)} status={404} />
}

export default withRouter(E)
