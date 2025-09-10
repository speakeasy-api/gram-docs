---
title: Troubleshooting
description: Overcome common issues when hosting and using MCP servers.
sidebar:
  order: 99 # last
---

Due to the emerging nature of the MCP specification and differences in how
various LLM providers and client applications implement it, you may encounter
issues when hosting and using MCP servers with Gram. This troubleshooting guide
addresses common problems and provides solutions to help you resolve them
quickly.

### Helpful Resources

The following external resources provide additional context and information
about MCP, and may be helpful when troubleshooting issues:

- <a href="https://modelcontextprotocol.io/specification/latest"
  target="_blank">MCP Specification.</a> The
  official documentation for the Model Context Protocol (MCP).
- <a href="https://modelcontextprotocol.io/clients" target="_blank">MCP Client
  Feature Support Matrix.</a> A list of well-known LLM clients and their level
  of MCP support. _Many LLM clients to do not support all of Gram MCP Server
  features_.

## Client Transport Closed Errors

### Using `mcp-remote`

Some LLM clients, such as **Claude**, are not yet able to connect to remote MCP
servers natively. To overcome this, the `mcp-remote` CLI tool is used to proxy
requests from the LLM client to hosted MCP servers:

```json ""mcp-remote""
{
  "mcpServers": {
    "GramShouldIPush": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://app.getgram.ai/mcp/default/should-i-push/default"
      ]
    }
  }
}
```

Since version `0.1.26` of the `mcp-remote` package, some users have <a
href="https://github.com/geelen/mcp-remote/issues/156"
target="blank">reported</a> servers failing to start due to `Client
transport closed` errors.

This is typically due to the LLM client attempting to use an older version of
Node to execute `mcp-remote` than what is required. To resolve this, suffix the
`mcp-remote` argument in the MCP configuration with `@0.1.25`:

```json ins="@0.1.25"
{
  "mcpServers": {
    "GramShouldIPush": {
      "command": "npx",
      "args": [
        "mcp-remote@0.1.25",
        "https://app.getgram.ai/mcp/default/should-i-push/default"
      ]
    }
  }
}
```

## Getting Support

If you're encountering a persistent issue that is not covered in this
troubleshooting guide, please reach out to Gram support via the in-app chat, or
join our <a href="https://go.speakeasy.com/slack" target="_blank">Slack
community</a> to get help!
