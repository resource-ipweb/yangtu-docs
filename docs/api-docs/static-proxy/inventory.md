---
sidebar_position: 3
slug: /static-proxy/inventory
description: Inventory APIs �?country tree and CIDR stock.
---

# Inventory

Requires `UserId` and `Token`.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/open/staticip/inventory/countries` | Country/city inventory tree |
| POST | `/open/staticip/inventory/cidrs` | CIDR segments and availability |

Both accept a `condition` object (`sellMode`, `lineType`, `businessId`, `isUdp`, etc.) aligned with [Purchase](/static-proxy/purchase) quote/order.

See 中文 docs for full request/response field tables.
