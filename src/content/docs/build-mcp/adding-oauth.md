---
title: Adding OAuth to an MCP Server
description: Configure authentication for MCP servers using different OAuth methods
sidebar:
  order: 6
---

If your API already supports OAuth, placing an OAuth provider in front of your MCP Server is a preferred way to do authorization according to the MCP spec.

The Gram product exposes a variety of different options for OAuth that you can integrate into your Gram MCP Servers.
Your OpenAPI spec must include OAuth as a securityScheme option for your endpoints.

```
security:
  - oauth2Example: [pets:read]


components:
  securitySchemes:
    oauth2Example:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: /oauth/authorize
          tokenUrl: /oauth/token
          scopes:
            pets:read: Read pet information
            pets:write: Modify pet information
```

## Access Token Authentication

Access token authentication allows passing pre-obtained OAuth access tokens directly to the MCP server. This will be available to a developer for any OAuth flow:
- authorizationCode
- clientCredentials
- implicit

## Client Credentials Flow

If your API uses `clientCredentials`, Gram allows you to pass a client_id and client_secret into your MCP server. The server will do the token exchange using those provided environment values. The tool call flow will automatically cache tokens received from a client_credentials exchange based on the expiration of that token. We automatically support both `client_secret_post` and `client_secret_basic` flows.

## Authorization Code

:::tip[NOTE]
Placing Managed OAuth in front of a server is a Pro and Enterprise feature.

Please [book in time with our team](https://calendly.com/sagar-speakeasy/30min) for white-glove service with proxy setup or DCR compliance. We'll get you up and running.
:::


When the MCP spec refers to placing a user-facing OAuth flow in front of a server, it is typically referring to the `authorizationCode` flow.

Gram fully supports registering an OAuth server in front of MCP servers for your users to interact with. Something that is important to keep in mind is that the MCP specification has very specific requirements for how a company's OAuth API needs to work. The main requirement is that **MCP clients require OAuth2.1 and Dynamic Client Registration**.

The requirements for MCP OAuth can be found [here](https://modelcontextprotocol.io/specification/draft/basic/authorization#protocol-requirements). Dynamic Client Registration (DCR) is typically the feature that most companies do not currently support.

### Registering your own OAuth Server

While this is still fairly unadopted, companies like [Stripe](https://docs.stripe.com/mcp), [Asana](https://developers.asana.com/docs/integrating-with-asanas-mcp-server) & more have started to support DCR in their OAuth flows to accommodate MCP. If you want to host an MCP server for large-scale use by external developers, you should plan to build out support for DCR.

If your OAuth API supports the MCP OAuth requirements, you can easily place any OAuth server in front of any Gram MCP Server with just a few clicks!

The artifact you are able to produce should look something like this:

```
{
  "issuer": "https://marketplace.stripe.com",
  "authorization_endpoint": "https://marketplace.stripe.com/oauth/v2/authorize",
  "token_endpoint": "https://marketplace.stripe.com/oauth/v2/token",
  "registration_endpoint": "https://marketplace.stripe.com/oauth/v2/register/tailorapp%2AAZfBZ6Q69QAAADJI%23EhcKFWFjY3RfMVJlaTA0QUo4QktoWGxzQw",
  "response_types_supported": [
    "code"
  ],
  "grant_types_supported": [
    "authorization_code",
    "refresh_token"
  ],
  "code_challenge_methods_supported": [
    "S256"
  ],
  "token_endpoint_auth_methods_supported": [
    "none"
  ]
}
```


### OAuth Proxy

For companies whose OAuth systems do not yet support the MCP requirements, we are actively working on an **OAuth proxy** option. This proxy will perform an MCP-compliant exchange with an MCP Client on your API's behalf:

- Expose the MCP client requirements of OAuth 2.1/Dynamic Client Registration
- The server will integrate with your actual OAuth API behind the scenes, based on a single `client_id` and `client_secret` pairing you provide in your server configuration.

Functionally, this is very similar to solutions others might be familiar with, such as the [Cloudflare OAuth proxy](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/#workers-oauth-provider-an-oauth-2-1-provider-library-for-cloudflare-workers).

So Gram offers an OAuth proxy that translates between MCP requirements and standard OAuth implementations. The proxy will use a specific client ID and secret to interface with the underlying OAuth provider on behalf of the users of the MCP server.

This solution works well for many use cases, though it may not be suitable for every scenario depending on your server's specific goals. This is useful for MCP servers that don't require dynamic public clients, or in cases where acting as a single underlying OAuth provider is a reasonable tradeoff.

You will store the following in Gram to enable our OAuth proxy to interact with your underlying OAuth provider:
- Authorization Endpoint
- Token Endpoint
- Client ID & Client Secret
- List of Scopes (optional)
- `token_endpoint_auth_methods_supported` - client_secret_post or client_secret_basic (optional)