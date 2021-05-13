/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"
import { Auth0Provider} from "@auth0/auth0-react"

export const wrapRootElement = ({element}) => {
    return (
        <Auth0Provider
            domain={process.env.GATSBY_AUTH_DOMAIN}
            clientId={process.env.GATSBY_AUTH_CLIENT_ID}
            redirectUri={process.env.GATSBY_AUTH_REDIRECT}
        >
            {element}
        </Auth0Provider>
    )
}
