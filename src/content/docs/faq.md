---
title: "FAQ"
description: "Common questions and answers about Gram, MCP servers, and tool creation."
sidebar:
  order: 3
---

## Getting Started

<details>
<summary>What is Gram?</summary>

Gram is the fastest way to build a production-ready MCP server. It's a platform that enables any company to create, curate, and host agentic tools from their existing APIs.

</details>

<details>
<summary>What is MCP?</summary>

The Model Context Protocol (MCP) is a standard that allows AI agents to interact with APIs in a structured way. Since its announcement by Anthropic in November 2024, MCP has become the de facto standard for agent-API interactions, with adoption from companies like Microsoft, Google, OpenAI, and Cloudflare.

</details>

<details>
<summary>Do I need to know how to code to use Gram?</summary>

No! Gram is designed to work with your existing OpenAPI documents. You can create, curate, and deploy MCP servers through Gram's visual interface without writing any code.

</details>

<details>
<summary>How is Gram different from building an MCP server from scratch?</summary>

Building an MCP server from scratch requires:
- Learning the MCP specification
- Writing server code
- Managing hosting and infrastructure
- Handling security and authentication
- Maintaining and updating the server

Gram handles all of this automatically from your OpenAPI document, letting you focus on tool curation rather than infrastructure.

</details>

## Technical Questions

<details>
<summary>What do I need to get started?</summary>

All you need is an OpenAPI document (also known as a Swagger spec) that describes your API. The better your OpenAPI document, the better your MCP server will be.

</details>

<details>
<summary>Can I customize the tools that Gram generates?</summary>

Yes! Gram provides several ways to customize your tools:
- Remove unnecessary tools from your toolset
- Add custom descriptions and context
- Create workflow-based custom tools that combine multiple API endpoints
- Fine-tune individual tools with better prompts
- Create use case-specific toolsets

</details>

<details>
<summary>What file formats does Gram support?</summary>

Gram supports OpenAPI documents in both JSON and YAML formats (versions 3.0 and 3.1).

</details>

<details>
<summary>Can I test my MCP server before deploying it?</summary>

Absolutely! Gram includes a built-in playground where you can test and interact with your MCP server in real-time before making it available to others.

</details>

## Deployment and Hosting

<details>
<summary>How does Gram host my MCP server?</summary>

Gram provides fully managed hosting for your MCP servers. Every toolset automatically gets a hosted MCP server at a Gram-managed URL. You can also configure custom domains to create branded servers at `mcp.your-domain.com/server-name`.

</details>

<details>
<summary>Can I make my MCP server public or keep it private?</summary>

You have both options:
- **Public servers** can be instantly used by anyone with the configuration
- **Authenticated servers** require a Gram API key, making them suitable for internal use cases

</details>

<details>
<summary>Do you support self-hosting?</summary>

Yes, in addition to managed hosting, Gram also supports self-hosted deployments for organizations that prefer to run their own infrastructure.

</details>

<details>
<summary>How do I connect my MCP server to AI agents?</summary>

Your MCP server works with:
- MCP clients like Claude Desktop, Cursor, and other compatible tools
- AI agent frameworks through Gram's Python and TypeScript SDKs
- Popular platforms like OpenAI Agents and LangChain

</details>

## Pricing and Plans

<details>
<summary>How much does Gram cost?</summary>

Visit [getgram.ai](https://getgram.ai) for current pricing information and to start with a free account.

</details>

<details>
<summary>Is there a free tier?</summary>

Yes, you can get started with Gram for free. Check our pricing page for details on what's included in the free tier.

</details>

## Security and Enterprise

<details>
<summary>How secure is Gram?</summary>

Gram is built with security best practices for working with agentic tools, including:
- API key management
- Secure hosting infrastructure
- Access controls for authenticated servers
- Environment variable management

</details>

<details>
<summary>Does Gram support team collaboration?</summary>

Yes, Gram supports team-based workflows with shared toolsets, environments, and MCP servers that can be accessed by authorized team members.

</details>

<details>
<summary>Can I use my own domain?</summary>

Yes, Gram supports custom domains so you can host your MCP server at your own branded URL like `mcp.your-company.com/your-server`.

</details>

## Troubleshooting

<details>
<summary>My OpenAPI document isn't working well with Gram. What should I do?</summary>

The quality of your OpenAPI document directly impacts your MCP server quality. Check out the [OpenAPI hub](https://www.speakeasy.com/openapi) for guidance on writing better OpenAPI documents.

</details>

<details>
<summary>How do I improve my tool performance?</summary>

Focus on these areas:
1. **Scope your tools** - Include only the most relevant API operations
2. **Add context** - Provide rich descriptions, prompts, and examples
3. **Create workflow-based tools** - Combine multiple endpoints into single, purpose-built tools

</details>

<details>
<summary>Where can I get help?</summary>

- Check out our comprehensive documentation
- Visit our [GitHub repository](https://github.com/speakeasy-api/gram-docs) for issues and discussions
- Contact our support team through the Gram platform

</details>

<details>
<summary>Can I migrate from an existing MCP server setup?</summary>

Yes! If you already have MCP servers or are using other tools, Gram can work alongside your existing setup. You can gradually migrate toolsets or run them in parallel during a transition period.

</details>