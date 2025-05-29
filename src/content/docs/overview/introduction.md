---
title: Introduction
description: An intro into what Gram is and how it helps build powerful LLM integrations.
sidebar:
  order: 0
---

Gram is a platform for turning your APIs into powerful LLM tools. APIs come in all shapes and size but tools that AI/LLMs invoke tend to have a fairly consistent shape. Namely, tools has these anatomical features:

- **Name:** A short, descriptive name for the tool that usually follows snake or kebab case.
- **Description:** A helpful description of the tool. This is a very important piece of content and is often prompt-engineered to ensure an LLM can understand when and how to correctly call a tool and how to interpret the output.
- **Input schema:** This is a JSON Schema that describes what the input to the tool call should look like. This schema guides the LLM to craft the tool call arguments correctly.

Contrast this with something like an API specification format such as OpenAPI which describes endpoints using their HTTP method and path as well as path, query and header parameters, security requirements, request body and response shape. Not to mention that the descriptions on each endpoint of your API and any request/response schemas were not crafted with an LLM in mind and sometimes not included at all.

This is where Gram comes in. The goal is to help you map your API to tools as effortlessly as possible. Gram takes OpenAPI documents and condenses the information in them into "tool definitions". The tool input schema is worked out for you and sensible defaults are chosen for the name and description. Once your API is loaded into Gram, you can tune it by prompt-engineering the tool name and description and then chat with it or seamlessly enable a hosted MCP server. Gram takes care of routing tool calls to your API and converting security and tool call arguments into HTTP requests.
