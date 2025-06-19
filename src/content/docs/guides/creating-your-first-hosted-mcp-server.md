---
title: Creating a hosted MCP server
description: A step-by-step guide to creating and deploying a hosted MCP server using Gram
sidebar:
  order: 0
---

This guide provides instructions for creating a hosted MCP server that you can connect to MCP clients like Claude and Cursor.

The steps covered include:

- Uploading an OpenAPI document to Gram.
- Creating a [toolset](/concepts/toolsets).
- Testing the toolset.
- Deploying the toolset as a hosted MCP server.

## Prerequisites

To follow along, you'll need:

- A [Gram account](https://app.getgram.ai).
- An OpenAPI 3.0+ document for an API. This guide uses [this example OpenAPI document](https://github.com/ritza-co/gram-examples/blob/main/push-advisor-api/openapi.yaml) for a Push Advisor API.

## Step 1: Upload an OpenAPI document

Gram converts OpenAPI endpoints into tool definitions that MCP clients can understand and use.

To upload an OpenAPI document:

- In the Gram dashboard, click **Your APIs** in the sidebar (under **Create**).
- Click **+ New OpenAPI Source**.

![Upload OpenAPI document](/img/guides/uploading-openapi-document.png)

- Select the OpenAPI document to upload and add the API name.

![Validating tool definitions](/img/guides/01-upload-openapi-document-done.png)

Gram will parse the uploaded OpenAPI document and generate [tool definitions](/concepts/tool-definitions) for each endpoint.

:::tip[Best practice]
Write detailed, contextual descriptions in your OpenAPI document to help LLM agents understand and use your tools correctly. Learn more about [optimizing OpenAPI documents with the `x-gram` extension](/concepts/openapi#using-the-x-gram-extension).
:::

## Step 2: Create a toolset

Gram allows you to organize your MCP server tools into focused, purpose-specific toolsets for better performance and accuracy.

To create a toolset:

- In the Gram dashboard, click **Toolsets** in the sidebar (under **Curate**).  
- Click **+ New Toolset**.

![Creating a toolset](/img/guides/02-adding-toolsets.png)

- Give the toolset a descriptive name.

![Naming a toolset](/img/guides/02-naming-toolset.png)

- When you click **Submit**, you'll be redirected to the toolset configuration page. Click **+ Add Tool** to add individual tools, or use the **Enable All** button to include all available tools in the set.

![Selecting tools](/img/guides/02-selecting-tools.png)

:::tip[Best practice]  
Include only the tools necessary for a specific workflow to reduce ambiguity and avoid tool selection errors. Learn more about the [art of tool curation](/blog/tool-curation).
:::

## Step 3: Test the toolset

Now you can test the toolset in the Gram playground.

On the **Toolsets** page, click the **Playground** button on the newly created toolset.

![Opening the playground](/img/guides/03-clicking-playground.png)

In the Playground, you can chat with the agent, deploy an MCP server, or access agent configuration details.  

![Playground page](/img/guides/03-playground-presentation.png)

Here we test the MCP server using the chat feature:

![Chatting with the MCP server](/img/guides/03-testing-mcp-server.png)

## Step 4: Deploy the toolset as an MCP server

Gram automatically exposes each toolset as a hosted MCP server.

To connect the MCP client to the MCP server, you'll need to configure it with a [Gram API key](/concepts/api-keys).

### Generate a Gram API key

- In **Settings**, click **Create API Key**.
- Give the API key a name, and click **Create**.

![Creating an API key](/img/guides/04-adding-api-key.png)

### Get the MCP server configuration

- In the Playground, click the **MCP** tab.

![MCP server configuration](/img/guides/04-mcp-server-configuration.png)

- Click **MCP Config** to view the server configuration.

![MCP server configuration](/img/guides/04-mcp-config-gram.png)

### Configure the MCP client

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

- **Iterate on tool descriptions:** Refine tool definitions and use tool [variations](/concepts/tool-variations) to help LLMs better understand and invoke them accurately.
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
- [Core Gram Concepts](/blog/gram-concepts)
:::
