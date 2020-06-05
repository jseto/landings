import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SiteFooterQuery } from '../../graphql-types'
import { ShowMenuItems } from './navbar'

import FacebookIcon from "@fortawesome/fontawesome-free/svgs/brands/facebook-square.svg"
import TwitterIcon from "@fortawesome/fontawesome-free/svgs/brands/twitter-square.svg"
import InstagramIcon from "@fortawesome/fontawesome-free/svgs/brands/instagram-square.svg"
import EmailIcon from "@fortawesome/fontawesome-free/svgs/solid/envelope-square.svg"

export const Footer = () => {
  const { site: { siteMetadata: { footer } } } = useStaticQuery(graphql`
    query SiteFooter {
      site {
        siteMetadata {
          footer {
            logo {
              file
              width
              alt
            },
            className
            firstColumnItems {
              content
              href
            }
            secondColumnItems {
              content
              href
            }
            social {
              facebook
              twitter
              instagram
              email
            }
            madeWithLove
          }
        }
      }
    }
  `) as SiteFooterQuery

  return (
    <footer className={`footer ${ footer.className }`}>
      <div className="container">
        <div className="logo">
          { footer.logo.file &&
            <img
              src={ footer.logo.file }
              alt={ footer.logo.alt }
              style={{ width: footer.logo.width }}
            />
          }
        </div>
        <div className="columns" style={{
            marginLeft: 0, marginRight: 0
          }}>
            <div className="column is-4 menu">
              <ul className="menu-list">
                <ShowMenuItems items={ footer.firstColumnItems } asListItem={true}/>
              </ul>
            </div>
            <div className="column is-4 menu">
              <ul className="menu-list">
                <ShowMenuItems items={ footer.secondColumnItems } asListItem={true}/>
              </ul>
            </div>
            <div className="column is-4 social">
              { footer.social.facebook &&
                <a title="Follow us on Facebook" href={ footer.social.facebook } target="_blank">
                  <FacebookIcon/>
                </a>
              }
              { footer.social.twitter &&
                <a title="Follow us on Twitter" href={ footer.social.twitter } target="_blank">
                  <TwitterIcon/>
                </a>
              }
              { footer.social.instagram &&
                <a title="Follow us on Instagram" href={ footer.social.instagram } target="_blank">
                  <InstagramIcon/>
                </a>
              }
              { footer.social.email &&
                <a title="Contact us" href={ footer.social.email }>
                  <EmailIcon/>
                </a>
              }
            </div>
          </div>
        <div className="made-with-love">
            { footer.madeWithLove &&
              <small>
                { footer.madeWithLove }
              </small>
            }
          </div>
      </div>
    </footer>
  )
}
