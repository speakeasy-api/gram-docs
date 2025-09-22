---
title: "Publish your Gram server on the MCP Registry"
description: "Learn how to publish your Gram-hosted MCP server to the official Model Context Protocol Registry, which improves MCP server discoverability and distribution."
sidebar:
  order: 8
---

The official [Model Context Protocol (MCP) Registry](https://registry.modelcontextprotocol.io/) is an open catalog and API for publicly available MCP servers. It's like an app store for MCP servers -  it provides MCP clients with a list of MCP servers. By publishing your Gram-hosted MCP server to the registry, you make it discoverable. 

The registry is owned by the MCP open-source community and backed by major trusted contributors to the MCP ecosystem such as Anthropic, GitHub, and Microsoft.

This guide will show you how to prepare your Gram MCP server and publish it to the MCP Registry. You'll learn how to configure your server details, handle DNS authentication, and verify your publication. 

To publish your MCP server to the MCP registry, you need to make your MCP server available, which you can do using:

- Package deployment: Publish your MCP server as a package, for example an npm package, which can be run locally by MCP clients.
- Remote deployment: Host your MCP server as a web service that clients connect to.
- Hybrid deployment: Offer both package and remote deployment options.

We'll focus on remote deployment in this guide as we believe managed MCP servers will become more popular.

## Prerequisites

You'll need:

- A [Gram Pro or Enterprise account](https://app.getgram.ai) - you need a custom domain to publish your MCP server to the registry.
- A hosted Gram MCP server. If you don't have one, you can learn how to create one in our [quickstart guide](/gram-quickstart).
- Domain management access (for DNS TXT record configuration) for a custom domain.
- A GitHub repository for your MCP server source code.

## Creating a custom MCP server domain

MCP servers can be hosted through a custom subdomain such as `{your_sub_domain}/mcp`.

Contact Gram support to enable a custom subdomain for your account, then go to **Settings** in the Gram dashboard to complete the setup.

You’ll need to create two DNS entries:

A CNAME record pointing to `cname.getgram.ai`.
A TXT record named `_gram.{your_sub_domain}` with the value `gram-domain-verify={your_sub_domain},{gram_organization_id}`.

Once both DNS records have been created, contact Gram to complete the domain linking process.

## Setting up your MCP server

In the [Gram dashboard](https://app.getgram.ai), go to **MCP** in the sidebar and select your MCP server. Click the **Enable** button at the top-right of the page to allow the server to receive requests. Under **Hosted URL** you should see your custom domain. Under **Visibility**  set the server to **Public**.

![GramMCP server details page](/img/guides/publish-gram-server-mcp-registry/mcp-details.png)

## Install the MCP publisher CLI

The MCP Registry uses an official CLI tool for publishing servers. The recommended way to install it is using [Homebrew](https://brew.sh/):

```bash
brew install mcp-publisher
```
## Create a MCP publisher server configuration file

Navigate to the local directory of your MCP server's API. Make sure the Open API document is present in the root directory and then create a template `server.json` file using the MCP publisher CLI:

```bash
mcp-publisher init
```

This creates a `server.json` file in your repository with auto-detected server details:

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-09-16/server.schema.json",
  "name": "com.yourcompany/todo",
  "description": "A description of your MCP server",
  "version": "1.0.0",
  "packages": [
    {
      "registryType": "npm",
      "identifier": "your-package-name",
      "version": "1.0.0"
    }
  ]
}
```

The name field determines authentication requirements. The
`com.yourcompany/*` format requires DNS or HTTP domain verification.

For remote deployment, you need to add the `remotes` field to the `server.json` file:

```json
"remotes": [
  {
    "type": "streamable-http",
    "url": "https://mcp.yourdomain.com/mcp/your-server-id",
    "authentication": {
      "type": "header",
      "header": "MCP-YOUR-SERVER-API-KEY"
    }
  }
]
```

The `url` field is the URL of your MCP server. The `type` field is the transport protocol to use. The `authentication` field is the authentication method to use, which can be `sse` (Server-Sent Events) or `streamable-http`. The optional `header` field configures the headers that clients should send to when connecting to the MCP server, which includes the API key in this case.

## DNS authentication for your custom domain

You need to verify that you own the domain before you can publish your MCP server to the MCP Registry.

First, in your server's local directory, create a private key for authentication:

```bash
openssl genpkey -algorithm Ed25519 -out key.pem
```

Next, get the public key for the DNS record:

```bash
echo "yourdomain.com. IN TXT \"v=MCPv1; k=ed25519; p=$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)\""
```

This command extracts the public key from your private key file, encodes it in base64 format, and formats it as a DNS TXT record for MCP Registry verification. 

The output shows what you need to add to add to your domain's DNS configuration. For example:

``` 
yourcompany.com. IN TXT "v=MCPv1; k=ed25519; p=qC5H12wereF434F1aSHdYsRPGruUhY0="
```

Copy the value in parentheses.

### Add the DNS TXT record

In your domain registrar's DNS management interface do the following:

1. Create a new TXT record.
2. Set the host/name to your root domain using the `@` symbol.
3. Set the value to the output you copied from the previous command.
4. Save the record and wait for DNS propagation (usually 5-15 minutes).

You can check the status of the DNS propagation using the Linux `dig` command:

```bash
dig TXT yourcompany.com | grep "v=MCPv1; k=ed25519; p=qC5H12wereF434F1aSHdYsRPGruUhY0="
```

When checking DNS propagation for your newly added TXT record, you'll initially see `status: NXDOMAIN` in your `dig` output, which means that the DNS resolver cannot find the domain or the specific record type you're querying. Once DNS propagation is complete, the status will change to `status: NOERROR`.

In namecheap, you can add a new TXT record in the **Advanced DNS** settings page:

![Namecheap - adding a DNS TXT record](/img/guides/publish-gram-server-mcp-registry/adding-dns-record.png)


### Authenticate with the registry

Once DNS propagation is complete, authenticate with the MCP Registry using DNS-based domain verification:

```bash
mcp-publisher login dns --domain yourcompany.com --private-key $(openssl pkey -in key.pem -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n')
```

This command authenticates you with the MCP Registry by extracting the private key from your `key.pem` file and using it to prove domain ownership through the DNS TXT record you created.

## Publish your server to the MCP Registry

Before publishing, ensure that you don't commit sensitive files to your repository such as the private key:

```bash
# Remove the private key
rm key.pem

# Add to .gitignore if not already present
echo "key.pem" >> .gitignore
```

Run the following command to publish your server to the MCP Registry:

```bash
mcp-publisher publish
```

You should see the following output:

```bash
✓ Successfully published
```

## Verify your publication

Check that your server appears in the registry by searching for it using the `curl` command with your MCP server name:

```bash
curl "https://registry.modelcontextprotocol.io/v0/servers?search=com.yourcompany/todo"
```

You should see your server metadata returned in the JSON response:

```json
{
  "servers": [
    {
      "$schema": "https://static.modelcontextprotocol.io/schemas/2025-09-16/server.schema.json",
      "name": "com.ritzademo/acme-todo",
      "description": "An MCP server for a simple todo list",
      "status": "active",
      "repository": {
        "url": "https://github.com/ritza-co/acme-todo",
        "source": "github"
      },
      "version": "1.0.0",
      "remotes": [
        {
          "type": "streamable-http",
          "url": "https://mcp.ritzademo.com/mcp/ritza-rzx-our91"
        }
      ],
      "_meta": {
        "io.modelcontextprotocol.registry/official": {
          "serverId": "56249c55-9d56-473d-a5ba-9ccc9c956d5d",
          "versionId": "86d5e960-a135-427a-ab53-046209080b2e",
          "publishedAt": "2025-09-15T16:48:08.379170462Z",
          "updatedAt": "2025-09-15T16:48:08.379170462Z",
          "isLatest": true
        }
      }
    }
  ],
  "metadata": {
    "count": 1
  }
}
```

Your MCP server can now be discovered and installed by MCP clients.

## Next steps

Your Gram MCP server is now published on the official MCP Registry, making it discoverable to developers worldwide.
To maintain and further improve your MCP server you can:

- Automate publishing with [GitHub Actions workflows](https://github.com/modelcontextprotocol/registry/blob/main/docs/guides/publishing/github-actions.md)
- Refine tool definitions and use [tool variations](/concepts/tool-variations) to help LLMs better understand and invoke them accurately.