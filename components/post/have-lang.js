import Link from 'next/link'
import { useRouter } from 'next/router'

export default function HaveLang ({slug, ...props}) {
  const router = useRouter()

  return (
    <div className='translations'>
      <p>
        <span className='translated'>Translated by readers into:</span>
        {props.langList.map((langcomponent, index) => (
          <span className='lang' key={langcomponent.lang}>
            {
              langcomponent.posts.length > 0 && (
                router.pathname === `/[slug]/${langcomponent.lang}`
                  ? <span className='name'>{langcomponent.name}</span>
                  : (
                    <>
                      <Link href={`/${slug}/${langcomponent.lang}`}>
                        <a>
                          {langcomponent.name}
                        </a>
                      </Link>
                      {props.langList.length === index + 1 && <span className='dot'>{' • '}</span>}
                    </>
                  )
              )
            }
          </span>
        ))}
      </p>
      {props.lang && (
        <p>
          <span className='lang'>
            <Link href={`/${slug}`}>
              <a>
                Read the original
              </a>
            </Link>
          </span>
        </p>
      )}
      <style jsx>
        {`
          .translations {
            width: 100%;
            display: flex;
            background: var(--lightest-gray);
            padding: 1rem;
            border-radius: var(--inline-radius);
            margin-bottom: 25px;
            flex-direction: column;
          }

          p {
            font-size: 0.875rem;
            margin: 0;
          }

          .translations p:first-of-type {
            margin-bottom: 5px;
          }

          .translated {
            margin-right: 8px;
          }

          .lang {
            color: var(--keyword);
          }

          .lang .name {
            color: var(--fg);
            font-weight: bold;
          }

          .dot {
            margin: 0 5px;
          }

          .lang a {
            text-decoration: underline;
          }

          .lang a.active {
            text-decoration: none;
          }
        `}
      </style>
    </div>
  )
}