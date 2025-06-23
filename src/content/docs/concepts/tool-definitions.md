---
title: Tool definitions
description: Mapping your HTTP API to tools that agents can use
---

Every time you upload an OpenAPI document for your API to Gram or enable an integration, a deployment is created and then processed. During the processing stage, every operation in the OpenAPI document is turned into a tool definition. Tool definitions contain the necessary information to describe an LLM tool as well as information for Gram to build the corresponding HTTP request to your API or a third-party integration's API.

When creating toolsets, you pick the relevant tool definitions to add and then use the Gram playground, SDK or MCP server to invoke them. Under the hood, Gram will build HTTP requests using the details in the tool definition and selected environment and proxy the call to the relevant HTTP endpoint.
