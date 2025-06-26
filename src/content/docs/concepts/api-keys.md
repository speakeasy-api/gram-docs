---
title: API keys
description: How to create a Gram API key
sidebar:
  order: 7
---

Gram API keys are used to authenticate your requests to the Gram API. They can be used with MCP servers configs or with the Gram SDKs.

To generate a Gram API key, navigate to the **Settings** page of the Gram dashboard and click on the **Create API Key** button.

![Creating an API key](/img/concepts/api-keys/adding-api-key.png)

Then, copy the API key and follow your MCP client's instructions to add the configuration to your client.  

If you're using the Gram SDKs, you can pass the API key as an environment variable to authenticate requests programmatically.

```py title="openai-agents-example.py" {6}
import asyncio
import os
from agents import Agent, Runner, set_default_openai_key
from gram_ai.openai_agents import GramOpenAIAgents

key = os.getenv("GRAM_API_KEY")

gram = GramOpenAIAgents(api_key=key)

set_default_openai_key(os.getenv("OPENAI_API_KEY"))

# ...
```

:::tip[Best practice]
We recommend always using the Gram API key as an environment variable for security and flexibility.

Additionally, it's best practice to use separate API keys for each agent or client configuration – especially when setting up MCP server connections – to isolate access and improve traceability.
:::
