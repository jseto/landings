import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/style.scss"
import CookieConsent from 'react-cookie-consent'
import { Navbar } from "./navbar"
import { Footer } from "./footer"

export const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Navbar/>
      
      <main>
        <section>
          <div className="content">
              {children}
          </div>
        </section>
      </main>

      <Footer />
    
      <CookieConsent acceptOnScroll={true}>
        We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.
      </CookieConsent>

    </>
  )
}
