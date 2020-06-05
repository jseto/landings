module.exports = {
  siteMetadata: {
    title: `Site Title`,
    description: `Site description`,
    author: `@my_author`,
    siteUrl: 'https://mysite.netlify.app',
    lang: 'en',
    navbar: {
      logo: {
        file: '/images/gatsby-logo.png',         // should be in static folder
        width: '88px',
        alt: 'Site Logo'
      },
      className: 'is-dark',           //bulma class as example                          cSpell: disable-line
      menuItems: [
        { content: 'Home', href: '/' },
        { content: 'Page 2', href: '/page-2' },
        { content: 'Gatsby', href: 'https://www.gatsbyjs.org/' },
      ]
    },
    footer: {
      logo: {
        file: '/images/gatsby-logo.png',         // should be in static folder
        width: '5em',
        alt: 'Logo'
      },
      className: 'has-background-dark',                  //bulma class as example                          cSpell: disable-line
      firstColumnItems: [
        { content: 'Home', href: '/' },
      ],
      secondColumnItems: [
        { content: 'Privacy Policy', href: '/legal/privacy-policy/' },
        { content: 'Terms and Conditions', href: '/legal/terms-conditions/' },
      ],
      social: {
        facebook: 'fakeSocialURL',
        twitter: 'fakeSocialURL',
        instagram: 'fakeSocialURL',
        email: 'fakeSocialURL'
      },
      madeWithLove: 'Made width ❤️ in Barcelona and Bangkok',
    }
  },
  plugins: [
		`gatsby-plugin-ts`,
    `gatsby-plugin-react-helmet`,
		'gatsby-plugin-sass',
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
    'gatsby-plugin-catch-links',
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
        // defaultLayouts: {
        //   default: require.resolve('./src/pages/page.tsx'),
        // },
        gatsbyRemarkPlugins: [
					'gatsby-remark-numbered-footnotes',
					{
             resolve: `gatsby-remark-autolink-headers`,
             options: {
               icon: false,
							 removeAccents: true
						 }
         	},
	        {
	          resolve: `gatsby-remark-images`,
	          options: {
	            // It's important to specify the maxWidth (in pixels) of
	            // the content container as this plugin uses this as the
	            // base for generating different widths of each image.
	            maxWidth: 2048,
              linkImagesToOriginal: false,
              withWebp: true,
              tracedSVG: true
	          },
	        },
					'gatsby-remark-copy-linked-files',
	      ],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/src/posts`,
			}
		},
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'UA-000000000-1', // Google Analytics / GA
					'AW-000000000', // Google Ads / Adwords / AW                  cSpell: disable-line
					'G-XX0XXX0XX0',
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)                  cSpell: disable-line
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: false,                  // cSpell: disable-line
          // cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          // respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          // /(\/)?hash-\S*/, // you can also pass valid RegExp to exclude internal tags for example
        ],
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mobile App Name`,
        short_name: `App`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
		{
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
				develop: false,
        whitelist: [ 'is-dark', 'has-background-dark' ],
        content: [require('path').join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx,md,mdx}')]
      },
    }, // must be after other CSS plugins
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
