---
title: How Gram works
description: Step-by-step: How Gram transforms your APIs into LLM tools, from OpenAPI parsing to prompt-engineered tool definitions.
---

## Step 1: Upload an OpenAPI document

When you upload an [OpenAPI document](/concepts/openapi), Gram parses it and generates [tool definitions](/concepts/tool-definitions) from your API endpoints. You can upload multiple OpenAPI documents covering different services across your organization, providing a variety of tools for you to work with.

## Step 2: Create toolsets

Your API may have dozens or even hundreds of endpoints, each mapped to a tool definition. Exposing all of them to an LLM can lead to _tool confusion_. Gram lets you [curate tools into collections](/blog/tool-curation) (called [toolsets](/concepts/toolsets)) that support specific tasks or workflows.

## Step 3: Configure an environment

To use an API, you typically need authentication and authorization credentials, and the API's server URL. In Gram, you'll include this information in an _environment_ before you can start interacting with tools. When you upload an OpenAPI document, Gram creates a default environment for you that you can modify.

## Step 4: Test toolsets 

Use the Gram Playground to test your toolsets with popular language models. You can chat with an LLM to evaluate its performance on a given task using a toolset.

## Step 5: Integrate a toolset

You can integrate your toolset with LLMs and agentic frameworks using a hosted MCP server or SDKs.

### Expose a toolset as a hosted MCP server

Gram exposes each toolset as a hosted MCP server. The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) has become the go-to standard for packaging tools and making them available to various language models and LLM clients. The Gram dashboard guides you on how to add your toolset as an MCP server to your favorite LLM client, or you can follow [this walkthrough](/guides/creating-your-first-hosted-mcp-server) for step-by-step instructions.

### Integrate a toolset with agentic frameworks and SDKs

Gram provides everything you need to integrate your toolset with popular agentic frameworks such as LangChain, and SDKs like OpenAI Agents SDK and Vercel AI SDK. The Gram [Python](https://github.com/speakeasy-api/gram-python) and [TypeScript](https://github.com/speakeasy-api/gram-typescript) SDKs help you integrate with these frameworks in your Python or TypeScript codebase.

## Step 6: Improve tool performance

If you find that some of your tools created from API endpoints are not being used by LLMs or are getting confused with other tools, Gram allows you to modify their descriptions and names to improve performance. Prompt-engineer [tool variations](/concepts/tool-variations) and curate [task-focused toolsets](/concepts/toolsets) to make agents more effective.
