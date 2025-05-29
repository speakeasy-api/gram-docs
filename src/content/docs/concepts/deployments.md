---
title: Deployments
description: The "git commits" of Gram
---

Every time you upload a new OpenAPI document or a new version of a previously uploaded document or enable an integration, you are creating a new deployment. Under the hood, Gram will process the deployment for all the artifacts (OpenAPI documents and Gram integrations) to generate tool definitions. Logs are also generated for each deployment so you can see what happened and what operations
could not be processed.

:::tip[Fun fact]
Every Gram integration is backed by its own project and every time we release a new version of anintegration, what we are doing is tagging a particular deployment with a semantic version.
:::
