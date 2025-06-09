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

<div class="flex justify-center">
  <video controls>
    <source src="/videos/creating_toolsets.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>


## Toolsets as MCP servers

In addition to building powerful agents with well-scoped toolsets, every toolset is exposed by Gram as an MCP server using the streamable HTTP transpot. On a toolset's page, you'll find instructions on how to connect MCP clients like Claude and Cursor to a toolset's MCP server.

<div class="flex justify-center">
  <video controls>
    <source src="/videos/mcp_servers.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## Custom Domains

MCP servers can be hosted through a custom subdomain - such as `{your_sub_domain}/mcp`.

Contact gram support to get access to a custom subdomain on your account. To complete setup visit the `/settings` page of the gram dashboard. 

At a high level two DNS entries will need to be created:

1. A new CNAME record pointing to `cname.getgram.ai.`
2. A new TXT record `_gram.{your_sub_domain}` with a value of `gram-domain-verify={your_sub_domain},{gram_organization_id}`.
3. Then reach out to gram to complete your domain linking process.


