---
title: Deployments
description: The "Git commits" of Gram
sidebar:
  order: 5
---

Each time you upload a new OpenAPI document, update a previously uploaded one, or enable an integration, you create a new **deployment** in Gram.

For each deployment, Gram analyzes all related OpenAPI documents and enabled integrations to generate or update the corresponding tool definitions.

Gram generates logs for every deployment, showing what was processed successfully and which operations or endpoints failed to convert into tools.

![Deployments logs](/img/concepts/deployments/failed-deployment-logs.png)

:::tip[Fun fact]
Each Gram integration is backed by its own project. Every new integration release tags a particular deployment with a semantic version.
:::
