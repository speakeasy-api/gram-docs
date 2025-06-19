---
title: Introducing Gram
description: Gram effortlessly turns OpenAPI documents into LLM-ready tools, generating optimized tool definitions from your APIs for powerful agentic workflows.
sidebar:
  order: 0
---

**[Gram](https://getgram.ai)** is a platform for turning APIs into powerful LLM tools. 

Rather than manually writing tool descriptions or forcing generic API descriptions into an LLM-friendly format, Gram maps your API endpoints to tool definitions, which you use to define toolsets that you can easily refine to ensure LLMs can understand and use your services.

APIs come in all shapes and sizes, but the tools LLMs use share a consistent structure, characterized by:

- **Name:** A short, descriptive name for the tool in snake or kebab case.
- **Description:** A helpful description of the tool. This is an essential feature that's often prompt-engineered to ensure an LLM can understand when and how to correctly call a tool and interpret the output.
- **Input schema:** A JSON Schema that defines the required input for the tool call, ensuring the LLM crafts arguments correctly.

To integrate an API into agentic workflows, you need to map API endpoints to tools. There are generally two ways to do this:

- **Manually writing tool definitions**, whether by following the MCP Specification or using function calls, which becomes tedious as the number of endpoints grows.
- **Converting your API to MCP servers**, either using the API itself (for example, FastAPI with FastMCP) or an OpenAPI document. Since OpenAPI documents describe endpoints by HTTP methods, paths, parameters, security requirements, and response shapes, they often lack LLM-specific descriptions.

This is where **Gram** comes in. Gram helps you effortlessly map your API to tools by condensing OpenAPI documents into [tool definitions](concepts/tool-definitions). It automatically handles the tool input schema and provides sensible defaults for names and descriptions. From there, you can use the Gram platform to:

- Combine tools into task-focused toolsets.
- Test toolsets in the Gram Playground.
- Fine-tune individual tools by prompt-engineering their names and descriptions.
- Deploy toolsets as hosted MCP servers.
- Integrate toolsets into agentic workflows using Gram's [Python](https://pypi.org/project/gram-ai/) or [TypeScript](https://www.npmjs.com/package/@gram-ai/sdk) SDKs.

## Useful links

- [Creating a hosted MCP server](/guides/creating-your-first-hosted-mcp-server)
- [OpenAPI concepts](/concepts/openapi)
- [Tool definitions](/concepts/tool-definitions)
- [Toolsets](/concepts/toolsets)
- [Environment variables](/concepts/environments)
