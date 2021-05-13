import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { useAuth0 } from "@auth0/auth0-react"

const Blog = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  const data = useStaticQuery(graphql`
    {
      allContentfulBlog(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            author
            publishedDate(fromNow: true)
            slug
            title
          }
        }
      }
    }
  `)
  return (
    <Layout>
      {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button>}
      {isAuthenticated && (
        <div>
          <SEO title="Blog" />
          <h1>Blog</h1>
          <div>
            {data.allContentfulBlog.edges.map((post, i) => {
              return (
                <div key={i}>
                  <h2>{post.node.title}</h2>
                  <p style={{ fontWeight: 200, fontSize: "0.8rem" }}>
                    Published {post.node.publishedDate}
                  </p>
                  <p style={{ fontWeight: 300, fontSize: "0.9rem" }}>
                    Written By {post.node.author}
                  </p>
                  <Link to={`/blog/${post.node.slug}`}>Read More...</Link>
                  <hr style={{ height: "3px" }} />
                </div>
              )
            })}
          </div>
          <button onClick={() => logout()}>Sign-Out</button>
        </div>
      )}
    </Layout>
  )
}

export default Blog
