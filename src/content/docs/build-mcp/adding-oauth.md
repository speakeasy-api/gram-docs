---
title: Adding OAuth to an MCP Server
description: Configure authentication for MCP servers using different OAuth methods
sidebar:
  order: 5
---

:::tip[Implementation Support]
For assistance with OAuth implementation, including proxy setup and DCR compliance, [reach out to Gram support](https://calendly.com/sagar-speakeasy/30min) for white-glove service.
:::


Starting March 2025, the MCP specification recommends OAuth-based authentication, but most existing OAuth implementations don't meet MCP's specific requirements. The specification calls for OAuth 2.1 and support for Dynamic Client Registration (DCR), which most major OAuth providers—including Google, GitHub, and Microsoft Azure AD—don't support. This mismatch between MCP's vision and existing OAuth infrastructure creates a common implementation barrier for enterprise adoption.

The requirements for OAuth 2.1 in MCP can be found [here].(https://modelcontextprotocol.io/specification/draft/basic/authorization#protocol-requirements)

Gram bridges this gap by supporting multiple authentication approaches, from simple token-based methods to complex OAuth proxy solutions. How you set up authentication depends on the OAuth capabilities of the underlying API and the intended purpose of your MCP server. Understanding these different approaches and their trade-offs is essential for selecting the right authentication strategy.


## Authorization Code Flow

Authorization code flow enables user-interactive OAuth with proper consent screens. However, it requires OAuth providers to support specific MCP requirements.

### With DCR

**When should you use it**: If you want to host an MCP server for large-scale use by external developers, you should plan to built out support for DCR.

**Examples**: [Stripe](https://docs.stripe.com/mcp) & [Asana](https://developers.asana.com/docs/integrating-with-asanas-mcp-server) both have added support for DCR to their APIs to accomodate MCP.

#### Implementation in Gram

If the API is already configured to support DCR, enabling the authorization flow on Gram is simple:

1. Create a manifest file for the OAuth server in Gram.
2. Attach the manifest to your toolset.

### Without DCR

**When should you use it**: Most APIs don't support DCR, so Gram offers an OAuth proxy that translates between MCP requirements and standard OAuth implementations. The proxy will use a specific client id and secret to access the API on behalf of the users of the MCP server.

This is useful for MCP servers that won't be exposed to the public, or in cases where a server acting as a single client_id is acceptable.

**Examples**: [Cloudflare OAuth Proxy](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/#workers-oauth-provider-an-oauth-2-1-provider-library-for-cloudflare-workers)

#### How the OAuth proxy works

1. **Proxy Registration**: Proxy exposes DCR-compliant endpoints to MCP clients
2. **Token Translation**: Converts between proxy tokens and a set of real provider tokens
3. **Flow Management**: Handles OAuth dance between client and actual provider
4. **State Storage**: Maintains token mappings and authorization state

#### Implementation in Gram

If you want to implement OAuth proxy in Gram, please [book in time with our team](https://calendly.com/sagar-speakeasy/30min). We'll get you up and running.

## Client Credentials Flow

Client credentials flow is a simpler authentication method. The server exchanges a client ID and secret for access tokens. Gram handles the token exchange process automatically.

#### Implementation in Gram

1. Upload the OpenAPI specification to Gram
2. Navigate to **Environments** tab
3. Add environment variables:
   - `CLIENT_ID`: Application client identifier
   - `CLIENT_SECRET`: Application client secret
4. Attach environment to toolset

## Access Token Authentication

Access token authentication allows passing pre-obtained tokens directly to the MCP server. This method works with any OAuth provider, regardless of DCR support.

#### Implementation in Gram

1. Obtain access token from the OAuth provider
2. Navigate to **Environments** tab
3. Add `ACCESS_TOKEN` environment variable
4. Attach environment to toolset

Popular services like GitHub use this approach. While technically OAuth-based, no OAuth flow occurs through the MCP client.
