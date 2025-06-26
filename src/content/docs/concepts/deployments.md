---
title: Deployments
description: The "git commits" of Gram
sidebar:
  order: 5
---

Each time you upload a new OpenAPI document, update a previously uploaded one, or enable an integration, you create a new **deployment** in Gram.

Under the hood, Gram processes each deployment by analyzing all related artifacts—including OpenAPI documents and enabled integrations—to generate or update the corresponding tool definitions.

For full visibility, Gram also generates logs for every deployment. These logs let you inspect what was processed successfully and identify any operations or endpoints that failed to convert into tools.

![Deployments logs](/img/concepts/deployments/failed-deployment-logs.png)

:::tip[Fun fact]
Every Gram integration is backed by its own project and every time we release a new version of an integration, what we are doing is tagging a particular deployment with a semantic version.
:::

<div class="flex justify-center">
  <video controls>
    <source src="/videos/getting_started.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
