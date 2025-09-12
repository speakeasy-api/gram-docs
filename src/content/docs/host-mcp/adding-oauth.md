---
title: Add OAuth to an MCP Server
description: Configure authentication for MCP servers using different OAuth methods
sidebar:
  order: 3
---

Starting March 2025, the MCP specification recommends OAuth-based authentication for MCP Servers. If your API already supports OAuth, placing an OAuth provider in front of your MCP Server is a great option.

:::note[OAuth is not always required]
User-facing OAuth exchange is not actually a true requirement for every MCP server. Passing in access tokens directly as headers to servers is still totally valid and may be the best approach for many use cases.
:::

The Gram product exposes a variety of different options for OAuth that you can integrate into your Gram MCP Servers.
Your OpenAPI spec must include OAuth as a security option for your endpoints.

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

## OAuth Integration Options

Gram provides multiple ways to integrate OAuth with your MCP servers. The right approach depends on your specific requirements:

| Approach | Best For | Requirements | Complexity |
|----------|----------|--------------|------------|
| **Access Tokens** | Production APIs with existing customers | None | Low |
| **Client Credentials** | API-to-API authentication | OAuth 2.0 | Low |
| **External OAuth Server** | Companies with DCR support | OAuth 2.1 + DCR | Medium |
| **OAuth Proxy** | POCs and companies without DCR | Standard OAuth 2.0 | Medium |

## Access Token Based Authentication

Gram always allows passing pre-obtained OAuth access tokens directly to an MCP server. This will be available to a developer for any OAuth flow:
- authorizationCode
- clientCredentials
- implicit

This is often the simplest approach for production deployments where your customers already have API access and tokens.

## Client Credentials Flow

If your API uses the `clientCredentials` flow, Gram allows you to pass a client_id and client_secret into your MCP server. The server will do the token exchange using those provided environment values. The tool call flow will automatically cache tokens received from a token exchange based on the expiration of that token. We natively support both `client_secret_post` and `client_secret_basic` flows.

## Authorization Code

:::tip[NOTE]
Placing Managed OAuth in front of a server is a Pro and Enterprise feature.

An MCP Server must be marked `public` to attach Managed OAuth in front of it.

Please [book in time with our team](https://calendly.com/sagar-speakeasy/30min) for white-glove service with proxy setup or DCR compliance. We'll get you up and running.
:::


When the MCP spec refers to placing a user-facing OAuth flow in front of a server, it is typically referring to the `authorizationCode` flow.

Gram fully supports registering an OAuth server in front of MCP servers for your users to interact with. Something that is important to keep in mind is that the MCP specification has very specific requirements for how a company's OAuth API needs to work. The main requirement is that **MCP clients require OAuth2.1 and Dynamic Client Registration**.

:::tip[Why DCR is required for MCP]
The MCP specification currently does not define a standard way for an MCP client to provide an OAuth `client_id`/`client_secret` from the user. This is why Dynamic Client Registration (DCR) is required for MCP - it allows MCP clients to automatically register themselves and obtain the necessary credentials without manual configuration.
:::

The requirements for MCP OAuth can be found [here](https://modelcontextprotocol.io/specification/draft/basic/authorization#overview). Dynamic Client Registration (DCR) is typically the feature that most companies do not currently support.

### Registering your own OAuth Server

While this is still fairly unadopted, companies like [Stripe](https://docs.stripe.com/mcp), [Asana](https://developers.asana.com/docs/integrating-with-asanas-mcp-server) & more have started to support DCR in their OAuth flows to accommodate MCP. If you want to host an MCP server for large-scale use by external developers, you should plan to build out support for DCR in your API.

If your underlying API supports the necessary OAuth requirements, you can easily place any OAuth server in front of any Gram MCP Server with just a few clicks!

Only one OAuth flow can be placed in front of an MCP server, so it is very important that your MCP server only includes a single downstream API provider that takes in OAuth.

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

Note: An MCP Client such as Claude will use the same client_id in perpetuity unless you explicitly provide a `client_secret_expires_at` value in your `/register` response. When implementing DCR, it is extremely important that you persist the client_ids you issue. MCP clients follow the OAuth specification precisely when it comes to retaining client_ids from DCR and they will not forget them when you uninstall a server!


### OAuth Proxy

For companies whose OAuth systems do not yet support the MCP requirements, Gram offers an OAuth proxy that translates between MCP requirements and standard OAuth implementations. This proxy will perform an MCP-compliant exchange with an MCP Client on your API's behalf:

- Expose the MCP client requirements of OAuth 2.1/Dynamic Client Registration
- The server will integrate with your actual OAuth API behind the scenes, based on a single `client_id` and `client_secret` pairing you provide in your server configuration.

Functionally, this is very similar to solutions others might be familiar with, such as the [Cloudflare OAuth proxy](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/#workers-oauth-provider-an-oauth-2-1-provider-library-for-cloudflare-workers).

:::warning[OAuth Proxy Limitations]
The OAuth proxy works as a workaround to implementing full MCP OAuth requirements, but has important caveats:

- Behind the scenes, Gram communicates with your OAuth APIs using a **single set of stored client credentials**
- If you're building a public server for your entire customer base, this may or may not be acceptable depending on your security and isolation requirements
- All users will effectively share the same underlying OAuth client, though they'll have separate access tokens

Our recommendation for public MCP servers is typically implementing DCR or having customers pass in access tokens directly.
:::

This solution works well for many use cases, though it may not be suitable for every scenario depending on your server's specific goals. This is useful for MCP servers that don't require dynamic public clients, or in cases where acting as a single underlying OAuth provider is a reasonable tradeoff.

You will store the following in Gram to enable our OAuth proxy to interact with your underlying OAuth provider:
- Authorization Endpoint
- Token Endpoint
- Client ID & Client Secret
- List of Scopes (optional)
- Token endpoint auth methods supported (optional)
- You may need to whitelist oauth proxy redirect uris in your OAuth provider (https://{mcp_server_domain}.com/oauth/{mcp_slug}/callback)
