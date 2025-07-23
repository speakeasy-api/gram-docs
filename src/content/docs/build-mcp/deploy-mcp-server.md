---
title: Deploying an MCP server
description: Deploying a hosted MCP server using Gram
sidebar:
  order: 5
---

Gram automatically exposes each toolset as a hosted MCP server.

To connect an MCP client to the MCP server, you'll need to configure it with a [Gram API key](/concepts/api-keys).

### Generate a Gram API key

- In **Settings**, click **Create API Key**.
- Give the API key a name, and click **Create**.

![Creating an API key](/img/guides/04-adding-api-key.png)

### Get the MCP server configuration

- In the Playground, click the **MCP** tab.

![MCP server configuration](/img/guides/04-mcp-server-configuration.png)

- Click **MCP Config** to view the server configuration.

![MCP server configuration](/img/guides/04-mcp-config-gram.png)

### Configure an MCP client

- Copy the MCP server configuration from Gram. Here's an example of what it looks like:

```json
{
    "mcpServers": {
      "GramShoudipush": {
        "command": "npx",
        "args": [
          "mcp-remote",
          "https://app.getgram.ai/mcp/default/shoud-i-push/default",
          "--header",
          "Authorization: ${GRAM_KEY}"
        ],
        "env": {
          "GRAM_KEY": "Bearer <your-key-here>"
        }
      }
    }
}
```

- Replace `<your-key-here>` with your Gram API key.
- Add this configuration to the MCP client's configuration file.

## Next steps

Your MCP server is now live. Here are some next steps to consider:

- **Iterate on tool descriptions:** Refine tool definitions and use [tool variations](/concepts/tool-variations) to help LLMs better understand and invoke them accurately.
- **Create custom toolsets:** Group tools by task to design structured, step-by-step workflows tailored to specific use cases.
- **Integrate with frameworks:** Use the Gram Python or TypeScript SDK to build agentic workflows. On the **Playground** page, you can select a ready-to-use code snippet in [Python](https://pypi.org/project/gram-ai/) or [JavaScript](https://www.npmjs.com/package/@gram-ai/sdk).

## Troubleshooting

Common MCP server issues and fixes:

### Tools not working?

- Check your authentication configuration.
- Verify your server URL is accessible.

### Wrong tools being selected?

- Reduce the number of tools in your toolset.
- Use custom tools to create workflows with precise steps.
- Create focused toolsets for different use cases.

:::tip[Related guides]
- [Core Gram concepts](/blog/gram-concepts)
:::
