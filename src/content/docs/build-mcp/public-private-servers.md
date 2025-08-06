---
title: Public vs Private MCP Servers
description: Understanding Public and Private MCP Servers.
sidebar:
  order: 5
---


# Public vs. Private MCP Servers

![Screenshot of Server Visibility Toggle](/img/guides/public-private-server.png)

## Public Servers

Making a server public means it is now visible to MCP Clients without the use of a Gram API Key.
This does not mean a user would be able to access your underlying APIs unauthentication, they of course would still need to provide the proper API credentials to the server.

Public Servers are good for use cases where you may want to provide a single server to your customers or even if you want internal employees to be able to access a server with API credentials and not need their own Gram API Key.

Making a server public is also a requirement for:
- Hosted MCP Documentation Pages
- MCP Managed OAuth

## Private Servers

Private servers are a great option if you do not want your server to be visible to a client without a valid Gram API Key.

This is a good option if you only want to share a server selectively to internal users or if you are still in development on your server.


# Pass-through Authentication vs. Managed Authentication

![Screenshot of MCP Authentication Toggle](/img/guides/passthrough-managed-auth.png)

## Pass-through Authentication

In pass-through authentication a user directly passes their credentials and environment variables to the MCP Server. This is a requirement for a publicly used server, but is also an option available to private servers.

```
{
  "mcpServers": {
    "GramDocsanalytics": {
      "command": "npx",
      "args": [
          "mcp-remote",
          "https://chat.speakeasy.com/mcp/docs-analytics",
           "--header",
          "MCP-SPEAKEASY-ADMIN-SERVER-URL:${VALUE}",
          "--header",
          "MCP-SPEAKEASY-ADMIN-API-KEY:${VALUE}",
          "--header",
          "MCP-INKEEP-API-INTEGRATION-KEY:${VALUE}"
        ]
    }
  }
}
```

## Managed Authentication

Managed authentication allows you to use stored Gram environments with your MCP server. To do this, you must be authenticated with a Gram API Key. You are also able to use a combination of pass-through variables and stored Gram environments if you choose to do so.

```
{
  "mcpServers": {
    "GramDocsanalytics": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://chat.speakeasy.com/mcp/docs-analytics",
        "--header",
        "Gram-Environment:docs-env",
        "--header",
        "Authorization:${GRAM_KEY}"
      ],
      "env": {
        "GRAM_KEY": "Bearer <your-gram-key>"
      }
    }
  }
}
```


