---
title: Toolsets
description: Organize your agentic tools into cohesive sets to solve specific problems
sidebar:
  order: 1
---

Making too many tools available to an LLM can exhaust the context window. This can prevent agents from functioning properly or lead the LLM to make incorrect decisions about which tools to invoke.

To address this, Gram lets you organize tool definitions into cohesive, task-oriented groups called **toolsets**. A toolset in Gram is a curated collection of tools that work together toward a specific goal or use case.

- For example, you might create a toolset to identify inactive customers and send them promotional coupons. This would include a tool to retrieve customer data and another to send emails. These tools could originate from different APIs but be grouped into a single toolset for unified use.

- You could also define separate toolsets for your sales, marketing, or support teams. This scoping ensures that each agent or team only has access to the tools relevant to their workflows, reducing confusion and improving LLM performance.

![Toolsets](/img/concepts/toolsets/toolsets-listing.png)

:::tip[Good to know]
Certain language models even place a hard cap on the total number of tools that can be passed to them in a chat completion call.
:::

## The right tools for the job

It's a good idea to start by identifying the specific task you want an LLM client to perform using your API and the integrations you've enabled. From there, create a toolset that includes only the tools necessary to accomplish that task.

A cohesive, task-focused toolset significantly increases the likelihood that an agent will interact with your API correctly and effectively. To ensure your toolsets are high quality:

- Use the [Tool variations](/concepts/tool-variations) feature to refine tool names and descriptions, improving clarity and usability for the LLM.
- Include only the tools essential to completing the intended task—avoid overloading the toolset with unrelated functionality.

## Experimenting with toolsets

Gram provides a Playground where you can test your toolsets interactively. Using the Chat feature, you can issue natural language prompts and observe how the LLM invokes tools and handles responses in real time.

Once your toolset behaves as expected, you can deploy it as an MCP server or integrate it directly into your agents for production use.

<div class="flex justify-center">
  <video controls>
    <source src="/videos/creating_toolsets.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>


## Toolsets as MCP servers

In addition to enabling powerful agents through well-scoped toolsets, each toolset in Gram is automatically exposed as an MCP server using the streamable HTTP transport. Within the Playground, you’ll find options to inspect and retrieve the MCP server configuration for any toolset.

![MCP server configuration](/img/concepts/toolsets/mcp-server-configuration.png)

Click the **Publishing Settings** button to open a modal where you can customize the MCP server’s URL and configure its visibility (public or private).

If the MCP server is set to public, clicking the **MCP Config** button will reveal two configuration options:

- **Public MCP Server**: No authentication required.
- **Authenticated Server (with Gram key)**: Requires a Gram API key for access.

![MCP server configuration](/img/concepts/toolsets/mcp-server-toolsets-config-options.png)

## Custom Domains

MCP servers can be hosted through a custom subdomain - such as `{your_sub_domain}/mcp`.

Contact Gram support to get access to a custom subdomain on your account. To complete setup visit the **Settings** page of the gram dashboard. 

At a high level two DNS entries will need to be created:

1. A new CNAME record pointing to `cname.getgram.ai.`
2. A new TXT record `_gram.{your_sub_domain}` with a value of `gram-domain-verify={your_sub_domain},{gram_organization_id}`.
3. Then reach out to Gram to complete your domain linking process.
