---
sidebar_position: 4
slug: /static-proxy/purchase
description: Purchase APIs â€?options, quote, place and pay.
---

# Purchase

Requires `UserId` and `Token`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/open/staticip/purchase/options` | Purchase configuration options |
| POST | `/open/staticip/purchase/quote` | Quote (no order created) |
| POST | `/open/staticip/purchase/orders/place-and-pay` | Create order and pay with wallet balance |

Recommended flow: `options` â†?`inventory` â†?`quote` â†?`place-and-pay`.

Use `X-Idempotency-Key` on place-and-pay. Pass `quoteId` and `quoteVersion` from the quote response.

Common errors: `60004` insufficient balance; `60306`â€“`60309` order/idempotency related.

See ä¸­æ–‡ docs for `config`, `quotaItems`, `segmentItems`, and `specificIpItems` structures.
