---
title: OAuth for MCP
description: Placing OAuth in front of a Gram MCP Server
sidebar:
  order: 5
---

If your API supports OAuth (and more specifically the `authorization_code` flow) placing an OAuth provider in front of your MCP Server is a preferred way to do authorization according to the MCP spec.

The Gram product exposes a few different options for OAuth that you can integrate into your Gram MCP Servers.

## OAuth Support

As a starter, Gram always allows you to pass an access_token directly via headers to an MCP server. Similarly, if your API uses `client_credentials`, Gram allows you to pass a client_id and client_secret into your MCP server while the server will perform the proper token exchange.

### Registering an OAuth server for your server

Gram fully supports registering an OAuth server in front of MCP servers for your users to interact with. Something that is important to keep in mind is that the MCP specification has very specific requirements for how a company's OAuth API needs to work. The main requirement is that **MCP clients require OAuth2.1 and Dynamic Client Registration**.

For detailed requirements, see the [MCP Authorization Server Location specification](https://modelcontextprotocol.io/specification/draft/basic/authorization#authorization-server-location).

While this is still fairly unadopted, companies have started to publish fully public servers and make modifications to their API to support the Dynamic Client Registration MCP requirement. Examples include [Stripe](https://docs.stripe.com/mcp), [Asana](https://developers.asana.com/docs/integrating-with-asanas-mcp-server), and a few more.

If your OAuth API supports the MCP OAuth requirements, this is without a doubt the best option for your server! You can place OAuth in front of any Gram MCP Server with just a few clicks!


### OAuth Frontdoor (Coming Soon)

For companies whose OAuth systems do not yet support the MCP requirements, we are actively working on an **OAuth proxy** option. This proxy will perform an MCP compliant exchange with an MCP Client on your API's behalf:

- Expose the MCP client requirements of OAuth 2.1/Dynamic Client Registration
- The server will integrate with your actual OAuth API behind the scenes, based on a `client_id` and `client_secret` pairing you store.

Functionally, this is very similar to solutions others might be familiar with, such as the [Cloudflare OAuth proxy](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/#workers-oauth-provider-an-oauth-2-1-provider-library-for-cloudflare-workers).

One caveat of a proxy like this is that each MCP server acts as a single client_id since the company's provider OAuth APIs would not support Dynamic Clients. This solution works well for many use cases, though it may not be suitable for every scenario depending on your server's specific goals.

:::tip[NOTE]
Placing OAuth in front of a server is a Pro and Enterprise feature. Reach out to us and we'd love to chat about what OAuth options might work best for your company.
:::


