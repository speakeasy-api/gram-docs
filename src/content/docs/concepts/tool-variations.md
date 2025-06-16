---
title: Tool variations
description: Prompt-engineer tool names and descriptions for better results
sidebar:
  order: 2
---

It's often the case that the endpoints listed in an OpenAPI document lack clear summaries and descriptions that convey the actual intent and usage of each endpoint.

When these incomplete or vague descriptions are inherited by tool definitions, LLMs may struggle to understand when to invoke a tool, how to use it properly, or how to interpret its output. Improving tool descriptions is a form of prompt engineering, and it's a critical step in building reliable, effective agents.

To improve a tool's description, Gram allows you to:

- [Edit the OpenAPI document](/concepts/openapi#using-the-x-gram-extension) and add a `x-gram` extension to the endpoint to override or enrich the tool's metadata.
- Use the Gram Playground to directly edit a tool’s name and description. This feature is called **Tool variations**.

To edit a tool's name and description, hover over the tool in the Gram Playground and click the **Edit** button.

![Editing a tool name](/img/concepts/tool-variations/editing-tool-name.png)

This opens a modal where you can modify the tool’s name:

![Validating tool name editing](/img/concepts/tool-variations/validating-tool-name-editing.png)

You can also update the tool’s description in a similar way:

![Editing a tool description](/img/concepts/tool-variations/editing-tool-description.png)

A dedicated modal allows you to validate and save your updated description:

![Validating tool description editing](/img/concepts/tool-variations/validating-tool-description-editing.png)
