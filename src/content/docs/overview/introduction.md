---
title: Introducing Gram
description: Gram effortlessly turns OpenAPI documents into LLM-ready tools, generating optimized tool definitions from your APIs for powerful agentic workflows.
sidebar:
  order: 0
---

**[Gram](https://getgram.ai)** is the fastest way to build a production-ready MCP server.

It is a suite of tools that enable any company to **create, curate and host** an MCP server.

## From REST to MCP: tool creation & curation

A great MCP server is not a 1:1 mapping to your REST API.

Existing REST API are a starting point, but to create a functional MCP server, you need to perform additional steps:

1. **Scope tools** - Presented with the list of all the operations in an API, LLMs struggle to choose the right tool to accomplish a job. This is due to their limited context window. To improve performance, scope the API operations to only include the most relevant ones. Less is more when it comes to MCP.
2. **Add Context** - A user reading an API reference is coming in with some implicit context about the relevant business domain. The same is not true of an LLM examining a list of tools on an MCP server. It is up to the MCP server maintainer to make sure the server provides the LLM with the context it needs. Adding rich tool descriptions, prompts, and examples, greatly improves the performance of the MCP server. Focus on the _when_ and _why_ of the tool.
3. **Define Workflows** - REST APIs are resource-oriented: create a company, update the contact field, etc. MCP servers work best when they're workflow-based: "summarize recent channel activity".

Gram makes tool creation & curation easy. [Tools](concepts/tool-definitions) are bootstrapped by pulling API paths, input schemas, security schemes, and descriptions out of OpenAPI documents. From there, the Gram platform can be used to:

- Remove unnecessary API operations
- Combine tools into workflow-oriented toolsets.
- Fine-tune individual tools with custom prompts
- Test and iterate on tools in the LLM playground

## Going live: deploying MCP servers

Once tools have been refined, the MCP server is ready to deploy. Deployment can be [Gram-hosted](/guides/creating-your-first-hosted-mcp-server) or self-hosted

## Useful links

- [Creating a hosted MCP server](/guides/creating-your-first-hosted-mcp-server)
- [OpenAPI concepts](/concepts/openapi)
- [Tool definitions](/concepts/tool-definitions)
- [Toolsets](/concepts/toolsets)
- [Environment variables](/concepts/environments)
