const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {

    const value = createFilePath({ node, getNode })
    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix. you
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: value,
    })

    const featuredImage = findFeaturedImage( node.internal.content )
    createNodeField({
      // Name of the field you are adding
      name: "featuredImage",
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix. you
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: featuredImage,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Desstructure the createPage function from the actions object
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              status
            }
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  
  // Create blog post pages.
  const posts = result.data.allMdx.edges
  
  // you'll call `createPage` for each result
  posts.forEach(({ node }) => {
    const status = node.frontmatter && node.frontmatter.status

    if ( !status || ( status==='public' || status==='publish' || status==='published' ) ) {
      createPage({
        // This is the slug you created before
        // (or `node.frontmatter.slug`)
        path: node.fields.slug,
        // This component will wrap our MDX content
        component: path.resolve(`./src/pages/page.tsx`),
        // You can use the values in this context in
        // our page layout component
        context: { id: node.id },
      })
      console.info( 'Created page: ', node.fields.slug )
    }
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }

    type MdxFrontmatter {
      title: String
      status: String
      className: String
      description: String
      category: String
      order: Int
      date: Date @dateformat
      tags: [String] 
      featuredImage: File
    }
  `)
}

const findFeaturedImage = ( content ) => {
  const imgTagStart = content.indexOf( '![' )
  
  if ( imgTagStart < 0 ) return ''

  const start = content.indexOf( '](', imgTagStart ) + 2
  const end = content.indexOf( ')', start )
  return path.basename( content.slice( start, end ) )
}