import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = () => {
    return (
        <Layout>
            <SEO title ="Contact" />
            <h1>Contact</h1>
            <p>This page is the contact page.</p>
            <Link to="/">Go Home</Link>
        </Layout>
    )
}

export default Contact