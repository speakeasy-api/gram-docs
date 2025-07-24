---
title: Adding OAuth to an MCP Server
description: Configure authentication for MCP servers using different OAuth methods
sidebar:
  order: 5
---

Starting March 2025, the MCP specification requires OAuth-based authentication, but most existing OAuth implementations don't meet MCP's specific requirements. The specification calls for OAuth 2.1 with Dynamic Client Registration (DCR), which most major OAuth providers—including Google, GitHub, and Microsoft Azure AD—don't support DCR. This mismatch between MCP's vision and existing OAuth infrastructure creates a common implementation barrier for enterprise adoption.

Gram bridges this gap by supporting multiple authentication approaches, from simple token-based methods to complex OAuth proxy solutions. How you set up authentication depends on the OAuth capabilities of the underlying API and the specific requirements of the implementation. Understanding these different approaches and their trade-offs is essential for selecting the right authentication strategy.

## Authorization Code Flow

Authorization code flow enables user-interactive OAuth with proper consent screens. However, it requires OAuth providers to support specific MCP requirements.

### With a DCR-Compliant Provider

Most OAuth providers (Google, GitHub, Microsoft Azure AD) do not support DCR, creating implementation challenges. Only a few OAuth providers currently support DCR:

- [Auth0](https://auth0.com/docs/get-started/applications/dynamic-client-registration)

If using a DCR-compliant provider, set up is straightforward:

1. Configure OAuth server to support DCR
2. Host `/https://{yourDomain}/oidc/register` endpoint
3. Register MCP server domain in Gram
4. Enable OAuth authentication for toolset

### Without a DCR-Compliant Provider

For OAuth providers without DCR support, Gram offers an OAuth proxy that translates between MCP requirements and standard OAuth implementations.

### How OAuth Proxies Work

1. **Proxy Registration**: Proxy exposes DCR-compliant endpoints to MCP clients
2. **Token Translation**: Converts between proxy tokens and real provider tokens
3. **Flow Management**: Handles OAuth dance between client and actual provider
4. **State Storage**: Maintains token mappings and authorization state

## Client Credentials Flow

Client credentials flow is a simpler authentication method. The server exchanges a client ID and secret for access tokens. Gram handles the token exchange process automatically.

1. Upload the OpenAPI specification to Gram
2. Navigate to **Environments** tab
3. Add environment variables:
   - `CLIENT_ID`: Application client identifier
   - `CLIENT_SECRET`: Application client secret
4. Attach environment to toolset

## Access Token Authentication

Access token authentication allows passing pre-obtained tokens directly to the MCP server. This method works with any OAuth provider, regardless of DCR support.

1. Obtain access token from the OAuth provider
2. Navigate to **Environments** tab
3. Add `ACCESS_TOKEN` environment variable
4. Attach environment to toolset

Popular services like GitHub use this approach. While technically OAuth-based, no OAuth flow occurs through the MCP client.

## Enterprise Features

OAuth authentication for MCP servers is available as a Pro and Enterprise feature. Contact Gram support to discuss implementation options and technical requirements.

:::tip[Implementation Support]
For assistance with OAuth implementation, including proxy setup and DCR compliance, reach out to Gram support for white-glove service.
:::
