---
title: How does it work?
description: A step-by-step guide to how Gram works.
---

## Step 1: Load your API

Start by uploading your OpenAPI documents into Gram. It will parse these and
generate a list of tool definitions it found. You can load multiple documents representing different services in your organization. It all becomes a sea of tools for you to work with.

## Step 2: Create toolsets

Your API may have tens or hundreds of endpoints that get mapped to tool definitions. Exposing all of these to an LLM is a bad idea in most cases because it can lead to _tool confusion_. Instead, you want to arrange tools into sets (we call them _toolsets_) that relate to specific tasks and workflows.

## Step 3: Fill out auth and server details

APIs often require authentication/authorization details as well information on
where they are hosted (the server URL). In Gram, these concepts are combined into _environments_. Before you can start interacting with tools you want to fill out credentials and server URLs. We create a "default" environment for you that you can start filling out after uploading your OpenAPI document.

## Step 4: Test your toolsets out

Use the playground on the Gram dashboard to test your toolsets out. You'll have access to popular language models. With your chosen toolset, chat with the LLM and evaluate how well it can use the tools you just created for a given task.

## Step 5: Integrate!

### Hosted MCP server

Every Gram toolset you create is exposed as a hosted MCP server. [Model Context Protocol (MCP)][mcp] has become a de-facto standard for packaging tools
and making them available to various language models and LLM clients. On the Gram dashboard, navigate to a toolset and you'll find a section guiding you on how to add the MCP server to your favorite LLM client.

[mcp]: https://modelcontextprotocol.io

### Agentic frameworks and SDKs

You've got everything in place to start integrating with popular agentic frameworks such as Langchain, OpenAI Agents SDK and Vercel AI SDK. We've built a Gram [Python SDK][gram-py] and [TypeScript SDK][gram-ts] that help you integrate with all of these frameworks in your Python or TypeScript codebase.

[gram-py]: https://github.com/speakeasy-api/gram-python
[gram-ts]: https://github.com/speakeasy-api/gram-typescript

## Step 6: Iterate

It's likely you'll find that some of your API-endpoints-turned-tools are not being used by LLMs or getting confused with other tools. In Gram, you can modify tool descriptions and names beyond what was chosen from your OpenAPI document. We call these modifications _tool variations_. Taking the time to prompt-engineer your tools with variations along with effectively cherry-picking them into task-focused toolsets can result in very effective agents down the line.
