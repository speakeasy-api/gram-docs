---
title: OpenAPI
description: Document your API with OpenAPI to generate tools with Gram
sidebar:
  order: 4
---

Gram uses OpenAPI documents to generate tool definitions. The OpenAPI Specification is a powerful standard for describing APIs. Documents based on this standard can be used to [generate documentation and SDKs](https://speakeasy.com), and Gram uses them to generate tools directly from their endpoint definitions.

For best results, we recommend using [OpenAPI 3.1.x](https://spec.openapis.org/oas/v3.1.1) and its corresponding JSON Schema version to describe your API.

## Using the `x-gram` extension

Because Gram generates tools directly from endpoint descriptions in your OpenAPI document, it's essential that those descriptions are accurate and informative. However, writing descriptions that serve both humans and LLMs can be challenging.

Short descriptions may be readable for humans, but LLMs often require more context to interpret intent and usage correctly. To bridge this gap, Gram supports the `x-gram` extension in OpenAPI documents, allowing you to provide LLM-optimized metadata specifically for tool generation and usage.

```yaml {8,9,22-33}
openapi: 3.1.0
info:
  title: E-commerce API
  version: 1.0.0
paths:
  /products/{merchant_id}/{product_id}:
    get:
      summary: Get a product
      operationId: E-Commerce V1 / product
      tags: [ecommerce]
      parameters:
        - name: merchant_id
          in: path
          required: true
          schema:
            type: string
        - name: product_id
          in: path
          required: true
          schema:
            type: string
      x-gram:
        name: get_product
        summary: ""
        description: |
          <context>
            This endpoint returns details about a product for a given merchant.
          </context>
          <prerequisites>
            - If you are presented with a product or merchant slug then you must first resolve these to their respective IDs.
            - Given a merchant slug use the `resolve_merchant_id` tool to get the merchant ID.
            - Given a product slug use the `resolve_product_id` tool to get the product ID.
          </prerequisites>
        responseFilterType: jq
      responses:
        "200":
          description: Details about a product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
```

Without the `x-gram` extension, the generated tool would be named `ecommerce_e_commerce_v1_product`, and have the description `"Get a product by its ID"`, resulting in a poor quality tool. The `x-gram` extension allows you to customize a tool's name and description without altering the original information in the OpenAPI document.

### Response Filtering

The `x-gram` extension supports response filtering to help LLMs process API responses more effectively. Use the `responseFilterType` property to specify how responses should be filtered:

- **`jq`**: Enables [jq](https://jqlang.org/) filtering on JSON responses. This allows the LLM to extract specific data from complex API responses using jq syntax, reducing noise and focusing on relevant information.

```yaml
x-gram:
  name: get_user_profile
  description: "Get detailed user profile information"
  responseFilterType: jq
```

When `responseFilterType` is set to `jq`, the LLM can apply jq filters to the response data, such as:
- `.user | {name, email, status}` to extract only specific user fields
- `.data[] | select(.active == true)` to filter for active items
- `.results | map({id, title})` to transform arrays of objects

Omitting `responseFilterType` or setting it to `none` disables response filtering.

More response filter types will be available in future releases.

Using the `x-gram` extension is optional. With Gram's [tool variations](/concepts/tool-variations) feature, you can modify a tool's name and description when curating tools into toolsets. However, it might be worth using the `x-gram` extension to make your OpenAPI document clean, descriptive, and LLM-ready before bringing it into Gram, so your team doesn't need to fix tool names and descriptions later.

## Limitations of OpenAPI 3.0.x

Many LLMs don't support the JSON Schema version used in OpenAPI 3.0.x documents. While Gram supports OpenAPI 3.0.x documents, some agent SDKs may run into issues when invoking tools that use outdated JSON Schema settings.

For example, the following OpenAPI 3.0.x fields are known to cause compatibility problems:

- `nullable: true` may cause issues with the Vercel AI SDK and similar.
- `exclusiveMinimum: <boolean>` and `exclusiveMaximum: <boolean>` are considered invalid. The modern equivalent is `exclusiveMinimum: <number>` and `exclusiveMaximum: <number>`.

:::tip[Transparent upgrade coming soon]
We are working on a feature that will transparently upgrade your **OpenAPI 3.0.x** document to **OpenAPI 3.1.x** at the time of upload, including automatic migration of unsupported JSON Schema options. If this issue is a blocker, contact us for available short-term workarounds.
:::
