---
title: Introduction
description: An intro into what Gram is and how it helps build powerful LLM integrations.
sidebar:
  order: 0
---

**[Gram](https://getgram.ai)** is a platform for turning your APIs into powerful LLM tools. APIs come in all shapes and sizes, but tools that LLMs invoke tend to have a fairly consistent shape. Namely, tools have these anatomical features:

- **Name:** A short, descriptive name for the tool that usually follows snake or kebab case.
- **Description:** A helpful description of the tool. This is very important content and is often prompt-engineered to ensure an LLM can understand when and how to correctly call a tool and interpret the output.
- **Input schema:** A JSON Schema that describes what the input to the tool call should look like. This schema guides the LLM to craft tool call arguments correctly

To integrate your API into your agentic workflows, you need to map your API endpoints to tools by either:

- Writing the tools on your own, whether it's by following the MCP specification or using function calls, which can become tedious when you have a large number of endpoints.
- Or, you can convert your API into MCP servers using the API itself (FastAPI with FastMCP for example) or an OpenAPI document. However, OpenAPI describes endpoints using their HTTP method and path as well as path, query and header parameters, security requirements, request body and response shape. The descriptions on each endpoint of your API and any request/response schemas were not crafted with an LLM in mind and are sometimes not included at all.

This is where **Gram** comes in. The goal is to help you map your API to tools as effortlessly as possible. Gram takes OpenAPI documents and condenses the information in them into [tool definitions](concepts/tool-definition). The tool input schema is worked out for you and sensible defaults are chosen for the name and description. Once your API is loaded into Gram, you can tune it by prompt-engineering the tool name and description. 

You can then use the Playground to test your toolsets or deploy the toolsets as a hosted MCP server. Gram also provides a Python and TypeScript SDK to help you integrate your tools into your agentic workflows.

## Useful links

- [Creating your first hosted MCP server](/guides/creating-your-first-hosted-mcp-server)
- [OpenAPI Concepts](/concepts/openapi)
- [Tool Definitions](/concepts/tool-definition)
- [Toolsets](/concepts/toolsets)
- [Environment Variables](/concepts/environments)
