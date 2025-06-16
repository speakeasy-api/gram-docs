---
title: Tool definitions
description: Mapping your HTTP API to tools that agents can use
sidebar:
  order: 0
---

Each time you upload an [OpenAPI document](/concepts/openapi) to Gram or enable an integration, a deployment is created and enters a processing phase. During this stage, every operation defined in the OpenAPI document is automatically converted into a corresponding tool definition.

![Generating tools](/img/concepts/tool-definitions/tools-generation.png)

Tool definitions contain both the metadata needed to describe a tool to an LLM and the configuration required by Gram to construct the corresponding HTTP request to your API or a third-party integration.

When creating toolsets, you select the relevant tool definitions and can invoke them using the Gram Playground, SDK, or MCP server. Under the hood, Gram uses the information in the tool definition—along with the selected [environment](/concepts/environments) (defaulting to `Default Env`), to build and proxy the HTTP request to the appropriate endpoint.
