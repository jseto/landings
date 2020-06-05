import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { SiteQuery } from "../../graphql-types"


interface SEOProps {
	title: string;
  description?: string;
  featuredImage?: string;
	lang?: string;
	meta?: any[];
}


const SEO: React.FC<SEOProps> = ({ description, lang, meta, title, featuredImage }) => {
  const { site } = useStaticQuery(
    graphql`
      query Site {
        site {
          siteMetadata {
            title
            description
            author
            lang
            siteUrl
          }
        }
      }
    `
  ) as SiteQuery

  const metaDescription = description || site.siteMetadata.description
  const siteUrl = site.siteMetadata.siteUrl

  return (
    <Helmet
      htmlAttributes={{
        lang: lang || site.siteMetadata.lang || 'en'
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:images`,
          content: featuredImage && `${ siteUrl || '' }${ featuredImage }`,
        },
        {
          property: `og:image`,
          content: featuredImage && `${ siteUrl || '' }${ featuredImage }`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: featuredImage && `${ siteUrl || '' }${ featuredImage }`,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: ``,
  meta: [],
  description: ``,
}

export default SEO
