---
title: Creating your first hosted MCP server
description: A step-by-step guide to creating and deploying your first MCP server using Gram
sidebar:
  order: 0
---

This guide walks you through creating your first hosted MCP (Model Context Protocol) server using Gram. By the end of this guide, you'll have a working MCP server that you can connect to MCP clients, such as Claude Desktop and Cursor AI.

By the end of this guide, you'll understand how to:

- Upload an OpenAPI document to Gram.
- Create [Toolsets](/concepts/toolsets) and define environment variables.
- Test and deploy your toolset as a hosted MCP server.

## Prerequisites

- An OpenAPI document (OpenAPI 3.0+ specification) for your API. You can use the OpenAPI document we are using in this guide [here](https://github.com/ritza-co/gram-examples/blob/main/push-advisor-api/openapi.yaml).
- A Gram account (sign up at [Gram](https://app.getgram.ai)).

## Step 1: Upload your OpenAPI document

The OpenAPI document describes your API endpoints, which will be converted into tool definitions that MCP clients can understand and utilize. Start by uploading your OpenAPI document to Gram.

1. Navigate to your Gram dashboard and make sure you are on the **Your APIs** page, under the **CREATE** section of the sidebar.
2. Click the **+ New OpenAPI Source** button.

![Upload OpenAPI document](/img/guides/uploading-openapi-document.png)

3. Select your OpenAPI document file and then a name for the API you are adding.

Gram will parse your OpenAPI document and automatically generate tool definitions for each endpoint.

![Validating tool definitions](/img/guides/01-upload-openapi-document-done.png)

## Step 2: Create a toolset

Gram allows you to organize your MCP server tools into focused, purpose-specific toolsets rather than exposing your entire API surface. Overloading the tool context can overwhelm LLMs, leading to ambiguity, incorrect tool selection, or hallucinations due to context bloat.

To create a toolset:

1. Navigate to your Gram dashboard and make sure you are on the **Toolsets** page, under the **CURATE** section of the sidebar.  
2. Click the **+ New Toolset** button.

![Creating a toolset](/img/guides/02-adding-toolsets.png)

2. Give your toolset a descriptive name.

![Naming a toolset](/img/guides/02-naming-toolset.png)

3. You'll be redirected to the toolset configuration page, where you can group tools that work together to perform a specific task. Click the **+ Add Tool** button to add individual tools, or use the **Enable All** button to include all available tools in the set.

![Selecting tools](/img/guides/02-selecting-tools.png)

:::tip[Best practice]  
Include only the tools necessary for a specific workflow to reduce ambiguity and avoid tool selection errors.  
:::

## Step 3: Test your toolset

Now that you have created a toolset, you can test it in the Gram playground.

1. On the **Toolsets** page, click on the **Playground** button on the newly toolset created.

![Opening the playground](/img/guides/03-clicking-playground.png)

2. You'll be redirected to the Playground page, where you can chat with your agent, deploy an MCP Server, or access agent configuration details.  

![Playground page](/img/guides/03-playground-presentation.png)

You can test the MCP Server first with the chat feature.

![Chatting with the MCP server](/img/guides/03-testing-mcp-server.png)

## Step 4: Deploy as MCP server

Every Gram toolset is automatically exposed as a hosted MCP server. No additional deployment steps required!

1. To access the MCP server configuration, you can click on the **MCP** tab on the Playground page.

![MCP server configuration](/img/guides/04-mcp-server-configuration.png)

2. Then, by clicking the **MCP Config** button, you can copy the MCP server configuration and integrate it into your MCP client, such as Claude Desktop or Cursor AI.  

![MCP server configuration](/img/guides/04-mcp-config-gram.png)

Here is what the configuration looks like for an Authenticated server.

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

The configuration requires a `GRAM_KEY`, which is basically a [Gram API key](/concepts/api-keys).

3. Generate a Gram API key by navigating to the **Settings** page and clicking on the **Create API Key** button.

![Creating an API key](/img/guides/04-adding-api-key.png)

4. Copy the API key and follow your MCP client's instructions to add the configuration to your client.

## Next steps

Your MCP server is now live and ready to use! Consider these next steps:

- **Iterate on tool descriptions**: Refine tool definitions and use variations to help LLMs better understand and invoke them accurately.
- **Create custom toolsets**: Group tools by task to design structured, step-by-step workflows tailored to specific use cases.
- **Integrate with frameworks**: Leverage the Gram SDK for Python or TypeScript to build agentic workflows. On the **Playground** page, you can select a ready-to-use code snippet in [Python](https://pypi.org/project/gram-ai/) or [JavaScript](https://www.npmjs.com/package/@gram-ai/sdk).

## Troubleshooting

**Tools not working as expected?**

- Check your authentication configuration.
- Verify your server URL is accessible.

**LLM choosing wrong tools?**

- Reduce the number of tools in your toolset.
- Use Custom tools to create workflows with precise steps.
- Create focused toolsets for different use cases.
