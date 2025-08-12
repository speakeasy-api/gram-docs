---
title: Response Filtering
description: Filter API responses to help LLMs process data more effectively
sidebar:
  order: 6
---

Response filtering helps LLMs process API responses more effectively by allowing you to extract specific data from complex responses, reducing noise and focusing on relevant information.

## Configuring Response Filtering

Use the `responseFilterType` property in the `x-gram` extension of your OpenAPI document to specify how responses should be filtered:

```yaml
paths:
  /products/{merchant_id}/{product_id}:
    get:
      summary: Get a product
      operationId: E-Commerce V1 / product
      x-gram:
        name: get_product
        description: |
          <context>
            This endpoint returns details about a product for a given merchant.
          </context>
        responseFilterType: jq
      responses:
        "200":
          description: Details about a product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
```

## Available Filter Types

### jq Filtering

Set `responseFilterType: jq` to enable [jq](https://jqlang.org/) filtering on JSON responses. This allows the LLM to extract specific data from complex API responses using jq syntax.

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

### No Filtering

Omitting `responseFilterType` or setting it to `none` disables response filtering. The LLM will receive the full API response without any modifications.

## Benefits

Response filtering provides several advantages:

- **Reduced complexity**: Simplifies complex API responses by extracting only relevant data
- **Improved performance**: Reduces the amount of data the LLM needs to process
- **Better focus**: Helps the LLM concentrate on the information most relevant to the task
- **Noise reduction**: Eliminates unnecessary fields that might confuse the LLM

## Future Enhancements

More response filter types will be available in future releases to support additional data transformation and filtering capabilities.