---
title: Environments
description: Manage auth and server details for your API
---

APIs typically require some form of authentication/authorization and a server URL before a client such as an AI agent can access them. Additionally, you might have different environments such as "production" and "staging" or an API that is multi-tenanted. In Gram, you can create multiple environments to hold different sets of credentials and server URLs. When initializing the Gram SDKs, you specify which environment to use and the tools that are passed to the LLM will be bound to that environment.

```ts title="vercel-example.ts" {15}
import { generateText } from "ai";
import { VercelAdapter } from "@gram-ai/sdk/vercel";
import { createOpenAI } from "@ai-sdk/openai";

const key = process.env.GRAM_API_KEY;
const vercelAdapter = new VercelAdapter({ apiKey: key });

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tools = await vercelAdapter.tools({
  project: "acme",
  toolset: "marketing",
  environment: "production",
});

const result = await generateText({
  model: openai("gpt-4"),
  tools,
  maxSteps: 5,
  prompt: "Can you tell me what tools you have available?",
});

console.log(result.text);
```

```py title="openai-agents-example.py" {17}
import asyncio
import os
from agents import Agent, Runner, set_default_openai_key
from gram_ai.openai_agents import GramOpenAIAgents

key = os.getenv("GRAM_API_KEY")

gram = GramOpenAIAgents(api_key=key)

set_default_openai_key(os.getenv("OPENAI_API_KEY"))

agent = Agent(
    name="Assistant",
    tools=gram.tools(
        project="acme",
        toolset="marketing",
        environment="production",
    ),
)


async def main():
    result = await Runner.run(
        agent,
        "Can you tell me what tools you have available?",
    )
    print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
```

Environments are not required to use the Gram SDKs. It is possible to pass the required variables when creating an instance. This can be useful when the users of your Gram toolsets have their own credentials that they want to bring with them.

```ts title="byo-env-vars.ts" {5-8}
import { VercelAdapter } from "@gram-ai/sdk/vercel";

const vercelAdapter = new VercelAdapter({
  apiKey: process.env.GRAM_API_KEY,
  environmentVariables: {
    ACME_API_KEY: process.env.ACME_API_KEY,
    ACME_SERVER_URL: "https://janesmith.acme.com",
  },
});
```

```py title="byo-env-vars.py" {6-9}
import os
from gram_ai.openai_agents import GramOpenAIAgents

gram = GramOpenAIAgents(
    api_key=os.getenv("GRAM_API_KEY"),
    environment_variables= {
        "ACME_API_KEY": os.getenv("ACME_API_KEY"),
        "ACME_SERVER_URL": "https://janesmith.acme.com",
    }
)
```

<div class="flex justify-center">
  <video controls>
    <source src="/videos/environments.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
