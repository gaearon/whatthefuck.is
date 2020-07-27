import SEO from '@/components/seo'
import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './page.module.css'

const Page = ({
  header = true,
  footer = true,
  slug,
  title,
  description,
  image,
  showSlug = true,
  children
}) => {
  return (
    <div className={styles.wrapper}>
      <SEO
        title={`${(title
          ? `What the fuck is ${title}?`
          : 'What the fuck is ...?') + ' ・ Dan’s JavaScript Glossary'}`}
        description={description}
        image={image}
      />

      {showSlug && <Header slug={showSlug && slug} title={showSlug && title} />}
      <main className={styles.main}>{children}</main>
      <Footer slug={slug} />
    </div>
  )
}

export default Page
