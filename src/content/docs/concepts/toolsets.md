---
title: Toolsets
description: Organize your agentic tools into cohesive sets to solve specific problems
---

Toolsets solve the problem of dumping too many tools into the context window of an LLM. At a certain point, this can exhaust the context window preventing an agent from working or cause an LLM to make incorrect choices about which tools to call.

:::tip[Good to know]
Certain language models even place a hard cap on the total number of tools that can be passed to them in a chat completion call.
:::

## The right tools for the job

It's a good idea to think of the task you want an agent to solve using your API and integrations you enabled and then creating a toolset with just the tools that will help it accomplish that task. Ensuring that a toolset has a cohesive set of tools means an agent will have a much higher chance of successfully working with your API.

## Experimenting with toolsets

Toolsets can also be used to experiment and find the right combination of tools to solve agentic tasks. You can create multiple toolsets and split test your agents to find the right combination of tools or compose multiple agents that each use distinct toolsets.

## Toolsets as MCP servers

In addition to building powerful agents with well-scoped toolsets, every toolset is exposed by Gram as an MCP server using the streamable HTTP transpot. On a toolset's page, you'll find instructions on how to connect MCP clients like Claude and Cursor to a toolset's MCP server.
