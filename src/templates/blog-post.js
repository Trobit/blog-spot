import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"
import { withAuthenticationRequired } from "@auth0/auth0-react"
export function RichTextResponse({ richTextResponse }) {
    return (
      <>{documentToReactComponents(richTextResponse.json, renderOptions(richTextResponse.links))}</>
    );
}
// Render richTextResponse.json to the DOM using
// documentToReactComponents from "@contentful/rich-text-react-renderer"
export const data = graphql`
    query($slug: String!) {
        contentfulBlog(slug: {eq: $slug}) {
            author
            publishedDate(fromNow: true)
            slug
            title
            body {
                raw
                references {
                    ... on ContentfulAsset {
                        contentful_id
                        file {
                            url
                            contentType
                        }
                    }
                }
            }
        }
    }
`

const BlogPost = (props) => {
    const renderOptions = {
        renderNode: {
          [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
            if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
              return (
                <iframe
                  src={node.data.target.fields.embedUrl}
                  height="100%"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  title={node.data.target.fields.title}
                  allowFullScreen={true}
                />
              );
            }
          },
      
          [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
            // render the EMBEDDED_ASSET as you need
            return (
              <img
                src={`https://${node.data.target.fields.file.url}`}
                height={node.data.target.fields.file.details.image.height}
                width={node.data.target.fields.file.details.image.width}
                alt={node.data.target.fields.description}
              />
            );
          },
        },
      };
      
    return (
        <Layout>
            <div>
                <h2>{props.data.contentfulBlog.title}</h2>
                <p style={{fontWeight: 200, fontSize: "0.8rem"}}>Published {props.data.contentfulBlog.publishedDate}</p>
                <p style={{fontWeight: 300, fontSize: "0.9rem"}}>Written By {props.data.contentfulBlog.author}</p>
                {
                    documentToReactComponents(JSON.parse(props.data.contentfulBlog.body.raw,renderOptions)
                )}
                <Link to="/blog">Back to Blog</Link>
            </div>
        </Layout>
    )
}

export default withAuthenticationRequired (BlogPost)