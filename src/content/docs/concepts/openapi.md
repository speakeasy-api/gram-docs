---
title: OpenAPI
description: Document your API with OpenAPI and Gram will do the rest to turn it into tools
sidebar:
  order: 4
---

Gram uses OpenAPI documents to generate tool definitions. The OpenAPI specification is a powerful standard for describing APIs—it can be used to [generate documentation and SDKs](https://speakeasy.com), and in Gram’s case, to generate tools directly from the endpoint definitions within the OpenAPI document.

For the best experience, we recommend using [OpenAPI 3.1.x](https://spec.openapis.org/oas/v3.1.1) and its associated JSON Schema version to describe your API.

## Using the `x-gram` extension

Because Gram generates tools directly from endpoint descriptions in your OpenAPI document, it's essential that those descriptions are accurate and informative. However, writing descriptions that serve both humans and LLMs can be challenging.

Short descriptions may be readable for humans, but LLMs often require more context to interpret intent and usage correctly. To bridge this gap, Gram supports the `x-gram` extension within OpenAPI documents, allowing you to provide LLM-optimized metadata specifically for tool generation and usage.

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
      responses:
        "200":
          description: Details about a product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
```

Without the `x-gram` extension, the tool name would have been `ecommerce_e_commerce_v1_product` and the tool description would have been `"Get a product by its ID"`. This would have resulted in a poor quality tool. With the help of the `x-gram` extension, we are able to augment the name and description without tampering with the original information in the document.

Using this extension is not required and, with the help of [tool variations](/concepts/tool-variations) on the Gram dashboard, it is possible to modify the name and description when curating tools into toolsets. However, it is worth considering whether it is a valuable exercise to **sanitize** your API at ingestion time so that other Gram users in your team get the benefits immediately.

## Caveats with OpenAPI 3.0.x

Many LLMs do not support the JSON Schema version that is used in OpenAPI 3.0.x documents. Gram does not block you from uploading such documents but in some cases, you may have some issues when certain agent SDKs try to invoke tools since and encounter obsolete JSON Schema settings. Namely:

- `nullable: true` may cause issues with the Vercel AI SDK and similar.
- `exclusiveMinimum: <boolean>` and `exclusiveMaximum: <boolean>` are also considered invalid. The modern equivalent is `exclusiveMinimum: <number>` and `exclusiveMaximum: <number>`.

:::tip[Transparent upgrade coming soon]
We are working on a feature that will transparently upgrade your **OpenAPI 3.0.x** document to **OpenAPI 3.1.x** at the time of upload. This will include migrating from unsupported JSON Schema options. Please reach out to us if you consider this a blocker and we can share some short-term workarounds.
:::
